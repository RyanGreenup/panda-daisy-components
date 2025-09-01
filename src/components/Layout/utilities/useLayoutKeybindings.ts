import { useKeybinding } from "./useKeybinding";
import { layoutKeys } from "./keyboardShortcuts";
import { createPeerId } from "../../../presets/layout/layout";

export interface LayoutKeybindingsOptions {
  enabled?: boolean;
}

export function useLayoutKeybindings(options: LayoutKeybindingsOptions = {}) {
  const { enabled = true } = options;

  const toggleElement = (name: PeerName) => {
    const elementId = createPeerId(name);
    const element = document.getElementById(elementId) as HTMLInputElement;
    if (element) {
      element.checked = !element.checked;
    }
  };

  const closeDrawerIfOverlayVisible = () => {
    const drawerInput = document.getElementById(
      createPeerId("drawer"),
    ) as HTMLInputElement;
    if (drawerInput && drawerInput.checked) {
      const overlay = document.querySelector(
        '[data-peer="drawer"]:checked ~ div [for="drawer-toggle"]',
      );
      if (
        overlay &&
        getComputedStyle(overlay as Element).visibility === "visible"
      ) {
        drawerInput.checked = false;
        return true;
      }
    }
    return false;
  };

  // Only bind keybindings if enabled
  if (enabled) {
    // Layout toggle keybindings
    useKeybinding(layoutKeys.TOGGLE_NAVBAR.keyPress, () =>
      toggleElement("navbar"),
    );
    useKeybinding(layoutKeys.TOGGLE_DRAWER.keyPress, () =>
      toggleElement("drawer"),
    );
    useKeybinding(layoutKeys.TOGGLE_BTM_DASH.keyPress, () =>
      toggleElement("btmDash"),
    );
    useKeybinding(layoutKeys.TOGGLE_BTM_DRAWER.keyPress, () =>
      toggleElement("btmDrawer"),
    );
    useKeybinding(layoutKeys.TOGGLE_RIGHT_DRAWER.keyPress, () =>
      toggleElement("rightDrawer"),
    );

    // Escape key to close drawer overlay
    useKeybinding(
      layoutKeys.CLOSE_DRAWER.keyPress,
      closeDrawerIfOverlayVisible,
      {
        preventDefault: false, // Only prevent default if we actually close the drawer
      },
    );
  }

  return {
    toggleElement,
  };
}
