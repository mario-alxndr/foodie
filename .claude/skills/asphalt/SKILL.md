---
name: asphalt
description: Build production-ready TypeScript React UIs using the Asphalt Design System exclusively. Use only for Asphalt-specific UI work: translating designs into Asphalt components, implementing UI in Asphalt/Gojek codebases, or refactoring existing UI to use `@asphalt-react/*` primitives. Do not apply this skill to non-UI tasks. The skill enforces semantic Asphalt props, blocks `className`/`style` on Asphalt components, routes brand changes through `ThemeProvider`, and fetches authoritative component docs via the Asphalt MCP server or CLI.
metadata:
  - version: 1.2.1
  - author: Asphalt Team
  - components: 38 packages + 2 iconpacks
---

# Asphalt UI Builder

The Asphalt Design System ships **38 React component packages** plus
`@asphalt-react/iconpack` (417 icons), `@asphalt-react/iconpack-aloha` (420 icons), and`@asphalt-react/theme-provider`.
Every UI piece you need is already there — your job is to wire the right
components together with their **semantic props**, not to reinvent them
with HTML + CSS.

## Operating Principles

1. **Asphalt-first.** If a design element maps to an Asphalt component,
   use that component. No `<button>`, `<input>`, `<select>`, `<h1>`–`<h6>`,
   `<p>`, `<table>`, no Ant Design, Material UI, Chakra, Radix, shadcn, or hand-rolled
   div-button hybrids.
2. **Verify before you write.** Always fetch the live README/props for any
   component you touch via the MCP tool or the `asphalt` CLI (see
   Fetching Docs). Component APIs are versioned and
   change; don't rely on memory.
3. **Semantic props on Asphalt, Tailwind on native wrappers.** Asphalt
   components accept boolean variant/intent props (`primary`, `danger`,
   `success`, `bold`, `stretch`, …). Native `<div>`/`<span>` wrappers may
   use Tailwind. **Never** drop `className` or `style` onto an
   `@asphalt-react/*` element — re-theme via `ThemeProvider` instead.
4. **Theme via ThemeProvider, not overrides.** Brand colors, dark mode, custom
   radii — everything goes through CSS custom properties on
   `<ThemeProvider theme={...}>`. See [theming.md](./references/theming.md).
5. **No silent substitutions.** If something genuinely has no Asphalt
   equivalent (very rare), stop and ask the user before reaching for a
   third party. Never substitute without approval. If the requested design
   is unsupported, explain the gap explicitly and propose Asphalt-first
   alternatives.

## Standard Workflow

| Step | Action                                                | Tool                                                                                            |
| ---- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 1    | Inventory every UI element in the design              | (mental — sketch the tree)                                                                      |
| 2    | Map each UI need to a component, then find its import | [DECISION_TREE.md](./references/DECISION_TREE.md) → [COMPONENTS.md](./references/COMPONENTS.md) |
| 3    | Fetch the component's docs + props + examples         | `asphalt:get_component_docs` / `asphalt docs get-component-docs --component <name>`             |
| 4    | If subcomponents exist, list them                     | `asphalt:get_component_subcomponents` / `--component <name>`                                    |
| 5    | Implement in `.tsx` using only semantic Asphalt props | (write code)                                                                                    |
| 6    | Re-read the Checklist section before declaring done   | (manual)                                                                                        |

## Component Reference

This skill does **not** inline the full component catalog — it lives in two
focused references. Pick by what you already know, then confirm props against
live docs (see Fetching Docs):

| Your situation                                                  | Use                                               | Example                                        |
| --------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------- |
| You know the **UI need** or need to decide on a component       | [DECISION_TREE.md](./references/DECISION_TREE.md) | "a filterable dropdown" → `Dropdown typeahead` |
| You know the **component**, need its package / exports / import | [COMPONENTS.md](./references/COMPONENTS.md)       | "what does `card` export?" → `Card`, `Tile`    |
| You need the **exact props** for the installed version          | MCP / CLI (`get_component_props`)                 | always verify before writing                   |

Typical order: **DECISION_TREE** (pick) → **COMPONENTS** (import) → live docs (props).

The Layout and Page rules below are the single exception kept inline — they
apply to **every** Asphalt screen.

## Figma Design Workflow

If the user provides a Figma URL or node, asks to implement a layout from a
design, or if `get_design_context` output needs to be translated into JSX —
**immediately read and apply the `asphalt-layout` skill** before writing any
`<Layout>`, `<Page>`, or `<Layout.Slot>` JSX.

