import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createSignal } from "solid-js";

import { SingleCombobox } from "../src/components/Combobox/SingleCombobox";
import { MultiCombobox } from "../src/components/Combobox/MultiCombobox";
import { Kbd } from "../src/components/Kbd/Kbd";

const meta = {
  title: "Components/Combobox",
  component: SingleCombobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    label: {
      control: "text",
      description: "Aria label for the combobox",
    },
    options: {
      control: "object",
      description: "Array of options to choose from",
    },
  },
} satisfies Meta<typeof SingleCombobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
  "Kiwi",
  "Lemon",
  "Mango",
  "Orange",
  "Papaya",
  "Quince",
  "Raspberry",
  "Strawberry",
  "Tangerine",
  "Ugli fruit",
  "Vanilla bean",
  "Watermelon",
];

const programmingLanguages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
  "Scala",
  "Clojure",
  "Haskell",
  "OCaml",
  "F#",
  "Elixir",
  "Erlang",
  "Dart",
];

// Single Combobox Stories
export const SingleDefault: Story = {
  render: (args) => {
    const [value, setValue] = createSignal("Banana");

    return (
      <div
        tabIndex={0}
        style={{
          padding: "2rem",
          "background-color": "var(--colors-base-100)",
          border: "1px solid var(--colors-base-300)",
          "border-radius": "0.5rem",
          "box-shadow": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          "min-width": "24rem",
          outline: "none",
        }}
      >
        <h3
          style={{
            margin: "0 0 1rem 0",
            "font-size": "1.125rem",
            "font-weight": "600",
          }}
        >
          Single Selection (with selected item)
        </h3>
        <SingleCombobox {...args} value={value()} onChange={setValue} />
        <p
          style={{
            margin: "1rem 0 0 0",
            "font-size": "0.875rem",
            color: "var(--colors-base-content)",
          }}
        >
          Selected: {value() || "None"}
        </p>
      </div>
    );
  },
  args: {
    options: defaultOptions,
    placeholder: "Select a fruit...",
    label: "Fruit Selection",
  },
};

export const SingleWithValue: Story = {
  render: (args) => {
    const [value, setValue] = createSignal("Apple");

    return (
      <div
        tabIndex={0}
        style={{
          padding: "2rem",
          "background-color": "var(--colors-base-100)",
          border: "1px solid var(--colors-base-300)",
          "border-radius": "0.5rem",
          "box-shadow": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          "min-width": "24rem",
          outline: "none",
        }}
      >
        <h3
          style={{
            margin: "0 0 1rem 0",
            "font-size": "1.125rem",
            "font-weight": "600",
          }}
        >
          Single Selection (Pre-selected)
        </h3>
        <SingleCombobox {...args} value={value()} onChange={setValue} />
      </div>
    );
  },
  args: {
    options: defaultOptions,
    placeholder: "Select a fruit...",
    label: "Fruit Selection",
  },
};

export const SingleProgrammingLanguages: Story = {
  render: (args) => (
    <div
      tabIndex={0}
      style={{
        padding: "2rem",
        "background-color": "var(--colors-base-100)",
        border: "1px solid var(--colors-base-300)",
        "border-radius": "0.5rem",
        "box-shadow": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        "min-width": "24rem",
        outline: "none",
      }}
    >
      <h3
        style={{
          margin: "0 0 1rem 0",
          "font-size": "1.125rem",
          "font-weight": "600",
        }}
      >
        Programming Languages
      </h3>
      <SingleCombobox {...args} />
    </div>
  ),
  args: {
    options: programmingLanguages,
    placeholder: "Choose a programming language...",
    label: "Programming Language Selection",
  },
};

export const SingleEmpty: Story = {
  args: {
    options: [],
    placeholder: "No options available",
    label: "Empty Selection",
  },
};

export const SingleLongList: Story = {
  args: {
    options: Array.from({ length: 100 }, (_, i) => `Option ${i + 1}`),
    placeholder: "Search from 100 options...",
    label: "Large List Selection",
  },
};

