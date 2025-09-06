import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Progress } from "@ryangreenup/panda-daisy-components";
import { createSignal, createEffect } from "solid-js";
import { css } from "@ryangreenup/panda-daisy-components-styled-system/css";

const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value",
    },
    max: {
      control: { type: "number", min: 1 },
      description: "Maximum value",
    },
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error"],
      description: "Progress bar variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Progress bar size",
    },
    showLabel: {
      control: "boolean",
      description: "Show percentage label",
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = createSignal(args.value);
    const [max, setMax] = createSignal(args.max);
    const [showLabel, setShowLabel] = createSignal(args.showLabel);

    // Update signals when args change
    createEffect(() => setValue(args.value));
    createEffect(() => setMax(args.max));
    createEffect(() => setShowLabel(args.showLabel));

    return (
      <div style={{ width: "300px" }}>
        <Progress
          value={value}
          max={max}
          showLabel={showLabel}
          variant={args.variant}
          size={args.size}
        />
      </div>
    );
  },
  args: {
    value: 65,
    showLabel: true,
    variant: "default",
    size: "md",
    max: 100,
  },
};

export const AllVariants: Story = {
  render: () => {
    const [value1] = createSignal(25);
    const [value2] = createSignal(50);
    const [value3] = createSignal(75);
    const [value4] = createSignal(90);
    const [showLabel] = createSignal(true);

    return (
      <div
        class={css({
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px",
        })}
      >
        <Progress value={value1} variant="default" showLabel={showLabel} />
        <Progress value={value2} variant="success" showLabel={showLabel} />
        <Progress value={value3} variant="warning" showLabel={showLabel} />
        <Progress value={value4} variant="error" showLabel={showLabel} />
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [value1] = createSignal(45);
    const [value2] = createSignal(65);
    const [value3] = createSignal(85);
    const [showLabel] = createSignal(true);

    return (
      <div
        class={css({
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px",
        })}
      >
        <div>
          <p
            class={css({
              fontSize: "0.875rem",
              mb: "0.5rem",
              color: "base.content",
            })}
          >
            Small
          </p>
          <Progress
            value={value1}
            size="sm"
            variant="success"
            showLabel={showLabel}
          />
        </div>
        <div>
          <p
            class={css({
              fontSize: "0.875rem",
              mb: "0.5rem",
              color: "base.content",
            })}
          >
            Medium
          </p>
          <Progress
            value={value2}
            size="md"
            variant="default"
            showLabel={showLabel}
          />
        </div>
        <div>
          <p
            class={css({
              fontSize: "0.875rem",
              mb: "0.5rem",
              color: "base.content",
            })}
          >
            Large
          </p>
          <Progress
            value={value3}
            size="lg"
            variant="warning"
            showLabel={showLabel}
          />
        </div>
      </div>
    );
  },
};

export const ProgressList: Story = {
  render: () => {
    const [value1] = createSignal(15);
    const [value2] = createSignal(30);
    const [value3] = createSignal(45);
    const [value4] = createSignal(70);
    const [value5] = createSignal(95);
    const [showLabel] = createSignal(true);

    return (
      <div
        class={css({
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          width: "400px",
          p: "1.5rem",
          bg: "base.50",
          borderRadius: "md",
        })}
      >
        <h3
          class={css({
            fontSize: "1.125rem",
            fontWeight: "semibold",
            mb: "0.5rem",
          })}
        >
          Progress Overview
        </h3>

        <Progress value={value1} variant="error" showLabel={showLabel} />
        <Progress value={value2} variant="warning" showLabel={showLabel} />
        <Progress value={value3} variant="default" showLabel={showLabel} />
        <Progress value={value4} variant="success" showLabel={showLabel} />
        <Progress value={value5} variant="success" showLabel={showLabel} />
      </div>
    );
  },
};

export const WithCustomMax: Story = {
  render: () => {
    const [value1] = createSignal(85);
    const [max1] = createSignal(120);
    const [value2] = createSignal(12);
    const [max2] = createSignal(20);
    const [value3] = createSignal(750);
    const [max3] = createSignal(1000);
    const [showLabel] = createSignal(true);

    return (
      <div
        class={css({
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px",
        })}
      >
        <div>
          <p
            class={css({
              fontSize: "0.875rem",
              mb: "0.5rem",
              color: "base.content",
            })}
          >
            Score: 85/120
          </p>
          <Progress
            value={value1}
            max={max1}
            variant="success"
            showLabel={showLabel}
          />
        </div>
        <div>
          <p
            class={css({
              fontSize: "0.875rem",
              mb: "0.5rem",
              color: "base.content",
            })}
          >
            Tasks: 12/20
          </p>
          <Progress
            value={value2}
            max={max2}
            variant="warning"
            showLabel={showLabel}
          />
        </div>
        <div>
          <p
            class={css({
              fontSize: "0.875rem",
              mb: "0.5rem",
              color: "base.content",
            })}
          >
            Storage: 750GB/1TB
          </p>
          <Progress
            value={value3}
            max={max3}
            variant="error"
            showLabel={showLabel}
          />
        </div>
      </div>
    );
  },
};

export const WithoutLabel: Story = {
  render: () => {
    const [value1] = createSignal(20);
    const [value2] = createSignal(40);
    const [value3] = createSignal(60);
    const [value4] = createSignal(80);
    const [value5] = createSignal(100);
    const [showLabel] = createSignal(false);

    return (
      <div
        class={css({
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          width: "300px",
        })}
      >
        <Progress value={value1} variant="error" showLabel={showLabel} />
        <Progress value={value2} variant="warning" showLabel={showLabel} />
        <Progress value={value3} variant="default" showLabel={showLabel} />
        <Progress value={value4} variant="success" showLabel={showLabel} />
        <Progress value={value5} variant="success" showLabel={showLabel} />
      </div>
    );
  },
};
