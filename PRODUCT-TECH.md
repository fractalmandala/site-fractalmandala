# Tech Spec — PixelForge

## Context

This is a greenfield personal desktop application. The user currently generates images by manually managing RunPod network storages and deploying ComfyUI/AI Toolkit pods. The goal is to build a local tool that automates the generation workflow, tracks history, and integrates with Civitai for model discovery.

### Stack Decision: Tauri v2 + SvelteKit + SQLite + Rust Backend

**Why Tauri + SvelteKit:**
- The user expressed preference for this stack.
- Tauri v2 produces small, native binaries (~5-10MB) with a webview renderer — ideal for a personal desktop tool.
- SvelteKit handles the UI with file-based routing and excellent DX.
- Rust backend gives us performant HTTP clients (reqwest), strong SQLite integration (rusqlite/sqlx), and native file system access without a separate server process.
- No always-running backend server needed — Tauri commands are invoked directly from the Svelte frontend via IPC.

**Why NOT a web app:**
- This is a single-user personal tool. No need for hosting, auth, or multi-user concerns.
- Local SQLite means zero infrastructure. Data stays on the user's machine.
- Tauri provides native features: system tray, file dialogs, shell commands, clipboard — all needed for this app.

**Alternatives considered and rejected:**
- SvelteKit alone (web app): Requires running a server, deploying somewhere. Overkill for personal use.
- Electron + Svelte: 100-200MB bundle size vs Tauri's ~10MB. Electron's Node.js process is heavier than Tauri's Rust IPC.
- Python + Tauri: Possible but Rust has better HTTP client libraries and SQLite integration for this use case.

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  Tauri Window                     │
│  ┌─────────────────────────────────────────────┐ │
│  │            SvelteKit Frontend                │ │
│  │  (Generation, History, Templates, Gallery,  │ │
│  │   Civitai, Settings, Cost Dashboard)         │ │
│  └──────────────────┬──────────────────────────┘ │
│                     │ Tauri IPC (invoke)          │
│  ┌──────────────────▼──────────────────────────┐ │
│  │              Rust Backend                     │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────┐ │ │
│  │  │ RunPod   │ │ Civitai  │ │   SQLite     │ │ │
│  │  │ Client   │ │ Client   │ │   (sqlx)     │ │ │
│  │  │ (reqwest)│ │ (reqwest)│ │              │ │ │
│  │  └──────────┘ └──────────┘ └──────────────┘ │ │
│  └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

## Project Structure

