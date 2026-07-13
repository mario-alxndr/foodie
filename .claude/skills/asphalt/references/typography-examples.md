# Typography Examples

Typography components: Heading, Text, Display, Code.

## Heading

### Heading Levels

```tsx
import { Heading } from "@asphalt-react/typography";

function HeadingLevels() {
  return (
    <>
      <Heading h1>Heading 1</Heading>
      <Heading h2>Heading 2</Heading>
      <Heading h3>Heading 3</Heading>
      <Heading h4>Heading 4</Heading>
      <Heading h5>Heading 5</Heading>
      <Heading h6>Heading 6</Heading>
    </>
  );
}
```

### Page Title

```tsx
import { Heading, Text } from "@asphalt-react/typography";
import { Layout } from "@asphalt-react/layout";

function PageTitle() {
  return (
    <Layout vertical gap="s">
      <Heading h1>Dashboard</Heading>
      <Text muted>Welcome back! Here's what's happening today.</Text>
    </Layout>
  );
}
```

### Section Header

```tsx
import { Heading, Text } from "@asphalt-react/typography";
import { Layout } from "@asphalt-react/layout";

function SectionHeader() {
  return (
    <Layout vertical gap="s">
      <Heading h3>Recent Orders</Heading>
      <Text secondary size="s">
        Showing orders from the last 7 days
      </Text>
    </Layout>
  );
}
```

## Text

### Text Sizes

```tsx
import { Text } from "@asphalt-react/typography";
import { Layout } from "@asphalt-react/layout";

function TextSizes() {
  return (
    <Layout vertical gap="s">
      <Text size="xs">Extra small text (xs)</Text>
      <Text size="s">Small text (s)</Text>
      <Text size="m">Medium text (m) - default</Text>
      <Text size="l">Large text (l)</Text>
    </Layout>
  );
}
```

### Text Weights

```tsx
import { Text } from "@asphalt-react/typography";
import { Layout } from "@asphalt-react/layout";

function TextWeights() {
  return (
    <Layout vertical gap="s">
      <Text>Regular text</Text>
      <Text bold>Bold text</Text>
    </Layout>
  );
}
```

### Text Intents (Colors)

```tsx
import { Text } from "@asphalt-react/typography";
import { Layout } from "@asphalt-react/layout";

function TextIntents() {
  return (
    <Layout vertical gap="s">
      <Text primary>Primary text (default)</Text>
      <Text secondary>Secondary text</Text>
      <Text muted>Muted text</Text>
      <Text brand>Brand text</Text>
    </Layout>
  );
}
```

### Text with Inline Emphasis

```tsx
import { Text } from "@asphalt-react/typography";

function TextEmphasis() {
  return (
    <Text>
      This is regular text with <Text bold>bold emphasis</Text> and{" "}
      <Text brand>brand colored</Text> words inline.
    </Text>
  );
}
```

### Truncated Text

```tsx
import { Text } from "@asphalt-react/typography";

function TruncatedText() {
  return (
    <div style={{ width: "200px" }}>
      <Text ellipsis>
        This is a very long text that will be truncated with an ellipsis
      </Text>
    </div>
  );
}
```

### Text as Different Elements

```tsx
import { Text } from "@asphalt-react/typography";

function TextElements() {
  return (
    <>
      <Text p>This renders as a paragraph element</Text>
      <Text span>This renders as a span element</Text>
      <Text div>This renders as a div element</Text>
    </>
  );
}
```

## Display

### Display Text

```tsx
import { Display } from "@asphalt-react/typography";

function DisplayText() {
  return <Display>The quick brown fox jumps over the lazy dog</Display>;
}
```

### Hero Section

```tsx
import { Display, Text } from "@asphalt-react/typography";
import { Layout } from "@asphalt-react/layout";
import { Button } from "@asphalt-react/button";

function HeroSection() {
  return (
    <Layout vertical gap="l">
      <Display>Build beautiful products faster</Display>
      <Text size="l" secondary>
        The Asphalt Design System provides everything you need to create
        stunning user interfaces.
      </Text>
      <Layout>
        <Button primary>Get Started</Button>
        <Button secondary>Learn More</Button>
      </Layout>
    </Layout>
  );
}
```

## Code

### Inline Code

```tsx
import { Code, Text } from "@asphalt-react/typography";

function InlineCode() {
  return (
    <Text>
      Install the package using <Code>npm install @asphalt-react/button</Code>
    </Text>
  );
}
```

### Code Block

