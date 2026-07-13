# Data Display Patterns

Data components: DataTable, Table, Accordion, Pagination, Actionlist.

> **DataTable vs Table.** Use `DataTable` for sortable, paginated,
> data-driven tables (header + data arrays). Use the low-level
> `Table` family when you need full control over the markup
> (sticky rows, cell composition with `Avatar`/`Tag`/`Checkbox`,
> custom alignment per cell). Don't reach for `<table>` raw HTML.

## Table (low-level)

`@asphalt-react/table` exposes building blocks you compose by hand:
`Table`, `TableHead`, `TableHeadRow`, `TableHeadCell` (+
`TableHeadCellText`, `TableHeadCellAction`, `TableHeadCellIcon`),
`TableBody`, `TableBodyRow`, `TableBodyCell`, and the `useTable` hook.

### Basic Table

```tsx
import {
  Table,
  TableHead,
  TableHeadRow,
  TableHeadCell,
  TableBody,
  TableBodyRow,
  TableBodyCell,
} from "@asphalt-react/table";

function BasicTable() {
  return (
    <Table>
      <TableHead>
        <TableHeadRow>
          <TableHeadCell>First Name</TableHeadCell>
          <TableHeadCell>Last Name</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
        </TableHeadRow>
      </TableHead>
      <TableBody>
        <TableBodyRow>
          <TableBodyCell>John</TableBodyCell>
          <TableBodyCell>Kennedy</TableBodyCell>
          <TableBodyCell>john@example.com</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>George</TableBodyCell>
          <TableBodyCell>Bush</TableBodyCell>
          <TableBodyCell>george@example.com</TableBodyCell>
        </TableBodyRow>
      </TableBody>
    </Table>
  );
}
```

### Cell appearance (enclosed / fenced / nude) + size

Three appearance modes:

- **`enclosed`** (default) — borders on all sides of cells.
- **`fenced`** — only a bottom border separating rows.
- **`nude`** — no visual distinction between cells.

```tsx
import { Table, TableHead, TableBody } from "@asphalt-react/table";

<Table fenced>...</Table>
<Table nude>...</Table>
```

Cells support 3 sizes (`small | medium | large`) and 3 alignments
(`leftAlign` default, `centerAlign`, `rightAlign`).

```tsx
<TableBodyCell size="small" rightAlign>
  $42.00
</TableBodyCell>
```

> If you set multiple competing alignment/size props on a cell, the
> component falls back to its default — e.g.
> `<TableBodyCell rightAlign centerAlign>` resolves to `leftAlign`.

### Row state — hover & selected

```tsx
<TableBodyRow hover>...</TableBodyRow>
<TableBodyRow selected>...</TableBodyRow>
```

### Rich cells (composing with Asphalt components)

```tsx
import {
  Table,
  TableHead,
  TableHeadRow,
  TableHeadCell,
  TableBody,
  TableBodyRow,
  TableBodyCell,
} from "@asphalt-react/table";
import { Avatar } from "@asphalt-react/avatar";
import { Tag } from "@asphalt-react/tag";
import { Layout } from "@asphalt-react/layout";
import { Text } from "@asphalt-react/typography";

interface Row {
  id: string;
  name: string;
  email: string;
  status: "active" | "pending";
}

function RichTable({ rows }: { rows: Row[] }) {
  return (
    <Table fenced>
      <TableHead>
        <TableHeadRow>
          <TableHeadCell>User</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
        </TableHeadRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableBodyRow hover key={row.id}>
            <TableBodyCell>
              <Layout>
                <Avatar uppercase>{row.name.slice(0, 2)}</Avatar>
                <Layout vertical gap="s">
                  <Text bold>{row.name}</Text>
                  <Text muted size="s">
                    {row.email}
                  </Text>
                </Layout>
              </Layout>
            </TableBodyCell>
            <TableBodyCell>
              <Tag success={row.status === "active"} warning={row.status === "pending"}>
                {row.status}
              </Tag>
            </TableBodyCell>
          </TableBodyRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### `useTable` hook (centralized props)

```tsx
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

