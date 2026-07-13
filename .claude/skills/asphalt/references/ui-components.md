# UI Components

UI components: Badge, Tag, Avatar, Card, ProgressBar.

## Badge

### Basic Badge

```tsx
import { Badge, Ribbon } from "@asphalt-react/badge";

function BadgeExamples() {
  return (
    <>
      <Badge />
      <Badge>5</Badge>
      <Badge>99+</Badge>
    </>
  );
}
```

### Ribbon Badge

```tsx
import { Ribbon } from "@asphalt-react/badge";

function RibbonExamples() {
  return (
    <>
      <Ribbon>New</Ribbon>
      <Ribbon>Sale</Ribbon>
      <Ribbon>Featured</Ribbon>
    </>
  );
}
```

### Badge on Cards

```tsx
import { Badge } from "@asphalt-react/badge";
import { Card } from "@asphalt-react/card";
import { Layout } from "@asphalt-react/layout";
import { Heading, Text } from "@asphalt-react/typography";

function CardWithBadge() {
  return (
    <Card>
      <Layout spread>
        <Layout vertical gap="s">
          <Heading h4>Notifications</Heading>
          <Text muted>You have new messages</Text>
        </Layout>
        <Badge>3</Badge>
      </Layout>
    </Card>
  );
}
```

### Badge on Icons

```tsx
import { Badge } from "@asphalt-react/badge";
import { Button } from "@asphalt-react/button";
import { Bell, Mail } from "@asphalt-react/iconpack";

function IconWithBadge() {
  return (
    <div className="relative inline-block">
      <Button icon nude>
        <Bell />
      </Button>
      <div className="absolute -top-1 -right-1">
        <Badge>5</Badge>
      </div>
    </div>
  );
}
```

## Tag

### Basic Tag

```tsx
import { Tag } from "@asphalt-react/tag";

function BasicTags() {
  return (
    <>
      <Tag>Default</Tag>
      <Tag>React</Tag>
      <Tag>TypeScript</Tag>
    </>
  );
}
```

### Tag List

```tsx
import { Tag } from "@asphalt-react/tag";
import { Layout } from "@asphalt-react/layout";

function TagList() {
  const tags = ["JavaScript", "React", "TypeScript", "Node.js"];

  return (
    <Layout gap="s">
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </Layout>
  );
}
```

### Custom Tag

```tsx
import { CustomTag, TagIcon, TagText } from "@asphalt-react/tag";
import { User, Star } from "@asphalt-react/iconpack";

function CustomTags() {
  return (
    <>
      <CustomTag surface="black" content="#333" intent="white">
        <TagIcon>
          <User />
        </TagIcon>
        <TagText>Admin</TagText>
      </CustomTag>
      <CustomTag surface="gold" content="#000" intent="black">
        <TagIcon>
          <Star />
        </TagIcon>
        <TagText>Premium</TagText>
      </CustomTag>
    </>
  );
}
```

### Removable Tags

```tsx
import React, { useState } from "react";
import { Tag } from "@asphalt-react/tag";
import { Layout } from "@asphalt-react/layout";
import { Button } from "@asphalt-react/button";
import { Close } from "@asphalt-react/iconpack";

function RemovableTags() {
  const [tags, setTags] = useState(["React", "Vue", "Angular"]);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Layout gap="s">
      {tags.map((tag) => (
        <Layout key={tag} gap="s" placement="center">
          <Tag>{tag}</Tag>
          <Button icon nude compact onClick={() => removeTag(tag)}>
            <Close />
          </Button>
        </Layout>
      ))}
    </Layout>
  );
}
```

## Avatar

### Basic Avatar

```tsx
import { Avatar } from "@asphalt-react/avatar";

function BasicAvatars() {
  return (
    <>
      <Avatar>
        <img src="/avatar.jpg" alt="User" />
      </Avatar>
      <Avatar>JD</Avatar>
      <Avatar uppercase>john</Avatar>
    </>
  );
}
```

### Avatar Sizes

```tsx
import { Avatar } from "@asphalt-react/avatar";
import { Layout } from "@asphalt-react/layout";

function AvatarSizes() {
  return (
    <Layout gap="s" placement="center">
      <Avatar size="small">S</Avatar>
      <Avatar size="medium">M</Avatar>
      <Avatar size="large">L</Avatar>
    </Layout>
  );
}
```

### Avatar with Image

```tsx
import { Avatar } from "@asphalt-react/avatar";

function ImageAvatar() {
  return (
    <Avatar>
      <img
        src="https://example.com/avatar.png"
        alt="User avatar"
        aria-label="User avatar"
      />
    </Avatar>
  );
}
```

### Avatar Group

