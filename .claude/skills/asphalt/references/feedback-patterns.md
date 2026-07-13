# Feedback Patterns

Feedback components: Modal, Flag, Loader, Popover, Tooltip.

> **Intent vocabulary.** `Button` intents are only `brand` (default),
> `danger`, `system` — there is no `<Button success>` or
> `<Button warning>`. `Flag` intents are `info`, `success`, `warning`,
> `danger`, `neutral` (+ `invalid` on `InlineFlag` only).
> Don't cross-pollinate the two.

## Modal

### Basic Modal

```tsx
import React, { useState } from "react";
import { Modal } from "@asphalt-react/modal";
import { Button } from "@asphalt-react/button";

function BasicModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button primary onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <span>Modal content goes here</span>
      </Modal>
    </>
  );
}
```

### Confirmation Modal

```tsx
import React, { useState } from "react";
import { Modal, Title, Description, Footer } from "@asphalt-react/modal";
import { Button } from "@asphalt-react/button";

function ConfirmationModal() {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    console.log("Confirmed!");
    setOpen(false);
  };

  return (
    <>
      <Button danger onClick={() => setOpen(true)}>
        Delete Item
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Title>Confirm Deletion</Title>
        <Description>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </Description>
        <Footer>
          <Button secondary onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button primary danger onClick={handleConfirm}>
            Delete
          </Button>
        </Footer>
      </Modal>
    </>
  );
}
```

### Form Modal

```tsx
import React, { useState } from "react";
import { Modal, Title, Footer } from "@asphalt-react/modal";
import { Button } from "@asphalt-react/button";
import { Textfield, Email } from "@asphalt-react/textfield";
import { Layout } from "@asphalt-react/layout";

function FormModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button primary onClick={() => setOpen(true)}>
        Add User
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Title>Add New User</Title>
        <Layout vertical gap="m">
          <Textfield stretch placeholder="Full Name" />
          <Email stretch placeholder="Email Address" />
        </Layout>
        <Footer>
          <Button secondary onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button primary>Save User</Button>
        </Footer>
      </Modal>
    </>
  );
}
```

### Modal with Legacy Support

```tsx
import React, { useRef } from "react";
import { Modal, ModalLegacy } from "@asphalt-react/modal";

function LegacyModal() {
  const modalRef = useRef(null);

  return (
    <ModalLegacy modalRef={modalRef}>
      <Modal open={true} ref={modalRef}>
        Legacy modal content
      </Modal>
    </ModalLegacy>
  );
}
```

## Flag (Alerts)

### InlineFlag

```tsx
import { InlineFlag } from "@asphalt-react/flag";

function InlineFlags() {
  return (
    <>
      <InlineFlag success>Your changes have been saved</InlineFlag>
      <InlineFlag warning>Please review your information</InlineFlag>
      <InlineFlag danger>Email format is incorrect</InlineFlag>
      <InlineFlag neutral>Processing your request</InlineFlag>
    </>
  );
}
```

### FloatingFlag

```tsx
import { FloatingFlag } from "@asphalt-react/flag";

function FloatingFlags() {
  return (
    <>
      <FloatingFlag title="Success!" success>
        File uploaded successfully
      </FloatingFlag>
      <FloatingFlag title="Warning" warning>
        Your session will expire soon
      </FloatingFlag>
      <FloatingFlag title="Error" danger>
        Failed to save changes
      </FloatingFlag>
    </>
  );
}
```

### Toast

```tsx
import { FloatingFlag, useToast } from "@asphalt-react/flag";

function Toast() {
  const { visible, show, hide } = useToast();
  return (
    <>
      <style>
        {`
          .toastPanel {
            position: fixed;
            z-index: 1;
            right: 0;
            top: 0;
            padding: 1rem;
            margin-bottom: 1rem;
            visibility: hidden;
            opacity: 0;
            transform: translateX(340px);
            transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out, transform 0.5s ease-in-out;
          }
          .toastPanel.visible {
            visibility: visible;
            opacity: 1;
            transform: translateX(0);
          }
        `}
      </style>
      <Button onClick={show}>Show Toast</Button>
      <div className={`toastPanel${visible ? " visible" : ""}`}>
        <FloatingFlag success title="Success" onDismiss={hide}>
          That was a successful demo
        </FloatingFlag>
      </div>
    </>
  );
}
```

