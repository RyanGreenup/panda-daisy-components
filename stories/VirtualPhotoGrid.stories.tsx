import VirtualPhotoGrid, { filterValidImages } from "../src/components/VirtualPhotoGrid";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createSignal, createResource, Suspense } from "solid-js";
import { css } from "@ryangreenup/panda-daisy-components-styled-system/css";

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

export const ValidatedPhotos: Story = {
  render: () => {
    const [selectedPhoto, setSelectedPhoto] = createSignal<string | undefined>();

    // Mix of valid and invalid URLs to demonstrate filtering
    const allPhotos = [
      ...Array.from({ length: 100 }, (_, i) => ({
        id: `valid-${i}`,
        url: `https://via.placeholder.com/300x200/0891b2/ffffff?text=Photo+${i + 1}`,
        title: `Valid Photo ${i + 1}`,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
      })),
      ...Array.from({ length: 500 }, (_, i) => ({
        id: `github-${i}`,
        url: `https://avatars.githubusercontent.com/u/${i + 1}?s=300`,
        title: `GitHub Avatar ${i + 1}`,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
      })),
      // Add some invalid URLs to test filtering
      {
        id: 'invalid-1',
        url: 'https://invalid-domain-that-does-not-exist.com/image.jpg',
        title: 'Invalid Photo 1',
        date: new Date().toLocaleDateString()
      },
      {
        id: 'invalid-2',
        url: 'https://via.placeholder.com/invalid-endpoint',
        title: 'Invalid Photo 2',
        date: new Date().toLocaleDateString()
      }
    ];

    const [validatedPhotos] = createResource(
      () => allPhotos,
      filterValidImages
    );

    return (
      <div>
        <div class={css({ mb: 4, p: 3, bg: 'base.200', borderRadius: 'box' })}>
          <h3 class={css({ fontWeight: 'bold', mb: 2 })}>Image Validation Demo</h3>
          <p class={css({ fontSize: 'sm', color: 'content.neutral' })}>
            Started with {allPhotos.length} photos, filtering out invalid URLs...
          </p>
        </div>

        <Suspense
          fallback={
            <div class={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '400px',
              bg: 'base.200',
              borderRadius: 'box'
            })}>
              <div class={css({ textAlign: 'center' })}>
                <div class={css({
                  w: 8,
                  h: 8,
                  border: '2px solid',
                  borderColor: 'primary',
                  borderTopColor: 'transparent',
                  borderRadius: 'full',
                  animation: 'spin 1s linear infinite',
                  mx: 'auto',
                  mb: 2
                })} />
                <p class={css({ color: 'content.neutral' })}>Validating images...</p>
              </div>
            </div>
          }
        >
          {(() => {
            const photos = validatedPhotos();
            return (
              <>
                <div class={css({ mb: 2, fontSize: 'sm', color: 'success' })}>
                  ✓ Showing {photos?.length || 0} valid photos
                </div>
                <VirtualPhotoGrid
                  photos={photos || []}
                  height="400px"
                  selectedPhotoId={selectedPhoto()}
                  onPhotoClick={(photo) => setSelectedPhoto(photo.id)}
                  onPhotoDblClick={(photo) => console.log("Opening valid photo:", photo.title)}
                />
              </>
            );
          })()}
        </Suspense>
      </div>
    );
  }
};
