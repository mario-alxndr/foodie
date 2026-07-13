# Page Layouts

Page structure patterns using `@asphalt-react/layout`.

## Basic Page Structure

```tsx
import { Page, Layout } from "@asphalt-react/layout";
import { Appbar } from "@asphalt-react/appbar";
import { Logo } from "@asphalt-react/logo";

function BasicPage() {
  return (
    <Page>
      <Page.Header>
        <Appbar head={<Logo />} />
      </Page.Header>
      <Page.Main>
        <Layout vertical gap="m">
          <div>Content goes here</div>
        </Layout>
      </Page.Main>
      <Page.Footer>
        <Layout gap="m">
          <div>Footer content here</div>
        </Layout>
      </Page.Footer>
    </Page>
  );
}
```

## Page with Sidebar

```tsx
import { Page, Layout } from "@asphalt-react/layout";
import { Sidebar, Nav, NavItem, NavLink } from "@asphalt-react/sidebar";
import { Appbar } from "@asphalt-react/appbar";
import { Logo } from "@asphalt-react/logo";

function PageWithSidebar() {
  return (
    <Page>
      <Page.Header>
        <Appbar head={<Logo />} />
      </Page.Header>
      <Page.Aside>
        <Sidebar>
          <Nav>
            <NavItem>
              <NavLink active asProps={{ href: "/" }}>
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink asProps={{ href: "/settings" }}>Settings</NavLink>
            </NavItem>
          </Nav>
        </Sidebar>
      </Page.Aside>
      <Page.Main>
        <div className="max-w-4xl p-6">
          <Layout vertical gap="m">
            <div>Main content area</div>
          </Layout>
        </div>
      </Page.Main>
      <Page.Footer>
        <Layout gap="m">
          <div>Footer content here</div>
        </Layout>
      </Page.Footer>
    </Page>
  );
}
```

## Page with Right Sidebar

```tsx
import { Page, Layout } from "@asphalt-react/layout";

function PageWithRightSidebar() {
  return (
    <Page asideEnd>
      <Page.Main>
        <Layout vertical gap="m">
          <div>Main content</div>
        </Layout>
      </Page.Main>
      <Page.Aside>
        <div>Right sidebar content</div>
      </Page.Aside>
      <Page.Footer>
        <Layout gap="m">
          <div>Footer content here</div>
        </Layout>
      </Page.Footer>
    </Page>
  );
}
```

## Layout Variations

### Horizontal Layout (Default)

```tsx
import { Layout } from "@asphalt-react/layout";

<Layout>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Layout>;
```

### Vertical Layout

```tsx
import { Layout } from "@asphalt-react/layout";

<Layout vertical>
  <div>Row 1</div>
  <div>Row 2</div>
  <div>Row 3</div>
</Layout>;
```

### Spread Layout (Space Between)

```tsx
import { Layout } from "@asphalt-react/layout";
import { Button } from "@asphalt-react/button";

<Layout spread>
  <Button>Cancel</Button>
  <Button primary>Save</Button>
</Layout>;
```

### Fill Layout (Equal Columns)

```tsx
import { Layout } from "@asphalt-react/layout";

<Layout fill>
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</Layout>;
```

### Responsive Columns

```tsx
import { Layout } from "@asphalt-react/layout";

<Layout fill s={2} m={4} l={6}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
  <div>Item 6</div>
</Layout>;
```

### Grid Template Layout

```tsx
import { Layout } from "@asphalt-react/layout";

const template = `
  header header header
  sidebar main main
  sidebar footer footer
`;

function GridLayout() {
  return (
    <Layout template={template}>
      <Layout.Slot area="header">Header</Layout.Slot>
      <Layout.Slot area="sidebar">Sidebar</Layout.Slot>
      <Layout.Slot area="main">Main Content</Layout.Slot>
      <Layout.Slot area="footer">Footer</Layout.Slot>
    </Layout>
  );
}
```

### Responsive Grid Template

```tsx
import { Layout } from "@asphalt-react/layout"

const templateResponsive = {
  s: `
    header
    main
    sidebar
    footer
  `,
  m: `
    header header
    sidebar main
    footer footer
  `,
  l: `
    header header header
    sidebar main main
    sidebar footer footer
  `,
}

<Layout template={templateResponsive}>
  <Layout.Slot area="header">Header</Layout.Slot>
  <Layout.Slot area="sidebar">Sidebar</Layout.Slot>
  <Layout.Slot area="main">Main</Layout.Slot>
  <Layout.Slot area="footer">Footer</Layout.Slot>
</Layout>
```

### Slot Ordering

```tsx
import { Layout } from "@asphalt-react/layout";

<Layout>
  <Layout.Slot order={{ s: 2, m: 1 }}>First on medium+</Layout.Slot>
  <Layout.Slot order={{ s: 1, m: 2 }}>First on small</Layout.Slot>
</Layout>;
```

## Layout Props Reference

| Prop             | Type   | Default | Description                             |
| ---------------- | ------ | ------- | --------------------------------------- |
| gap              | enum   | "m"     | Gap size: "s", "m", "l"                 |
| align            | enum   | -       | Cross-axis: start, end, center, stretch |
| placement        | enum   | -       | Main axis: start, end, center           |
| spread           | bool   | false   | Equal spacing between items             |
| vertical         | bool   | false   | Render children in a vertical column    |
| wrap             | bool   | true    | Enable wrapping                         |
| reverseOrder     | bool   | false   | Reverse children order                  |
| fill             | bool   | false   | Fill space equally                      |
| s/m/l            | number | -       | Column count per breakpoint             |
| template         | string | ""      | CSS grid template areas                 |
| responsiveLayout | bool   | true    | Auto-adjust based on screen             |

## Page Props Reference

| Prop     | Type | Default | Description                     |
| -------- | ---- | ------- | ------------------------------- |
| children | node | -       | Page content                    |
| asideEnd | bool | false   | Align Aside to end of container |
