# Product Spec — PixelForge

A personal desktop application for generating images via RunPod serverless endpoints, with prompt history, reusable templates, Civitai model discovery, and full generation metadata tracking.

## Feature 1: Image Generation

### Summary

The user submits a text prompt and generation parameters to a RunPod serverless endpoint and receives a generated image. All generation inputs and outputs are persisted automatically.

### Behavior

1. The generation panel presents a form with: positive prompt (textarea, required), negative prompt (textarea, optional), and a collapsible "Advanced Settings" section containing: width (int, default 1024), height (int, default 1024), steps (int, default 20, range 1–150), CFG scale (float, default 7.0, range 1–30), sampler name (dropdown: euler, euler_a, dpmpp_2m, dpmpp_sde, ddim, uni_pc, lcm, flux), scheduler (dropdown: normal, karras, exponential, sgm_uniform, simple, ddim_uniform), seed (int, -1 for random, default -1), batch size (int, default 1, range 1–4), and guidance (float, default 3.5, range 1–20, visible only when sampler is flux).

2. A "Generate" button submits the job. While the job is in flight (IN_QUEUE → IN_PROGRESS), the button changes to a disabled "Generating..." state with a spinner. A progress indicator shows the current status (queued, in progress, completed, failed).

3. When the job completes, the generated image(s) appear in the results area below the form. Each image is displayed as a thumbnail. Clicking a thumbnail opens a full-size viewer with metadata overlay (prompt, settings, seed, generation time, cost estimate).

4. When the job fails, an error message appears with the RunPod error details. The user can retry with the same parameters by clicking "Retry".

5. Generation history is saved automatically on every completed job, including: all input parameters, the full ComfyUI workflow JSON that was submitted, the output image(s) as base64 or saved to disk, the RunPod job ID, delay time (queue wait), execution time, timestamp, and the endpoint used.

6. The user can submit multiple jobs concurrently. Each job appears as an independent entry in the history with its own status.

7. The "Generate" button is disabled if no RunPod endpoint is configured (see Settings). A tooltip explains why.

8. Keyboard shortcut: Ctrl+Enter (or Cmd+Enter on macOS) submits the form. Ctrl+Shift+Enter submits and clears the prompt.

9. The prompt textarea supports multi-line input and auto-resizes to fit content (up to 6 lines, then scrolls).

10. An optional ComfyUI workflow JSON can be uploaded or pasted. When provided, the workflow is used as the base, and the user's form parameters are injected into the appropriate nodes (prompt → CLIPTextEncode, seed/steps/cfg → KSampler, dimensions → EmptyLatentImage). When no custom workflow is provided, a default workflow for the configured endpoint's model is used.

## Feature 2: Prompt History

### Summary

Every generation is recorded in a searchable, filterable history. The user can browse past generations, copy parameters, and re-generate with modified settings.

### Behavior

1. The history panel displays a grid (or list, togglable) of past generations, sorted by timestamp descending (newest first). Each entry shows: the generated image thumbnail, a truncated prompt (first 80 chars), timestamp (relative: "2 min ago", "3 hours ago", "yesterday", "Aug 15"), and a status badge (completed, failed).

2. A search bar at the top filters history by prompt text (case-insensitive substring match). Search is debounced at 300ms.

3. Filter controls allow narrowing by: date range (from/to date pickers), sampler name (multi-select dropdown), endpoint used (multi-select dropdown), and status (completed/failed/all).

4. Clicking a history entry opens a detail view showing: the full-size image, all generation parameters in a structured table, the complete prompt text (copyable), the negative prompt, the RunPod job ID (copyable), generation time, queue wait time, and estimated cost.

5. From the detail view, the user can: "Use These Parameters" (loads all settings back into the generation form), "Copy Prompt" (copies just the positive prompt to clipboard), "Copy All Settings" (copies a formatted block with all parameters), "Delete" (removes from history after confirmation dialog), and "Regenerate" (submits a new job with identical parameters).

