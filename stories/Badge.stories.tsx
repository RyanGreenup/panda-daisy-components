import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Badge } from "../src/components/Badge";
import Mail from "lucide-solid/icons/mail";
import { Button } from "../src/components/Button";
import { css } from "@ryangreenup/panda-daisy-components-styled-system/css";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "neutral"],
      description: "Badge variant",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div class={css({ display: "flex", gap: "0.5rem", flexWrap: "wrap" })}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <div class={css({ display: "flex", gap: "1rem", alignItems: "center" })}>
      <Button
        class={css({
          display: "inline-flex",
          justifyContent: "space-between",
          gap: "0.5rem",
        })}
      >
        <Mail size={16} />
        Inbox
        <Badge variant="error">3</Badge>
      </Button>

      <Button
        class={css({
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          px: "1rem",
          py: "0.5rem",
          bg: "transparent",
          color: "base.content",
          border: "default",
          borderRadius: "md",
          cursor: "pointer",
          _hover: {
            bg: "base.200",
          },
        })}
      >
        <Mail size={16} />
        Messages
        <Badge variant="success" class={css({ ml: "auto" })}>
          12
        </Badge>
      </Button>

      <Button
        variant="ghost"
        class={css({
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
        })}
      >
        <Mail size={20} />
        <Badge
          variant="error"
          class={css({
            position: "absolute",
            top: "-0.25rem",
            right: "-0.25rem",
            minW: "1.25rem",
            h: "1.25rem",
            px: "0.25rem",
            fontSize: "0.625rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          99+
        </Badge>
      </Button>
    </div>
  ),
};

export const NumberBadges: Story = {
  render: () => (
    <div class={css({ display: "flex", gap: "0.5rem", alignItems: "center" })}>
      <Badge variant="default">1</Badge>
      <Badge variant="success">5</Badge>
      <Badge variant="warning">23</Badge>
      <Badge variant="error">99+</Badge>
      <Badge variant="neutral">New</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div class={css({ display: "flex", gap: "0.5rem", flexWrap: "wrap" })}>
      <Badge variant="success">Online</Badge>
      <Badge variant="warning">Away</Badge>
      <Badge variant="error">Offline</Badge>
      <Badge variant="neutral">Unknown</Badge>
      <Badge variant="default">Active</Badge>
    </div>
  ),
};
