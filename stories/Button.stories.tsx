import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "../src/components/Button";


const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "accent", "neutral", "info", "success", "warning", "error", "ghost", "outline", "link"],
      description: "Button variant/style",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the button",
    },
    fullWidth: {
      control: "boolean",
      description: "Make button take full width",
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
    },
    children: {
      control: "text",
      description: "Button content",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Button>Button</Button>,
  parameters: {
    docs: {
      source: {
        code: '<Button>Button</Button>'
      }
    }
  }
};

export const WithArgs: Story = {
  args: {
    children: "Button",
  },
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        "flex-wrap": "wrap",
        gap: "1rem",
        padding: "2rem",
        "background-color": "var(--colors-base-100)",
        "border-radius": "0.5rem",
        "max-width": "50rem",
      }}
    >
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="neutral">Neutral</Button>
      <Button variant="info">Info</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="error">Error</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        "align-items": "center",
        gap: "1rem",
        padding: "2rem",
        "background-color": "var(--colors-base-100)",
        "border-radius": "0.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          gap: "0.5rem",
          "align-items": "center",
        }}
      >
        <Button size="xs">Extra Small</Button>
        <span
          style={{
            "font-size": "0.75rem",
            color: "var(--colors-base-content)",
          }}
        >
          xs
        </span>
      </div>
      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          gap: "0.5rem",
          "align-items": "center",
        }}
      >
        <Button size="sm">Small</Button>
        <span
          style={{
            "font-size": "0.75rem",
            color: "var(--colors-base-content)",
          }}
        >
          sm
        </span>
      </div>
      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          gap: "0.5rem",
          "align-items": "center",
        }}
      >
        <Button size="md">Medium</Button>
        <span
          style={{
            "font-size": "0.75rem",
            color: "var(--colors-base-content)",
          }}
        >
          md (default)
        </span>
      </div>
      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          gap: "0.5rem",
          "align-items": "center",
        }}
      >
        <Button size="lg">Large</Button>
        <span
          style={{
            "font-size": "0.75rem",
            color: "var(--colors-base-content)",
          }}
        >
          lg
        </span>
      </div>
      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          gap: "0.5rem",
          "align-items": "center",
        }}
      >
        <Button size="xl">Extra Large</Button>
        <span
          style={{
            "font-size": "0.75rem",
            color: "var(--colors-base-content)",
          }}
        >
          xl
        </span>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        gap: "2rem",
        padding: "2rem",
        "background-color": "var(--colors-base-100)",
        "border-radius": "0.5rem",
      }}
    >
      <div style={{ display: "flex", gap: "1rem", "align-items": "center" }}>
        <h3 style={{ margin: "0", "font-size": "1rem", "font-weight": "600" }}>
          Normal
        </h3>
        <Button variant="primary">Normal</Button>
        <Button variant="secondary">Normal</Button>
        <Button variant="outline">Normal</Button>
      </div>

      <div style={{ display: "flex", gap: "1rem", "align-items": "center" }}>
        <h3 style={{ margin: "0", "font-size": "1rem", "font-weight": "600" }}>
          Disabled
        </h3>
        <Button variant="primary" disabled>Disabled</Button>
        <Button variant="secondary" disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled</Button>
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        gap: "1rem",
        padding: "2rem",
        "background-color": "var(--colors-base-100)",
        "border-radius": "0.5rem",
        width: "30rem",
      }}
    >
      <Button variant="primary" fullWidth>
        Full Width Primary
      </Button>
      <Button variant="secondary" fullWidth>
        Full Width Secondary
      </Button>
      <Button variant="outline" fullWidth>
        Full Width Outline
      </Button>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        gap: "2rem",
        padding: "2rem",
        "background-color": "var(--colors-base-100)",
        "border-radius": "0.5rem",
        "max-width": "40rem",
      }}
    >
      <h3
        style={{
          margin: "0",
          "font-size": "1.125rem",
          "font-weight": "600",
        }}
      >
        Interactive Examples
      </h3>

      <div style={{ display: "flex", gap: "1rem", "flex-wrap": "wrap" }}>
        <Button
          variant="primary"
          onClick={() => alert("Primary button clicked!")}
        >
          Click Me
        </Button>

        <Button
          variant="success"
          onClick={() => alert("Success!")}
        >
          Save Changes
        </Button>

        <Button
          variant="error"
          onClick={() => confirm("Are you sure you want to delete this?")}
        >
          Delete
        </Button>

        <Button
          variant="ghost"
          onClick={() => console.log("Ghost button clicked")}
        >
          Cancel
        </Button>
      </div>

      <div style={{ display: "flex", gap: "1rem", "align-items": "center" }}>
        <Button variant="link" href="#" onClick={(e) => e.preventDefault()}>
          Learn More
        </Button>

        <Button variant="outline" size="sm">
          Secondary Action
        </Button>
      </div>
    </div>
  ),
};
