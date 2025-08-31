import { definePreset } from "@pandacss/dev";
import pandaPreset from "@pandacss/preset-panda";

import daisyLikePreset from "../daisy/daisy";
import { LayoutRecipe } from "./recipes/layout.recipe";

// Handle Peers
export const createPeerId = (name: string) => `${name}-toggle`;
export const createPeerCondition = (name: string) =>
  `[data-peer=${name}]:checked ~ div &`;
const peerNames = [
  "navbar",
  "btmDash",
  "drawer",
  "rightDrawer",
  "btmDrawer",
] as const;
export type PeerName = (typeof peerNames)[number];
const peerConditions = Object.fromEntries(
  peerNames.map((name) => [`${name}Checked`, createPeerCondition(name)]),
);

const spacing = {
  navbar: {
    x: { value: "1rem" },
    y: { value: "0.75rem" },
    height: { value: "4rem" },
  },
};

const durations = {
  fast: { value: "0.1s" },
  md: { value: "0.3s" },
  slow: { value: "0.5s" },
};

const easings = {
  drawer: { value: "ease" },
  navbar: { value: "ease" },
  btmDash: { value: "ease" },
  sidebar: { value: "ease-in-out" },
};

const layoutPreset = definePreset({
  name: "layout-preset",
  presets: [pandaPreset, daisyLikePreset],
  conditions: {
    extend: {
      ...peerConditions,
      sidebarResizing: "[data-resizing] &",
    },
  },
  theme: {
    extend: {
      breakpoints: {
        // Set the breakpoints semntically for the Drawer etc.
        minWidthDrawer: "{breakpoints.md}",
        minWidthBtmDash: "{breakpoints.sm}",
      },
      tokens: {
        spacing,
        durations,
      },
      semanticTokens: {
        easings,
        durations: {
          drawer: { value: "{durations.fast}" },
          navbar: { value: "{durations.md}" },
          btmDash: { value: "{durations.md}" },
          overlay: { value: "{durations.md}" },
          sidebar: { value: "{durations.md}" },
        },

        sizes: {
          navbar: {
            height: {
              value: "4rem",
            },
          },
          btmDash: {
            height: {
              value: "4rem",
            },
          },
          drawer: {
            width: {
              // minVal, prevVal, maxVal
              value: "clamp(5rem, 30rem, 75%)",
            },
          },
          rightDrawer: {
            width: {
              // minVal, prevVal, maxVal
              value: "clamp(5rem, 30rem, 75%)",
            },
          },
          btmDrawer: {
            height: {
              // minVal, prevVal, maxVal
              value: "clamp(5rem, 32rem, 85%)",
            },
          },
          sidebar: {
            width: {
              value: "20rem",
            },
            handle: {
              grab: {
                width: { value: "2rem" },
              },
              display: {
                height: { value: "3.75rem" },
                width: { value: "0.375rem" },
                hover: {
                  height: { value: "5rem" },
                  width: { value: "0.5rem" },
                },
              },
            },
          },
        },
        zIndex: {
          drawer: {
            value: "60",
            description:
              "Z-index for drawer component, highest to overlay other elements. The sidebar becomes a drawer on smaller displays",
          },
          overlay: {
            value: "59",
            description: "Z-index for the Drawer Layer",
          },

          rightDrawer: {
            value: "50",
            description:
              "Z-index for the Right drawer component This is considered secondary to the primary drawer",
          },
          rightDrawerOverlay: {
            value: "49",
            description: "Z-index for the Right Drawer Layer",
          },

          btmDash: {
            value: "40",
            description: "Z-index for bottom dashboard component",
          },

          // Note the bottom drawer goes over the bottom dash, candidate for review
          btmDrawer: {
            value: "30",
            description:
              "Z-index for the Bottom drawer component This is higher than the side drawers",
          },
          btmDrawerOverlay: {
            value: "29",
            description: "Z-index for the Right Drawer Layer",
          },

          navbar: { value: "20", description: "Z-index for navigation bar" },
          // Sidebar must be higher for grab handle
          sidebar: {
            value: "11",
            description: "Z-index for sidebar component",
          },
          mainContent: {
            value: "10",
            description: "Z-index for main content area, lowest layer",
          },
        },
      },
    },

    slotRecipes: {
      layout: LayoutRecipe,
    },
  },
});

export default layoutPreset;