```tsx
import { Avatar } from "@asphalt-react/avatar";
import { Layout } from "@asphalt-react/layout";

function AvatarGroup() {
  const users = [
    { initials: "JD", name: "John Doe" },
    { initials: "JS", name: "Jane Smith" },
    { initials: "BJ", name: "Bob Johnson" },
  ];

  return (
    <Layout gap="s">
      {users.map((user) => (
        <Avatar key={user.initials} title={user.name}>
          {user.initials}
        </Avatar>
      ))}
      <Avatar>+3</Avatar>
    </Layout>
  );
}
```

### Avatar with Status

```tsx
import { Avatar } from "@asphalt-react/avatar";
import { Badge } from "@asphalt-react/badge";

function StatusAvatar() {
  return (
    <div className="relative inline-block">
      <Avatar>JD</Avatar>
      <div className="absolute bottom-0 right-0">
        <Badge />
      </div>
    </div>
  );
}
```

## Card

### Basic Card

```tsx
import { Card } from "@asphalt-react/card";

function BasicCard() {
  return (
    <Card>
      <div>Card content goes here</div>
    </Card>
  );
}
```

### Card with Header and Content

```tsx
import { Card } from "@asphalt-react/card";
import { Layout } from "@asphalt-react/layout";
import { Heading, Text } from "@asphalt-react/typography";
import { Button } from "@asphalt-react/button";

function ContentCard() {
  return (
    <Card>
      <Layout vertical gap="m">
        <Layout spread>
          <Heading h4>Card Title</Heading>
          <Button tertiary size="s">
            View All
          </Button>
        </Layout>
        <Text>
          This is the card content. Cards are useful for grouping related
          information together.
        </Text>
      </Layout>
    </Card>
  );
}
```

### Stats Card

```tsx
import { Card } from "@asphalt-react/card";
import { Layout } from "@asphalt-react/layout";
import { Heading, Text } from "@asphalt-react/typography";
import { TrendUp } from "@asphalt-react/iconpack";

function StatsCard() {
  return (
    <Card>
      <Layout vertical gap="s">
        <Text muted size="s">
          Total Sales
        </Text>
        <Layout spread>
          <Heading h2>$12,345</Heading>
          <Layout>
            <TrendUp />
            <Text brand size="s">
              +12.5%
            </Text>
          </Layout>
        </Layout>
      </Layout>
    </Card>
  );
}
```

### Card List

```tsx
import { Card } from "@asphalt-react/card";
import { Layout } from "@asphalt-react/layout";
import { Heading, Text } from "@asphalt-react/typography";
import { Avatar } from "@asphalt-react/avatar";

interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
}

function CardList() {
  const users: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com", initials: "JD" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", initials: "JS" },
  ];

  return (
    <Layout vertical gap="s">
      {users.map((user) => (
        <Card key={user.id}>
          <Layout>
            <Avatar>{user.initials}</Avatar>
            <Layout vertical gap="s">
              <Text bold>{user.name}</Text>
              <Text muted size="s">
                {user.email}
              </Text>
            </Layout>
          </Layout>
        </Card>
      ))}
    </Layout>
  );
}
```

### Clickable Card → Use `Tile`

`Card` is **static**. For interactive cards, use `Tile` from the same
package — `Tile` is the interactive variant of `Card` with built-in
hover / focus / pressed states and proper keyboard a11y. Pick the
underlying element via `as="button" | "a" | "div"` so the right
semantics ship to the browser.

> Do **not** put `onClick` + `style={{ cursor: "pointer" }}` on a
> `Card`. That bypasses focus management, keyboard activation, and the
> `aria-pressed` / `role` wiring that `Tile` handles for you.

```tsx
import { Tile } from "@asphalt-react/card";
import { Layout } from "@asphalt-react/layout";
import { Heading, Text } from "@asphalt-react/typography";
import { ChevronRight } from "@asphalt-react/iconpack";

function SettingsTile() {
  return (
    <Tile as="button" onClick={() => console.log("Tile clicked")}>
      <Layout spread>
        <Layout vertical gap="s">
          <Heading h4>Go to Settings</Heading>
          <Text muted>Manage your preferences</Text>
        </Layout>
        <ChevronRight />
      </Layout>
    </Tile>
  );
}
```

For navigation (an anchor tag), use `as="a"` (or `as={Link}` for a
client-side router):

```tsx
import { Tile } from "@asphalt-react/card";
import { Link } from "react-router-dom";

<Tile as={Link} asProps={{ to: "/settings" }}>
  ...
</Tile>
```

Avoid nesting other interactive elements (buttons, links, form
controls) inside a `Tile` — they steal focus and break the keyboard
contract. If the card body needs interactive controls, drop back to
`Card` (static) and place the controls inside.

## ProgressBar

### Basic ProgressBar

```tsx
import { ProgressBar } from "@asphalt-react/progress-bar";

function BasicProgressBar() {
  return <ProgressBar value={25} />;
}
```

### ProgressBar with Different Values