### BannerFlag

```tsx
import { BannerFlag } from "@asphalt-react/flag";

function BannerFlags() {
  return (
    <>
      <BannerFlag title="Maintenance Notice" warning>
        Scheduled maintenance on Saturday, 2 AM - 4 AM
      </BannerFlag>
      <BannerFlag title="New Feature" success>
        Dark mode is now available in settings
      </BannerFlag>
    </>
  );
}
```

### PageFlag

```tsx
import { PageFlag } from "@asphalt-react/flag";

function PageFlags() {
  return (
    <>
      <PageFlag title="Welcome!" neutral>
        Thank you for signing up. Let's get started.
      </PageFlag>
      <PageFlag title="Account Verified" success>
        Your email has been verified successfully.
      </PageFlag>
    </>
  );
}
```

### Dismissible Flag

```tsx
import React, { useState } from "react";
import { FloatingFlag } from "@asphalt-react/flag";

function DismissibleFlag() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <FloatingFlag title="Success" success onDismiss={() => setVisible(false)}>
      Operation completed successfully
    </FloatingFlag>
  );
}
```

## Loader

### Basic Loader

```tsx
import { Loader, Spinner } from "@asphalt-react/loader";

function LoaderExamples() {
  return (
    <>
      <Loader />
      <Spinner />
    </>
  );
}
```

### Loader Sizes

```tsx
import { Loader } from "@asphalt-react/loader";
import { Layout } from "@asphalt-react/layout";

function LoaderSizes() {
  return (
    <Layout gap="s" placement="center">
      <Loader size="small" />
      <Loader size="medium" />
      <Loader size="large" />
    </Layout>
  );
}
```

### Loading State Container

```tsx
import { Loader } from "@asphalt-react/loader";
import { Layout } from "@asphalt-react/layout";
import { Text } from "@asphalt-react/typography";

function LoadingContainer() {
  return (
    <Layout vertical gap="m">
      <Loader size="large" />
      <Text muted>Loading content...</Text>
    </Layout>
  );
}
```

### Inline Loading with Spinner

```tsx
import { Spinner } from "@asphalt-react/loader";
import { Button } from "@asphalt-react/button";
import { Textfield } from "@asphalt-react/textfield";

function InlineSpinners() {
  return (
    <>
      <Button primary disabled qualifier={<Spinner />}>
        Saving...
      </Button>
      <Textfield addonEnd={<Spinner />} placeholder="Searching..." />
    </>
  );
}
```

### Page Loading State

```tsx
import { Loader } from "@asphalt-react/loader";
import { Layout } from "@asphalt-react/layout";
import { Text } from "@asphalt-react/typography";

function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Layout vertical gap="m">
        <Loader size="large" />
        <Text muted>Loading application...</Text>
      </Layout>
    </div>
  );
}
```

## Popover

### Basic Popover

```tsx
import React, { useState } from "react";
import { Popover } from "@asphalt-react/popover";
import { Button } from "@asphalt-react/button";

function BasicPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      target={<Button onClick={() => setOpen(!open)}>Click Me</Button>}
      onOpenChange={setOpen}
    >
      <p>Popover content goes here</p>
    </Popover>
  );
}
```

### Tooltip

```tsx
import { Tooltip } from "@asphalt-react/popover";
import { Button } from "@asphalt-react/button";

function TooltipExample() {
  return (
    <Tooltip target={<Button primary>Hover Me</Button>}>
      This is a helpful tooltip
    </Tooltip>
  );
}
```

### Tooltip with Accessibility

```tsx
import { Tooltip } from "@asphalt-react/popover";

function AccessibleTooltip() {
  return (
    <Tooltip
      id="help-tooltip"
      target={
        <a aria-describedby="help-tooltip" href="#">
          Need help?
        </a>
      }
    >
      Click here to access our help center
    </Tooltip>
  );
}
```

### Popover with Custom Content

```tsx
import React, { useState } from "react";
import { Popover } from "@asphalt-react/popover";
import { Button } from "@asphalt-react/button";
import { Layout } from "@asphalt-react/layout";
import { Text } from "@asphalt-react/typography";
import { Avatar } from "@asphalt-react/avatar";

function ProfilePopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      target={
        <Avatar onClick={() => setOpen(!open)}>
          <img src="/avatar.jpg" alt="User" />
        </Avatar>
      }
      onOpenChange={setOpen}
    >
      <Layout vertical gap="m">
        <Layout>
          <Avatar>JD</Avatar>
          <Layout vertical gap="s">
            <Text bold>John Doe</Text>
            <Text muted size="s">
              john@example.com
            </Text>
          </Layout>
        </Layout>
        <Button tertiary stretch>
          View Profile
        </Button>
        <Button secondary stretch>
          Sign Out
        </Button>
      </Layout>
    </Popover>
  );
}
```

