import { createVirtualizer } from "@tanstack/solid-virtual";
import { JSX } from "solid-js";
import { css } from "@root/styled-system/css";

interface VirtualListProps {
  count: number;
  estimateSize?: () => number;
  height?: string;
  overscan?: number;
  renderItemCallback: (index: number, size: number) => JSX.Element;
}

function VirtualList(props: VirtualListProps) {
  let parentRef!: HTMLDivElement;

  const rowVirtualizer = createVirtualizer({
    count: props.count,
    getScrollElement: () => parentRef,
    estimateSize: props.estimateSize || (() => 35),
    overscan: props.overscan || 5,
  });

  return (
    <div
      ref={parentRef}
      style={{
        height: props.height || "400px",
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {props.renderItemCallback(virtualItem.index, virtualItem.size)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VirtualList;