```tsx
import { Code } from "@asphalt-react/typography";

function CodeBlock() {
  return (
    <Code>
      {`import { Button } from '@asphalt-react/button'

function App() {
  return <Button primary>Click me</Button>
}`}
    </Code>
  );
}
```

## Combined Patterns

### Article Header

```tsx
import { Heading, Text } from "@asphalt-react/typography";
import { Layout } from "@asphalt-react/layout";
import { Avatar } from "@asphalt-react/avatar";
import { Tag } from "@asphalt-react/tag";

function ArticleHeader() {
  return (
    <Layout vertical gap="m">
      <Layout gap="s">
        <Tag>Technology</Tag>
        <Tag>React</Tag>
      </Layout>
      <Heading h1>Building Scalable React Applications</Heading>
      <Layout>
        <Avatar>JD</Avatar>
        <Layout vertical gap="s">
          <Text bold>John Doe</Text>
          <Text muted size="s">
            Published on January 15, 2024 · 5 min read
          </Text>
        </Layout>
      </Layout>
    </Layout>
  );
}
```

### Stats Card

```tsx
import { Heading, Text } from "@asphalt-react/typography";
import { Layout } from "@asphalt-react/layout";
import { Card } from "@asphalt-react/card";

function StatsCard() {
  return (
    <Card>
      <Layout vertical gap="s">
        <Text muted size="s">
          Total Revenue
        </Text>
        <Heading h2>$45,231.89</Heading>
        <Text brand size="s">
          +20.1% from last month
        </Text>
      </Layout>
    </Card>
  );
}
```

### Feature Description

```tsx
import { Heading, Text } from "@asphalt-react/typography";
import { Layout } from "@asphalt-react/layout";

function FeatureDescription() {
  return (
    <Layout vertical gap="m">
      <Heading h3>Lightning Fast</Heading>
      <Text secondary>
        Our components are optimized for performance. Built with modern React
        patterns and minimal dependencies to ensure your application stays fast.
      </Text>
      <Text size="s" muted>
        Average load time: 50ms
      </Text>
    </Layout>
  );
}
```

### Empty State

```tsx
import { Heading, Text } from "@asphalt-react/typography";
import { Layout } from "@asphalt-react/layout";
import { Button } from "@asphalt-react/button";

function EmptyState() {
  return (
    <Layout vertical gap="m">
      <Heading h4>No results found</Heading>
      <Text muted>
        We couldn't find any items matching your search. Try adjusting your
        filters or search terms.
      </Text>
      <Button secondary>Clear Filters</Button>
    </Layout>
  );
}
```

### Price Display

```tsx
import { Heading, Text } from "@asphalt-react/typography";
import { Layout } from "@asphalt-react/layout";

function PriceDisplay() {
  return (
    <Layout vertical gap="s">
      <Layout>
        <Text muted size="s">
          Starting at
        </Text>
      </Layout>
      <Layout>
        <Heading h2>$29</Heading>
        <Text muted>/month</Text>
      </Layout>
      <Text secondary size="s">
        Billed annually
      </Text>
    </Layout>
  );
}
```

### List with Labels

```tsx
import { Text } from "@asphalt-react/typography";
import { Layout } from "@asphalt-react/layout";

function LabeledList() {
  const items = [
    { label: "Status", value: "Active" },
    { label: "Created", value: "Jan 15, 2024" },
    { label: "Last Updated", value: "2 hours ago" },
  ];

  return (
    <Layout vertical gap="s">
      {items.map((item) => (
        <Layout spread key={item.label}>
          <Text muted>{item.label}</Text>
          <Text>{item.value}</Text>
        </Layout>
      ))}
    </Layout>
  );
}
```

## Props Reference

### Heading Props

| Prop  | Type | Default | Description   |
| ----- | ---- | ------- | ------------- |
| h1-h6 | bool | -       | Heading level |

### Text Props

| Prop      | Type | Default | Description              |
| --------- | ---- | ------- | ------------------------ |
| size      | enum | "m"     | Size: xs, s, m, l        |
| bold      | bool | false   | Bold weight              |
| p         | bool | false   | Render as paragraph      |
| span      | bool | false   | Render as span           |
| div       | bool | false   | Render as div            |
| primary   | bool | false   | Primary intent (default) |
| secondary | bool | false   | Secondary intent         |
| brand     | bool | false   | Brand intent             |
| onBrand   | bool | false   | For brand backgrounds    |
| muted     | bool | false   | Muted intent             |
| ellipsis  | bool | false   | Truncate with ellipsis   |
