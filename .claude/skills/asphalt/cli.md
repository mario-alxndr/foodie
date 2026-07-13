# Asphalt CLI Reference

Complete documentation for the `asphalt` standalone CLI. Use this when you
do not have an MCP client available, when running in CI, or when you need
machine-readable output you can `JSON.parse`.

The CLI exposes the **same component documentation** as the MCP server,
plus install/init helpers for skills, agents, and slash commands.

> Prefer the MCP tools when an MCP client is connected (Claude Desktop,
> Cursor, VSCode, OpenCode). Use the CLI when scripting or running
> headless. See [mcp.md](./mcp.md) for the MCP equivalent.

## Invocation

```bash
# One-off (no install)
npx -y @asphalt-react/cli@latest <command> [options]

# Or via the short binary if installed
asphalt <command> [options]
```

## Modes

The CLI runs in one of two modes; the right one is auto-detected.

| Mode              | When                                                               |
| ----------------- | ------------------------------------------------------------------ |
| Interactive       | Both stdin and stdout are TTYs and no override flag/env is present |
| Non-interactive   | stdin or stdout is not a TTY, `--no-interactive`/`--yes`/`-y`/`--json` is set, or `CI=true`/`ASPHALT_NON_INTERACTIVE=1` is in the environment |

Non-interactive mode **never prompts**. Missing required flags become hard
errors with a structured `MISSING_REQUIRED_FLAG` envelope and exit code 1.

## Global Flags

These flags work on every command and are stripped from argv before
subcommands see them.

| Flag                                       | Purpose                                                                 |
| ------------------------------------------ | ----------------------------------------------------------------------- |
| `--json`                                   | Emit machine-readable JSON envelope. Implies `--no-interactive`.        |
| `--no-interactive`, `--non-interactive`    | Disable all prompts. Missing required flags ⇒ hard error.               |
| `--yes`, `-y`                              | Alias for `--no-interactive`.                                           |
| `--interactive`                            | Force interactive mode unless `--json` is also set.                     |
| `--quiet`, `-q`                            | Suppress informational messages (success blurbs).                       |
| `--help`, `-h`                             | Show help (per-command and per-action).                                 |
| `--version`, `-v`                          | Show CLI version.                                                       |

### Environment overrides

| Variable                   | Effect                                                |
| -------------------------- | ----------------------------------------------------- |
| `ASPHALT_NON_INTERACTIVE`  | When set to `1`/`true`/`yes`, forces non-interactive. |
| `CI`                       | When set to `1`/`true`/`yes`, forces non-interactive. |
| `ASPHALT_VERSION`          | Override component CDN version (default: `latest`).   |

## JSON Envelope

Every JSON response (success or failure) follows this shape:

```json
{
  "ok": true,
  "command": "docs",
  "action": "search-components",
  "data": {
    "query": "button",
    "limit": 3,
    "total": 3,
    "results": [ /* ... */ ]
  }
}
```

```json
{
  "ok": false,
  "command": "docs",
  "action": "get-component-docs",
  "error": {
    "code": "MISSING_REQUIRED_FLAG",
    "message": "Missing required flag: --component",
    "details": {
      "missing": ["--component"],
      "hint": "Example: --component button"
    }
  }
}
```

### Error codes

| Code                       | Meaning                                                              |
| -------------------------- | -------------------------------------------------------------------- |
| `MISSING_REQUIRED_FLAG`    | A required flag was not supplied in non-interactive mode.            |
| `MISSING_ACTION`           | A subcommand was invoked without its required action.                |
| `UNKNOWN_ACTION`           | The action name is not recognized.                                   |
| `UNKNOWN_COMMAND`          | The top-level command is not recognized.                             |
| `UNKNOWN_SUBCOMMAND`       | The subcommand under a known command is not recognized.              |
| `UNKNOWN_FLAG`             | A flag was passed that no command recognizes.                        |
| `INVALID_ARGUMENTS`        | One or more arguments failed parser validation.                      |
| `INVALID_PLATFORM`         | A `--platform` value is not in `{github, opencode, claude, cursor}`. |
| `INVALID_CLIENT`           | A `--client` value is not in `{claude, vscode, cursor, opencode}`.   |
| `VALIDATION_ERROR`         | A Zod schema rejected a value (e.g. component name too long).        |
| `TEMPLATE_NOT_FOUND`       | A `--skill`/`--agent`/`--command` name does not exist in templates.  |
| `NO_TEMPLATES_FOUND`       | The corresponding `templates/` directory is empty.                   |
| `CONFIG_WRITE_FAILED`      | `mcp init` could not write to the target config file.                |
| `PARTIAL_FAILURE`          | Multi-platform install: at least one platform failed.                |
| `RUNTIME_ERROR`            | A generic runtime error (network, file system, etc.).                |
| `FATAL_ERROR`              | An unhandled error reached the process top level.                    |

---

## Command Tree

```
asphalt
├── mcp                    Start MCP server (stdio)
│   └── init [--client]    Configure MCP client config
├── docs                   Component documentation (6 actions)
│   ├── list-components
│   ├── search-components
│   ├── get-component-docs
│   ├── get-component-props
│   ├── get-component-examples
│   └── get-component-subcomponents
├── skill init             Install skill templates
├── agent init             Install agent templates
└── command init           Install slash command templates
```