// Multi Combobox Stories
export const MultiDefault: Story = {
  render: (args) => (
    <div
      tabIndex={0}
      style={{
        padding: "2rem",
        "background-color": "var(--colors-base-100)",
        border: "1px solid var(--colors-base-300)",
        "border-radius": "0.5rem",
        "box-shadow": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        "min-width": "24rem",
        outline: "none",
      }}
    >
      <h3
        style={{
          margin: "0 0 1rem 0",
          "font-size": "1.125rem",
          "font-weight": "600",
        }}
      >
        Multiple Selection
      </h3>
      <MultiCombobox
        options={args.options}
        placeholder={args.placeholder}
        label={args.label}
      />
    </div>
  ),
  args: {
    options: defaultOptions,
    placeholder: "Select fruits...",
    label: "Multiple Fruit Selection",
  },
};

export const MultiWithValues: Story = {
  render: (args) => {
    const [value, setValue] = createSignal(["Apple", "Banana", "Cherry"]);

    return (
      <div
        tabIndex={0}
        style={{
          padding: "2rem",
          "background-color": "var(--colors-base-100)",
          border: "1px solid var(--colors-base-300)",
          "border-radius": "0.5rem",
          "box-shadow": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          "min-width": "24rem",
          outline: "none",
        }}
      >
        <h3
          style={{
            margin: "0 0 1rem 0",
            "font-size": "1.125rem",
            "font-weight": "600",
          }}
        >
          Multiple Selection (Pre-selected)
        </h3>
        <MultiCombobox {...args} value={value()} onChange={setValue} />
      </div>
    );
  },
  args: {
    options: defaultOptions,
    placeholder: "Select fruits...",
    label: "Multiple Fruit Selection",
  },
};

export const MultiProgrammingLanguages: Story = {
  render: (args) => (
    <MultiCombobox
      options={args.options}
      placeholder={args.placeholder}
      label={args.label}
    />
  ),
  args: {
    options: programmingLanguages,
    placeholder: "Choose programming languages...",
    label: "Multiple Programming Language Selection",
  },
};

export const MultiControlled: Story = {
  render: (args) => {
    const [value, setValue] = createSignal<string[]>([]);

    const handleReset = () => setValue([]);
    const handleSelectAll = () => setValue([...args.options]);

    return (
      <div
        tabIndex={0}
        style={{
          padding: "2rem",
          "background-color": "var(--colors-base-100)",
          border: "1px solid var(--colors-base-300)",
          "border-radius": "0.5rem",
          "box-shadow": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          "min-width": "24rem",
          outline: "none",
        }}
      >
        <h3
          style={{
            margin: "0 0 1rem 0",
            "font-size": "1.125rem",
            "font-weight": "600",
          }}
        >
          Controlled Multiple Selection
        </h3>
        <div
          style={{ display: "flex", "flex-direction": "column", gap: "1rem" }}
        >
          <MultiCombobox {...args} value={value()} onChange={setValue} />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onclick={handleReset}
              style={{
                padding: "0.5rem 1rem",
                "background-color": "#ef4444",
                color: "white",
                border: "none",
                "border-radius": "0.25rem",
                cursor: "pointer",
              }}
            >
              Clear All
            </button>
            <button
              onclick={handleSelectAll}
              style={{
                padding: "0.5rem 1rem",
                "background-color": "#3b82f6",
                color: "white",
                border: "none",
                "border-radius": "0.25rem",
                cursor: "pointer",
              }}
            >
              Select All
            </button>
          </div>
          <p>Selected: {value().length} items</p>
        </div>
      </div>
    );
  },
  args: {
    options: defaultOptions.slice(0, 8),
    placeholder: "Select fruits...",
    label: "Controlled Multiple Selection",
  },
};

