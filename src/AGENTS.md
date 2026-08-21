# AGENTS - Rules to Follow

1. You can only use SASS single-tab indented styling, not SCSS not CSS. No curly braces no semicolons
2. No inline-styling with `style=""` method allowed.
3. No styling in .svelte pages and components with `<style>` tags allowed.
4. You CANNOT create new classes without explicit user approval.
5. Any classes you absolutely must create, after user approval, must be created in `_custom_.sass` in [styles folder](src/lib/styles).
6. See section `## YAML Frontmatter`
7. GEMINI - save your `walkthrough` documents in `docs`, name them according to actual subject of walkthrough.
8. If a new doc is created, add it to the registry of docs at [index.md](docs/index.md).

## YAML Frontmatter

Markdown documents created and placed inside `docs` folder or inside `src` folder must contain minimum YAML frontmatter. File names must be in lower case kebab-case - `kebab-case.md` as example.

```YAML
---
title:
description:
tags:
  - ...tag1
  - ...tag2
  - ...
---
```

> Exception is index.md files, which do not need tags.

## Construction Architecture

When building new features and pages, always minimize the number of new components you create. If the task can be done on the `+page.svelte` itself, using complementary `+layout.svelte`, `+page.ts`, `+page.server.ts` files then do so.
Move functions and scripts as much as possible to lib, into `src/lib/data` or `src/lib/utils` kind of folders, and import from there into the pages and components.

> Markups on the pages and components, scripts and functions in shared logic in lib, styling in `lib/styles`.