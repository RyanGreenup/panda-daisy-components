import {
  createSignal,
  onCleanup,
  createEffect,
  onMount,
  Accessor,
} from "solid-js";
import {
  getCurrentWidth,
  updateWidthVariable,
  clampWidth,
  type ResizeOptions,
} from "./directives/resize-utils";
import { createPeerId } from "~/presets/layout/layout";

export interface ResizeKeybindingsOptions {
  cssVariable: string;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  stepSize?: number;
  onResize?: (widthPx: number) => void;
  enabled?: boolean;
  onResizeStart?: () => void;
  /**
   * Should the Sidebar automatically open when the user triggers resize?
   */
  autoOpen?: Accessor<boolean>;
}

export function useResizeKeybindings(options: ResizeKeybindingsOptions) {
  const [isActive, setIsActive] = createSignal(false);

  const getOptions = () => ({
    stepSize: 20,
    enabled: true,
    ...options,
  });

  const ensureSidebarOpen = () => {
    const drawerInput = document.getElementById(
      createPeerId("drawer"),
    ) as HTMLInputElement;
    if (drawerInput && !drawerInput.checked) {
      drawerInput.checked = true;
    }
  };

  const resize = (direction: "increase" | "decrease") => {
    const opts = getOptions();
    if (!opts.enabled) return;

    // Ensure sidebar is open before resizing
    if (!!opts.autoOpen && opts.autoOpen()) {
      ensureSidebarOpen();
    }
    opts.onResizeStart?.();

    const currentWidth = getCurrentWidth(opts.cssVariable, opts.defaultWidth);
    const delta = direction === "increase" ? opts.stepSize : -opts.stepSize;
    const newWidth = clampWidth(
      currentWidth + delta,
      opts.minWidth,
      // TODO get the width from a ref using a context provider.
      opts.maxWidth,
    );

    if (newWidth !== currentWidth) {
      updateWidthVariable(opts.cssVariable, newWidth);
      opts.onResize?.(newWidth);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const opts = getOptions();
    if (!opts.enabled) return;

    // Check for Alt + [ or Alt + ] (common resize shortcuts)
    if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      if (e.code === "BracketLeft") {
        e.preventDefault();
        resize("decrease");
        setIsActive(true);
      } else if (e.code === "BracketRight") {
        e.preventDefault();
        resize("increase");
        setIsActive(true);
      }
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === "BracketLeft" || e.code === "BracketRight") {
      setIsActive(false);
    }
  };

  onMount(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    createEffect(() => {
      if (isActive()) {
        document.documentElement.setAttribute("data-resizing", "true");
      } else {
        document.documentElement.removeAttribute("data-resizing");
      }
    });

    onCleanup(() => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.documentElement.removeAttribute("data-resizing");
    });
  });

  return {
    isActive,
    resize,
  };
}