6. History supports pagination: 50 entries per page. "Load More" button at the bottom, or infinite scroll.

7. History entries persist across app restarts (stored in SQLite).

8. The history panel shows a running total at the top: total generations count, total estimated cost, and average generation time.

9. Bulk selection is supported: the user can multi-select entries (checkbox) and delete them in batch, or export them (see Export feature).

10. Empty state: when no history exists, a centered message says "No generations yet. Create your first image above." with a subtle arrow pointing to the generation panel.

## Feature 3: Templates

### Summary

The user can save named combinations of generation parameters as templates, and quickly load them before generating. Templates capture the full set of generation settings plus an optional ComfyUI workflow.

### Behavior

1. A "Save as Template" button in the generation panel opens a dialog asking for: template name (required, max 50 chars), description (optional, max 200 chars), and a tag (optional, for grouping — e.g., "portraits", "landscapes", "flux").

2. Saving a template captures: all generation parameters (prompt is NOT included — templates capture settings, not prompts), the ComfyUI workflow JSON (if custom), and the sampler/scheduler combination.

3. The templates panel displays saved templates as cards, each showing: name, description (truncated), tag badge, parameter summary (sampler, steps, CFG, resolution), and a "Load" button.

4. Clicking "Load" populates the generation form with the template's parameters. The prompt fields are left unchanged — the user provides a fresh prompt each time.

5. Templates are searchable by name and tag. A tag filter sidebar groups templates by tag.

6. Templates support rename, edit description/tags, duplicate, and delete. Delete requires confirmation.

7. Templates persist across app restarts (stored in SQLite).

8. The generation form shows a "Template" dropdown at the top, allowing quick template selection without opening the templates panel. Selecting a template loads its parameters. A "None" option resets to defaults.

9. Built-in default templates ship with the app: "SDXL Default" (1024×1024, 20 steps, CFG 7, euler), "Flux Default" (1024×1024, 20 steps, CFG 1, euler, flux guidance 3.5), "High Quality" (1024×1024, 50 steps, CFG 7, dpmpp_2m, karras). These cannot be deleted but can be modified.

## Feature 4: Civitai Integration

### Summary

The user can browse, search, and view models and LoRAs from Civitai within the app, using their Civitai API token. Model metadata (name, type, trigger words, base model, download URL) is accessible to inform generation settings.

### Behavior

1. The Civitai panel has a search bar and filter controls: model type (Checkpoint, LoRA, TextualInversion, Controlnet, Poses), base model (SD 1.5, SDXL, SD 3, Flux, Pony), sort by (Most Downloaded, Most Newest, Highest Rated), and NSFW filter (toggle, off by default).

2. Search results display as a scrollable grid of model cards. Each card shows: model name, type badge, base model badge, thumbnail image (first image from the model gallery), download count, rating (star display), and creator name.

3. Clicking a model card opens a detail view showing: full description (rendered markdown), all available versions with file sizes, trigger words (if any), sample images gallery (scrollable), tags, and a "Copy Info" button that copies a formatted block with model name, version, trigger words, base model, and recommended settings (if available from Civitai metadata).

4. A "Download LoRA" button triggers a download of the selected model version file. The download destination is configurable in Settings (default: the RunPod network volume path or a local folder). For RunPod-hosted models, the download URL can be copied for use in ComfyUI node configuration.

5. The Civitai panel is accessible from a sidebar tab. It operates independently of the generation panel — the user can browse models while a generation is in progress.

6. If no Civitai token is configured, the panel shows a prompt to enter one in Settings. Public endpoints (model listing, search) work without a token but may have rate limits. Authenticated endpoints (user-specific data) require the token.

7. Recently viewed models are cached locally (last 20) for quick access without re-fetching.

8. Model search results are paginated (30 per page). "Load More" or infinite scroll loads additional results.