function HookedTable() {
  const { getTableProps, getHeadCellProps, getBodyCellProps } = useTable({
    contentFit: true,
    size: "small",
    fenced: true,
  });

  return (
    <Table {...getTableProps()}>
      <TableHead>
        <TableHeadRow>
          <TableHeadCell {...getHeadCellProps()}>Name</TableHeadCell>
          <TableHeadCell {...getHeadCellProps()}>Age</TableHeadCell>
        </TableHeadRow>
      </TableHead>
      <TableBody>
        <TableBodyRow>
          <TableBodyCell {...getBodyCellProps()}>John</TableBodyCell>
          <TableBodyCell {...getBodyCellProps()}>43</TableBodyCell>
        </TableBodyRow>
      </TableBody>
    </Table>
  );
}
```

## DataTable

### Basic DataTable

```tsx
import { DataTable } from "@asphalt-react/data-table";

interface User {
  uniqueId: string;
  email: string;
  firstName: string;
  age: number;
}

function BasicDataTable() {
  const header = [
    { key: "email", value: "Email" },
    { key: "firstName", value: "First Name" },
    { key: "age", value: "Age" },
  ];

  const data: User[] = [
    {
      uniqueId: "user-001",
      email: "john@example.com",
      firstName: "John",
      age: 28,
    },
    {
      uniqueId: "user-002",
      email: "jane@example.com",
      firstName: "Jane",
      age: 32,
    },
    {
      uniqueId: "user-003",
      email: "bob@example.com",
      firstName: "Bob",
      age: 45,
    },
  ];

  return <DataTable header={header} data={data} identifier="uniqueId" />;
}
```

### DataTable with Auto Pagination

```tsx
import { DataTable } from "@asphalt-react/data-table";

function PaginatedDataTable() {
  const header = [
    { key: "id", value: "ID" },
    { key: "name", value: "Name" },
    { key: "status", value: "Status" },
  ];

  const data = Array.from({ length: 100 }, (_, i) => ({
    uniqueId: `item-${i}`,
    id: i + 1,
    name: `Item ${i + 1}`,
    status: i % 2 === 0 ? "Active" : "Inactive",
  }));

  return (
    <DataTable
      header={header}
      data={data}
      identifier="uniqueId"
      autoPaginate
      paginationLink={false}
    />
  );
}
```

### DataTable with Loading State

```tsx
import { DataTable } from "@asphalt-react/data-table";
import { Loader } from "@asphalt-react/loader";
import { Text } from "@asphalt-react/typography";

function LoadingDataTable() {
  const header = [
    { key: "name", value: "Name" },
    { key: "email", value: "Email" },
  ];

  const CustomLoader = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader size="large" />
      <Text>Loading data...</Text>
    </div>
  );

  return (
    <DataTable
      header={header}
      data={[]}
      identifier="id"
      loading={true}
      loadingComponent={CustomLoader}
    />
  );
}
```

### DataTable with Error State

```tsx
import { DataTable } from "@asphalt-react/data-table";
import { Button } from "@asphalt-react/button";
import { Text } from "@asphalt-react/typography";

function ErrorDataTable() {
  const header = [
    { key: "name", value: "Name" },
    { key: "email", value: "Email" },
  ];

  const CustomError = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <Text>Failed to load data. Please try again.</Text>
      <Button onClick={() => window.location.reload()}>Retry</Button>
    </div>
  );

  return (
    <DataTable
      header={header}
      data={[]}
      identifier="id"
      error={true}
      errorComponent={CustomError}
    />
  );
}
```

### DataTable with Empty State

```tsx
import { DataTable } from "@asphalt-react/data-table";
import { Text } from "@asphalt-react/typography";

