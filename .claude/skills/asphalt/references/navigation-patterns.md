# Navigation Patterns

Navigation components: Sidebar, Appbar, Breadcrumb, Tab, ContentSwitcher,
Logo.

## Logo

`@asphalt-react/logo` exports the `Logo` component plus a set of
Gojek product/brand glyphs. Use it inside `Appbar.head`,
`Sidebar.head`, footers, login screens — anywhere the product
identity belongs.

### Default Logo (Gojek)

```tsx
import { Logo } from "@asphalt-react/logo";

<Logo />;
```

### Specific product symbol + brand name

The `product` prop renders the brand name in `Maison Neue Extended`;
the `symbol` prop renders the glyph. Either can be a string from the
supported list **or** one of the named exports.

```tsx
import { Logo, GoFood, GoPay } from "@asphalt-react/logo";

<Logo product="GoFood" symbol={<GoFood />} />
<Logo product="GoPay" symbol={<GoPay />} size="l" />
```

### Symbol only (icon-style)

```tsx
import { Logo, GoCar } from "@asphalt-react/logo";

<Logo product={false} symbol={<GoCar />} />;
```

### Word-mark only (no symbol)

```tsx
import { Logo } from "@asphalt-react/logo";

<Logo symbol={false} product="GoRide" />;
```

### Custom logo (child overrides both `product` and `symbol`)

```tsx
import { Logo } from "@asphalt-react/logo";

<Logo>
  <img src="/my-brand.svg" alt="My Brand" />
</Logo>;
```

### Logo inside Appbar

```tsx
import { Appbar } from "@asphalt-react/appbar";
import { Logo, Gojek } from "@asphalt-react/logo";

<Appbar head={<Logo product="Gojek" symbol={<Gojek />} />}>{/* nav */}</Appbar>;
```

### Supported brand exports

`Gojek`, `GoRide`, `GoCar`, `GoSend`, `GoFresh`, `GoFood`, `GoTix`,
`GoPay`, `GoPoints`, `GoBiz`, `GoPlay`, `GoPromo`, `AsphaltReact`,
`AsphaltWeb`, `Bullpup`, `BullpupBlack`, `Coffer`, `Radar`,
`RadarBlack`.

### Logo Props