```
pixelforge/
├── src-tauri/
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   ├── src/
│   │   ├── main.rs              # Tauri bootstrap, command registration
│   │   ├── commands/
│   │   │   ├── mod.rs
│   │   │   ├── generation.rs    # Generate images via RunPod
│   │   │   ├── history.rs       # CRUD for generation history
│   │   │   ├── templates.rs     # CRUD for templates
│   │   │   ├── civitai.rs       # Civitai search, model details
│   │   │   ├── settings.rs      # App settings management
│   │   │   ├── gallery.rs       # Image gallery operations
│   │   │   └── export.rs        # Export & cost tracking
│   │   ├── services/
│   │   │   ├── mod.rs
│   │   │   ├── runpod.rs        # RunPod API client
│   │   │   ├── civitai.rs       # Civitai API client
│   │   │   └── storage.rs       # Image file storage
│   │   ├── db/
│   │   │   ├── mod.rs
│   │   │   ├── migrations/      # SQL migration files
│   │   │   └── models.rs        # Rust structs matching DB schema
│   │   └── errors.rs            # Shared error types
│   └── migrations/
│       └── 001_initial.sql
├── src/
│   ├── app.html
│   ├── app.css                  # Global styles
│   ├── lib/
│   │   ├── components/
│   │   │   ├── GenerationPanel.svelte
│   │   │   ├── HistoryPanel.svelte
│   │   │   ├── TemplatesPanel.svelte
│   │   │   ├── GalleryPanel.svelte
│   │   │   ├── CivitaiPanel.svelte
│   │   │   ├── SettingsPanel.svelte
│   │   │   ├── CostDashboard.svelte
│   │   │   ├── ImageLightbox.svelte
│   │   │   └── common/          # Shared UI components
│   │   │       ├── SearchBar.svelte
│   │   │       ├── FilterControls.svelte
│   │   │       ├── Modal.svelte
│   │   │       ├── Toast.svelte
│   │   │       └── MetadataTable.svelte
│   │   ├── stores/              # Svelte stores for app state
│   │   │   ├── generation.ts
│   │   │   ├── history.ts
│   │   │   ├── templates.ts
│   │   │   ├── settings.ts
│   │   │   └── civitai.ts
│   │   ├── api/                 # Tauri invoke wrappers
│   │   │   ├── generation.ts
│   │   │   ├── history.ts
│   │   │   ├── templates.ts
│   │   │   ├── civitai.ts
│   │   │   ├── settings.ts
│   │   │   └── gallery.ts
│   │   └── types/               # Shared TypeScript types
│   │       └── index.ts
│   └── routes/
│       ├── +layout.svelte       # Main layout with sidebar nav
│       ├── +page.svelte         # Redirects to /generate
│       ├── generate/
│       │   └── +page.svelte
│       ├── history/
│       │   └── +page.svelte
│       ├── templates/
│       │   └── +page.svelte
│       ├── gallery/
│       │   └── +page.svelte
│       ├── civitai/
│       │   └── +page.svelte
│       ├── settings/
│       │   └── +page.svelte
│       └── costs/
│           └── +page.svelte
├── static/
├── package.json
├── svelte.config.js
├── vite.config.ts
├── tsconfig.json
├── PRODUCT.md
└── PRODUCT-TECH.md
```

## Data Model (SQLite)

### Tables

```sql
-- Generation history
CREATE TABLE generations (
    id              TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    endpoint_id     TEXT NOT NULL,
    endpoint_name   TEXT,
    positive_prompt TEXT NOT NULL,
    negative_prompt TEXT DEFAULT '',
    width           INTEGER NOT NULL DEFAULT 1024,
    height          INTEGER NOT NULL DEFAULT 1024,
    steps           INTEGER NOT NULL DEFAULT 20,
    cfg_scale       REAL NOT NULL DEFAULT 7.0,
    sampler         TEXT NOT NULL DEFAULT 'euler',
    scheduler       TEXT NOT NULL DEFAULT 'normal',
    seed            INTEGER NOT NULL DEFAULT -1,
    batch_size      INTEGER NOT NULL DEFAULT 1,
    guidance        REAL DEFAULT NULL,
    workflow_json   TEXT,
    runpod_job_id   TEXT,
    status          TEXT NOT NULL DEFAULT 'pending',  -- pending, queued, in_progress, completed, failed
    delay_time_ms   INTEGER,
    execution_time_ms INTEGER,
    estimated_cost  REAL,
    error_message   TEXT,
    image_paths     TEXT,  -- JSON array of local file paths
    metadata_json   TEXT   -- any extra metadata from RunPod response
);

CREATE INDEX idx_generations_created ON generations(created_at DESC);
CREATE INDEX idx_generations_status ON generations(status);
CREATE INDEX idx_generations_endpoint ON generations(endpoint_id);

-- Templates
CREATE TABLE templates (
    id              TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name            TEXT NOT NULL UNIQUE,
    description     TEXT DEFAULT '',
    tag             TEXT DEFAULT '',
    width           INTEGER NOT NULL DEFAULT 1024,
    height          INTEGER NOT NULL DEFAULT 1024,
    steps           INTEGER NOT NULL DEFAULT 20,
    cfg_scale       REAL NOT NULL DEFAULT 7.0,
    sampler         TEXT NOT NULL DEFAULT 'euler',
    scheduler       TEXT NOT NULL DEFAULT 'normal',
    guidance        REAL DEFAULT NULL,
    workflow_json   TEXT,
    is_builtin      INTEGER NOT NULL DEFAULT 0,
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- RunPod endpoints
CREATE TABLE endpoints (
    id              TEXT PRIMARY KEY,
    name            TEXT NOT NULL,
    endpoint_id     TEXT NOT NULL,
    model_type      TEXT NOT NULL DEFAULT 'comfyui',
    workflow_json   TEXT,
    is_default      INTEGER NOT NULL DEFAULT 0,
    gpu_hourly_rate REAL DEFAULT NULL,  -- for cost estimation
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Civitai favorites
CREATE TABLE civitai_favorites (
    model_id        INTEGER PRIMARY KEY,
    model_name      TEXT NOT NULL,
    model_type      TEXT,
    base_model      TEXT,
    thumbnail_url   TEXT,
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Settings (key-value store)
CREATE TABLE settings (
    key             TEXT PRIMARY KEY,
    value           TEXT NOT NULL,
    updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Seed data: built-in templates
INSERT INTO templates (id, name, description, tag, steps, cfg_scale, sampler, scheduler, guidance, is_builtin) VALUES
    ('builtin_sdxl', 'SDXL Default', 'Standard SDXL generation settings', 'built-in', 20, 7.0, 'euler', 'normal', NULL, 1),
    ('builtin_flux', 'Flux Default', 'Standard Flux generation settings', 'built-in', 20, 1.0, 'euler', 'simple', 3.5, 1),
    ('builtin_hq', 'High Quality', 'Higher quality, slower generation', 'built-in', 50, 7.0, 'dpmpp_2m', 'karras', NULL, 1);
```