function EmptyDataTable() {
  const header = [
    { key: "name", value: "Name" },
    { key: "email", value: "Email" },
  ];

  const CustomEmpty = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <Text>No data available</Text>
    </div>
  );

  return (
    <DataTable
      header={header}
      data={[]}
      identifier="id"
      emptyComponent={CustomEmpty}
    />
  );
}
```

### DataTable with Custom Pagination (usePagination Hook)

```tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataTable, usePagination } from "@asphalt-react/data-table";

interface TableRow {
  uniqueId: string;
  name: string;
  email: string;
}

function CustomPaginatedDataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPerPage, setCurrentPerPage] = useState(10);

  const header = [
    { key: "name", value: "Name" },
    { key: "email", value: "Email" },
  ];

  const tableData: TableRow[] = Array.from({ length: 100 }, (_, i) => ({
    uniqueId: `user-${i}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }));

  const handlePaginationChange = ({
    event,
    page,
    record,
  }: {
    event: React.MouseEvent;
    page?: number;
    record?: number;
  }) => {
    event.preventDefault();

    if (page && page !== currentPage) {
      setCurrentPage(page);
    }

    if (record && record !== currentPerPage) {
      setCurrentPerPage(record);
      setCurrentPage(1);
    }
  };

  const handleTileProps = ({
    page,
    record,
  }: {
    page: number;
    record: number;
  }) => ({
    to: `?page=${page}&perPage=${record}`,
  });

  const { getPaginationProps, getSlicedData } = usePagination({
    activePage: currentPage,
    activePerPage: currentPerPage,
    onChange: handlePaginationChange,
    getTileProps: handleTileProps,
    data: tableData,
    as: Link,
    link: true,
  });

  const currentData = getSlicedData(tableData);

  return (
    <DataTable
      header={header}
      data={currentData}
      identifier="uniqueId"
      {...getPaginationProps()}
    />
  );
}
```

### DataTable with Search

```tsx
import React, { useState, useMemo } from "react";
import { DataTable } from "@asphalt-react/data-table";
import { Search } from "@asphalt-react/textfield";
import { Layout } from "@asphalt-react/layout";

function SearchableDataTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const header = [
    { key: "name", value: "Name" },
    { key: "email", value: "Email" },
    { key: "role", value: "Role" },
  ];

  const allData = [
    {
      uniqueId: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    },
    {
      uniqueId: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
    },
    {
      uniqueId: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "User",
    },
  ];

  const filteredData = useMemo(() => {
    if (!searchQuery) return allData;
    const query = searchQuery.toLowerCase();
    return allData.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  return (
    <Layout vertical gap="m">
      <Search
        stretch
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <DataTable
        header={header}
        data={filteredData}
        identifier="uniqueId"
        autoPaginate
      />
    </Layout>
  );
}
```

## Accordion

### Basic Accordion

```tsx
import {
  Accordion,
  AccordionHeader,
  AccordionDescription,
} from "@asphalt-react/accordion";

function BasicAccordion() {
  return (
    <Accordion>
      <AccordionHeader>What is your return policy?</AccordionHeader>
      <AccordionDescription>
        You can return any item within 30 days of purchase for a full refund.
      </AccordionDescription>
    </Accordion>
  );
}
```

### Accordion Group (Single Open)

```tsx
import {
  Accordion,
  AccordionHeader,
  AccordionDescription,
} from "@asphalt-react/accordion";

function AccordionGroup() {
  return (
    <>
      <Accordion name="faq">
        <AccordionHeader>Question 1</AccordionHeader>
        <AccordionDescription>Answer to question 1</AccordionDescription>
      </Accordion>
      <Accordion name="faq">
        <AccordionHeader>Question 2</AccordionHeader>
        <AccordionDescription>Answer to question 2</AccordionDescription>
      </Accordion>
      <Accordion name="faq">
        <AccordionHeader>Question 3</AccordionHeader>
        <AccordionDescription>Answer to question 3</AccordionDescription>
      </Accordion>
    </>
  );
}
```

### Connected Accordion (Visually Joined)

```tsx
import {
  Accordion,
  AccordionHeader,
  AccordionDescription,
} from "@asphalt-react/accordion";

function ConnectedAccordion() {
  return (
    <>
      <Accordion stickBottom>
        <AccordionHeader>First Section</AccordionHeader>
        <AccordionDescription>First section content</AccordionDescription>
      </Accordion>
      <Accordion stickTop stickBottom>
        <AccordionHeader>Middle Section</AccordionHeader>
        <AccordionDescription>Middle section content</AccordionDescription>
      </Accordion>
      <Accordion stickTop>
        <AccordionHeader>Last Section</AccordionHeader>
        <AccordionDescription>Last section content</AccordionDescription>
      </Accordion>
    </>
  );
}
```

### FAQ Accordion

```tsx
import {
  Accordion,
  AccordionHeader,
  AccordionDescription,
} from "@asphalt-react/accordion";
import { Layout } from "@asphalt-react/layout";
import { Heading } from "@asphalt-react/typography";

function FAQAccordion() {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click the Sign Up button and follow the registration process.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit cards, PayPal, and bank transfers.",
    },
    {
      question: "How can I track my order?",
      answer: "You can track your order in the Orders section of your account.",
    },
  ];

  return (
    <Layout vertical gap="m">
      <Heading h3>Frequently Asked Questions</Heading>
      {faqs.map((faq, index) => (
        <Accordion key={index} name="faq">
          <AccordionHeader>{faq.question}</AccordionHeader>
          <AccordionDescription>{faq.answer}</AccordionDescription>
        </Accordion>
      ))}
    </Layout>
  );
}
```

## Pagination

### Basic Pagination

```tsx
import React, { useState } from "react";
import { Pagination, PerPage } from "@asphalt-react/pagination";
import { Layout } from "@asphalt-react/layout";

function BasicPagination() {
  const [active, setActive] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const handlePageChange = (e: React.MouseEvent, pageNum: number) => {
    setActive(pageNum);
  };

  const handlePerPageChange = (e: React.MouseEvent, records: number) => {
    setPerPage(records);
    setActive(1);
  };

  return (
    <Layout spread>
      <Pagination totalPages={50} active={active} onChange={handlePageChange} />
      <PerPage
        recordsPerPage={[10, 25, 50, 100]}
        active={perPage}
        onChange={handlePerPageChange}
      />
    </Layout>
  );
}
```

### Pagination with Router Links

```tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pagination, PerPage } from "@asphalt-react/pagination";
import { Layout } from "@asphalt-react/layout";

function LinkedPagination() {
  const [active, setActive] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const getTileProps = (num: number) => ({
    to: `?page=${num}`,
  });

  const getPerPageTileProps = (recordsPerPage: number) => ({
    to: `?perPage=${recordsPerPage}`,
  });

  return (
    <Layout spread>
      <Pagination
        totalPages={50}
        as={Link}
        getTileProps={getTileProps}
        active={active}
        onChange={(e, pageNum) => setActive(pageNum)}
        slim
      />
      <PerPage
        as={Link}
        getTileProps={getPerPageTileProps}
        recordsPerPage={[10, 25, 50, 100]}
        active={perPage}
        onChange={(e, records) => setPerPage(records)}
      />
    </Layout>
  );
}
```

### Custom Pagination with usePagination Hook

```tsx
import {
  BasePagination,
  PageItem,
  usePagination,
} from "@asphalt-react/pagination";
import { Button } from "@asphalt-react/button";
import { ToggleButton } from "@asphalt-react/toggle-button";
import {
  ChevronBackward,
  ChevronForward,
  ChevronLeft,
  ChevronRight,
} from "@asphalt-react/iconpack";

interface CustomPaginationProps {
  active: number;
  totalPages: number;
  onChange: (e: React.MouseEvent, page: number) => void;
}

function CustomPagination({
  active,
  totalPages,
  onChange,
}: CustomPaginationProps) {
  const { getPagesList } = usePagination({
    active,
    totalPages,
    tileCount: 5,
  });

  const pages = getPagesList({ truncate: false });

  return (
    <BasePagination>
      <PageItem>
        <Button
          disabled={active === 1}
          nude
          icon
          compact
          system
          onClick={(e) => onChange(e, 1)}
        >
          <ChevronBackward />
        </Button>
      </PageItem>
      <PageItem>
        <Button
          disabled={active === 1}
          nude
          icon
          compact
          system
          onClick={(e) => onChange(e, active - 1)}
        >
          <ChevronLeft />
        </Button>
      </PageItem>

      {pages.map((pageNum) => (
        <PageItem key={`page-${pageNum}`}>
          <ToggleButton
            seamless
            compact
            underline={false}
            onClick={(e) => onChange(e, pageNum)}
            on={pageNum === active}
          >
            {pageNum}
          </ToggleButton>
        </PageItem>
      ))}

      <PageItem>
        <Button
          disabled={active === totalPages}
          nude
          icon
          compact
          system
          onClick={(e) => onChange(e, active + 1)}
        >
          <ChevronRight />
        </Button>
      </PageItem>
      <PageItem>
        <Button
          disabled={active === totalPages}
          nude
          icon
          compact
          system
          onClick={(e) => onChange(e, totalPages)}
        >
          <ChevronForward />
        </Button>
      </PageItem>
    </BasePagination>
  );
}
```

## ActionList

### Basic ActionList

```tsx
import { Actionlist, Action } from "@asphalt-react/actionlist";
import { Link } from "react-router-dom";

function BasicActionList() {
  return (
    <Actionlist>
      <Action as={Link} asProps={{ to: "/document/edit" }}>
        Edit
      </Action>
      <Action actionable asProps={{ onClick: () => console.log("Clone") }}>
        Clone
      </Action>
      <Action>Share</Action>
      <Action>Delete</Action>
    </Actionlist>
  );
}
```

### ActionList in Dropdown Menu

```tsx
import { Actionlist, Action } from "@asphalt-react/actionlist";
import { Popover } from "@asphalt-react/popover";
import { Button } from "@asphalt-react/button";

function DropdownMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover
      open={open}
      target={<Button onClick={() => setOpen(!open)}>Actions</Button>}
      onOpenChange={setOpen}
    >
      <Actionlist>
        <Action onClick={() => setOpen(false)}>View</Action>
        <Action onClick={() => setOpen(false)}>Edit</Action>
        <Action onClick={() => setOpen(false)}>Delete</Action>
      </Actionlist>
    </Popover>
  );
}
```

## Props Reference

### DataTable Props

| Prop             | Type   | Default | Description                  |
| ---------------- | ------ | ------- | ---------------------------- |
| header           | array  | -       | Column definitions           |
| data             | array  | -       | Row data                     |
| identifier       | string | -       | Unique key field in data     |
| loading          | bool   | false   | Show loading state           |
| error            | bool   | false   | Show error state             |
| autoPaginate     | bool   | false   | Enable auto pagination       |
| paginationLink   | bool   | true    | Pagination as links          |
| loadingComponent | node   | -       | Custom loading component     |
| errorComponent   | node   | -       | Custom error component       |
| emptyComponent   | node   | -       | Custom empty state component |

### Accordion Props

| Prop        | Type   | Default | Description              |
| ----------- | ------ | ------- | ------------------------ |
| name        | string | -       | Group name (single open) |
| stickTop    | bool   | false   | Connect to item above    |
| stickBottom | bool   | false   | Connect to item below    |
| onToggle    | func   | -       | Toggle callback          |
