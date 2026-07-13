# Charts (DataViz)

`@asphalt-react/data-viz` ships three charts plus a hook:

| Export       | Use for                                                       |
| ------------ | ------------------------------------------------------------- |
| `BarChart`   | Categorical comparisons, grouped or stacked bars              |
| `LineChart`  | Trends over time, multi-series time-series                    |
| `DonutChart` | Part-of-whole proportions across a small set of segments      |
| `useCharts`  | Hook for advanced/custom composition (rarely needed)          |

All charts are responsive (`min-width: 312px`, `min-height: 360px`),
take their data as a plain JSON-friendly shape, and render
`fill="currentColor"`-based SVGs that respect the active
`ThemeProvider`. **Wrap each chart in a sized native `<div>`** — the
chart fills the wrapper, and the wrapper is where Tailwind / inline
sizing styles belong (never on the chart itself).

## When to use which

| You're showing…                                          | Pick       |
| -------------------------------------------------------- | ---------- |
| Sales by month, votes by candidate, revenue by region    | `BarChart` |
| Daily active users over a quarter, latency over a week   | `LineChart`|
| Market share, traffic source split, budget allocation    | `DonutChart`|

If you need anything not in this list (pie, scatter, area, heatmap),
stop and ask the user — there's no Asphalt equivalent, and silently
substituting Recharts/Victory/D3 violates the design system contract.

## BarChart

### Basic BarChart

```tsx
import { BarChart } from "@asphalt-react/data-viz";

interface MonthlySales {
  month: string;
  customers: number;
  attrition: number;
}

const data: MonthlySales[] = [
  { month: "Jan", customers: 4350, attrition: 120 },
  { month: "Feb", customers: 6600, attrition: 220 },
  { month: "Mar", customers: 7200, attrition: 150 },
];

function MonthlySalesChart() {
  return (
    <div className="w-full h-96">
      <BarChart data={data} dataKey="month" />
    </div>
  );
}
```

### Stacked & Horizontal BarChart

```tsx
import { BarChart } from "@asphalt-react/data-viz";

<div className="w-full h-96">
  <BarChart
    data={data}
    dataKey="month"
    stack          // stacked bars
    horizontal     // rotate axes
    showGrid
    legendTop
    xAxisLabel="Month"
    yAxisLabel="Total"
  />
</div>;
```

### Custom colors

`colors` is an object keyed by **the series key** (not by data index).

```tsx
import { BarChart } from "@asphalt-react/data-viz";

const colors = {
  customers: "#497aaa",
  attrition: "#666666",
};

<BarChart data={data} dataKey="month" colors={colors} />;
```

### Formatting ticks & labels

```tsx
import { BarChart } from "@asphalt-react/data-viz";

<BarChart
  data={data}
  dataKey="month"
  yTickFormat={(v) => `$${(v / 1000).toFixed(1)}k`}
  showLabel
  formatLabel={(total) => total.toLocaleString()}
/>;
```

### Hover handler

```tsx
import { BarChart } from "@asphalt-react/data-viz";

<BarChart
  data={data}
  dataKey="month"
  onMouseHover={(event, { currentData, groupData }) => {
    console.log("hovered bar:", currentData, "group:", groupData);
  }}
/>;
```

### BarChart key props

| Prop             | Type           | Default | Notes                                                            |
| ---------------- | -------------- | ------- | ---------------------------------------------------------------- |
| `data`           | `Array<object>`| _req._  | Each object must have the same set of keys                       |
| `dataKey`        | string         | _req._  | Field for X-axis (or Y-axis when `horizontal`)                   |
| `colors`         | `Record<string, string>` | – | Color per series key                                          |
| `xAxisLabel` / `yAxisLabel` | string | – | Axis labels                                                  |
| `showGrid`       | bool           | false   | Background grid                                                  |
| `showLegend`     | bool           | true    | Toggle legend                                                    |
| `legendTop`      | bool           | false   | Position legend above the chart                                  |
| `horizontal`     | bool           | false   | Rotate axes                                                      |
| `stack`          | bool           | false   | Stacked bars                                                     |
| `showLabel`      | bool           | false   | Show numeric labels on bars                                      |
| `formatLabel`    | function       | –       | Format the on-bar label                                          |
| `xTickFormat` / `yTickFormat` | function | –   | Format axis tick labels                                         |
| `xTickWrap`      | bool           | false   | Wrap long X-axis labels onto multiple lines                      |
| `tooltip`        | node           | null    | Custom tooltip node                                              |
| `viewTooltip`    | bool           | true    | Show/hide tooltip                                                |
| `inverseTooltip` | bool           | false   | Inverse-color tooltip style                                      |
| `onMouseHover`   | function       | –       | `(event, { currentData, groupData }) => void`                    |

## LineChart

### Basic LineChart (time-series)

```tsx
import { LineChart } from "@asphalt-react/data-viz";

interface DailyMetric {
  date: string;
  signups: number;
  cancellations: number;
}

const data: DailyMetric[] = [
  { date: "2024-01-01", signups: 220, cancellations: 35 },
  { date: "2024-01-02", signups: 268, cancellations: 41 },
  { date: "2024-01-03", signups: 301, cancellations: 28 },
];

function DailyMetrics() {
  return (
    <div className="w-full h-96">
      <LineChart
        data={data}
        dataKey="date"
        showPoints
        showGrid
        xAxisLabel="Date"
        yAxisLabel="Count"
      />
    </div>
  );
}
```

