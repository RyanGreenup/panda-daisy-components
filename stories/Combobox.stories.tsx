import { css } from '../styled-system/css';
import { SingleCombobox } from '../src/components/Combobox/SingleCombobox';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { createSignal } from 'solid-js';

const meta = {
  title: 'Example/Combobox',
  component: SingleCombobox,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div class={css({ m: 4, bg: 'base.100', borderRadius: 'box', p: 4 })}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SingleCombobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const FRUITS = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple", "Orange", "Strawberry", "Mango", "Cherry", "Peach"];

export const Default: Story = {
  args: {
    options: FRUITS,
    placeholder: "Search a fruit&",
    label: "Fruit Selection"
  }
};

export const WithInitialValue: Story = {
  args: {
    options: FRUITS,
    placeholder: "Search a fruit&",
    label: "Fruit Selection",
    value: "Apple"
  }
};

export const Interactive: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = createSignal("Banana");
    
    return (
      <div>
        <div class={css({ mb: 4, p: 3, bg: 'base.200', borderRadius: 'field' })}>
          <strong>Selected: </strong>{selectedValue() || "None"}
        </div>
        <SingleCombobox
          options={FRUITS}
          placeholder="Choose your favorite fruit&"
          label="Favorite Fruit"
          value={selectedValue()}
          onChange={setSelectedValue}
        />
      </div>
    );
  }
};

const COUNTRIES = [
  "United States", "Canada", "Mexico", "United Kingdom", "France", "Germany", 
  "Italy", "Spain", "Japan", "China", "India", "Brazil", "Australia", "Russia"
];

export const Countries: Story = {
  args: {
    options: COUNTRIES,
    placeholder: "Select a country&",
    label: "Country Selection"
  }
};