export const Comparison: Story = {
  render: (args) => {
    const [singleValue, setSingleValue] = createSignal("");
    const [multiValue, setMultiValue] = createSignal<string[]>([]);

    return (
      <div
        tabIndex={0}
        style={{
          padding: "2rem",
          "background-color": "var(--colors-base-100)",
          border: "1px solid var(--colors-base-300)",
          "border-radius": "0.5rem",
          "box-shadow": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          "min-width": "40rem",
          outline: "none",
        }}
      >
        <h3
          style={{
            margin: "0 0 2rem 0",
            "font-size": "1.25rem",
            "font-weight": "700",
          }}
        >
          Combobox Comparison
        </h3>
        <div
          style={{ display: "flex", "flex-direction": "column", gap: "2rem" }}
        >
          <div>
            <h4
              style={{
                margin: "0 0 1rem 0",
                "font-size": "1.125rem",
                "font-weight": "600",
              }}
            >
              Single Selection
            </h4>
            <SingleCombobox
              options={args.options}
              placeholder="Select one fruit..."
              value={singleValue()}
              onChange={setSingleValue}
            />
          </div>
          <div>
            <h4
              style={{
                margin: "0 0 1rem 0",
                "font-size": "1.125rem",
                "font-weight": "600",
              }}
            >
              Multiple Selection
            </h4>
            <MultiCombobox
              options={args.options}
              placeholder="Select multiple fruits..."
              value={multiValue()}
              onChange={setMultiValue}
            />
          </div>
        </div>
      </div>
    );
  },
  args: {
    options: defaultOptions.slice(0, 10),
  },
};

export const GlobalKeybinding: Story = {
  render: (args) => {
    const [value, setValue] = createSignal("");
    let inputRef: HTMLInputElement | undefined;

    // Set up global keybinding (Ctrl+/ or Cmd+/)
    const handleGlobalKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        inputRef?.focus();
        inputRef?.select(); // Select all text if any
      }
    };

    // Add event listener on mount, remove on cleanup
    const cleanup = () => {
      document.removeEventListener("keydown", handleGlobalKeydown);
    };

    document.addEventListener("keydown", handleGlobalKeydown);

    // Clean up when component unmounts (Solid.js will call this)
    setTimeout(() => {
      return cleanup;
    }, 0);

    return (
      <div
        tabIndex={0}
        style={{
          padding: "2rem",
          "background-color": "var(--colors-base-100)",
          border: "1px solid var(--colors-base-300)",
          "border-radius": "0.5rem",
          "box-shadow": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          "min-width": "24rem",
          outline: "none",
        }}
      >
        <h3
          style={{
            margin: "0 0 1rem 0",
            "font-size": "1.125rem",
            "font-weight": "600",
          }}
        >
          Global Keybinding Example
        </h3>
        <div
          style={{
            "background-color": "var(--colors-base-200)",
            padding: "1rem",
            "border-radius": "0.375rem",
            "margin-bottom": "1.5rem",
            "font-size": "0.875rem",
          }}
        >
          <p style={{ margin: "0 0 0.5rem 0", "font-weight": "600" }}>
            Try the keyboard shortcut:
          </p>
          <p style={{ margin: "0" }}>
            <Kbd size="sm">Ctrl</Kbd>
            <span style={{ margin: "0 0.25rem" }}>+</span>
            <Kbd size="sm">/</Kbd>
            <span style={{ margin: "0 0.5rem" }}>or</span>
            <Kbd size="sm">⌘</Kbd>
            <span style={{ margin: "0 0.25rem" }}>+</span>
            <Kbd size="sm">/</Kbd>
            <span style={{ "margin-left": "0.5rem" }}>to focus the search</span>
          </p>
        </div>
        <SingleCombobox
          {...args}
          value={value()}
          onChange={setValue}
          ref={(el) => {
            inputRef = el;
          }}
        />
        <p
          style={{
            margin: "1rem 0 0 0",
            "font-size": "0.875rem",
            color: "var(--colors-base-content)",
          }}
        >
          Selected: {value() || "None"}
        </p>
      </div>
    );
  },
  args: {
    options: defaultOptions,
    placeholder: "Press Ctrl+/ to focus and search...",
    label: "Searchable Fruit Selection",
  },
};