---

## docs — Component Documentation

The `docs` command provides the same data as the MCP tools.

| Action                          | Required Flag                       | Optional Flags                                  |
| ------------------------------- | ----------------------------------- | ----------------------------------------------- |
| `list-components`               | —                                   | `--category`, `--raw`, `--json`                 |
| `search-components`             | `--query <text>`                    | `--limit <1-50>`, `--raw`, `--json`             |
| `get-component-docs`            | `--component <name>`                | `--raw`, `--json`                               |
| `get-component-props`           | `--component <name>`                | `--sub-component <name>`, `--all`, `--raw`, `--json` |
| `get-component-examples`        | `--component <name>`                | `--raw`, `--json`                               |
| `get-component-subcomponents`   | `--component <name>`                | `--raw`, `--json`                               |

> All flags also accept the `--key=value` form, e.g. `--component=button`.

### docs list-components

List all components, optionally filtered by category.

```bash
asphalt docs list-components --json
asphalt docs list-components --category ui --json
asphalt docs list-components --category form
```

| Parameter    | Required | Description                                                            |
| ------------ | -------- | ---------------------------------------------------------------------- |
| `--category` | No       | One of `ui`, `form`, `layout`, `data`, `charts`, `utilities`, `all`.   |

JSON `data` shape:

```json
{
  "category": "ui",
  "total": 12,
  "components": [
    {
      "name": "button",
      "package": "@asphalt-react/button",
      "category": "ui",
      "description": "Buttons provide a way to trigger an action",
      "keywords": ["button", "action", "click", "submit", "cta"]
    }
  ]
}
```

### docs search-components

Search components by keywords. Returns relevance-scored results.

```bash
asphalt docs search-components --query "input" --json
asphalt docs search-components --query "navigation" --limit 5 --json
```

| Parameter  | Required | Description                                |
| ---------- | -------- | ------------------------------------------ |
| `--query`  | Yes      | Search query (min 2 chars, max 200 chars). |
| `--limit`  | No       | Max results (1–50, default 10).            |

JSON `data` shape:

```json
{
  "query": "button",
  "limit": 3,
  "total": 3,
  "results": [
    {
      "name": "button",
      "package": "@asphalt-react/button",
      "category": "ui",
      "description": "Buttons provide a way to trigger an action",
      "keywords": ["button", "action", "click", "submit", "cta"],
      "score": 170,
      "matchedOn": ["name (exact)", "name", "description", "keywords"]
    }
  ]
}
```

### docs get-component-docs

Fetch the full README for a component (from the unpkg CDN).

```bash
asphalt docs get-component-docs --component button --json
asphalt docs get-component-docs --component modal
```

| Parameter     | Required | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| `--component` | Yes      | Component name. See `docs list-components` for valid values. |

JSON `data` shape:

```json
{
  "component": "button",
  "markdown": "# Button\n\n..."
}
```

### docs get-component-props

Extract the props table from a component README. For components with
sub-components (e.g. `typography`), `--sub-component` selects one;
`--all` returns every props block.

In **non-interactive mode**, components with sub-components default to
`--all` so no data is silently lost.

```bash
asphalt docs get-component-props --component button --json
asphalt docs get-component-props --component typography --json                       # auto --all
asphalt docs get-component-props --component typography --sub-component Heading --json
asphalt docs get-component-props --component typography --all --json
```

| Parameter         | Required | Description                                                     |
| ----------------- | -------- | --------------------------------------------------------------- |
| `--component`     | Yes      | Component name.                                                 |
| `--sub-component` | No       | Specific sub-component (e.g. `Heading` for `typography`).       |
| `--all`           | No       | Return main + every sub-component's props.                      |

JSON `data` shape varies by mode:

```json
// Single component, no sub-components
{ "component": "button", "props": "..." }

// --sub-component selected
{ "component": "typography", "subComponent": "Heading", "props": "..." }

// --all (or non-interactive default for multi-sub components)
{
  "component": "typography",
  "subComponents": ["Heading", "Display", "Code", "Text"],
  "propsByComponent": {
    "main": "...",
    "Heading": "...",
    "Display": "...",
    "Code": "...",
    "Text": "..."
  }
}
```

### docs get-component-examples

Extract `jsx`/`tsx` code blocks from a component README.

```bash
asphalt docs get-component-examples --component modal --json
```

| Parameter     | Required | Description     |
| ------------- | -------- | --------------- |
| `--component` | Yes      | Component name. |

JSON `data` shape:

```json
{
  "component": "modal",
  "examples": "```jsx\nimport { Modal } from '@asphalt-react/modal'\n...\n```\n\n---\n\n```jsx\n...\n```"
}
```

### docs get-component-subcomponents

List sub-components for a component (empty if none).

```bash
asphalt docs get-component-subcomponents --component typography --json
```

| Parameter     | Required | Description     |
| ------------- | -------- | --------------- |
| `--component` | Yes      | Component name. |

JSON `data` shape:

```json
{
  "component": "typography",
  "subComponents": ["Heading", "Display", "Code", "Text"],
  "total": 4
}
```

---

## mcp init — Configure MCP Client

Write the Asphalt MCP server config into the appropriate file for the
selected client.

```bash
asphalt mcp init --client cursor --json
asphalt mcp init --client claude
asphalt mcp init --client vscode
asphalt mcp init --client opencode
```

| Parameter   | Required | Description                                       |
| ----------- | -------- | ------------------------------------------------- |
| `--client`  | Yes      | One of `claude`, `vscode`, `cursor`, `opencode`.  |

JSON `data` shape:

```json
{
  "client": "cursor",
  "configPath": "/Users/.../Library/Application Support/Cursor/claude_desktop_config.json",
  "availableTools": [
    "list_components",
    "get_component_docs",
    "search_components",
    "get_component_props",
    "get_component_examples",
    "get_component_subcomponents"
  ]
}
```

---

## skill init — Install Skill Templates

Install one or more skill templates into a target platform's skill
directory (`.agents/skills/`, `.claude/skills/`, or `.cursor/skills/`).

```bash
# Install one skill
asphalt skill init --platform cursor --skill asphalt --json

# Install all available skills
asphalt skill init --platform github --skill all --json

# Install to multiple platforms at once
asphalt skill init --platform github --platform cursor --skill all --json

# Force overwrite existing files
asphalt skill init --platform claude --skill asphalt --force --json
```

| Parameter    | Required | Description                                                                  |
| ------------ | -------- | ---------------------------------------------------------------------------- |
| `--platform` | Yes      | One of `github`, `opencode`, `claude`, `cursor`. Repeat for multiple.        |
| `--skill`    | No       | Template name to install. Repeat for multiple. Use `all` for everything. In non-interactive mode, omitting this installs everything. |
| `--force`    | No       | Overwrite existing files.                                                    |

JSON `data` shape:

```json
{
  "version": "1.1.0",
  "selectedSkills": ["asphalt"],
  "results": [
    {
      "platform": "cursor",
      "ok": true,
      "installed": [
        {
          "skill": "asphalt",
          "files": [".cursor/skills/asphalt/SKILL.md", ".cursor/skills/asphalt/cli.md", "..."]
        }
      ]
    }
  ]
}
```

If one platform succeeds and another fails, the envelope is
`{ok: false, error: {code: "PARTIAL_FAILURE", details: {results: [...]}}}`
with per-platform `ok`/`error` so you can tell exactly what happened.

---

## agent init — Install Agent Templates

Same shape as `skill init`, but reads `templates/agents/` and writes to
`.{platform}/agents/`.

```bash
asphalt agent init --platform github --agent all --json
asphalt agent init --platform opencode --agent my-agent --force --json
```

| Parameter    | Required | Description                                                                  |
| ------------ | -------- | ---------------------------------------------------------------------------- |
| `--platform` | Yes      | One of `github`, `opencode`, `claude`. Repeat for multiple.                  |
| `--agent`    | No       | Template name. Repeat for multiple. `all` selects everything.                |
| `--force`    | No       | Overwrite existing files.                                                    |

---

## command init — Install Slash Command Templates

Same shape, but reads `templates/slash-commands/` and writes to
`.{platform}/commands/`.

```bash
asphalt command init --platform github --command all --json
asphalt command init --platform opencode --command my-command --force --json
```

| Parameter    | Required | Description                                                                  |
| ------------ | -------- | ---------------------------------------------------------------------------- |
| `--platform` | Yes      | One of `github`, `opencode`, `claude`. Repeat for multiple.                  |
| `--command`  | No       | Template name. Repeat for multiple. `all` selects everything.                |
| `--force`    | No       | Overwrite existing files.                                                    |

---

## Skill Workflow with the CLI

When implementing components without MCP tools available, fetch docs like
this (LLM-friendly, all output is parseable JSON):

```bash
# 1. Find candidates
asphalt docs search-components --query "tabbed navigation" --limit 5 --json

# 2. Fetch the full README for the chosen component
asphalt docs get-component-docs --component tab --json

# 3. Get its props (auto-includes sub-components when present)
asphalt docs get-component-props --component tab --json

# 4. Get usage examples
asphalt docs get-component-examples --component tab --json

# 5. Verify sub-components if you're unsure
asphalt docs get-component-subcomponents --component typography --json
```

Each invocation is independent and idempotent. Cache responses locally if
you're making many calls in a single agent turn.

---

## Tips for Agents and Scripts

- **Always pass `--json`** when consuming output programmatically. The
  human-mode markdown rendering is for terminals only.
- **Always check `ok`** in the envelope before reading `data`.
- **Treat exit codes as authoritative**: 0 = success, 1 = failure (the
  envelope's `error.code` tells you why).
- **Use `--key=value` form** when shelling out from another process —
  it's harder to misquote than `--key value`.
- **Set `ASPHALT_NON_INTERACTIVE=1`** at the top of a script to make every
  invocation in that script deterministic, even without `--json`.
- **Pin via `ASPHALT_VERSION`** if you need to fetch docs for a specific
  Asphalt component release rather than the floating `latest`.
