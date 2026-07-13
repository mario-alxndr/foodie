# Form Patterns

Form components: Textfield, Checkbox, Radio, Selection, ToggleSwitch, FileUploader, DatePicker, Slider.

## Text Input

### Basic Textfield

```tsx
import { Textfield, Email, Search, Password } from "@asphalt-react/textfield";

function TextInputs() {
  return (
    <>
      <Textfield placeholder="Enter your name" />
      <Email placeholder="Enter your email" />
      <Password placeholder="Enter password" />
      <Search placeholder="Search..." />
    </>
  );
}
```

### Textfield with Validation

```tsx
import { Textfield } from "@asphalt-react/textfield";

function ValidatedInput() {
  const [value, setValue] = React.useState("");
  const [invalid, setInvalid] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    setInvalid(val.length < 3);
  };

  return (
    <Textfield
      value={value}
      onChange={handleChange}
      invalid={invalid}
      placeholder="Min 3 characters"
    />
  );
}
```

### Textfield with Addon

```tsx
import {
  useInput,
  InputWrapper,
  InputQualifier,
  InputAddOn,
  Input,
} from "@asphalt-react/textfield";
import { Button } from "@asphalt-react/button";
import { Search, Add } from "@asphalt-react/iconpack";

function TextfieldWithAddon() {
  const { getInputProps, getWrapperProps, getQualifierProps } = useInput({
    size: "m",
    stretch: true,
  });

  return (
    <InputWrapper {...getWrapperProps()}>
      <InputQualifier {...getQualifierProps()}>
        <Search />
      </InputQualifier>

      <Input {...getInputProps()} placeholder="Search..." />

      <InputAddOn>
        <Button icon>
          <Add />
        </Button>
      </InputAddOn>
    </InputWrapper>
  );
}
```

### Search with Full Width

```tsx
import { Search } from "@asphalt-react/textfield";

<Search stretch placeholder="Search products..." />;
```

### Textfield with Loading Spinner

```tsx
import { Textfield } from "@asphalt-react/textfield";
import { Spinner } from "@asphalt-react/loader";

function LoadingInput() {
  return <Textfield addonEnd={<Spinner />} placeholder="Loading..." />;
}
```

## Checkbox

### Single Checkbox

```tsx
import { Checkbox } from "@asphalt-react/checkbox";

function SingleCheckbox() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox
      value="terms"
      label="I agree to the terms and conditions"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}
```

### Checkbox Group

```tsx
import { Checkbox } from "@asphalt-react/checkbox";
import { Layout } from "@asphalt-react/layout";

function CheckboxGroup() {
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleChange = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <Layout vertical gap="s">
      <Checkbox
        value="email"
        label="Email notifications"
        checked={selected.includes("email")}
        onChange={() => handleChange("email")}
      />
      <Checkbox
        value="sms"
        label="SMS notifications"
        checked={selected.includes("sms")}
        onChange={() => handleChange("sms")}
      />
      <Checkbox
        value="push"
        label="Push notifications"
        checked={selected.includes("push")}
        onChange={() => handleChange("push")}
      />
    </Layout>
  );
}
```

## Radio Button

### Radio Group

```tsx
import { Radio } from "@asphalt-react/radio";
import { Layout } from "@asphalt-react/layout";

function RadioGroup() {
  const [payment, setPayment] = React.useState("card");

  return (
    <Layout vertical gap="s">
      <Radio
        name="payment"
        value="card"
        label="Credit Card"
        checked={payment === "card"}
        onChange={() => setPayment("card")}
      />
      <Radio
        name="payment"
        value="bank"
        label="Bank Transfer"
        checked={payment === "bank"}
        onChange={() => setPayment("bank")}
      />
      <Radio
        name="payment"
        value="wallet"
        label="Digital Wallet"
        checked={payment === "wallet"}
        onChange={() => setPayment("wallet")}
      />
    </Layout>
  );
}
```

## Toggle Switch

### Basic Toggle

```tsx
import { ToggleSwitch } from "@asphalt-react/toggle-switch";

function BasicToggle() {
  const [enabled, setEnabled] = React.useState(false);

  return <ToggleSwitch on={enabled} onToggle={({ on }) => setEnabled(on)} />;
}
```

### Toggle with Label

```tsx
import { ToggleSwitch } from "@asphalt-react/toggle-switch";
import { Layout } from "@asphalt-react/layout";
import { Text } from "@asphalt-react/typography";

function LabeledToggle() {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <Layout spread>
      <Text>Dark Mode</Text>
      <ToggleSwitch on={darkMode} onToggle={({ on }) => setDarkMode(on)} />
    </Layout>
  );
}
```

## Dropdown Selection

### Basic Dropdown

```tsx
import { Dropdown } from "@asphalt-react/selection";

function BasicDropdown() {
  const items = [
    { id: "1", key: "Apple" },
    { id: "2", key: "Banana" },
    { id: "3", key: "Orange" },
    { id: "4", key: "Mango" },
  ];

  return <Dropdown items={items} placeholder="Select a fruit" />;
}
```

