import { css } from '../styled-system/css';
import VirtualList from "../src/components/VirtualList";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createSignal } from "solid-js";

const meta = {
  title: "Example/VirtualList",
  component: VirtualList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div class={css({ m: 4, bg: 'base.100', borderRadius: 'box', p: 4 })}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VirtualList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: () => 100,
    estimateSize: () => 45,
    renderItemCallback: (index: number) => (
      <div class={css({ p: 2, borderBottom: '1px solid', borderColor: 'base.300' })}>
        Item {index}
      </div>
    )
  }
};

export const ContactList: Story = {
  args: {
    count: () => 1000,
    height: "400px",
    estimateSize: () => 70,
    renderItemCallback: (index: number) => (
      <div class={css({
        p: 3,
        borderBottom: '1px solid',
        borderColor: 'base.300',
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        bg: { base: 'base.100', _hover: 'base.200' },
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      })}>
        <div class={css({
          w: 10,
          h: 10,
          bg: 'primary',
          borderRadius: 'full',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 'sm',
          fontWeight: 'bold'
        })}>
          {String.fromCharCode(65 + (index % 26))}
        </div>
        <div>
          <div class={css({ fontWeight: 'semibold', color: 'base.content' })}>
            Contact {index + 1}
          </div>
          <div class={css({ fontSize: 'sm', color: 'content.neutral' })}>
            contact{index + 1}@example.com
          </div>
        </div>
      </div>
    )
  }
};

export const ProductCatalog: Story = {
  args: {
    count: () => 500,
    height: "500px",
    estimateSize: () => 120,
    renderItemCallback: (index: number) => (
      <div class={css({
        p: 4,
        borderBottom: '1px solid',
        borderColor: 'base.300',
        display: 'flex',
        gap: 4,
        bg: { base: 'base.100', _hover: 'base.200' },
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      })}>
        <div class={css({
          w: 20,
          h: 20,
          bg: 'accent',
          borderRadius: 'box',
          flexShrink: 0
        })} />
        <div class={css({ flex: 1 })}>
          <h3 class={css({ fontWeight: 'bold', color: 'base.content', mb: 1 })}>
            Product {index + 1}
          </h3>
          <p class={css({ fontSize: 'sm', color: 'content.neutral', mb: 2 })}>
            High-quality product with amazing features
          </p>
          <div class={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center' })}>
            <span class={css({ fontWeight: 'bold', color: 'success', fontSize: 'lg' })}>
              ${(index * 10 + 99).toFixed(2)}
            </span>
            <button class={css({
              bg: 'primary',
              color: 'white',
              px: 3,
              py: 1,
              borderRadius: 'field',
              fontSize: 'sm',
              fontWeight: 'medium',
              border: 'none',
              cursor: 'pointer',
              _hover: { opacity: 0.9 }
            })}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    )
  }
};

export const NotificationFeed: Story = {
  args: {
    count: () => 200,
    height: "350px",
    estimateSize: () => 80,
    renderItemCallback: (index: number) => {
      const types = ['info', 'success', 'warning', 'error'];
      const type = types[index % 4];
      return (
        <div class={css({
          p: 3,
          borderBottom: '1px solid',
          borderColor: 'base.300',
          display: 'flex',
          gap: 3,
          bg: { base: 'base.100', _hover: 'base.200' },
          transition: 'all 0.2s ease'
        })}>
          <div class={css({
            w: 3,
            h: 'full',
            bg: `content.${type}`,
            borderRadius: 'full',
            flexShrink: 0
          })} />
          <div class={css({ flex: 1 })}>
            <div class={css({ display: 'flex', justifyContent: 'space-between', mb: 1 })}>
              <span class={css({ fontWeight: 'semibold', color: 'secondary' })}>
                Notification {index + 1}
              </span>
              <span class={css({ fontSize: 'xs', color: 'primary' })}>
                {Math.floor(index / 10)} min ago
              </span>
            </div>
            <p class={css({ fontSize: 'sm', color: 'base.content' })}>
              This is a {type} notification with important information.
            </p>
          </div>
        </div>
      );
    }
  }
};

export const ReactiveSlider: Story = {
  render: () => {
    const [count, setCount] = createSignal(20);
    
    return (
      <div>
        <div class={css({ mb: 4, p: 4, bg: 'base.200', borderRadius: 'box' })}>
          <label class={css({ display: 'block', mb: 2, fontWeight: 'semibold' })}>
            Item Count: {count()}
          </label>
          <input
            type="range"
            min="2"
            max="100"
            value={count()}
            onInput={(e) => setCount(parseInt(e.target.value))}
            class={css({
              w: 'full',
              h: 2,
              bg: 'base.300',
              borderRadius: 'full',
              appearance: 'none',
              cursor: 'pointer'
            })}
          />
        </div>
        <VirtualList
          count={count}
          height="300px"
          renderItemCallback={(index: number) => (
            <div class={css({ 
              p: 3, 
              borderBottom: '1px solid', 
              borderColor: 'base.300',
              bg: { base: 'base.100', _hover: 'base.200' }
            })}>
              Item {index + 1} of {count()}
            </div>
          )}
        />
      </div>
    );
  }
};