Do not translate Figma Auto Layout properties or frame structures to
`@asphalt-react/layout` props without completing the `asphalt-layout` skill
workflow first.

## Layout & Structure (always applies)

### Layout (`@asphalt-react/layout`)

Every route **must** map its top-level regions to `Page.*` before placing any
`Layout` or content.

| When you need…                 | Use                                                           |
| ------------------------------ | ------------------------------------------------------------- |
| Top-level page skeleton        | `<Page>` + `<Page.Header\|Aside\|Main\|Footer>` (`asideEnd`)  |
| Page-level grid/flex with gaps | `<Layout>` + `<Layout.Slot>` (`gap="s\|m\|l"`, `template`, …) |
| Group buttons / tags / avatars | `<Layout gap="s">…</Layout>` (or `<Layout vertical gap="s">`) |
| Equal-fraction columns         | `<Layout fill s={1} m={2} l={4}>`                             |
| Named-area grid                | `<Layout template={...}><Layout.Slot area="..." />`           |
| Space between items            | `<Layout spread>` / fill children: `<Layout fill>`            |

| UI region                         | Page section to use |
| --------------------------------- | ------------------- |
| App bar / nav bar / top header    | `Page.Header`       |
| Sticky bottom bar / CTA / tab bar | `Page.Footer`       |
| Primary scrollable content        | `Page.Main`         |
| Secondary panel / filter drawer   | `Page.Aside`        |

Defaults: `Layout` is **horizontal, `gap="m"`**. There is no separate
`Grid` component. Do not wrap a `Page` in a `div`.

> **⚠️ `@asphalt-react/stack` is deprecated. Do not import or use
> `Stack`. Use `Layout` for every horizontal/vertical grouping**, with
> this mapping:
>
> | Old (`Stack`)                  | New (`Layout`)              |
> | ------------------------------ | --------------------------- |
> | `<Stack>` (default)            | `<Layout gap="s">`          |
> | `<Stack vertical>`             | `<Layout vertical gap="s">` |
> | `<Stack spacing="extraTight">` | `<Layout gap="s">`          |
> | `<Stack spacing="tight">`      | `<Layout gap="s">`          |
> | `<Stack spacing="loose">`      | `<Layout gap="m">`          |
> | `<Stack spacing="extraLoose">` | `<Layout gap="l">`          |
> | `<Stack distribution="even">`  | `<Layout spread>`           |
> | `<Stack distribution="fill">`  | `<Layout fill>`             |
> | `<Stack placement="…">`        | `<Layout placement="…">`    |
>
> If MCP/CLI search surfaces the `stack` component, ignore the result
> and pick `Layout`.

### `<Layout>` is the only spacing primitive

Use `<Layout>` for **all** spacing, alignment, and grouping inside page
regions. Never introduce a `<div>` just to add gap, padding, or directional
flow between components.

| Need                              | Use                                               |
| --------------------------------- | ------------------------------------------------- | --- | ---- |
| Stack items vertically with gap   | `<Layout vertical gap="s                          | m   | l">` |
| Place items side by side          | `<Layout gap="s                                   | m   | l">` |
| Spread two items to opposite ends | `<Layout spread align="center">`                  |
| Center a single item              | `<Layout placement="center">`                     |
| Equal-width grid columns          | `<Layout fill s={N} m={N} l={N}>`                 |
| Named grid areas                  | `<Layout template={...}><Layout.Slot area="...">` |

```tsx
// WRONG — div as a spacer/flex container
<div style={{ display: "flex", gap: "16px" }}>
  <Button>Cancel</Button>
  <Button primary>Save</Button>
</div>

// CORRECT — Layout for every spacing and alignment need
<Layout gap="m">
  <Button>Cancel</Button>
  <Button primary>Save</Button>
</Layout>
```

### Native HTML: last resort only

A plain `<div>`, `<span>`, or `<a>` is only acceptable when:

1. It is the **outermost** max-width constraint wrapper (single per page), or
2. It is a non-interactive visual-only element (e.g. a divider line) with no
   structural purpose.

In those cases, Tailwind is permitted on the native element. In all other
cases, use an Asphalt component.