### Reduce X-axis tick density

```tsx
import { LineChart } from "@asphalt-react/data-viz";

<LineChart
  data={data}
  dataKey="date"
  xTickFilter={(_value, index) => index % 7 === 0}  // every 7th tick
  xTickFormat={(value) => new Date(value).toLocaleDateString()}
/>;
```

### Start the Y-axis at zero

```tsx
<LineChart data={data} dataKey="date" startFromZero />
```

### LineChart key props

Same props as `BarChart` *except* — `horizontal`, `stack`, `showLabel`,
and `formatLabel` are **not** supported on `LineChart`. Additional
props:

| Prop            | Type     | Default | Description                                              |
| --------------- | -------- | ------- | -------------------------------------------------------- |
| `showPoints`    | bool     | false   | Render the data circles on each line                     |
| `startFromZero` | bool     | false   | Force Y-axis to start at 0                               |
| `xTickFilter`   | function | –       | `(value, index) => boolean` — keep/skip each X tick      |

## DonutChart

### Basic DonutChart

```tsx
import { DonutChart } from "@asphalt-react/data-viz";

const data = {
  Cartography: 100,
  GoFood: 200,
  Transport: 250,
};

function ProductMix() {
  return (
    <div className="w-72 h-72">
      <DonutChart data={data} />
    </div>
  );
}
```

> `DonutChart` takes a **flat object** (key → value), not an array
> of objects.

### Custom colors, legend on top

```tsx
import { DonutChart } from "@asphalt-react/data-viz";

const data = { Cartography: 100, GoFood: 200, Transport: 250 };
const colors = { GoFood: "#497aaa", Transport: "#666666" };

<DonutChart data={data} colors={colors} legendTop />;
```

### Hover handler

```tsx
<DonutChart
  data={data}
  onMouseHover={(event, { currentData }) => {
    console.log("arc hovered:", currentData);
  }}
/>
```

### DonutChart key props

| Prop             | Type                       | Default | Notes                          |
| ---------------- | -------------------------- | ------- | ------------------------------ |
| `data`           | `Record<string, number>`   | _req._  | Flat object, one entry per arc |
| `colors`         | `Record<string, string>`   | –       | Color per arc                  |
| `showLegend`     | bool                       | true    | Toggle legend                  |
| `legendTop`      | bool                       | false   | Position legend above          |
| `tooltip`        | node                       | null    | Custom tooltip                 |
| `viewTooltip`    | bool                       | true    | Show/hide tooltip              |
| `inverseTooltip` | bool                       | false   | Inverse tooltip style          |
| `onMouseHover`   | function                   | –       | `(event, { currentData })`     |

## Sizing the wrapper

All three charts stretch to fill their parent. The chart's intrinsic
minimums are **312px wide × 360px tall**, *excluding* the legend. Pick
a wrapper height that accounts for the legend wrapping:

```tsx
<div className="w-full" style={{ minHeight: 420 }}>
  <BarChart data={data} dataKey="month" />
</div>
```

Putting sizing classes on the chart component itself (`<BarChart className="...">`)
does **not** work and violates the no-`className`-on-Asphalt rule.
Size the wrapper instead.

## Theming charts

The default palette is supplied by the chart implementation. To
brand-recolor:

1. **Per-chart**: pass `colors={...}` for ad-hoc overrides.
2. **Globally**: define a `ThemeProvider` palette and re-use the
   same `colors` object across charts. There's no chart-specific
   theme token yet — the `colors` prop is the supported brand hook.

## Custom tooltip

`tooltip` accepts any React node — typically you'll render a small
Asphalt panel:

```tsx
import { BarChart } from "@asphalt-react/data-viz";
import { Card } from "@asphalt-react/card";
import { Heading, Text } from "@asphalt-react/typography";

const Tooltip = ({ payload }: { payload?: Array<{ name: string; value: number }> }) =>
  payload?.length ? (
    <Card outlined>
      <Heading h6>{payload[0]?.name}</Heading>
      {payload.map((p) => (
        <Text key={p.name} size="s">
          {p.name}: {p.value}
        </Text>
      ))}
    </Card>
  ) : null;

<BarChart data={data} dataKey="month" tooltip={<Tooltip />} />;
```

The shape the library injects into your tooltip varies per chart —
verify by hovering once and `console.log`-ing the props.

## Checklist

- [ ] Chart wrapper has explicit width and height (the chart fills it).
- [ ] No `className` / `style` on `BarChart` / `LineChart` /
      `DonutChart`. Size and color go on the wrapper or via the
      `colors` prop.
- [ ] `colors` keys match series keys (`BarChart`, `LineChart`) or
      arc keys (`DonutChart`).
- [ ] Time-series `LineChart` uses `xTickFormat` for human-readable
      dates and `xTickFilter` to thin tick density.
- [ ] You picked the right chart (Bar / Line / Donut). Anything else
      requires user approval — there's no built-in pie, scatter, area,
      or heatmap.
- [ ] Custom tooltips compose Asphalt primitives (`Card`, `Text`),
      not raw HTML.

## See also

- [theming.md](./theming.md) — Brand colors propagate to chart tooltips and legends via tokens.
- [data-display.md](./data-display.md) — `DataTable` / `Table` for the tabular companions of charts.
- [page-layouts.md](./page-layouts.md) — Use `Layout` to arrange a dashboard grid of charts.