9. A "Favorites" section within the Civitai panel lets the user bookmark models for quick access. Favorites are stored locally.

10. Error states: network errors show a retry button. Rate limit errors (429) show a countdown timer and auto-retry. Auth errors prompt the user to check their token in Settings.

## Feature 5: Image Gallery

### Summary

All generated images are displayed in a gallery view with metadata, supporting browsing, viewing, and export.

### Behavior

1. The gallery view shows all generated images in a masonry or uniform grid layout (togglable). Each image tile shows the image, resolution badge, and generation timestamp.

2. Clicking an image opens a full-screen lightbox with: the image at native resolution (or fit-to-viewport with zoom), left/right arrows or swipe to navigate to adjacent images, metadata panel (toggleable) showing all generation parameters, and action buttons: Download (saves to local disk), Copy Prompt, Use Parameters (loads into generation form), Delete.

3. The gallery supports keyboard navigation: Left/Right arrows navigate between images, Escape closes the lightbox, D deletes the current image (with confirmation).

4. Images can be filtered by: date range, sampler, resolution, and endpoint used.

5. A "Download All" button exports all visible (filtered) images as a zip file with a CSV manifest containing all metadata.

6. Double-clicking an image in the grid opens it in the system's default image viewer (via Tauri shell command).

## Feature 6: Settings

### Summary

The app is configured through a Settings panel covering API credentials, endpoint management, default generation parameters, and UI preferences.

### Behavior

1. The Settings panel is accessible from a gear icon in the header. It is organized into tabs: API & Endpoints, Generation Defaults, Civitai, Storage, and Appearance.

2. **API & Endpoints tab**: Fields for RunPod API key (password field, masked, with a "Test Connection" button that pings the RunPod API and shows success/failure). A list of configured endpoints, each showing: endpoint name (editable), endpoint ID, model type, and a toggle to set as default. "Add Endpoint" button opens a form with: name, endpoint ID, model type dropdown (ComfyUI/SDXL/Flux/etc), and optional ComfyUI workflow JSON. "Remove Endpoint" with confirmation.

3. **Generation Defaults tab**: Default values for width, height, steps, CFG, sampler, scheduler, guidance, negative prompt, batch size. These populate the generation form when no template is selected.

4. **Civitai tab**: Civitai API token field (password, masked, with "Test Connection" button). NSFW content filter toggle. Default model type filter.

5. **Storage tab**: Local image save path (with browse button using native file picker). Option to auto-save images to disk (on/off). Maximum local storage usage with a "Clear Old Images" tool that deletes images older than N days (with confirmation showing count and estimated space).

6. **Appearance tab**: Theme toggle (light/dark/system). Grid density for gallery (compact/comfortable/spacious). Accent color picker.

7. Settings persist across app restarts (stored in SQLite).

8. All API key fields show a visibility toggle (eye icon) to reveal/hide the value.

9. Invalid settings are flagged inline: endpoint ID format validation, API key format validation, positive integer constraints on numeric fields, non-empty required fields.

## Feature 7: Export & Cost Tracking

### Summary

The user can export generation data and track estimated RunPod costs over time.

### Behavior

1. An "Export" option in the header menu allows exporting: all history entries as JSON (with all metadata), all images as a zip with CSV manifest, or a filtered subset based on current history filters.

2. A "Cost Dashboard" view (accessible from the sidebar) shows: total cost over time (line chart, daily aggregation), cost per endpoint, cost per sampler, average cost per generation, and a breakdown table of the 20 most expensive generations.

3. Cost is estimated from execution time × GPU hourly rate (configurable per endpoint in Settings). The estimate is labeled as approximate.

4. The cost dashboard can be filtered by date range and endpoint.

5. A "Budget" setting allows the user to set a monthly cost limit. When the estimated cost exceeds 80% of the limit, a warning appears. When it exceeds 100%, generation is paused and the user must acknowledge before continuing.