### Grouped Dropdown

```tsx
import { Dropdown } from "@asphalt-react/selection";

function GroupedDropdown() {
  const items = [
    {
      id: "fruits",
      key: "Fruits",
      selectable: false,
      subitems: [
        { id: "1", key: "Apple" },
        { id: "2", key: "Banana" },
      ],
    },
    {
      id: "vegetables",
      key: "Vegetables",
      selectable: false,
      subitems: [
        { id: "3", key: "Carrot" },
        { id: "4", key: "Broccoli" },
      ],
    },
  ];

  return <Dropdown group items={items} placeholder="Select food" />;
}
```

### Dropdown with Custom Display

```tsx
import { Dropdown } from "@asphalt-react/selection";
import { Avatar } from "@asphalt-react/avatar";

function AvatarDropdown() {
  const items = [
    { id: "1", label: "John Doe", initials: "JD" },
    { id: "2", label: "Jane Smith", initials: "JS" },
  ];

  const getAddonStart = (item: (typeof items)[0]) => (
    <Avatar uppercase>{item.initials}</Avatar>
  );

  return (
    <Dropdown
      items={items}
      displayKey="label"
      getAddonStart={getAddonStart}
      placeholder="Select user"
    />
  );
}
```

### Multi-Select Dropdown

```tsx
import { Dropdown } from "@asphalt-react/selection";
import { Text } from "@asphalt-react/typography";

function MultiSelectDropdown() {
  const items = [
    { id: "1", key: "React" },
    { id: "2", key: "Vue" },
    { id: "3", key: "Angular" },
    { id: "4", key: "Svelte" },
  ];

  return (
    <Dropdown
      items={items}
      multi
      selectAll={<Text>Select All</Text>}
      placeholder="Select frameworks"
    />
  );
}
```

## File Uploader

### Basic File Upload

```tsx
import { FileUploader } from "@asphalt-react/file-uploader";

function BasicFileUpload() {
  const handleChange = (
    acceptedFiles: File[],
    { rejectedFiles, event }: { rejectedFiles: File[]; event: Event },
  ) => {
    console.log("Accepted:", acceptedFiles);
    console.log("Rejected:", rejectedFiles);
  };

  return <FileUploader onChange={handleChange} />;
}
```

### Drag and Drop Upload

```tsx
import { FileUploader } from "@asphalt-react/file-uploader";

function DragDropUpload() {
  const accept = {
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
  };

  const handleChange = (acceptedFiles: File[]) => {
    console.log("Files:", acceptedFiles);
  };

  return <FileUploader drop onChange={handleChange} accept={accept} multiple />;
}
```

### File Uploader with Type Restrictions

```tsx
import { FileUploader } from "@asphalt-react/file-uploader";

function RestrictedUpload() {
  const accept = {
    "application/pdf": [".pdf"],
    "application/msword": [".doc", ".docx"],
  };

  return <FileUploader accept={accept} />;
}
```

## Date Picker

### Basic Date Picker

```tsx
import { DatePicker } from "@asphalt-react/date-picker";

function BasicDatePicker() {
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={(newDate, { event }) => setDate(newDate)}
    />
  );
}
```

### Date Range Picker

```tsx
import { DatePicker } from "@asphalt-react/date-picker";

function DateRangePicker() {
  const [dateRange, setDateRange] = React.useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  return (
    <DatePicker
      range
      value={dateRange}
      onChange={(dates, { event }) => setDateRange(dates)}
    />
  );
}
```

## Time Picker

### Basic TimePicker (12-hour, default)

```tsx
import React, { useState } from "react";
import { TimePicker } from "@asphalt-react/time-picker";

function BasicTimePicker() {
  const [time, setTime] = useState<Date[]>([new Date(2024, 0, 1, 9, 0)]);

  return (
    <TimePicker
      value={time}
      onChange={(next) => setTime(next)}
      onError={(err) => console.warn(err)}
    />
  );
}
```

`value` is **always an array** — `[start]` for single picker,
`[start, end]` for range. `onChange` receives the same shape.

### 24-hour format

```tsx
import { TimePicker } from "@asphalt-react/time-picker";

<TimePicker
  value={[new Date()]}
  onChange={(t) => console.log(t)}
  meridiem={false}        // 24-hour
  minuteStep={5}          // 1 | 5 | 10 | 15
/>;
```

### Time Range

```tsx
import React, { useState } from "react";
import { TimePicker } from "@asphalt-react/time-picker";

function TimeRangePicker() {
  const [range, setRange] = useState<Date[]>([
    new Date(2024, 0, 1, 9, 0),
    new Date(2024, 0, 1, 17, 0),
  ]);

  return (
    <TimePicker
      range
      native={false}        // range needs the custom picker, not native UI
      value={range}
      onChange={setRange}
    />
  );
}
```

### Invalid state with error handling

