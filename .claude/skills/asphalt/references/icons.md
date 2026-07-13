# Icons

Asphalt ships ~417 ready-to-use SVG icons through
`@asphalt-react/iconpack` and 408 icons in `@asphalt-react/iconpack-aloha`.
Each icon is a tiny React component that
renders a 16×16 SVG with `fill="currentColor"`, so it picks up the
color of its parent (or its `Icontuner`) automatically.

When you need to control the **size** or **intent** of an icon, wrap
it in `Icontuner` from `@asphalt-react/icontuner`.

## Quick start

```tsx
import { Add, Delete, ChevronRight } from "@asphalt-react/iconpack"

<Button icon primary>
  <Add />
</Button>

<Button qualifier={<Delete />} danger>
  Remove
</Button>

<NavItemIcon><ChevronRight /></NavItemIcon>
```

## Where icons fit

| Need                                   | Wrap with                                                              |
| -------------------------------------- | ---------------------------------------------------------------------- |
| Inline with button caption             | `<Button qualifier={<Icon />}>Caption</Button>`                        |
| Icon-only button                       | `<Button icon aria-label="..."><Icon /></Button>`                      |
| Decorative icon next to text           | Plain `<Icon />` — inherits text color                                  |
| Resize / re-color a content icon       | `<Icontuner size="l" success><Icon /></Icontuner>`                     |
| Icon in nav item                       | `<NavItemIcon><Icon /></NavItemIcon>`                                  |
| Icon in tab                            | `<TabItemIcon><Icon /></TabItemIcon>`                                  |
| Icon in Textfield qualifier            | Use the Textfield `qualifierStart`/`qualifierEnd` props                |
| Icon in Tag                            | `<CustomTag>... <TagIcon><Icon /></TagIcon> ...</CustomTag>`           |

## Browsing the catalog

The full list is exported from `packages/iconpack/index.js`. Common
groupings (each is a named export — `import { Name } from '@asphalt-react/iconpack'`):

- **Add / remove / edit:** `Add`, `AddColumnLeft`, `AddColumnRight`,
  `AddRowBottom`, `AddRowTop`, `Delete`, `Edit`, `Cut`.
- **Arrows & carets:** `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`,
  `ArrowTopLeft`, `ArrowTopRight`, `ArrowBottomLeft`, `ArrowBottomRight`,
  `ArrowsHorizontal`, `ArrowsVertical`, `CaretUp`, `CaretDown`,
  `CaretLeft`, `DoubleCaretHorizontal`.
- **Chevrons / navigation:** `ChevronUp`, `ChevronDown`, `ChevronLeft`,
  `ChevronRight`, `ChevronBackward`, `ChevronForward`, `DirectionLeft`,
  `DirectionRight`.
- **Alignment:** `AlignLeft`, `AlignCenter`, `AlignRight`,
  `AlignJustify`, `AlignmentTop`, `AlignmentBottom`,
  `AlignmentLeft`, `AlignmentRight`,
  `AlignmentHorizontalCenter`, `AlignmentVerticalCenter`.
- **Status / feedback:** `Confirm`, `Cross`, `BanCircle`, `Disable`,
  `Badge`, `Annotation`, `Comment`.
- **Files & content:** `Document`, `DocumentOpen`, `DocumentShare`,
  `Clipboard`, `Book`, `Bookmark`, `CodeBlock`, `Code`, `Citation`,
  `Compressed`, `Compass`.
- **People & roles:** `BlockedPerson`, `BankAccount`, `CreditCard`.
- **System / data:** `Dashboard`, `Database`, `Chart`, `Console`,
  `Control`, `Delta`, `DeriveColumn`, `ColumnLayout`, `Comparison`,
  `CurvedRangeChart`, `AutomaticUpdates`.
- **Cloud & devices:** `Cloud`, `CloudUpload`, `CloudDownload`,
  `Desktop`, `CellTower`, `Camera`, `Calendar`, `Calculator`.
- **Misc:** `Airplane`, `Asterisk`, `Bold`, `Box`, `Briefcase`,
  `Build`, `Barcode`, `Application`, `Applications`, `Circle`,
  `CircleArrowUp`, `CircleArrowDown`, `CircleArrowLeft`,
  `CircleArrowRight`, `Cloud`, `Contrast`, `Dollar`, `Dot`.

That's a partial sample. For a complete list, grep the package:

```bash
grep -E "^export const " packages/iconpack/index.js | awk '{print $3}'
```

Or, when working with the MCP/CLI, search through the icon component
docs to find what you need.

## Icontuner — sizing & intent

`Icontuner` from `@asphalt-react/icontuner` lets you resize an icon
and apply a semantic intent color in one wrapper.

```tsx
import { Icontuner } from "@asphalt-react/icontuner"
import { Trash, Tick, Warning } from "@asphalt-react/iconpack"

<Icontuner size="l" danger>
  <Trash />
</Icontuner>

<Icontuner size="s" success>
  <Tick />
</Icontuner>

<Icontuner warning>
  <Warning />
</Icontuner>
```

### Icontuner props