```tsx
// Acceptable — single outermost constraint wrapper
<Page>
  <Page.Main>
    <div className="w-full max-w-[462px]">
      <Layout vertical gap="m">
        {/* content */}
      </Layout>
    </div>
  </Page.Main>
</Page>
```

## Theming Rule

**Theming detection is MANDATORY and must happen BEFORE writing any component code.**

- **Theming** (`ThemeProvider`, pre-built Lyra/Aloha/Carina/Draco/Lynx/Vela,
  dark mode, nested + responsive themes), follow steps in [theming.md](./references/theming.md)

## Logo Rule

If task involves displaying a logo, follow these guidelines:

By default, the `Logo` component will render the Gojek logo if no product is specified.
If you want to render a different product logo, specify the `product` prop, and then import
the corresponding symbol from `@asphalt-react/logo`, finally add the React symbol component in the `symbol` prop.

```tsx
import { Logo, GoFood } from "@asphalt-react/logo";

<Logo product="GoFood" symbol={<GoFood />} />;
```

## Icon Rule

If the task involves rendering icons, follow the icon rules below:

- **`@asphalt-react/iconpack`** — default icon catalog. Use this unless the icon name indicates otherwise.
- **`@asphalt-react/iconpack-aloha`** — use when the Figma layer name follows the pattern `ic_[icon-name]` (e.g. `ic_arrow_right`). This naming convention signals the Aloha icon set.
- **`Icontuner`** — wrapper component for resizing and recoloring icons. Required when an icon needs a non-default size or intent, or when placing an icon inside `Button`, `NavLink`, `TabItem`, `Textfield`, or `Tag`.
- For the full icon catalog, size tokens, intent values, and accessibility requirements, read [icons.md](./references/icons.md).

> **Looking for a specific component?** This skill no longer inlines the full
> catalog. To find the package, exports, or import line for a component you
> already know, see [COMPONENTS.md](./references/COMPONENTS.md). To choose a
> component from a UI need, see [DECISION_TREE.md](./references/DECISION_TREE.md).
> Always confirm props via MCP/CLI before writing.

## Button Rule

**MANDATORY: Call `get_code_connect_suggestions` on EACH button node individually BEFORE writing its JSX.**

This rule applies to every `Button-*` instance in the design — including buttons inside a full page. One call on the parent frame is not sufficient.

For every button you identify:

1. Note its individual node ID (from `get_design_context` or `data-node-id` attributes)
2. Call `get_code_connect_suggestions` on that specific node ID:

```
figma:get_code_connect_suggestions { fileKey, nodeId: "<individual-button-node-id>" }
```

3. If Figma MCP exists, only write `<Button>` JSX after you have the canonical `componentProperties` for that node.

**If `get_code_connect_suggestions` does not return properties for a button** (e.g. it was not in the parent frame response), you MUST call it again on that button's own node ID before proceeding. Never infer button props from visual appearance alone.

The response contains a `componentProperties` object per instance, e.g.:

```json
{
  "Type": "Secondary",
  "Content": "Icon",
  "State": "Default",
  "Size": "XS",
  "Padding": "Default"
}
```

Map each property to the corresponding `@asphalt-react/button` prop using the
tables below.

## Figma Component Property Mapping

### `Type` → variant prop

| Figma `Type` value | Asphalt `Button` prop |
| ------------------ | --------------------- |
| `Primary`          | *(omit — default)*    |
| `Secondary`        | `secondary`           |
| `Tertiary`         | `tertiary`            |
| `Nude`             | `nude`                |

> `system`, `brand`, and `danger` are *intents*, not types. Read the component
> name (e.g. `Button-System`, `Button-Brand`, `Button-Danger`) for the intent.

### `Size` → `size` prop
| Figma `Size` value | Asphalt `size` prop |
| ------------------ | ------------------- |
| `XS`               | `size="xs"`         |
| `S`                | `size="s"`          |
| `M`                | *(omit — default)*  |
| `L`                | `size="l"`          |

### `Content` → icon/qualifier props
| Figma `Content` value     | Asphalt props                                      |
| ------------------------- | -------------------------------------------------- |
| `Icon`                    | `icon`                                             |
| `Text`                    | *(omit)*                                           |
| `Text + Left Icon`        | `qualifier={<Icon />}`                             |
| `Text + Right Icon`       | `qualifier={<Icon />} qualifierEnd`                |

