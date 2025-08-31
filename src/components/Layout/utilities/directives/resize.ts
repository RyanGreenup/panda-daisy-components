import { createEffect, createSignal, onCleanup } from "solid-js";
import {
  getCurrentWidth,
  updateWidthVariable,
  clampWidth,
  getRemInPixels,
  remToPx,
  pxToRem,
  type ResizeOptions,
} from "./resize-utils";

export type ResizeDirectiveOptions = ResizeOptions;

/**
 * SolidJS directive for handling horizontal resize operations.
 *
 * Usage:
 * ```tsx
 * <div use:resize={{
 *   cssVariable: '--sizes-sidebar-width',
 *   minWidth: 200,
 *   maxWidth: 600
 * }} />
 * ```
 */
export function resize(
  element: HTMLElement,
  options: () => ResizeDirectiveOptions,
) {
  const [isResizing, setIsResizing] = createSignal(false);
  const [startX, setStartX] = createSignal(0);
  const [startWidthPx, setStartWidthPx] = createSignal(320);

  const handleStart = (clientX: number) => {
    const opts = options();
    setIsResizing(true);
    setStartX(clientX);
    setStartWidthPx(getCurrentWidth(opts.cssVariable, opts.defaultWidth));

    addGlobalListeners();
    document.documentElement.setAttribute("data-resizing", "true");
    opts.onResizeStart?.();
  };

  const handleMove = (clientX: number) => {
    if (!isResizing()) return;

    const opts = options();
    const deltaX = clientX - startX();
    const newWidthPx = clampWidth(
      startWidthPx() + deltaX,
      opts.minWidth,

      // TODO get the width from a ref using a context provider.
      opts.maxWidth,
    );

    updateWidthVariable(opts.cssVariable, newWidthPx);
    opts.onResize?.(newWidthPx);
  };

  const handleEnd = () => {
    setIsResizing(false);
    removeGlobalListeners();
    document.documentElement.removeAttribute("data-resizing");
    options().onResizeEnd?.();
  };

  const handlePointerStart = (clientX: number, preventDefault: () => void) => {
    preventDefault();
    handleStart(clientX);
  };

  const onMouseDown = (e: MouseEvent) => {
    handlePointerStart(e.clientX, () => e.preventDefault());
  };

  const onTouchStart = (e: TouchEvent) => {
    if (e.touches[0]) {
      handlePointerStart(e.touches[0].clientX, () => e.preventDefault());
    }
  };

  const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
  const onMouseUp = () => handleEnd();

  const onTouchMove = (e: TouchEvent) => {
    if (e.touches[0]) {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    }
  };

  const onTouchEnd = () => handleEnd();

  const addGlobalListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);
  };

  const removeGlobalListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  };

  element.addEventListener("mousedown", onMouseDown);
  element.addEventListener("touchstart", onTouchStart, { passive: false });

  createEffect(() => {
    element.toggleAttribute("data-resizing", isResizing());
  });

  onCleanup(() => {
    removeGlobalListeners();
    element.removeEventListener("mousedown", onMouseDown);
    element.removeEventListener("touchstart", onTouchStart);
  });
}

// TypeScript declaration for the directive
declare module "solid-js" {
  namespace JSX {
    interface Directives {
      resize: ResizeDirectiveOptions;
    }
  }
}