## Rust Backend Design

### Dependencies (`Cargo.toml`)

```toml
[dependencies]
tauri = { version = "2", features = ["shell-open"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
sqlx = { version = "0.8", features = ["runtime-tokio", "sqlite", "json"] }
reqwest = { version = "0.12", features = ["json", "rustls-tls"] }
tokio = { version = "1", features = ["full"] }
chrono = { version = "0.4", features = ["serde"] }
uuid = { version = "1", features = ["v4"] }
base64 = "0.22"
thiserror = "2"
tauri-plugin-shell = "2"
```

### Tauri Commands (IPC API)

All commands are `#[tauri::command]` functions invoked from the Svelte frontend via `invoke()`.

**Generation:**
- `generate_image(endpoint_id, params) -> GenerationJob` — Submits a job to RunPod, returns job ID and initial status.
- `get_job_status(endpoint_id, job_id) -> JobStatus` — Polls RunPod for job status.
- `cancel_job(endpoint_id, job_id) -> Result` — Cancels an in-progress job (if supported by endpoint).
- `save_workflow(workflow_json) -> String` — Parses and validates a ComfyUI workflow JSON.

**History:**
- `list_generations(filters, page, per_page) -> PaginatedResult<Generation>` — Query history with filters.
- `get_generation(id) -> Generation` — Get full details of one generation.
- `delete_generation(id) -> Result` — Delete from DB and disk.
- `delete_generations(ids) -> Result` — Bulk delete.
- `get_generation_stats() -> Stats` — Total count, cost, avg time.

**Templates:**
- `list_templates() -> Vec<Template>` — All templates.
- `create_template(input) -> Template` — Create new template.
- `update_template(id, input) -> Template` — Update template.
- `delete_template(id) -> Result` — Delete (only non-builtin).
- `get_template(id) -> Template` — Get one template.

**Civitai:**
- `search_civitai_models(query, filters) -> PaginatedResult<CivitaiModel>` — Search models.
- `get_civitai_model(model_id) -> CivitaiModelDetail` — Full model details.
- `get_civitai_model_versions(model_id) -> Vec<CivitaiModelVersion>` — All versions.
- `add_civitai_favorite(model_id) -> Result` — Bookmark model.
- `remove_civitai_favorite(model_id) -> Result` — Remove bookmark.
- `list_civitai_favorites() -> Vec<CivitaiFavorite>` — List bookmarks.

**Settings:**
- `get_settings() -> Settings` — All settings.
- `update_settings(input) -> Settings` — Update settings.
- `test_runpod_connection(api_key) -> Result<bool>` — Validate RunPod API key.
- `test_civitai_connection(token) -> Result<bool>` — Validate Civitai token.