### `State` → state props
| Figma `State` value | Asphalt props                                                        |
| ------------------- | -------------------------------------------------------------------- |
| `Default`           | *(omit)*                                                             |
| `Disabled`          | `disabled`                                                           |
| `Loading`           | `disabled qualifier={<Spinner />}` (import `Spinner` from `@asphalt-react/loader`) |
| `Hover` / `Focus`   | *(browser-managed — no prop needed)*                                 |

### `Padding` → compact props
| Figma `Padding` value | Asphalt props                                                        |
| ------------------- | -------------------------------------------------------------------- |
| `Default`           | *(omit)*                                                             |
| `Compact`           | `compact={true}`                                                           |

### Example: Button-System / Secondary / Icon / XS

```tsx
import { Button } from "@asphalt-react/button";
import { Cancel } from "@asphalt-react/iconpack-aloha";
<Button secondary system icon size="xs" aria-label="Close" onClick={onClose}>
  <Cancel />
</Button>
```

## Fetching Docs

**MCP (preferred, when an MCP client is connected):**

```
asphalt:list_components              { category?: "ui"|"form"|"layout"|"data"|"charts"|"utilities"|"all" }
asphalt:search_components            { query: string, limit?: number }
asphalt:get_component_docs           { component: string }
asphalt:get_component_props          { component: string, subComponent?: string }
asphalt:get_component_examples       { component: string }
asphalt:get_component_subcomponents  { component: string }
```

Full reference: [mcp.md](./mcp.md).

**CLI (when no MCP client; CI; headless agents):**

```bash
npx -y @asphalt-react/cli@latest docs list-components --json
npx -y @asphalt-react/cli@latest docs search-components --query "input" --limit 5 --json
npx -y @asphalt-react/cli@latest docs get-component-docs --component button --json
npx -y @asphalt-react/cli@latest docs get-component-props --component typography --json   # auto --all for sub-components
npx -y @asphalt-react/cli@latest docs get-component-examples --component modal --json
npx -y @asphalt-react/cli@latest docs get-component-subcomponents --component typography --json
```

Every JSON response has the envelope `{ ok, command, action, data }` or
`{ ok: false, error: { code, message, details } }`. Full reference,
including error codes and `mcp init` / `skill init` / `agent init`:
[cli.md](./cli.md).

## Critical Rules

1. **Never put `className` or `style` on an `@asphalt-react/*` component.**
   Layout, spacing, color, and elevation come from semantic props and theme
   tokens. To recolor → `ThemeProvider`; to space → `gap`/`spacing` props.

   ```tsx
   <Button className="bg-purple-600">Wrong</Button>
   <Layout style={{ gap: 12 }}>Wrong</Layout>
   ```

2. **Tailwind is for native wrappers only** (`<div>`/`<span>`/`<a>`), and even
   then not for layout/spacing between Asphalt components — use `Layout`.

3. **Text always uses Typography** — `Heading` (boolean `h1`–`h6`, no `bold`),
   `Text` (`size`, `bold`), `Display` (hero), `Code` (snippets). Never raw
   `<h1>`–`<h6>`, `<p>`, or `<span>` for copy.

4. **Forms: import each control from its own package** (`Textfield` from
   `@asphalt-react/textfield`, `Dropdown` from `@asphalt-react/selection`, …).

5. **Icons are SVG React components** from `@asphalt-react/iconpack`; resize /
   recolor with `Icontuner`. Icon-only interactive elements need `aria-label`.

   ```tsx
   <Button icon nude aria-label="Delete row">
     <Delete />
   </Button>
   ```

6. **Loading uses `Spinner`/`Loader`**, never a hand-animated icon.
   `<Button primary disabled qualifier={<Spinner />}>Saving…</Button>`

7. Avoid token overrides via `className` on Asphalt components. Use `<ThemeProvider theme={...}>` with an official theme instead.

Component-specific export gotchas (`Tile`, the four `Flag` variants, deprecated
`Stack`, `Breadcrumb` `crumbs`, `Tabs` parts) live in **Common Pitfalls** below.

## Common Pitfalls

