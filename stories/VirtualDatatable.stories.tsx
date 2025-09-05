import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createSignal } from "solid-js";
import { ColumnDef } from "@tanstack/solid-table";
import { VirtualizedDataTable } from "@ryangreenup/panda-daisy-components";
import { css } from "../styled-system/css";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  status: "Active" | "Inactive" | "Pending" | "Suspended";
  joinDate: Date;
  performance: number;
}

const generateEmployeeData = (count: number): Employee[] => {
  const departments = [
    "Engineering",
    "Sales",
    "Marketing",
    "HR",
    "Finance",
    "Operations",
  ];
  const statuses: Employee["status"][] = [
    "Active",
    "Inactive",
    "Pending",
    "Suspended",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`,
    email: `employee${i + 1}@company.com`,
    department: departments[i % departments.length],
    salary: Math.floor(Math.random() * 100000) + 40000,
    status: statuses[i % statuses.length],
    joinDate: new Date(
      2020 + Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    ),
    performance: Math.floor(Math.random() * 100),
  }));
};

const statusStyles = {
  Active: css.raw({ bg: "success", color: "content.success" }),
  Inactive: css.raw({ bg: "base.300", color: "base.content" }),
  Pending: css.raw({ bg: "warning", color: "content.warning" }),
  Suspended: css.raw({ bg: "error", color: "content.error" }),
};

const emailLinkStyle = css.raw({
  color: "primary",
  textDecoration: "none",
  _hover: {
    textDecoration: "underline",
  },
});

const departmentBadgeStyle = css.raw({
  display: "inline-flex",
  alignItems: "center",
  px: "0.625rem",
  py: "0.125rem",
  borderRadius: "full",
  fontSize: "0.75rem",
  fontWeight: "medium",
  bg: "secondary",
  color: "content.secondary",
});

const performanceBarContainerStyle = css.raw({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

const performanceBarStyle = css.raw({
  w: "4rem",
  bg: "base.300",
  borderRadius: "full",
  h: "0.5rem",
  overflow: "hidden",
});

const performanceTextStyle = css.raw({
  fontSize: "0.75rem",
  color: "base.content",
  w: "2rem",
  textAlign: "right",
});

const getColumns = (): ColumnDef<Employee>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: (info) => info.getValue(),
    size: 80,
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId) as number;
      return value.toString().includes(filterValue);
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => info.getValue(),
    size: 180,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => (
      <a href={`mailto:${info.getValue()}`} class={css(emailLinkStyle)}>
        {info.getValue() as string}
      </a>
    ),
    size: 250,
  },
  {
    // TODO this should be a categorical filter
    accessorKey: "department",
    header: "Department",
    cell: (info) => (
      <span class={css(departmentBadgeStyle)}>{info.getValue() as string}</span>
    ),
    size: 130,
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: (info) => {
      const salary = info.getValue() as number;
      return `$${salary.toLocaleString()}`;
    },
    size: 120,
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId) as number;
      return value.toString().includes(filterValue);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const status = info.getValue() as Employee["status"];
      return (
        <span class={css(departmentBadgeStyle, statusStyles[status])}>
          {status}
        </span>
      );
    },
    size: 120,
  },
  {
    accessorKey: "performance",
    header: "Performance",
    cell: (info) => {
      const performance = info.getValue() as number;
      const getPerformanceColor = (score: number) => {
        if (score >= 80) return "success";
        if (score >= 60) return "warning";
        return css({ bg: "error" });
      };

      return (
        <div class={css(performanceBarContainerStyle)}>
          <div class={css(performanceBarStyle)}>
            <div
              class={css({
                h: "full",
                borderRadius: "full",
                transition: "all",
                bg: getPerformanceColor(performance),
                width: performance,
              })}
            />
          </div>
          <span class={css(performanceTextStyle)}>{performance}%</span>
        </div>
      );
    },
    size: 150,
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId) as number;
      return value.toString().includes(filterValue);
    },
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: (info) => {
      const date = info.getValue() as Date;
      return date.toLocaleDateString();
    },
    size: 120,
  },
];

const meta = {
  title: "DataTables/VirtualizedDataTable",
  component: VirtualizedDataTable,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    enableGlobalFilter: {
      control: "boolean",
      description: "Enable global search filter",
    },
    enableColumnFilters: {
      control: "boolean",
      description: "Enable individual column filters",
    },
    enableSorting: {
      control: "boolean",
      description: "Enable column sorting",
    },
    searchPlaceholder: {
      control: "text",
      description: "Placeholder text for search input",
    },
    height: {
      control: "text",
      description: "Height of the virtualized container",
    },
    estimateSize: {
      description: "Function to estimate row size for virtualization",
    },
    overscan: {
      control: "number",
      description: "Number of items to render outside of visible area",
    },
  },
} satisfies Meta<typeof VirtualizedDataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [data] = createSignal(generateEmployeeData(1000));

    return (
      <div class={css({ p: "1.5rem" })}>
        <div class={css({ mb: "1.5rem" })}>
          <h1
            class={css({
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "base.content",
              mb: "0.25rem",
            })}
          >
            Employee Directory
          </h1>
          <p
            class={css({
              color: "base.content",
              opacity: "0.7",
            })}
          >
            Virtualized table showing 1,000 employee records with full filtering
            and sorting
          </p>
        </div>

        <div
          class={css({
            // TODO find a better way to handle this.
            w: "min-content",
            p: 4,
          })}
        >
          <VirtualizedDataTable
            {...args}
            data={data()}
            columns={getColumns()}
          />
        </div>
      </div>
    );
  },
  args: {
    enableGlobalFilter: true,
    enableColumnFilters: true,
    enableSorting: true,
    searchPlaceholder: "Search employees...",
    height: "650px",
    estimateSize: () => 56,
    overscan: 15,
  },
};

export const BasicTable: Story = {
  render: () => {
    const [data] = createSignal(generateEmployeeData(100));

    return (
      <div class={css({ p: "1.5rem" })}>
        <VirtualizedDataTable
          data={data()}
          columns={getColumns().slice(0, 4)} // Show fewer columns
          enableGlobalFilter={false}
          enableColumnFilters={false}
          enableSorting={false}
          height="400px"
        />
      </div>
    );
  },
};

export const WithGlobalSearchOnly: Story = {
  render: () => {
    const [data] = createSignal(generateEmployeeData(500));

    return (
      <div class={css({ p: "1.5rem" })}>
        <VirtualizedDataTable
          data={data()}
          columns={getColumns()}
          enableGlobalFilter={true}
          enableColumnFilters={false}
          enableSorting={true}
          searchPlaceholder="Search across all fields..."
          height="500px"
        />
      </div>
    );
  },
};

export const CompactView: Story = {
  render: () => {
    const [data] = createSignal(generateEmployeeData(2000));

    return (
      <div class={css({ p: "1.5rem" })}>
        <VirtualizedDataTable
          data={data()}
          columns={getColumns()}
          enableGlobalFilter={true}
          enableColumnFilters={true}
          enableSorting={true}
          height="300px"
          estimateSize={() => 40} // Smaller rows
          overscan={20}
        />
      </div>
    );
  },
};