```tsx
import React, { useState } from "react";
import { TimePicker } from "@asphalt-react/time-picker";
import { UserInvalidTime } from "@asphalt-react/time-picker";

function ValidatedTimePicker() {
  const [time, setTime] = useState<Date[]>([new Date()]);
  const [invalid, setInvalid] = useState(false);

  return (
    <TimePicker
      stretch
      value={time}
      onChange={(next) => {
        setInvalid(false);
        setTime(next);
      }}
      invalid={invalid}
      onError={(err) => {
        if (err instanceof UserInvalidTime) setInvalid(true);
      }}
    />
  );
}
```

### TimePicker Props (highlights)

| Prop          | Type        | Default   | Description                                          |
| ------------- | ----------- | --------- | ---------------------------------------------------- |
| `value`       | `Date[]`    | _req._    | `[start]` or `[start, end]` (with `range`)           |
| `onChange`    | function    | _req._    | `(time: Date[], event) => void`                      |
| `onError`     | function    | -         | Receives `InvalidTime` / `UserInvalidTime` errors    |
| `meridiem`    | bool        | `true`    | `true` = 12h, `false` = 24h                          |
| `minuteStep` | enum (1/5/10/15) | `15` | Increment for minutes                                |
| `range`       | bool        | `false`   | Range picker (requires `native={false}`)             |
| `native`      | bool        | `true`    | Use native UI on touch devices                       |
| `size`        | enum        | `"m"`     | `m \| l`                                              |
| `stretch`     | bool        | `false`   | Input takes parent width                             |
| `invalid` / `disabled` | bool | `false` | Visual states                                   |

## Slider

### Basic Slider

```tsx
import { Slider } from "@asphalt-react/slider";

function BasicSlider() {
  const [value, setValue] = React.useState(50);

  return (
    <Slider
      value={value}
      onChange={(newValue, { event }) => setValue(newValue)}
    />
  );
}
```

### Slider with Markers

```tsx
import { Slider } from "@asphalt-react/slider";

function MarkedSlider() {
  const [value, setValue] = React.useState(25);

  const markers = [
    { value: 0, label: "0%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ];

  return (
    <Slider
      value={value}
      markers={markers}
      onChange={(newValue) => setValue(newValue)}
    />
  );
}
```

## Complete Form Example

```tsx
import { Layout } from "@asphalt-react/layout";
import { Textfield, Email } from "@asphalt-react/textfield";
import { Dropdown } from "@asphalt-react/selection";
import { Checkbox } from "@asphalt-react/checkbox";
import { Button } from "@asphalt-react/button";
import { Heading, Text } from "@asphalt-react/typography";

interface FormData {
  name: string;
  email: string;
  country: string;
  terms: boolean;
}

function RegistrationForm() {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    country: "",
    terms: false,
  });

  const countries = [
    { id: "us", key: "United States" },
    { id: "uk", key: "United Kingdom" },
    { id: "ca", key: "Canada" },
    { id: "au", key: "Australia" },
  ];

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <Layout vertical gap="m">
      <Heading h3>Registration</Heading>

      <Layout vertical gap="m">
        <div>
          <Text bold>Name</Text>
          <Textfield
            stretch
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <Text bold>Email</Text>
          <Email
            stretch
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter your email"
          />
        </div>

        <div>
          <Text bold>Country</Text>
          <Dropdown
            items={countries}
            placeholder="Select your country"
            onSelect={(item) => setFormData({ ...formData, country: item.key })}
          />
        </div>

        <Checkbox
          value="terms"
          label="I agree to the terms and conditions"
          checked={formData.terms}
          onChange={(e) =>
            setFormData({ ...formData, terms: e.target.checked })
          }
        />

        <Layout spread>
          <Button tertiary>Cancel</Button>
          <Button primary onClick={handleSubmit}>
            Register
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
}
```

## Props Reference

### Textfield Props

| Prop        | Type   | Default | Description        |
| ----------- | ------ | ------- | ------------------ |
| size        | enum   | "m"     | Size: xs, s, m, l  |
| stretch     | bool   | false   | Full width         |
| invalid     | bool   | false   | Show invalid state |
| disabled    | bool   | false   | Disable input      |
| placeholder | string | -       | Placeholder text   |

### Dropdown Props

| Prop        | Type   | Default | Description               |
| ----------- | ------ | ------- | ------------------------- |
| items       | array  | -       | Array of items            |
| displayKey  | string | "key"   | Key for display value     |
| multi       | bool   | false   | Enable multi-select       |
| group       | bool   | false   | Enable grouped items      |
| selectAll   | node   | -       | Select all option content |
| placeholder | string | -       | Placeholder text          |

### ToggleSwitch Props

| Prop     | Type | Default | Description           |
| -------- | ---- | ------- | --------------------- |
| on       | bool | false   | Toggle state          |
| onToggle | func | -       | Toggle change handler |
| disabled | bool | false   | Disable toggle        |