```tsx
import { ProgressBar } from "@asphalt-react/progress-bar";
import { Layout } from "@asphalt-react/layout";
import { Text } from "@asphalt-react/typography";

function ProgressExamples() {
  return (
    <Layout vertical gap="s">
      <div>
        <Text size="s">0%</Text>
        <ProgressBar value={0} />
      </div>
      <div>
        <Text size="s">25%</Text>
        <ProgressBar value={25} />
      </div>
      <div>
        <Text size="s">50%</Text>
        <ProgressBar value={50} />
      </div>
      <div>
        <Text size="s">75%</Text>
        <ProgressBar value={75} />
      </div>
      <div>
        <Text size="s">100%</Text>
        <ProgressBar value={100} />
      </div>
    </Layout>
  );
}
```

### ProgressBar with Intent

```tsx
import { ProgressBar } from "@asphalt-react/progress-bar";
import { Layout } from "@asphalt-react/layout";

function ProgressIntents() {
  return (
    <Layout vertical gap="s">
      <ProgressBar value={75} />
      <ProgressBar value={75} success />
      <ProgressBar value={75} danger />
    </Layout>
  );
}
```

### Upload Progress

```tsx
import { ProgressBar } from "@asphalt-react/progress-bar";
import { Layout } from "@asphalt-react/layout";
import { Text } from "@asphalt-react/typography";

interface UploadProgressProps {
  filename: string;
  progress: number;
}

function UploadProgress({ filename, progress }: UploadProgressProps) {
  return (
    <Layout vertical gap="s">
      <Layout spread>
        <Text size="s">{filename}</Text>
        <Text size="s" muted>
          {progress}%
        </Text>
      </Layout>
      <ProgressBar value={progress} />
    </Layout>
  );
}
```

### Step Progress

```tsx
import { ProgressBar } from "@asphalt-react/progress-bar";
import { Layout } from "@asphalt-react/layout";
import { Text } from "@asphalt-react/typography";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <Layout vertical gap="s">
      <Layout spread>
        <Text size="s" bold>
          Step {currentStep} of {totalSteps}
        </Text>
        <Text size="s" muted>
          {Math.round(progress)}% complete
        </Text>
      </Layout>
      <ProgressBar value={progress} />
    </Layout>
  );
}
```

## Combined Patterns

### User Profile Card

```tsx
import { Card } from "@asphalt-react/card";
import { Avatar } from "@asphalt-react/avatar";
import { Badge, Ribbon } from "@asphalt-react/badge";
import { Tag } from "@asphalt-react/tag";
import { Layout } from "@asphalt-react/layout";
import { Heading, Text } from "@asphalt-react/typography";
import { Button } from "@asphalt-react/button";

function UserProfileCard() {
  return (
    <Card>
      <Layout vertical gap="m">
        <Ribbon>Pro Member</Ribbon>
        <Layout>
          <div className="relative">
            <Avatar size="large">JD</Avatar>
            <div className="absolute bottom-0 right-0">
              <Badge />
            </div>
          </div>
          <Layout vertical gap="s">
            <Heading h4>John Doe</Heading>
            <Text muted size="s">
              Software Engineer
            </Text>
          </Layout>
        </Layout>
        <Layout gap="s">
          <Tag>React</Tag>
          <Tag>TypeScript</Tag>
          <Tag>Node.js</Tag>
        </Layout>
        <Layout spread>
          <Button secondary>Message</Button>
          <Button primary>Follow</Button>
        </Layout>
      </Layout>
    </Card>
  );
}
```

### Notification Item

```tsx
import { Layout } from "@asphalt-react/layout";
import { Avatar } from "@asphalt-react/avatar";
import { Badge } from "@asphalt-react/badge";
import { Text } from "@asphalt-react/typography";

interface NotificationItemProps {
  user: string;
  message: string;
  time: string;
  unread: boolean;
}

function NotificationItem({
  user,
  message,
  time,
  unread,
}: NotificationItemProps) {
  return (
    <Layout spread>
      <Layout>
        <Avatar>{user.substring(0, 2).toUpperCase()}</Avatar>
        <Layout vertical gap="s">
          <Text>
            <Text bold>{user}</Text> {message}
          </Text>
          <Text muted size="xs">
            {time}
          </Text>
        </Layout>
      </Layout>
      {unread && <Badge />}
    </Layout>
  );
}
```

## Props Reference

### Badge Props

| Prop     | Type | Default | Description   |
| -------- | ---- | ------- | ------------- |
| children | node | -       | Badge content |

### Tag Props

| Prop     | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| children | node | -       | Tag text    |

### Avatar Props

| Prop      | Type | Default  | Description                |
| --------- | ---- | -------- | -------------------------- |
| children  | node | -        | Avatar content             |
| size      | enum | "medium" | Size: small, medium, large |
| uppercase | bool | false    | Uppercase text             |

### ProgressBar Props

| Prop    | Type   | Default | Description          |
| ------- | ------ | ------- | -------------------- |
| value   | number | 0       | Progress value 0-100 |
| success | bool   | false   | Success intent       |
| danger  | bool   | false   | Danger intent        |