**Gallery:**
- `list_gallery_images(filters) -> PaginatedResult<GalleryImage>` — Gallery with filters.
- `delete_image(id) -> Result` — Delete image file and history entry.
- `download_image(id, path) -> Result` — Save image to user-chosen path.
- `download_all_images(filters, path) -> Result` — Export as zip.

**Export & Cost:**
- `export_history_json(filters) -> String` — JSON export.
- `export_history_csv(filters) -> String` — CSV export.
- `get_cost_data(date_range) -> CostData` — Cost aggregation data.
- `get_monthly_budget() -> BudgetStatus` — Current month cost vs budget.

### RunPod Client (`services/runpod.rs`)

```rust
pub struct RunPodClient {
    client: reqwest::Client,
    api_key: String,
}

impl RunPodClient {
    /// Submit an async job to a serverless endpoint.
    /// POST https://api.runpod.ai/v2/{endpoint_id}/run
    pub async fn run(&self, endpoint_id: &str, input: serde_json::Value) -> Result<RunPodJobResponse>;

    /// Poll job status.
    /// GET https://api.runpod.ai/v2/{endpoint_id}/status/{job_id}
    pub async fn status(&self, endpoint_id: &str, job_id: &str) -> Result<RunPodJobStatus>;

    /// Validate API key by hitting a lightweight endpoint.
    pub async fn validate_key(&self) -> Result<bool>;
}
```

Key behaviors:
- Polling loop: on `generate_image`, spawn a tokio task that polls `/status` every 2 seconds until COMPLETED or FAILED. Update the DB and emit a Tauri event (`job-updated`) so the frontend can reactively update.
- Base64 image decoding: when job completes, decode the output image(s), save to disk, store path in DB.
- Error handling: network errors trigger retry with exponential backoff (3 attempts). 429 responses respect Retry-After header.

### Civitai Client (`services/civitai.rs`)

```rust
pub struct CivitaiClient {
    client: reqwest::Client,
    token: Option<String>,
    cache: lru::LruCache<i64, CivitaiModelDetail>,  // recently viewed models
}

impl CivitaiClient {
    /// Search models. GET https://civitai.com/api/v1/models
    pub async fn search_models(&self, query: &str, filters: ModelFilters) -> Result<PaginatedModels>;

    /// Get model details. GET https://civitai.com/api/v1/models/{id}
    pub async fn get_model(&self, model_id: i64) -> Result<CivitaiModelDetail>;

    /// Get model versions. GET https://civitai.com/api/v1/model-versions/{id}
    pub async fn get_model_versions(&self, model_id: i64) -> Result<Vec<CivitaiModelVersion>>;
}
```

Key behaviors:
- Token is optional. Public endpoints work without it.
- LRU cache (capacity 20) for recently viewed models to avoid re-fetching.
- Rate limit handling: on 429, read Retry-After header and surface a countdown to the frontend.
- Response caching: search results cached for 5 minutes (in-memory).

### Image Storage (`services/storage.rs`)

```rust
pub struct ImageStorage {
    base_path: PathBuf,  // configurable in settings
}

impl ImageStorage {
    /// Save a base64-encoded image to disk.
    /// File naming: {timestamp}_{seed}_{short_id}.png
    pub async fn save_image(&self, data: &str, metadata: &ImageMetadata) -> Result<PathBuf>;

    /// Delete an image file from disk.
    pub async fn delete_image(&self, path: &Path) -> Result<()>;

    /// Export multiple images as a zip.
    pub async fn export_zip(&self, images: &[PathBuf], manifest: &str, dest: &Path) -> Result<()>;
}
```

## Frontend Design

### SvelteKit + Svelte 5 (Runes)

The frontend uses Svelte 5 runes mode (`$state`, `$derived`, `$effect`) consistent with modern Svelte patterns.

### Layout

