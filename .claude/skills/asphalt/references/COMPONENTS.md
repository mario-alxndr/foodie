# Asphalt React Component Catalog

The **export map** for every `@asphalt-react/*` package: which package a
component lives in, what it exports, and how to import it.

**Use this file when you already know the component** and need its package,
exports, or import line. If instead you're choosing a component from a UI need,
start with [DECISION_TREE.md](./DECISION_TREE.md). For exact, version-accurate
props, always fetch live via MCP/CLI (`get_component_props`) — this file is a
navigation index, not the source of truth.

The design system ships **38 component packages** (one deprecated: `@asphalt-react/stack` → use `Layout`), plus
`@asphalt-react/iconpack` (417 icons), `@asphalt-react/iconpack-aloha`
(420 icons), and `@asphalt-react/theme-provider`.

> Component names for the CLI are **kebab-case** (`data-table`,
> `toggle-switch`, `time-picker`, `theme-provider`). The package
> import path is `@asphalt-react/<kebab-name>`.

---

## Typography

| Package                     | Main exports                         |
| --------------------------- | ------------------------------------ |
| `@asphalt-react/typography` | `Heading`, `Display`, `Code`, `Text` |

**Rules:** `h1`–`h6` are **boolean props** on `Heading`; `Heading` and `Display` are
bold by design — no `bold` prop. `Text` supports `size="xs\|s\|m\|l"`,
`bold`, `ellipsis`, `p\|span\|div`, and intent props
(`primary | secondary | brand | onBrand | muted`). `Code` styles a snippet of computer code.

## Layout & Page structure

| Package                 | Main exports                                                                                   |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| `@asphalt-react/layout` | `Page` (+ `Page.Header`, `Page.Aside`, `Page.Main`, `Page.Footer`), `Layout` (+ `Layout.Slot`) |

**Rules:** `Layout` covers **all** horizontal/vertical grouping —
page-level skeletons, dashboards, button rows, tag lists, toolbars.
`gap` is `"s" | "m" | "l"` (default `"m"`). For tighter spacing on
clusters of related items use `gap="s"`. `placement="start|center|end"`
controls main-axis alignment; `spread` and `fill` mirror flex
`space-between` / equal-fraction distribution. No `Grid` component —
use `<Layout fill>` / `<Layout template>` instead.

