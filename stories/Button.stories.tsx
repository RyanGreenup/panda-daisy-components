import { fn } from 'storybook/test';
import { css } from '../styled-system/css';

import { Button } from './Button';
import { Meta } from 'storybook/internal/csf';
import { StoryObj } from 'storybook-solidjs-vite';

const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div class={css({ m: 10 })}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Hello 🐼!',
  },
};
