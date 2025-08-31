import { css } from '../styled-system/css';
import VirtualListExample from "../src/components/VirtualList";
import { Meta } from 'storybook/internal/csf';
import { StoryObj } from 'storybook-solidjs-vite';

const meta = {
  title: "Example/VirtualList",
  component: VirtualListExample,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div class={css({ m: 10 })}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VirtualListExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