| Prop      | Type           | Default  | Description                                                            |
| --------- | -------------- | -------- | ---------------------------------------------------------------------- |
| `children`| node           | -        | Custom logo — overrides `product` and `symbol`                         |
| `size`    | enum           | `"m"`    | `xs \| s \| m \| l` (doesn't apply to custom child)                     |
| `product` | union (string \| bool) | `"gojek"` | Brand name to render alongside the symbol; `false` hides it     |
| `symbol`  | union (node \| bool)   | `null`    | Glyph to render; `false` hides it                              |

## Sidebar Navigation

Unit components such as Nav, NavItem, and NavLink should be imported from Sidebar when using Sidebar.

### Basic Sidebar

```tsx
import { Sidebar, Nav, NavItem, NavLink } from "@asphalt-react/sidebar";

function BasicSidebar() {
  return (
    <Sidebar>
      <Nav>
        <NavItem>
          <NavLink active asProps={{ href: "/" }}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink asProps={{ href: "/dashboard" }}>Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink asProps={{ href: "/reports" }}>Reports</NavLink>
        </NavItem>
      </Nav>
    </Sidebar>
  );
}
```

### Sidebar with Categories

```tsx
import {
  Sidebar,
  Nav,
  NavItem,
  NavLink,
  NavCategory,
} from "@asphalt-react/sidebar";

function CategorizedSidebar() {
  return (
    <Sidebar>
      <Nav>
        <NavItem>
          <NavLink asProps={{ href: "/" }}>Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink asProps={{ href: "/orders" }}>Orders</NavLink>
        </NavItem>
        <NavCategory>Settings</NavCategory>
        <NavItem>
          <NavLink asProps={{ href: "/profile" }}>Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink asProps={{ href: "/address" }}>Address</NavLink>
        </NavItem>
      </Nav>
    </Sidebar>
  );
}
```

### Sidebar with Icons

```tsx
import {
  Sidebar,
  Nav,
  NavItem,
  NavLink,
  NavItemIcon,
  NavItemCaption,
} from "@asphalt-react/sidebar";
import { Home, Settings, User } from "@asphalt-react/iconpack";

function IconSidebar() {
  return (
    <Sidebar>
      <Nav>
        <NavItem>
          <NavLink active asProps={{ href: "/" }}>
            <NavItemIcon>
              <Home />
            </NavItemIcon>
            <NavItemCaption>Home</NavItemCaption>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink asProps={{ href: "/profile" }}>
            <NavItemIcon>
              <User />
            </NavItemIcon>
            <NavItemCaption>Profile</NavItemCaption>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink asProps={{ href: "/settings" }}>
            <NavItemIcon>
              <Settings />
            </NavItemIcon>
            <NavItemCaption>Settings</NavItemCaption>
          </NavLink>
        </NavItem>
      </Nav>
    </Sidebar>
  );
}
```

### Sidebar with Head and Tail

```tsx
import { Sidebar, Nav, NavItem, NavLink } from "@asphalt-react/sidebar";
import { Logo } from "@asphalt-react/logo";
import { Avatar } from "@asphalt-react/avatar";

function FullSidebar() {
  return (
    <Sidebar head={<Logo />} tail={<Avatar>JD</Avatar>}>
      <Nav>
        <NavItem>
          <NavLink active asProps={{ href: "/" }}>
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink asProps={{ href: "/analytics" }}>Analytics</NavLink>
        </NavItem>
      </Nav>
    </Sidebar>
  );
}
```

### Sidebar with React Router

```tsx
import { Link } from "react-router-dom";
import { Sidebar, Nav, NavItem, NavLink } from "@asphalt-react/sidebar";

function RouterSidebar() {
  return (
    <Sidebar>
      <Nav>
        <NavItem>
          <NavLink as={Link} asProps={{ to: "/" }} active>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink as={Link} asProps={{ to: "/about" }}>
            About
          </NavLink>
        </NavItem>
      </Nav>
    </Sidebar>
  );
}
```

### Sidebar with useSidebar Hook

```tsx
import {
  Sidebar,
  Nav,
  NavItem,
  NavLink,
  useSidebar,
} from "@asphalt-react/sidebar";
import { Button } from "@asphalt-react/button";

function ControlledSidebar() {
  const { visible, open, close } = useSidebar({ defaultVisible: false });

  return (
    <>
      <Button onClick={open}>Open Menu</Button>
      <Sidebar defaultVisible={visible}>
        <Nav>
          <NavItem>
            <NavLink onClick={close} asProps={{ href: "/" }}>
              Home
            </NavLink>
          </NavItem>
        </Nav>
      </Sidebar>
    </>
  );
}
```

## Appbar Navigation

Unit components such as Nav, NavItem, and NavLink should be imported from Appbar when using Appbar.

### Basic Appbar

```tsx
import { Appbar, Nav, NavItem, NavLink } from "@asphalt-react/appbar";
import { Logo } from "@asphalt-react/logo";

function BasicAppbar() {
  return (
    <Appbar head={<Logo />}>
      <Nav>
        <NavItem>
          <NavLink asProps={{ href: "/" }}>Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink asProps={{ href: "/products" }}>Products</NavLink>
        </NavItem>
        <NavItem>
          <NavLink asProps={{ href: "/contact" }}>Contact</NavLink>
        </NavItem>
      </Nav>
    </Appbar>
  );
}
```

### Appbar with Actions

```tsx
import { Appbar, Nav, NavItem, NavLink } from "@asphalt-react/appbar";
import { Logo } from "@asphalt-react/logo";
import { Button } from "@asphalt-react/button";
import { Avatar } from "@asphalt-react/avatar";

function AppbarWithActions() {
  return (
    <Appbar
      head={<Logo />}
      tail={
        <>
          <Button tertiary>Sign In</Button>
          <Avatar>US</Avatar>
        </>
      }
    >
      <Nav>
        <NavItem>
          <NavLink active asProps={{ href: "/" }}>
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink asProps={{ href: "/reports" }}>Reports</NavLink>
        </NavItem>
      </Nav>
    </Appbar>
  );
}
```

### Appbar with useAppbar Hook

```tsx
import { Appbar, useAppbar } from "@asphalt-react/appbar";
import { Button } from "@asphalt-react/button";

function CustomAppbar() {
  const { visible, open, close } = useAppbar({ defaultOpen: true });

  return (
    <Appbar>
      <div className={visible ? "show" : "hide"}>
        {visible ? (
          <Button onClick={close}>Close</Button>
        ) : (
          <Button onClick={open}>Open</Button>
        )}
      </div>
    </Appbar>
  );
}
```

## Breadcrumb Navigation

### Basic Breadcrumb

```tsx
import { Breadcrumb, Crumb, CrumbLink } from "@asphalt-react/breadcrumb";

function BasicBreadcrumb() {
  return (
    <Breadcrumb
      crumbs={[
        <Crumb key="0">
          <CrumbLink asProps={{ href: "/" }}>Home</CrumbLink>
        </Crumb>,
        <Crumb key="1">
          <CrumbLink asProps={{ href: "/products" }}>Products</CrumbLink>
        </Crumb>,
        <Crumb key="2">
          <CrumbLink asProps={{ href: "/products/shoes" }}>Shoes</CrumbLink>
        </Crumb>,
      ]}
    />
  );
}
```

### Collapsible Breadcrumb

```tsx
import React, { useState } from "react";
import { Breadcrumb, Crumb, CrumbLink } from "@asphalt-react/breadcrumb";
import { Link } from "react-router-dom";

function CollapsibleBreadcrumb() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Breadcrumb
      collapsed={collapsed}
      collapseIndices={[1, 2]}
      onCollapse={() => setCollapsed(false)}
      crumbs={[
        <Crumb key="0">
          <CrumbLink as={Link} asProps={{ to: "/" }}>
            Home
          </CrumbLink>
        </Crumb>,
        <Crumb key="1">
          <CrumbLink as={Link} asProps={{ to: "/category" }}>
            Category
          </CrumbLink>
        </Crumb>,
        <Crumb key="2">
          <CrumbLink as={Link} asProps={{ to: "/category/subcategory" }}>
            Subcategory
          </CrumbLink>
        </Crumb>,
        <Crumb key="3">
          <CrumbLink as={Link} asProps={{ to: "/category/subcategory/item" }}>
            Item
          </CrumbLink>
        </Crumb>,
      ]}
    />
  );
}
```

## Tab Navigation

### Basic Tabs

```tsx
import { Tabs, TabList, TabItem, TabPanel } from "@asphalt-react/tab";

function BasicTabs() {
  return (
    <Tabs>
      <TabList>
        <TabItem active asProps={{ href: "?tab=1" }}>
          Overview
        </TabItem>
        <TabItem asProps={{ href: "?tab=2" }}>Details</TabItem>
        <TabItem asProps={{ href: "?tab=3" }}>Reviews</TabItem>
      </TabList>
      <TabPanel active>Overview content</TabPanel>
      <TabPanel>Details content</TabPanel>
      <TabPanel>Reviews content</TabPanel>
    </Tabs>
  );
}
```

### Tabs with Icons

```tsx
import {
  Tabs,
  TabList,
  TabItem,
  TabItemIcon,
  TabPanel,
} from "@asphalt-react/tab";
import { Home, Settings, User } from "@asphalt-react/iconpack";

function IconTabs() {
  return (
    <Tabs>
      <TabList>
        <TabItem active asProps={{ href: "?tab=home" }}>
          <TabItemIcon>
            <Home />
          </TabItemIcon>
          <span>Home</span>
        </TabItem>
        <TabItem asProps={{ href: "?tab=profile" }}>
          <TabItemIcon>
            <User />
          </TabItemIcon>
          <span>Profile</span>
        </TabItem>
        <TabItem asProps={{ href: "?tab=settings" }}>
          <TabItemIcon>
            <Settings />
          </TabItemIcon>
          <span>Settings</span>
        </TabItem>
      </TabList>
      <TabPanel active>Home Content</TabPanel>
      <TabPanel>Profile Content</TabPanel>
      <TabPanel>Settings Content</TabPanel>
    </Tabs>
  );
}
```

### Controlled Tabs with useTabs Hook

```tsx
import React from "react";
import { Link } from "react-router-dom";
import { Tabs, TabList, TabItem, TabPanel, useTabs } from "@asphalt-react/tab";

function ControlledTabs() {
  const { activeIndex, getItemProps } = useTabs({ defaultIndex: 0, as: Link });

  return (
    <Tabs>
      <TabList>
        <TabItem
          active={activeIndex === 0}
          asProps={{ to: "?tab=1" }}
          {...getItemProps()}
        >
          Tab 1
        </TabItem>
        <TabItem
          active={activeIndex === 1}
          asProps={{ to: "?tab=2" }}
          {...getItemProps()}
        >
          Tab 2
        </TabItem>
        <TabItem
          active={activeIndex === 2}
          asProps={{ to: "?tab=3" }}
          {...getItemProps()}
        >
          Tab 3
        </TabItem>
      </TabList>
      <TabPanel active={activeIndex === 0}>Content 1</TabPanel>
      <TabPanel active={activeIndex === 1}>Content 2</TabPanel>
      <TabPanel active={activeIndex === 2}>Content 3</TabPanel>
    </Tabs>
  );
}
```

## Content Switcher

### Basic Content Switcher

```tsx
import React, { useState } from "react";
import { ContentSwitcher, Switch } from "@asphalt-react/content-switcher";

function BasicContentSwitcher() {
  const [active, setActive] = useState(0);

  return (
    <>
      <ContentSwitcher>
        <Switch value={0} onAction={setActive} active={active === 0}>
          Monthly
        </Switch>
        <Switch value={1} onAction={setActive} active={active === 1}>
          Yearly
        </Switch>
      </ContentSwitcher>

      <div>
        {active === 0 && <div>Monthly pricing content</div>}
        {active === 1 && <div>Yearly pricing content</div>}
      </div>
    </>
  );
}
```

### Three-Way Content Switcher

```tsx
import React, { useState } from "react";
import { ContentSwitcher, Switch } from "@asphalt-react/content-switcher";

function ViewSwitcher() {
  const [view, setView] = useState("grid");

  return (
    <>
      <ContentSwitcher>
        <Switch value="grid" onAction={setView} active={view === "grid"}>
          Grid
        </Switch>
        <Switch value="list" onAction={setView} active={view === "list"}>
          List
        </Switch>
        <Switch value="table" onAction={setView} active={view === "table"}>
          Table
        </Switch>
      </ContentSwitcher>

      {view === "grid" && <GridView />}
      {view === "list" && <ListView />}
      {view === "table" && <TableView />}
    </>
  );
}
```

## NavLink Active Styles

```tsx
import { NavLink } from "@asphalt-react/sidebar"

<NavLink active prominent asProps={{ href: "/" }}>
  Prominent Style (default)
</NavLink>

<NavLink active highlight asProps={{ href: "/" }}>
  Highlight Style
</NavLink>
```

## Props Reference

### NavLink Props

| Prop      | Type        | Default | Description                 |
| --------- | ----------- | ------- | --------------------------- |
| children  | node        | -       | Link content                |
| as        | elementType | "a"     | Custom element (e.g., Link) |
| asProps   | object      | {}      | Props for custom element    |
| active    | bool        | false   | Mark as active              |
| prominent | bool        | false   | Prominent active style      |
| highlight | bool        | false   | Highlight active style      |
| bezel     | bool        | true    | Add padding                 |

### TabItem Props

| Prop     | Type        | Default | Description              |
| -------- | ----------- | ------- | ------------------------ |
| children | node        | -       | Tab label content        |
| as       | elementType | "a"     | Custom element           |
| asProps  | object      | {}      | Props for custom element |
| active   | bool        | false   | Mark tab as active       |
