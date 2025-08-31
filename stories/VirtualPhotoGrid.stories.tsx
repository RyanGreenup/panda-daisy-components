import { css } from '../styled-system/css';
import VirtualPhotoGrid from "../src/components/VirtualPhotoGrid";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createSignal } from "solid-js";

const meta = {
  title: "Example/VirtualPhotoGrid",
  component: VirtualPhotoGrid,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div class={css({ m: 4, bg: 'base.100', borderRadius: 'box', p: 4 })}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VirtualPhotoGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selectedPhoto, setSelectedPhoto] = createSignal<string | undefined>();
    
    const photos = Array.from({ length: 100 }, (_, i) => ({
      id: `photo-${i}`,
      url: `https://picsum.photos/300/200?random=${i}`,
      title: `Photo ${i + 1}`,
      date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()
    }));

    return (
      <VirtualPhotoGrid
        photos={photos}
        height="500px"
        selectedPhotoId={selectedPhoto()}
        onPhotoClick={(photo) => setSelectedPhoto(photo.id)}
        onPhotoDblClick={(photo) => console.log("Opening:", photo.title)}
      />
    );
  }
};

export const LargeGallery: Story = {
  render: () => {
    const [selectedPhoto, setSelectedPhoto] = createSignal<string | undefined>();
    
    const photos = Array.from({ length: 1000 }, (_, i) => ({
      id: `photo-${i}`,
      url: `https://picsum.photos/300/200?random=${i}`,
      title: `Beautiful Landscape ${i + 1}`,
      date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()
    }));

    return (
      <VirtualPhotoGrid
        photos={photos}
        height="600px"
        selectedPhotoId={selectedPhoto()}
        onPhotoClick={(photo) => setSelectedPhoto(photo.id)}
        onPhotoDblClick={(photo) => console.log("Opening:", photo.title)}
      />
    );
  }
};

export const FixedColumns: Story = {
  render: () => {
    const [selectedPhoto, setSelectedPhoto] = createSignal<string | undefined>();
    
    const photos = Array.from({ length: 50 }, (_, i) => ({
      id: `photo-${i}`,
      url: `https://picsum.photos/300/200?random=${i + 100}`,
      title: `Nature Photo ${i + 1}`,
    }));

    return (
      <VirtualPhotoGrid
        photos={photos}
        height="400px"
        columns={3}
        selectedPhotoId={selectedPhoto()}
        onPhotoClick={(photo) => setSelectedPhoto(photo.id)}
      />
    );
  }
};