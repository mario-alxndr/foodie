# Button Patterns

Button component with variants, intents, and states.
Combine variant and intent to get expected result.

## Button Variants

### Primary Button

```tsx
import { Button } from "@asphalt-react/button";

<Button primary>Primary Action</Button>;
```

### Secondary Button

```tsx
import { Button } from "@asphalt-react/button";

<Button secondary>Secondary Action</Button>;
```

### Tertiary Button

```tsx
import { Button } from "@asphalt-react/button";

<Button tertiary>Tertiary Action</Button>;
```

### Nude Button

```tsx
import { Button } from "@asphalt-react/button";

<Button nude>Nude Button</Button>;
```

### Link Button

```tsx
import { Button } from "@asphalt-react/button";

<Button link asProps={{ href: "/page" }}>
  Link Button
</Button>;
```

## Button Intents

### Brand Intent

```tsx
import { Button } from "@asphalt-react/button"

<Button brand>Brand Button</Button>
<Button primary brand>Primary Brand</Button>
```

### Danger Intent

```tsx
import { Button } from "@asphalt-react/button"

<Button danger>Danger Button</Button>
<Button primary danger>Primary Danger</Button>
```

### System Intent

```tsx
import { Button } from "@asphalt-react/button";

<Button system>System Button</Button>;
```

## Button Sizes

```tsx
import { Button } from "@asphalt-react/button";
import { Layout } from "@asphalt-react/layout";

function ButtonSizes() {
  return (
    <Layout gap="s">
      <Button size="xs" primary>
        Extra Small
      </Button>
      <Button size="s" primary>
        Small
      </Button>
      <Button size="m" primary>
        Medium
      </Button>
      <Button size="l" primary>
        Large
      </Button>
    </Layout>
  );
}
```

## Button with Icon

### Icon Button

```tsx
import { Button } from "@asphalt-react/button";
import { Layout } from "@asphalt-react/layout";
import { Add, Close, Settings } from "@asphalt-react/iconpack";

function IconButtons() {
  return (
    <Layout gap="s">
      <Button icon>
        <Add />
      </Button>
      <Button icon primary>
        <Settings />
      </Button>
      <Button icon danger>
        <Close />
      </Button>
    </Layout>
  );
}
```

### Button with Qualifier (Icon + Text)

```tsx
import { Button } from "@asphalt-react/button";
import { Layout } from "@asphalt-react/layout";
import { Add, Download, ChevronRight } from "@asphalt-react/iconpack";

function QualifierButtons() {
  return (
    <Layout vertical gap="s">
      <Button primary qualifier={<Add />}>
        Add Item
      </Button>
      <Button secondary qualifier={<Download />}>
        Download
      </Button>
      <Button tertiary qualifier={<ChevronRight />} qualifierEnd>
        Continue
      </Button>
    </Layout>
  );
}
```

## Button Layouts

### Full Width Button

```tsx
import { Button } from "@asphalt-react/button";

<Button primary stretch>
  Full Width Button
</Button>;
```

### Button Group

```tsx
import { Button } from "@asphalt-react/button";
import { Layout } from "@asphalt-react/layout";

function ButtonGroup() {
  return (
    <Layout gap="s">
      <Button secondary>Cancel</Button>
      <Button primary>Save</Button>
    </Layout>
  );
}
```

### Stuck Buttons (Connected)

```tsx
import { Button } from "@asphalt-react/button";

function StuckButtons() {
  return (
    <div>
      <Button stickEnd>Default</Button>
      <Button stickStart stick>
        Menu
      </Button>
    </div>
  );
}
```

### Spread Button Layout

```tsx
import { Button } from "@asphalt-react/button";
import { Layout } from "@asphalt-react/layout";

function SpreadButtons() {
  return (
    <Layout spread>
      <Button tertiary>Back</Button>
      <Button primary>Continue</Button>
    </Layout>
  );
}
```

## Button States

### Disabled Button

```tsx
import { Button } from "@asphalt-react/button";

<Button primary disabled>
  Disabled Button
</Button>;
```

### Compact Button

```tsx
import { Button } from "@asphalt-react/button";

<Button primary compact>
  Compact Button
</Button>;
```

### Loading Button

```tsx
import { Button } from "@asphalt-react/button";
import { Spinner } from "@asphalt-react/loader";

function LoadingButton() {
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    await someAsyncOperation();
    setLoading(false);
  };

  return (
    <Button
      primary
      disabled={loading}
      qualifier={loading ? <Spinner /> : undefined}
      onClick={handleClick}
    >
      {loading ? "Saving..." : "Save"}
    </Button>
  );
}
```

