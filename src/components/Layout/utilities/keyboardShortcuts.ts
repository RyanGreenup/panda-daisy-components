import type { KeyPress } from "./useKeybinding";

interface KeyBinding {
  keyPress: KeyPress;
  description: string;
}

function kb(
  key: string,
  description: string,
  ctrl: boolean = false,
  shift: boolean = false,
  alt: boolean = false,
): KeyBinding {
  return {
    keyPress: { key, ctrl, shift, alt },
    description,
  };
}

// Helper to format key description for display
export function formatKey(binding: KeyBinding): string {
  const { keyPress: keypress } = binding;
  const parts = [];
  if (keypress.ctrl) parts.push("Ctrl");
  if (keypress.shift) parts.push("Shift");
  if (keypress.alt) parts.push("Alt");
  parts.push(keypress.key.toUpperCase());
  return parts.join("+");
}

// Centralized keybinding dictionary with excellent LSP support
export const KEYBINDINGS = {
  // Global layout keybindings - work anywhere on the page
  layout: {
    TOGGLE_NAVBAR: kb("1", "Toggle navbar", true, false),
    TOGGLE_DRAWER: kb("2", "Toggle drawer", true, false),
    TOGGLE_BTM_DASH: kb("3", "Toggle bottom dash", true, false),
    TOGGLE_BTM_DRAWER: kb("4", "Toggle bottom dash", true, false),
    TOGGLE_RIGHT_DRAWER: kb("5", "Toggle bottom dash", true, false),
    TOGGLE_STYLED: kb("s", "Toggle Styled", true, false),
    CLOSE_DRAWER: kb("Escape", "Close drawer overlay"),
  },

  // Global resize keybindings
  resize: {
    DECREASE_WIDTH: kb("[", "Decrease sidebar width", false, false, true),
    INCREASE_WIDTH: kb("]", "Increase sidebar width", false, false, true),
  },
} as const;

// Type-safe accessor functions for better LSP support
export const layoutKeys = KEYBINDINGS.layout;
export const resizeKeys = KEYBINDINGS.resize;

// Export all shortcuts for documentation/help dialogs
export const ALL_SHORTCUTS = [
  ...Object.values(KEYBINDINGS.layout),
  ...Object.values(KEYBINDINGS.resize),
] as const;
