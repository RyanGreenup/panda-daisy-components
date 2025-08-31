import { onCleanup, onMount } from "solid-js";

/**
 * Configuration options for keybinding behavior.
 */
export interface KeybindingOptions {
  preventDefault?: boolean;
}

export interface KeyPress {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
}

/**
 * Unified keybinding hook that supports both global and focused keybindings.
 * If no ref is provided, creates a global keybinding.
 * If a ref is provided, creates a focused keybinding that only works when the element has focus.
 *
 * @param keyPress - The key configuration object containing key and modifiers
 * @param keyPress.key - The key to listen for (case-insensitive)
 * @param keyPress.ctrl - Whether Ctrl (or Cmd on Mac) must be pressed
 * @param keyPress.shift - Whether Shift must be pressed
 * @param keyPress.alt - Whether Alt must be pressed
 * @param callback - Function to execute when the keybinding is triggered
 * @param options - Configuration options for behavior and targeting
 * @param options.ref - Optional reference to element for focused keybindings
 * @param options.preventDefault - Whether to prevent the default browser behavior
 */
export function useKeybinding(
  keyPress: KeyPress,
  callback: (ev: KeyboardEvent) => void,
  options: KeybindingOptions & { ref?: () => HTMLElement | undefined } = {},
) {
  const { ref, preventDefault = true } = options;
  const { key, ctrl = false, shift = false, alt = false } = keyPress;

  onMount(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      // For focused keybindings, check if element has focus
      if (ref) {
        const element = ref();
        if (!element || document.activeElement !== element) return;
      }

      // Check if the key matches
      const keyMatch = ev.key.toLowerCase() === key.toLowerCase();
      if (!keyMatch) return;

      // Check modifier keys
      const ctrlMatch = ctrl
        ? ev.ctrlKey || ev.metaKey
        : !ev.ctrlKey && !ev.metaKey;
      if (!ctrlMatch) return;

      const shiftMatch = shift ? ev.shiftKey : !ev.shiftKey;
      if (!shiftMatch) return;

      const altMatch = alt ? ev.altKey : !ev.altKey;
      if (!altMatch) return;

      // Execute callback
      if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
        if (preventDefault) {
          ev.preventDefault();
        }
        callback(ev);
      }
    };

    // Attach to appropriate target
    let target: EventTarget;
    if (ref) {
      // Focused keybinding - attach to specific element
      const element = ref();
      if (!element) return;
      target = element;
    } else {
      // Global keybinding - attach to document
      target = document;
    }

    target.addEventListener("keydown", handleKeyDown as EventListener);

    onCleanup(() => {
      target.removeEventListener("keydown", handleKeyDown as EventListener);
    });
  });
}