## Link Buttons with Router

### React Router Link

```tsx
import { Link } from "react-router-dom";
import { Button } from "@asphalt-react/button";

function RouterLinkButton() {
  return (
    <Button link as={Link} asProps={{ to: "/dashboard" }}>
      Go to Dashboard
    </Button>
  );
}
```

### External Link

```tsx
import { Button } from "@asphalt-react/button";

<Button
  link
  asProps={{
    href: "https://example.com",
    target: "_blank",
    rel: "noopener noreferrer",
  }}
>
  Visit Website
</Button>;
```

### Link without Underline

```tsx
import { Button } from "@asphalt-react/button";

<Button link underline={false} asProps={{ href: "/page" }}>
  No Underline Link
</Button>;
```

## Common Patterns

### Form Actions

```tsx
import { Button } from "@asphalt-react/button";
import { Layout } from "@asphalt-react/layout";

function FormActions() {
  return (
    <Layout spread>
      <Button tertiary>Cancel</Button>
      <Layout>
        <Button secondary>Save Draft</Button>
        <Button primary>Submit</Button>
      </Layout>
    </Layout>
  );
}
```

### Confirmation Actions

```tsx
import { Button } from "@asphalt-react/button";
import { Layout } from "@asphalt-react/layout";

function ConfirmationActions() {
  return (
    <Layout>
      <Button secondary>No, Cancel</Button>
      <Button primary danger>
        Yes, Delete
      </Button>
    </Layout>
  );
}
```

### Card Actions

```tsx
import { Button } from "@asphalt-react/button";
import { Card } from "@asphalt-react/card";
import { Layout } from "@asphalt-react/layout";
import { Heading, Text } from "@asphalt-react/typography";
import { Edit, Trash } from "@asphalt-react/iconpack";

function CardActions() {
  return (
    <Card>
      <Layout vertical gap="m">
        <Layout spread>
          <Heading h4>Item Title</Heading>
          <Layout>
            <Button icon nude>
              <Edit />
            </Button>
            <Button icon nude danger>
              <Trash />
            </Button>
          </Layout>
        </Layout>
        <Text>Card content goes here.</Text>
        <Layout>
          <Button tertiary size="s">
            View Details
          </Button>
        </Layout>
      </Layout>
    </Card>
  );
}
```

### Toolbar Actions

```tsx
import { Button } from "@asphalt-react/button";
import { Layout } from "@asphalt-react/layout";
import { Add, Filter, Download, Refresh } from "@asphalt-react/iconpack";

function ToolbarActions() {
  return (
    <Layout spread>
      <Layout>
        <Button primary qualifier={<Add />}>
          Add New
        </Button>
        <Button secondary qualifier={<Filter />}>
          Filter
        </Button>
      </Layout>
      <Layout>
        <Button icon nude>
          <Refresh />
        </Button>
        <Button icon nude>
          <Download />
        </Button>
      </Layout>
    </Layout>
  );
}
```

### Pagination Buttons

```tsx
import { Button } from "@asphalt-react/button";
import { Layout } from "@asphalt-react/layout";
import { ChevronLeft, ChevronRight } from "@asphalt-react/iconpack";

function PaginationButtons() {
  return (
    <Layout>
      <Button icon nude system compact>
        <ChevronLeft />
      </Button>
      <Button icon nude system compact>
        <ChevronRight />
      </Button>
    </Layout>
  );
}
```

### Social Login Buttons

```tsx
import { Button } from "@asphalt-react/button";
import { Layout } from "@asphalt-react/layout";

function SocialLoginButtons() {
  return (
    <Layout vertical gap="s">
      <Button secondary stretch>
        Continue with Google
      </Button>
      <Button secondary stretch>
        Continue with Microsoft
      </Button>
      <Button secondary stretch>
        Continue with Apple
      </Button>
    </Layout>
  );
}
```

## ToggleButton

`@asphalt-react/toggle-button` is a sibling component for UI-only
on/off state (filter pills, segmented toolbars, "mute" toggles). It is
**not a form control** — never use it where a `Checkbox` or
`ToggleSwitch` belongs (no value posts with the form, no
`<form>`-bound semantics). The README is explicit about that.

### Single ToggleButton