```
┌──────────┬───────────────────────────────────┐
│ Sidebar  │            Content                 │
│          │                                    │
│ 🖼️ Gen   │   [Generation Panel]              │
│ 📜 Hist  │   Prompt textarea                 │
│ 📋 Templ │   Advanced settings (collapsible)  │
│ 🖼️ Gall  │   Generate button                 │
│ 🔍 Civi  │   Results area                    │
│ ⚙️ Sett  │                                   │
│ 💰 Cost  │                                   │
│          │                                   │
│ ──────── │                                   │
│ Status   │                                   │
│ bar      │                                   │
└──────────┴───────────────────────────────────┘
```

### Tauri IPC Layer (`src/lib/api/`)

Thin wrapper functions around `@tauri-apps/api/core`'s `invoke()`:

```typescript
// src/lib/api/generation.ts
import { invoke } from '@tauri-apps/api/core';
import type { GenerationParams, GenerationJob, JobStatus } from '$lib/types';

export async function generateImage(endpointId: string, params: GenerationParams): Promise<GenerationJob> {
    return invoke<GenerationJob>('generate_image', { endpointId, params });
}

export async function getJobStatus(endpointId: string, jobId: string): Promise<JobStatus> {
    return invoke<JobStatus>('get_job_status', { endpointId, jobId });
}
```

### Tauri Events for Real-Time Updates

The Rust backend emits events via `app.emit("job-updated", payload)` when job status changes. The frontend listens:

```typescript
// In GenerationPanel.svelte
import { listen } from '@tauri-apps/api/event';

$effect(() => {
    const unlisten = listen<JobStatusUpdate>('job-updated', (event) => {
        // Update local state reactively
    });
    return () => { unlisten.then(fn => fn()); };
});
```

### Styling

Use Tailwind CSS v4 (ships with Vite plugin, no config needed in modern setup) for utility classes. Custom design tokens via CSS custom properties for theming (light/dark mode).

## Implementation Sequence

The work is organized into phases. Each phase builds on the previous one and produces a working (if incomplete) app.

### Phase 1: Project Scaffolding
- Initialize Tauri v2 project with SvelteKit template
- Set up SQLite with sqlx, run initial migration
- Create the layout shell (sidebar + content area)
- Implement Settings panel with RunPod API key storage and connection test
- Wire up basic Tauri IPC plumbing

### Phase 2: Core Generation
- Implement RunPod client in Rust
- Build the GenerationPanel UI (prompt, advanced settings, generate button)
- Implement job submission, status polling, and result display
- Save completed generations to SQLite
- Implement ComfyUI workflow injection logic

### Phase 3: History & Templates
- Build HistoryPanel with search, filters, pagination
- Build TemplatesPanel with CRUD operations
- Implement "Use Parameters" and "Load Template" flows
- Wire template dropdown in GenerationPanel

### Phase 4: Civitai Integration
- Implement Civitai client in Rust
- Build CivitaiPanel with search, filters, model detail view
- Implement favorites system
- Add "Copy Info" and download URL copy functionality

### Phase 5: Gallery & Polish
- Build GalleryPanel with masonry grid and lightbox
- Implement keyboard navigation and image actions
- Add Export functionality (JSON, CSV, zip)
- Build CostDashboard with basic charts

### Phase 6: Error Handling & Edge Cases
- Comprehensive error toasts and retry flows
- Offline/error state handling
- Storage management (clear old images)
- Budget alerts

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| RunPod API changes or deprecates v2 endpoints | Pin to specific API version. Wrap all API calls in a service layer so only one file changes. |
| ComfyUI workflow JSON varies by model/endpoint | Template the workflow per endpoint. Store workflow JSON in endpoint config. Validate workflow structure before submission. |
| Large image files filling disk | Configurable storage limit. Background cleanup of old images. Cost dashboard shows storage usage. |
| Civitai rate limiting | Cache search results (5 min TTL). Cache recently viewed models (LRU 20). Respect 429 Retry-After. |
| SQLite concurrent access from Tauri commands | sqlx with SQLite handles this via WAL mode. Enable WAL in connection setup. |
| Tauri IPC latency for status polling | Poll from Rust side (tokio task), emit events to frontend. Frontend never polls directly. |
