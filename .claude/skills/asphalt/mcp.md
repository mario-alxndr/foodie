# Asphalt MCP Reference

Complete documentation for Asphalt MCP tools used to access Asphalt Design System component documentation.

## MCP Server

The Asphalt MCP server provides tools for accessing component documentation. Configure your MCP client to use:

```json
{
  "mcpServers": {
    "asphalt-react": {
      "command": "npx",
      "args": ["-y", "@asphalt-react/cli@latest", "mcp"]
    }
  }
}
```

## Tools Overview

| Tool | Input | Purpose |
| ---- | ----- | ------- |
| `list_components` | `{ category?: string }` | List all components |
| `search_components` | `{ query: string, limit?: number }` | Search by keywords |
| `get_component_docs` | `{ component: string }` | Full README |
| `get_component_props` | `{ component: string, subComponent?: string }` | Props table |
| `get_component_examples` | `{ component: string }` | Code examples |
| `get_component_subcomponents` | `{ component: string }` | List sub-components |

---

## list_components

List all Asphalt React components, optionally filtered by category.

**Input:**

```json
{ "category": "ui" }
```

**Options:**

| Parameter | Required | Description |
| --------- | -------- | ----------- |
| `category` | No | Filter by category. Values: `ui`, `form`, `layout`, `data`, `charts`, `utilities`, `all` |

**Example:**

```json
{ "category": "ui" }
```

---

## search_components

Search components by keywords with relevance scoring.

**Input:**

```json
{ "query": "button", "limit": 10 }
```

**Options:**

| Parameter | Required | Description |
| --------- | -------- | ----------- |
| `query` | Yes | Search query (min 2 characters) |
| `limit` | No | Max results (1-50, default: 10) |

**Example:**

```json
{ "query": "input", "limit": 5 }
```

---

## get_component_docs

Get full documentation (README) for a specific component.

**Input:**

```json
{ "component": "button" }
```

**Options:**

| Parameter | Required | Description |
| --------- | -------- | ----------- |
| `component` | Yes | Component name (e.g., `button`, `modal`, `textfield`) |

**Example:**

```json
{ "component": "button" }
```

---

## get_component_props

Get the props table for a component. Supports sub-components for components like `Typography`.

**Input:**

```json
{ "component": "typography", "subComponent": "Heading" }
```

**Options:**

| Parameter | Required | Description |
| --------- | -------- | ----------- |
| `component` | Yes | Component name (e.g., `button`, `typography`) |
| `subComponent` | No | Sub-component name (e.g., `Heading` for Typography) |

**Components with sub-components:**

- `typography` — Sub-components: `Heading`, `Text`, `Display`, `Code`

**Example:**

```json
{ "component": "typography", "subComponent": "Heading" }
```

---

## get_component_examples

Get code examples for a specific component.

**Input:**

```json
{ "component": "modal" }
```

**Options:**

| Parameter | Required | Description |
| --------- | -------- | ----------- |
| `component` | Yes | Component name |

**Example:**

```json
{ "component": "modal" }
```

---

## get_component_subcomponents

List all sub-components for a component that has them.

**Input:**

```json
{ "component": "typography" }
```

**Options:**

| Parameter | Required | Description |
| --------- | -------- | ----------- |
| `component` | Yes | Component name |

**Example:**

```json
{ "component": "typography" }
```

---

## Examples in Skill Workflow

When implementing components, fetch docs like this:

```json
// 1. Get component docs
{ "tool": "get_component_docs", "input": { "component": "button" } }

// 2. Get props for specific sub-component
{ "tool": "get_component_props", "input": { "component": "typography", "subComponent": "Heading" } }

// 3. Get code examples
{ "tool": "get_component_examples", "input": { "component": "modal" } }

// 4. List sub-components if needed
{ "tool": "get_component_subcomponents", "input": { "component": "typography" } }

// 5. Search for components
{ "tool": "search_components", "input": { "query": "input", "limit": 5 } }

// 6. List all UI components
{ "tool": "list_components", "input": { "category": "ui" } }
```

---

## Return Values

All tools return markdown-formatted documentation:

- `list_components` — Markdown table of components
- `search_components` — Markdown table with relevance scores
- `get_component_docs` — Full README markdown
- `get_component_props` — Props table in markdown
- `get_component_examples` — Code examples with annotations
- `get_component_subcomponents` — List of sub-components

---

## Error Handling

Errors are returned with `isError: true` and a descriptive message:

```json
{
  "isError": true,
  "content": [{ "type": "text", "text": "Component not found: nonexistent" }]
}
```