```tsx
import React, { useState } from "react";
import { ToggleButton } from "@asphalt-react/toggle-button";

function MuteToggle() {
  const [muted, setMuted] = useState(false);

  return (
    <ToggleButton on={muted} onClick={() => setMuted((m) => !m)}>
      {muted ? "Unmute" : "Mute"}
    </ToggleButton>
  );
}
```

### Icon-only ToggleButton

Use `icon` (and an `aria-label`) — never `qualifier` for an icon-only
button.

```tsx
import { ToggleButton } from "@asphalt-react/toggle-button";
import { Star } from "@asphalt-react/iconpack";

<ToggleButton icon aria-label="Favorite" on>
  <Star />
</ToggleButton>;
```

### Filter pills (toolbar group)

```tsx
import React, { useState } from "react";
import { Layout } from "@asphalt-react/layout";
import { ToggleButton } from "@asphalt-react/toggle-button";

const FILTERS = ["All", "Active", "Pending", "Completed"] as const;
type Filter = (typeof FILTERS)[number];

function FilterPills() {
  const [active, setActive] = useState<Filter>("All");

  return (
    <Layout gap="s">
      {FILTERS.map((f) => (
        <ToggleButton key={f} on={active === f} onClick={() => setActive(f)}>
          {f}
        </ToggleButton>
      ))}
    </Layout>
  );
}
```

### Stuck ToggleButtons (split-toolbar)

```tsx
import { ToggleButton } from "@asphalt-react/toggle-button";
import { AlignLeft, AlignCenter, AlignRight } from "@asphalt-react/iconpack";

<div>
  <ToggleButton icon stickEnd aria-label="Align left" on>
    <AlignLeft />
  </ToggleButton>
  <ToggleButton icon stickStart stickEnd stick aria-label="Align center">
    <AlignCenter />
  </ToggleButton>
  <ToggleButton icon stickStart stick aria-label="Align right">
    <AlignRight />
  </ToggleButton>
</div>;
```

### Brand intent when on

```tsx
import { ToggleButton } from "@asphalt-react/toggle-button";

<ToggleButton brand on>
  Pinned
</ToggleButton>;
```

### ToggleButton Props

| Prop         | Type        | Default | Description                                                |
| ------------ | ----------- | ------- | ---------------------------------------------------------- |
| `on`         | bool        | false   | Logical "pressed" state                                    |
| `icon`       | bool        | false   | Icon-only variant (needs `aria-label`)                     |
| `compact`    | bool        | false   | Tighter padding                                            |
| `emphasize`  | bool        | false   | Color the icon instead of the background (compact-icon only)|
| `seamless`   | bool        | false   | No border / background — useful inside `Pagination`        |
| `qualifier` / `qualifierEnd` | node / bool | -    | Leading/trailing icon next to text                |
| `size`       | enum        | "m"     | `xs \| s \| m \| l`                                         |
| `stickStart` / `stickEnd` / `stick` | bool | false | Group with adjacent toggle buttons                |
| `brand`      | bool        | false   | Apply brand intent in the "on" state                       |
| `link` / `as` / `asProps` / `underline` | -- | -- | Render as link (matches `Button` link API)              |

> `ToggleButton` is not the same as `ToggleSwitch`. Switches belong in
> forms, toggle buttons belong in toolbars. See the README's
> "ToggleButton vs ToggleSwitch" guidance.

## Button Props Reference

| Prop         | Type        | Default | Description                |
| ------------ | ----------- | ------- | -------------------------- |
| children     | node        | -       | Button content             |
| primary      | bool        | false   | Primary variant            |
| secondary    | bool        | false   | Secondary variant          |
| tertiary     | bool        | false   | Tertiary variant           |
| nude         | bool        | false   | Nude variant               |
| brand        | bool        | false   | Brand intent               |
| danger       | bool        | false   | Danger intent              |
| system       | bool        | false   | System intent              |
| link         | bool        | false   | Link style button          |
| as           | elementType | "a"     | Custom link element        |
| asProps      | object      | {}      | Props for custom element   |
| icon         | bool        | false   | Icon-only button           |
| compact      | bool        | false   | Reduced padding            |
| qualifier    | union       | null    | Icon or text qualifier     |
| qualifierEnd | bool        | false   | Qualifier at end           |
| size         | enum        | "m"     | Size: xs, s, m, l          |
| stretch      | bool        | false   | Full width                 |
| stickStart   | bool        | false   | Connect to start           |
| stickEnd     | bool        | false   | Connect to end             |
| stick        | bool        | false   | Supporting button style    |
| underline    | bool        | true    | Underline for link buttons |
| disabled     | bool        | false   | Disabled state             |