### Popover with usePopover Hook

```tsx
import React, { useState } from "react";
import { BasePopover, usePopover, FocusManager } from "@asphalt-react/popover";
import { Button } from "@asphalt-react/button";

function CustomPopover() {
  const [open, setOpen] = useState(false);

  const { getTargetProps, getPopoverProps, getFocusProps } = usePopover({
    open,
    onOpenChange: setOpen,
  });

  return (
    <div>
      <Button {...getTargetProps()}>Click me</Button>
      {open && (
        <FocusManager {...getFocusProps()}>
          <BasePopover open={open} {...getPopoverProps()}>
            <p>Custom popover content</p>
          </BasePopover>
        </FocusManager>
      )}
    </div>
  );
}
```

## Combined Patterns

### Toast Notification System

```tsx
import React, { useState } from "react";
import { FloatingFlag } from "@asphalt-react/flag";
import { Button } from "@asphalt-react/button";
import { Layout } from "@asphalt-react/layout";

interface Toast {
  id: number;
  title: string;
  message: string;
  type: "success" | "warning" | "danger";
}

function ToastSystem() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: Toast["type"]) => {
    const newToast: Toast = {
      id: Date.now(),
      title: type.charAt(0).toUpperCase() + type.slice(1),
      message: `This is a ${type} notification`,
      type,
    };
    setToasts([...toasts, newToast]);
    setTimeout(() => removeToast(newToast.id), 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      <Layout>
        <Button primary onClick={() => addToast("success")}>
          Success Toast
        </Button>
        <Button secondary onClick={() => addToast("warning")}>
          Warning Toast
        </Button>
        <Button primary danger onClick={() => addToast("danger")}>
          Error Toast
        </Button>
      </Layout>

      <div className="fixed top-4 right-4 space-y-2">
        {toasts.map((toast) => (
          <FloatingFlag
            key={toast.id}
            title={toast.title}
            success={toast.type === "success"}
            warning={toast.type === "warning"}
            danger={toast.type === "danger"}
            onDismiss={() => removeToast(toast.id)}
          >
            {toast.message}
          </FloatingFlag>
        ))}
      </div>
    </>
  );
}
```

### Loading Overlay

```tsx
import { Loader } from "@asphalt-react/loader";
import { Layout } from "@asphalt-react/layout";
import { Text } from "@asphalt-react/typography";

interface LoadingOverlayProps {
  loading: boolean;
  children: React.ReactNode;
}

function LoadingOverlay({ loading, children }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {loading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <Layout vertical gap="m">
            <Loader size="large" />
            <Text muted>Processing...</Text>
          </Layout>
        </div>
      )}
    </div>
  );
}
```

## Props Reference

### Modal Props

| Prop    | Type | Default | Description      |
| ------- | ---- | ------- | ---------------- |
| open    | bool | false   | Modal visibility |
| onClose | func | -       | Close callback   |

### Flag Props

| Prop      | Type   | Default | Description      |
| --------- | ------ | ------- | ---------------- |
| title     | string | -       | Flag title       |
| children  | node   | -       | Flag content     |
| success   | bool   | false   | Success intent   |
| warning   | bool   | false   | Warning intent   |
| danger    | bool   | false   | Danger intent    |
| neutral   | bool   | false   | Neutral intent   |
| onDismiss | func   | -       | Dismiss callback |

### Popover Props

| Prop         | Type | Default | Description         |
| ------------ | ---- | ------- | ------------------- |
| open         | bool | false   | Popover visibility  |
| target       | node | -       | Trigger element     |
| onOpenChange | func | -       | Open state callback |
| children     | node | -       | Popover content     |

### Tooltip Props

| Prop     | Type   | Default | Description      |
| -------- | ------ | ------- | ---------------- |
| target   | node   | -       | Trigger element  |
| children | node   | -       | Tooltip content  |
| id       | string | -       | Accessibility ID |