| Symptom                                                                                 | Fix                                                                                                                                             |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `<Heading bold>` does nothing                                                           | `Heading` is bold by design. Drop the prop. `bold` only exists on `Text`.                                                                       |
| `<Nav>, <NavLink>, <NavItem>` for Appbar imported from Sidebar, or the other way around | `Nav`, `NavLink`, `NavItem` should be imported from `@asphalt-react/sidebar` or `@asphalt-react/appbar` based on the usage.                     |
| `<Typography.h1>` is undefined                                                          | Use `<Heading h1>` — `h1`–`h6` are boolean props, not sub-components.                                                                           |
| `Stack` autocompleted from `@asphalt-react/stack`                                       | Stack is **deprecated** — replace with `Layout` (see migration table above).                                                                    |
| `<Layout gap="xs">` warning                                                             | Only `s`, `m`, `l`. No `xs`/`xl` on Layout `gap`.                                                                                               |
| `<Tab>` is not exported                                                                 | Use `Tabs` + `TabList` + `TabItem` + `TabPanel` from `@asphalt-react/tab`.                                                                      |
| `<Flag success>` is not exported                                                        | Pick a variant: `InlineFlag`, `FloatingFlag`, `BannerFlag`, or `PageFlag`.                                                                      |
| `<Card.Tile>` is undefined                                                              | `import { Tile } from "@asphalt-react/card"` directly.                                                                                          |
| `<Breadcrumb items={…}>` doesn't render                                                 | Use `crumbs={[<Crumb><CrumbLink /></Crumb>, …]}`.                                                                                               |
| Brand color didn't apply via `className="bg-…"`                                         | Use `<ThemeProvider theme={...}>` with the brand tokens (`--static-surface-brand`, `--interactive-surface-brand-primary-*`, `--content-brand`). |
| Sidebar's `head`/`tail` rendered in the wrong place                                     | Pass them as **props** on `Sidebar`/`Appbar`, not as children.                                                                                  |
| Wrap `Page.Main` inside a `<div>` to add padding / margin                               | `Page.Main` already handles padding and margin internally. Do not wrap in a `div`                                                               |

## Worked Mini-Example

A typical page skeleton showing the rules in practice:

```tsx
import { Page, Layout } from "@asphalt-react/layout";
import { Appbar, Nav, NavItem, NavLink } from "@asphalt-react/appbar";
import {
  Sidebar,
  NavCategory as SidebarNavCategory,
  Nav as SidebarNav,
  NavItem as SidebarNavItem,
  NavLink as SidebarNavLink,
} from "@asphalt-react/sidebar";
import { Logo, Gojek } from "@asphalt-react/logo";
import { Heading, Text } from "@asphalt-react/typography";
import { Card } from "@asphalt-react/card";
import { Button } from "@asphalt-react/button";
import { Add } from "@asphalt-react/iconpack";

export function Dashboard() {
  return (
    <Page>
      <Page.Header>
        <Appbar
          head={
            <Logo>
              <Gojek />
            </Logo>
          }
        >
          <Nav>
            <NavItem>
              <NavLink active asProps={{ href: "/" }}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink asProps={{ href: "/login" }}>Login</NavLink>
            </NavItem>
          </Nav>
        </Appbar>
      </Page.Header>

      <Page.Aside>
        <Sidebar>
          <SidebarNav>
            <SidebarNavItem>
              <SidebarNavLink active asProps={{ href: "/" }}>
                Home
              </SidebarNavLink>
            </SidebarNavItem>
            <SidebarNavItem>
              <SidebarNavLink asProps={{ href: "/orders" }}>
                Orders
              </SidebarNavLink>
            </SidebarNavItem>
          </SidebarNav>
        </Sidebar>
      </Page.Aside>

      <Page.Main>
        <Layout vertical gap="m">
          <Layout spread>
            <Heading h2>Overview</Heading>
            <Button primary qualifier={<Add />}>
              New report
            </Button>
          </Layout>
          <Card>
            <Layout vertical gap="s">
              <Text muted size="s">
                Total Revenue
              </Text>
              <Heading h3>$45,231.89</Heading>
              <Text brand size="s">
                +20.1% from last month
              </Text>
            </Layout>
          </Card>
        </Layout>
      </Page.Main>
      <Page.Footer>
        <Layout spread>
          <Text muted size="s">
            © 2024 Gojek. All rights reserved.
          </Text>
          <Text muted size="s">
            Version 1.0.0
          </Text>
        </Layout>
      </Page.Footer>
    </Page>
  );
}
```

Note: `className` only on the native `<div>` wrapper. Everything else is
semantic Asphalt props. No raw `<h1>`/`<p>`/`<button>` anywhere.

## Checklist

Before declaring a task done:

- [ ] Every interactive UI element maps to an `@asphalt-react/*` component
      (no `<button>`, `<input>`, `<select>`, raw `<table>`, etc.).
