import { createVirtualizer } from "@tanstack/solid-virtual";
import {
  createMemo,
  createSignal,
  For,
  JSX,
  onCleanup,
  onMount,
} from "solid-js";
import { css } from "../../styled-system/css";

// Image validation utility - matches reference project approach
const filterValidImages = async (photos: Photo[]): Promise<Photo[]> => {
  console.log("Starting validation for", photos.length, "photos");

  const results = await Promise.allSettled(
    photos.map(async (photo) => {
      try {
        const response = await fetch(photo.url, { method: "HEAD" });
        return response.ok ? photo : null;
      } catch (error) {
        console.log("Failed to validate:", photo.url, error);
        return null;
      }
    }),
  );

  const validPhotos = results
    .filter(
      (result): result is PromiseFulfilledResult<Photo> =>
        result.status === "fulfilled" && result.value !== null,
    )
    .map((result) => result.value);

  console.log("Validation complete:", validPhotos.length, "valid photos");
  return validPhotos;
};

interface Photo {
  id: string;
  url: string;
  title: string;
  date?: string;
}

interface VirtualPhotoGridProps {
  photos: Photo[];
  columns?: number;
  height?: string;
  overscan?: number;
  selectedPhotoId?: string;
  onPhotoClick?: (photo: Photo) => void;
  onPhotoDblClick?: (photo: Photo) => void;
}

function VirtualPhotoGrid(props: VirtualPhotoGridProps) {
  const getColumnsForViewport = () => {
    if (typeof window === "undefined") return 2;
    const width = window.innerWidth;
    if (width >= 1280) return 5;
    if (width >= 1024) return 4;
    if (width >= 768) return 3;
    return 2;
  };

  const [columns, setColumns] = createSignal(
    props.columns || getColumnsForViewport(),
  );
  const rowHeight = 220;
  const gap = 16;

  let parentRef!: HTMLDivElement;

  const handleResize = () => {
    if (!props.columns) {
      setColumns(getColumnsForViewport());
    }
  };

  onMount(() => {
    if (!props.columns) {
      window.addEventListener("resize", handleResize);
      onCleanup(() => window.removeEventListener("resize", handleResize));
    }
  });

  const rowCount = createMemo(() => Math.ceil(props.photos.length / columns()));

  const rowVirtualizer = createMemo(() =>
    createVirtualizer({
      count: rowCount(),
      getScrollElement: () => parentRef,
      estimateSize: () => rowHeight + gap,
      overscan: props.overscan || 3,
    }),
  );

  const getPhotosForRow = (rowIndex: number) => {
    const start = rowIndex * columns();
    const end = Math.min(start + columns(), props.photos.length);
    return props.photos.slice(start, end);
  };

  return (
    <div
      ref={parentRef}
      class={css({
        height: props.height || "100%",
        overflow: "auto",
        bg: "base.100",
      })}
    >
      <div
        style={{
          height: `${rowVirtualizer().getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer()
          .getVirtualItems()
          .map((virtualRow) => (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${rowHeight}px`,
                transform: `translateY(${virtualRow.start}px)`,
                padding: `0 0 ${gap}px 0`,
              }}
            >
              <div
                class={css({
                  display: "grid",
                  gap: 4,
                  height: `${rowHeight - gap}px`,
                  px: 4,
                })}
                style={{
                  "grid-template-columns": `repeat(${columns()}, 1fr)`,
                }}
              >
                <For each={getPhotosForRow(virtualRow.index)}>
                  {(photo) => (
                    <div
                      class={css({
                        height: `${rowHeight - gap}px`,
                        width: "100%",
                        bg:
                          props.selectedPhotoId === photo.id
                            ? "primary"
                            : "base.200",
                        borderRadius: "box",
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        _hover: { transform: "scale(1.02)", boxShadow: "lg" },
                        border:
                          props.selectedPhotoId === photo.id
                            ? "2px solid"
                            : "1px solid",
                        borderColor:
                          props.selectedPhotoId === photo.id
                            ? "primary"
                            : "base.300",
                      })}
                      onClick={() => props.onPhotoClick?.(photo)}
                      onDblClick={() => props.onPhotoDblClick?.(photo)}
                      onMouseDown={(e) => {
                        if (e.button === 1) {
                          e.preventDefault();
                          props.onPhotoDblClick?.(photo);
                        }
                      }}
                    >
                      <div
                        class={css({ position: "relative", height: "100%" })}
                      >
                        <img
                          src={photo.url}
                          alt={photo.title}
                          class={css({
                            width: "100%",
                            height: "70%",
                            objectFit: "cover",
                          })}
                          loading="lazy"
                        />
                        <div
                          class={css({
                            p: 2,
                            height: "30%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          })}
                        >
                          <h3
                            class={css({
                              fontSize: "sm",
                              fontWeight: "semibold",
                              color:
                                props.selectedPhotoId === photo.id
                                  ? "white"
                                  : "base.content",
                              mb: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            })}
                          >
                            {photo.title}
                          </h3>
                          {photo.date && (
                            <p
                              class={css({
                                fontSize: "xs",
                                color:
                                  props.selectedPhotoId === photo.id
                                    ? "white"
                                    : "content.neutral",
                              })}
                            >
                              {photo.date}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default VirtualPhotoGrid;
export { filterValidImages };