| Prop       | Type | Default | Description                                                                 |
| ---------- | ---- | ------- | --------------------------------------------------------------------------- |
| `children` | node | _req._  | A single icon from `@asphalt-react/iconpack`.                               |
| `size`     | enum | `"m"`   | One of `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`.                             |
| `resize`   | bool | `true`  | Apply the size. Set `false` to keep the icon's intrinsic 16×16 box.         |
| `primary`  | bool | `false` | Apply `--content-primary`.                                                  |
| `secondary`| bool | `false` | Apply `--content-secondary`.                                                |
| `muted`    | bool | `false` | Apply `--content-muted`.                                                    |
| `brand`    | bool | `false` | Apply `--content-brand`.                                                    |
| `inverse`  | bool | `false` | Apply `--content-on-inverse`.                                               |
| `disabled` | bool | `false` | Apply `--content-disabled`.                                                 |
| `danger`   | bool | `false` | Apply `--content-danger`.                                                   |
| `warning`  | bool | `false` | Apply `--content-warning`.                                                  |
| `success`  | bool | `false` | Apply `--content-success`.                                                  |
| `info`     | bool | `false` | Apply `--content-info`.                                                     |
| `invalid`  | bool | `false` | Apply the invalid-state color.                                              |

Intents are mutually exclusive — set only one at a time.

## Patterns

### Icon button

Icon-only buttons must have an accessible name.

```tsx
import { Button } from "@asphalt-react/button"
import { Delete } from "@asphalt-react/iconpack"

<Button icon danger aria-label="Delete item">
  <Delete />
</Button>
```

### Button with leading icon (qualifier)

`qualifier` accepts any SVG; pair it with a regular caption.

```tsx
import { Add, ChevronRight } from "@asphalt-react/iconpack"

<Button primary qualifier={<Add />}>Add item</Button>
<Button secondary qualifier={<ChevronRight />} qualifierEnd>
  Continue
</Button>
```

### Inline content icon with intent

Use `Icontuner` when the icon is part of body content (not inside a
component that already manages its color).

```tsx
import { Layout } from "@asphalt-react/layout"
import { Text } from "@asphalt-react/typography"
import { Icontuner } from "@asphalt-react/icontuner"
import { Tick, Warning } from "@asphalt-react/iconpack"

<Layout vertical gap="s">
  <Layout>
    <Icontuner success size="s"><Tick /></Icontuner>
    <Text success>Verified</Text>
  </Layout>

  <Layout>
    <Icontuner warning size="s"><Warning /></Icontuner>
    <Text warning>Action required</Text>
  </Layout>
</Layout>
```

### Sidebar/Tab item with icon

```tsx
import { NavItem, NavLink, NavItemIcon, NavItemCaption } from "@asphalt-react/sidebar"
import { Dashboard } from "@asphalt-react/iconpack"

<NavItem>
  <NavLink active asProps={{ href: "/" }}>
    <NavItemIcon><Dashboard /></NavItemIcon>
    <NavItemCaption>Dashboard</NavItemCaption>
  </NavLink>
</NavItem>
```

### Textfield with qualifier icon

Use the Textfield `qualifierStart`/`qualifierEnd` (or the low-level
`useInput` + `InputQualifier`) — not a raw icon dropped next to the
input.

```tsx
import { Textfield } from "@asphalt-react/textfield"
import { Search } from "@asphalt-react/iconpack"

<Textfield
  stretch
  qualifierStart={<Search />}
  placeholder="Search…"
/>
```

### Loading spinner is not an icon

Use `Spinner` from `@asphalt-react/loader`, not an animated SVG:

```tsx
import { Spinner } from "@asphalt-react/loader"
import { Button } from "@asphalt-react/button"

<Button primary disabled qualifier={<Spinner />}>Saving…</Button>
```

## Accessibility

- **Icon-only buttons / links / tab items must have an accessible
  name.** Add `aria-label` (or `aria-labelledby`) to the wrapping
  Asphalt component, not to the SVG itself.
- **Decorative icons** that sit next to a text label don't need
  labels — they inherit the label from the surrounding text.
- Asphalt SVGs use `fill="currentColor"`, so they meet contrast as
  long as the surrounding text does. If you tint them with
  `Icontuner`, choose intents that the design system already
  contrast-tested (`primary`, `secondary`, `brand`, the support
  intents) rather than ad-hoc colors.

## Checklist

- [ ] Imports come from `@asphalt-react/iconpack` (never inline SVG
      or third-party icon packs).
- [ ] Icon color is controlled either by the parent component or by
      `Icontuner` — never by `style`/`className` on the icon itself.
- [ ] Icon-only `Button`, `NavLink`, or `TabItem` has an `aria-label`.
- [ ] `Icontuner` wraps **one** icon at a time and sets only **one**
      intent.
- [ ] For sizes, use the `Icontuner` `size` enum
      (`xxs|xs|s|m|l|xl|xxl`) rather than custom CSS.
- [ ] For loading state, use `Spinner` from `@asphalt-react/loader`,
      not an icon.

## See also

- [theming.md](./theming.md) — Brand-recoloring icons via tokens.
- [button-patterns.md](./button-patterns.md) — Icon-button and
  qualifier patterns.
- [navigation-patterns.md](./navigation-patterns.md) — Icons in
  Sidebar / Appbar / Tab.