- [ ] All text uses `Heading`, `Text`, `Display`, or `Code` — never raw
      `<h1>`–`<h6>`, `<p>`, or `<span>`.
- [ ] `Heading` uses `h1`–`h6` levels; `Text` uses `bold` only where needed.
- [ ] No `className` or `style` on any `@asphalt-react/*` component.
- [ ] Page structure uses `Page` + `Page.Header|Aside|Main|Footer`.
- [ ] `Layout` is used for all grouping — page-level structure **and**
      lists/toolbars/clusters. `@asphalt-react/stack` is not imported
      anywhere.
- [ ] Form controls imported from their dedicated packages (`textfield`,
      `selection`, `checkbox`, `radio`, `toggle-switch`, `slider`,
      `date-picker`, `time-picker`, `file-uploader`).
- [ ] `Tile` (not `Card.Tile`) used for clickable cards; one of
      `InlineFlag`/`FloatingFlag`/`BannerFlag`/`PageFlag` (not bare
      `Flag`) used for alerts.
- [ ] Icons from `@asphalt-react/iconpack`; sized/recolored via
      `Icontuner`; icon-only buttons have `aria-label`.
- [ ] Brand / theme overrides go through `ThemeProvider` + tokens, not
      Tailwind on Asphalt components.
- [ ] Loading state uses `Loader`/`Spinner` (not custom animations).
- [ ] TypeScript types defined for all data shapes; component props
      verified via `get_component_props`.
- [ ] Docs fetched at least once for every component used this turn.

## Reference Map

Pull only the file relevant to the current task — none of the references
is required reading up front.

### Discovery & decisions

| When you need…                                                        | Read                                              |
| --------------------------------------------------------------------- | ------------------------------------------------- |
| To **pick** a component from a UI need ("a dismissible inline error") | [DECISION_TREE.md](./references/DECISION_TREE.md) |
| The **package, exports, or import line** for a component you know     | [COMPONENTS.md](./references/COMPONENTS.md)       |

### Theming, tokens & icons (cross-cutting)

| When you need…                                             | Read                                  |
| ---------------------------------------------------------- | ------------------------------------- |
| Brand colors, dark mode, multi-theme apps, `ThemeProvider` | [theming.md](./references/theming.md) |
| Icon catalog, `Icontuner` sizes & intents, icon a11y       | [icons.md](./references/icons.md)     |

### Layout & structure

| When you need…                                                              | Read                                                          |
| --------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `Page`, `Layout`, grid templates, responsive columns, grouping rows/columns | [page-layouts.md](./references/page-layouts.md)               |
| `Sidebar`, `Appbar`, `Breadcrumb`, `Tabs`, `ContentSwitcher`, `Logo`        | [navigation-patterns.md](./references/navigation-patterns.md) |

### Component patterns

| When you need…                                                                                            | Read                                                          |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `Button` variants/intents, icon/qualifier, states, `ToggleButton`                                         | [button-patterns.md](./references/button-patterns.md)         |
| `Heading`, `Text`, `Display`, `Code` examples                                                             | [typography-examples.md](./references/typography-examples.md) |
| `Textfield` family, `Dropdown`, `Checkbox`, `Radio`, `DatePicker`, `TimePicker`, `Slider`, `FileUploader` | [form-patterns.md](./references/form-patterns.md)             |
| `DataTable`, low-level `Table`, `Accordion`, `Pagination`, `Actionlist`                                   | [data-display.md](./references/data-display.md)               |
| `BarChart`, `LineChart`, `DonutChart` (`data-viz`)                                                        | [charts.md](./references/charts.md)                           |
| `Badge`, `Tag`, `Avatar`, `Card`/`Tile`, `ProgressBar`                                                    | [ui-components.md](./references/ui-components.md)             |
| `Modal`, the four `Flag` variants, `Loader`/`Spinner`, `Popover`, `Tooltip`                               | [feedback-patterns.md](./references/feedback-patterns.md)     |
| `Wizard`, multi-step forms                                                                                | [wizard-steps.md](./references/wizard-steps.md)               |

### Tool references

| When you need…                                  | Read               |
| ----------------------------------------------- | ------------------ |
| MCP tool signatures, return values, error shape | [mcp.md](./mcp.md) |
| CLI commands, JSON envelopes, exit codes        | [cli.md](./cli.md) |
