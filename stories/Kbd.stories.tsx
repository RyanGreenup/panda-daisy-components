import type { Meta, StoryObj } from "storybook-solidjs-vite";

import { Kbd } from "../src/components/Kbd/Kbd";

const meta = {
  title: "Typography/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the keyboard key",
    },
    children: {
      control: "text",
      description: "Content to display inside the key",
    },
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "K",
  },
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
      <div style={{ display: "flex", "flex-direction": "column", gap: "0.5rem", "align-items": "center" }}>
        <Kbd size="xs">⌘</Kbd>
        <span style={{ "font-size": "0.75rem", color: "var(--colors-base-content)" }}>xs</span>
      </div>
      <div style={{ display: "flex", "flex-direction": "column", gap: "0.5rem", "align-items": "center" }}>
        <Kbd size="sm">Ctrl</Kbd>
        <span style={{ "font-size": "0.75rem", color: "var(--colors-base-content)" }}>sm</span>
      </div>
      <div style={{ display: "flex", "flex-direction": "column", gap: "0.5rem", "align-items": "center" }}>
        <Kbd size="md">Space</Kbd>
        <span style={{ "font-size": "0.75rem", color: "var(--colors-base-content)" }}>md (default)</span>
      </div>
      <div style={{ display: "flex", "flex-direction": "column", gap: "0.5rem", "align-items": "center" }}>
        <Kbd size="lg">Enter</Kbd>
        <span style={{ "font-size": "0.75rem", color: "var(--colors-base-content)" }}>lg</span>
      </div>
      <div style={{ display: "flex", "flex-direction": "column", gap: "0.5rem", "align-items": "center" }}>
        <Kbd size="xl">Escape</Kbd>
        <span style={{ "font-size": "0.75rem", color: "var(--colors-base-content)" }}>xl</span>
      </div>
    </div>
  ),
};

export const CommonKeys: Story = {
  render: () => (
    <div
      style={{
        padding: "2rem",
        "background-color": "var(--colors-base-100)",
        "border-radius": "0.5rem",
        "max-width": "40rem",
      }}
    >
      <h3 style={{ margin: "0 0 1.5rem 0", "font-size": "1.125rem", "font-weight": "600" }}>
        Common Keyboard Keys
      </h3>
      <div style={{ display: "flex", "flex-wrap": "wrap", gap: "0.75rem" }}>
        <Kbd>⌘</Kbd>
        <Kbd>Ctrl</Kbd>
        <Kbd>Alt</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>Tab</Kbd>
        <Kbd>Space</Kbd>
        <Kbd>Enter</Kbd>
        <Kbd>Escape</Kbd>
        <Kbd>←</Kbd>
        <Kbd>→</Kbd>
        <Kbd>↑</Kbd>
        <Kbd>↓</Kbd>
        <Kbd>A</Kbd>
        <Kbd>B</Kbd>
        <Kbd>C</Kbd>
        <Kbd>/</Kbd>
        <Kbd>?</Kbd>
        <Kbd>F1</Kbd>
        <Kbd>F12</Kbd>
        <Kbd>Del</Kbd>
      </div>
    </div>
  ),
};

export const KeyboardShortcuts: Story = {
  render: () => (
    <div
      style={{
        padding: "2rem",
        "background-color": "var(--colors-base-100)",
        "border-radius": "0.5rem",
        "max-width": "40rem",
      }}
    >
      <h3 style={{ margin: "0 0 1.5rem 0", "font-size": "1.125rem", "font-weight": "600" }}>
        Keyboard Shortcuts Examples
      </h3>
      <div style={{ display: "flex", "flex-direction": "column", gap: "1rem" }}>
        <div style={{ display: "flex", "justify-content": "space-between", "align-items": "center" }}>
          <span>Copy</span>
          <div style={{ display: "flex", gap: "0.25rem", "align-items": "center" }}>
            <Kbd size="sm">Ctrl</Kbd>
            <span style={{ color: "var(--colors-base-content)" }}>+</span>
            <Kbd size="sm">C</Kbd>
          </div>
        </div>

        <div style={{ display: "flex", "justify-content": "space-between", "align-items": "center" }}>
          <span>Paste</span>
          <div style={{ display: "flex", gap: "0.25rem", "align-items": "center" }}>
            <Kbd size="sm">Ctrl</Kbd>
            <span style={{ color: "var(--colors-base-content)" }}>+</span>
            <Kbd size="sm">V</Kbd>
          </div>
        </div>

        <div style={{ display: "flex", "justify-content": "space-between", "align-items": "center" }}>
          <span>Search</span>
          <div style={{ display: "flex", gap: "0.25rem", "align-items": "center" }}>
            <Kbd size="sm">Ctrl</Kbd>
            <span style={{ color: "var(--colors-base-content)" }}>+</span>
            <Kbd size="sm">/</Kbd>
          </div>
        </div>

        <div style={{ display: "flex", "justify-content": "space-between", "align-items": "center" }}>
          <span>Command Palette</span>
          <div style={{ display: "flex", gap: "0.25rem", "align-items": "center" }}>
            <Kbd size="sm">⌘</Kbd>
            <span style={{ color: "var(--colors-base-content)" }}>+</span>
            <Kbd size="sm">Shift</Kbd>
            <span style={{ color: "var(--colors-base-content)" }}>+</span>
            <Kbd size="sm">P</Kbd>
          </div>
        </div>

        <div style={{ display: "flex", "justify-content": "space-between", "align-items": "center" }}>
          <span>Navigate</span>
          <div style={{ display: "flex", gap: "0.25rem", "align-items": "center" }}>
            <Kbd size="sm">↑</Kbd>
            <Kbd size="sm">↓</Kbd>
            <Kbd size="sm">←</Kbd>
            <Kbd size="sm">→</Kbd>
          </div>
        </div>

        <div style={{ display: "flex", "justify-content": "space-between", "align-items": "center" }}>
          <span>Select All</span>
          <div style={{ display: "flex", gap: "0.25rem", "align-items": "center" }}>
            <Kbd size="sm">Ctrl</Kbd>
            <span style={{ color: "var(--colors-base-content)" }}>+</span>
            <Kbd size="sm">A</Kbd>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const InText: Story = {
  render: () => (
    <div
      style={{
        padding: "2rem",
        "background-color": "var(--colors-base-100)",
        "border-radius": "0.5rem",
        "max-width": "40rem",
        "line-height": "1.6",
      }}
    >
      <h3 style={{ margin: "0 0 1rem 0", "font-size": "1.125rem", "font-weight": "600" }}>
        Using Kbd in Text
      </h3>
      <p style={{ margin: "0 0 1rem 0" }}>
        To save your work, press <Kbd size="sm">Ctrl</Kbd> + <Kbd size="sm">S</Kbd> or use <Kbd size="sm">⌘</Kbd> + <Kbd size="sm">S</Kbd> on Mac.
      </p>
      <p style={{ margin: "0 0 1rem 0" }}>
        You can quickly open the search by pressing <Kbd size="sm">Ctrl</Kbd> + <Kbd size="sm">/</Kbd> anywhere on the page.
      </p>
      <p style={{ margin: "0" }}>
        Use the arrow keys <Kbd size="xs">↑</Kbd> <Kbd size="xs">↓</Kbd> to navigate through options, then press <Kbd size="sm">Enter</Kbd> to select.
      </p>
    </div>
  ),
};