> **⚠️ `@asphalt-react/stack` is deprecated.** Do not import
> `Stack`. The `Layout` component is the single grouping primitive
> going forward. See the migration table in
> [SKILL.md → Layout](../SKILL.md#layout-asphalt-reactlayout).

## Buttons

| Package                        | Main exports   |
| ------------------------------ | -------------- |
| `@asphalt-react/button`        | `Button`       |
| `@asphalt-react/toggle-button` | `ToggleButton` |

**Rules:** Variants `primary | secondary | tertiary | nude` (mutually
exclusive); intents `brand | danger | system` (mutually exclusive).
`ToggleButton` is **not a form control** — never substitute for
`Checkbox` or `ToggleSwitch`.

## Form Controls

| Package                        | Main exports                                                                                                                                                                                   |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@asphalt-react/textfield`     | `Textfield`, `Email`, `Password`, `URL`, `Numeric`, `Search`, `Datefield`, `Timefield`, `Pinfield`, `PhoneNumber`, `Hero`, `Input`, `InputWrapper`, `InputQualifier`, `InputAddOn`, `useInput` |
| `@asphalt-react/selection`     | `Dropdown`, `ListItem`, `ListItemContent`, `ListItemHeader`, `ListBox`, `useSelection`                                                                                                         |
| `@asphalt-react/checkbox`      | `Checkbox`                                                                                                                                                                                     |
| `@asphalt-react/radio`         | `Radio`                                                                                                                                                                                        |
| `@asphalt-react/toggle-switch` | `ToggleSwitch`                                                                                                                                                                                 |
| `@asphalt-react/slider`        | `Slider`                                                                                                                                                                                       |
| `@asphalt-react/date-picker`   | `DatePicker`, `Calendar`, `DateTile`, `DayTile`, `useCalendar`, `useNavigation`, `InvalidDate`, `UserInvalidDate`, `InvalidRange`, `UserInvalidRange`, `RangeBreach`, `UserRangeBreach`        |
| `@asphalt-react/time-picker`   | `TimePicker`, `InvalidTime`, `UserInvalidTime`                                                                                                                                                 |
| `@asphalt-react/file-uploader` | `FileUploader`, `useFileUploader`                                                                                                                                                              |

**Common props:** `stretch`, `placeholder`, `invalid`, `disabled`,
`size="xs|s|m|l"` (sizes vary per component — verify with
`get_component_props`). `ToggleSwitch` uses `on` + `onToggle={({on}) => …}`.

## Data Display

| Package                       | Main exports                                                                                                                                                                     |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@asphalt-react/data-table`   | `DataTable`, `usePagination`                                                                                                                                                     |
| `@asphalt-react/table`        | `Table`, `TableHead`, `TableHeadRow`, `TableHeadCell`, `TableHeadCellText`, `TableHeadCellAction`, `TableHeadCellIcon`, `TableBody`, `TableBodyRow`, `TableBodyCell`, `useTable` |
| `@asphalt-react/accordion`    | `Accordion`, `AccordionHeader`, `AccordionDescription`                                                                                                                           |
| `@asphalt-react/pagination`   | `Pagination`, `PerPage`, `BasePagination`, `PageItem`, `usePagination`                                                                                                           |
| `@asphalt-react/progress-bar` | `ProgressBar`                                                                                                                                                                    |
| `@asphalt-react/actionlist`   | `Actionlist`, `Action`                                                                                                                                                           |

## Charts

| Package                   | Main exports                                       |
| ------------------------- | -------------------------------------------------- |
| `@asphalt-react/data-viz` | `BarChart`, `LineChart`, `DonutChart`, `useCharts` |

**Rule:** size the wrapping `<div>`, not the chart. There's no built-in
pie/scatter/area/heatmap — stop and ask the user if you need one.

## UI Surfaces

| Package                 | Main exports                                                                                                                                                                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@asphalt-react/card`   | `Card` (static), `Tile` (interactive — `as="button" \| "a" \| "div"`)                                                                                                                                                                   |
| `@asphalt-react/badge`  | `Badge`, `Ribbon`                                                                                                                                                                                                                       |
| `@asphalt-react/tag`    | `Tag`, `CustomTag`, `TagIcon`, `TagText`, `TagAction`, `useTag`                                                                                                                                                                         |
| `@asphalt-react/avatar` | `Avatar`                                                                                                                                                                                                                                |
| `@asphalt-react/logo`   | `Logo` + brand symbols: `AsphaltReact`, `AsphaltWeb`, `Bullpup`, `BullpupBlack`, `Coffer`, `Gojek`, `GoBiz`, `GoCar`, `GoFood`, `GoFresh`, `GoPay`, `GoPlay`, `GoPoints`, `GoPromo`, `GoRide`, `GoSend`, `GoTix`, `Radar`, `RadarBlack` |

**Rules:** `Tile` lives in `@asphalt-react/card`, not a `Card.Tile`
namespace. `Card` variants: `elevated` (default), `outlined`. `Tag`
intents: `neutral` (default), `info`, `success`, `warning`, `danger`;
use `CustomTag` when you need >5 states. `Avatar` sizes:
`xxs | xs | s | m | l | xl | xxl`.

## Navigation

| Package                           | Main exports                                                                                                                                                                                 |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@asphalt-react/sidebar`          | `Sidebar`, `BaseSidebar`, `SidebarHead`, `SidebarBody`, `SidebarTail`, `Nav`, `NavCategory`, `NavMenu`, `NavItem`, `NavLink`, `NavItemIcon`, `NavItemCaption`, `NavItemAction`, `useSidebar` |
| `@asphalt-react/appbar`           | `Appbar`, `BaseAppbar`, `AppbarHead`, `AppbarBody`, `AppbarTail`, `Nav`, `NavItem`, `NavItemIcon`, `NavItemCaption`, `NavItemAction`, `NavLink`, `useAppbar`                                 |
| `@asphalt-react/breadcrumb`       | `Breadcrumb`, `BaseBreadcrumb`, `Crumb`, `CrumbLink`, `CrumbText`, `Separator`                                                                                                               |
| `@asphalt-react/tab`              | `Tabs`, `TabList`, `TabItem`, `TabItemIcon`, `TabPanel`, `useTabs`                                                                                                                           |
| `@asphalt-react/content-switcher` | `ContentSwitcher`, `Switch`                                                                                                                                                                  |
| `@asphalt-react/wizard`           | `Wizard`, `WizardPath`, `Step`, `StepIndicator`, `StepContent`, `StepLabel`, `StepDescription`, `useWizard`                                                                                  |

**Rules:** `Tabs`/`TabList`/`TabItem`/`TabPanel` — there's no
`<Tab>` export. `Breadcrumb` takes a `crumbs={[<Crumb>…</Crumb>]}`
prop (not `items`). `Sidebar` / `Appbar` accept `head` and `tail`
as **props**, not as children.

## Feedback & Overlays

| Package                  | Main exports                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `@asphalt-react/modal`   | `Modal`, `Title`, `Description`, `Footer`, `ModalLegacy`                                  |
| `@asphalt-react/flag`    | `InlineFlag`, `FloatingFlag`, `BannerFlag`, `PageFlag`, `BaseFlag`, `useFlag`, `useToast` |
| `@asphalt-react/loader`  | `Loader`, `Spinner`                                                                       |
| `@asphalt-react/popover` | `Popover`, `Tooltip`, `BasePopover`, `FocusManager`, `usePopover`                         |

**Rules:** No bare `<Flag>` export — pick a variant. Flag intents:
`info`, `success`, `warning`, `danger`, `neutral` (+ `invalid` only
on `InlineFlag`). Use `Spinner` (not an animated icon) for inline
loading.

## Theming, Tokens & Icons

| Package                                                       | Main exports                                                    |
| ------------------------------------------------------------- | --------------------------------------------------------------- |
| `@asphalt-react/theme-provider`                               | `ThemeProvider`                                                 |
| `@asphalt-react/iconpack`                                     | 417 named icons, each a 16×16 `currentColor` SVG component      |
| `@asphalt-react/iconpack-aloha`                               | 420 named icons (Aloha set)                                     |
| `@asphalt-react/icontuner`                                    | `Icontuner` (size & intent wrapper)                             |
| `@asphalt-react/crater`                                       | `Crater` — specialized internal layout primitive; rarely needed |
| `@gojek/theme-asphalt-web-{aloha\|carina\|draco\|lynx\|vela}` | Pre-built theme objects (Gojek brands)                          |

Default built-in theme: **Lyra** (applied when no `ThemeProvider`).

## Standard Import Patterns

```tsx
// Typography
import { Heading, Display, Code, Text } from "@asphalt-react/typography";

// Layout (Layout covers all grouping; @asphalt-react/stack is deprecated)
import { Page, Layout } from "@asphalt-react/layout";

// Buttons
import { Button } from "@asphalt-react/button";
import { ToggleButton } from "@asphalt-react/toggle-button";

// Forms
import {
  Textfield,
  Email,
  Password,
  Search,
  Numeric,
  useInput,
} from "@asphalt-react/textfield";
import { Dropdown } from "@asphalt-react/selection";
import { Checkbox } from "@asphalt-react/checkbox";
import { Radio } from "@asphalt-react/radio";
import { ToggleSwitch } from "@asphalt-react/toggle-switch";
import { Slider } from "@asphalt-react/slider";
import { DatePicker } from "@asphalt-react/date-picker";
import { TimePicker } from "@asphalt-react/time-picker";
import { FileUploader } from "@asphalt-react/file-uploader";

// Navigation
import {
  Sidebar,
  Nav,
  NavCategory,
  NavItem,
  NavLink,
  NavItemIcon,
  NavItemCaption,
} from "@asphalt-react/sidebar";
import { Appbar, useAppbar } from "@asphalt-react/appbar";
import { Tabs, TabList, TabItem, TabPanel } from "@asphalt-react/tab";
import { Breadcrumb, Crumb, CrumbLink } from "@asphalt-react/breadcrumb";
import { ContentSwitcher, Switch } from "@asphalt-react/content-switcher";
import {
  Wizard,
  WizardPath,
  Step,
  StepIndicator,
  StepContent,
  StepLabel,
  StepDescription,
} from "@asphalt-react/wizard";

// Data
import { DataTable, usePagination } from "@asphalt-react/data-table";
import {
  Table,
  TableHead,
  TableHeadRow,
  TableHeadCell,
  TableBody,
  TableBodyRow,
  TableBodyCell,
  useTable,
} from "@asphalt-react/table";
import { Pagination, PerPage } from "@asphalt-react/pagination";
import {
  Accordion,
  AccordionHeader,
  AccordionDescription,
} from "@asphalt-react/accordion";
import { Actionlist, Action } from "@asphalt-react/actionlist";
import { ProgressBar } from "@asphalt-react/progress-bar";

// Charts
import { BarChart, LineChart, DonutChart } from "@asphalt-react/data-viz";

// UI surfaces
import { Card, Tile } from "@asphalt-react/card";
import { Badge, Ribbon } from "@asphalt-react/badge";
import {
  Tag,
  CustomTag,
  TagIcon,
  TagText,
  TagAction,
} from "@asphalt-react/tag";
import { Avatar } from "@asphalt-react/avatar";
import { Logo, Gojek, GoFood, GoPay } from "@asphalt-react/logo";

// Feedback
import { Modal, Title, Description, Footer } from "@asphalt-react/modal";
import {
  InlineFlag,
  FloatingFlag,
  BannerFlag,
  PageFlag,
} from "@asphalt-react/flag";
import { Loader, Spinner } from "@asphalt-react/loader";
import { Popover, Tooltip, usePopover } from "@asphalt-react/popover";

// Theming & icons
import { ThemeProvider } from "@asphalt-react/theme-provider";
import { Icontuner } from "@asphalt-react/icontuner";
import {
  Add,
  Close,
  ChevronRight,
  Search as SearchIcon,
} from "@asphalt-react/iconpack";
```

## See also

- [DECISION_TREE.md](./DECISION_TREE.md) — Pick the right component for a UI need.
- Per-domain pattern files: `button-patterns.md`, `form-patterns.md`,
  `data-display.md`, `feedback-patterns.md`, `navigation-patterns.md`,
  `page-layouts.md`, `typography-examples.md`, `ui-components.md`,
  `wizard-steps.md`, `charts.md`.
- [theming.md](./theming.md)
  for the token system that powers themes.
- [icons.md](./icons.md) for the iconpack + `Icontuner`.
