import { defineSlotRecipe, SystemStyleObject } from "@pandacss/dev";

// const mainAreaSty: SystemStyleObject = ;

// const btmDashSty: SystemStyleObject = ;

// const overlaySty: SystemStyleObject = ;

const mainAreaSty: SystemStyleObject = {
  // FLex to create a row of content between the top/bottom navbar
  display: "flex",
  flexDirection: "row",
  position: "relative",
  flex: 1,
  minHeight: 0,
  // Margins to handle hiding the top/bottom navbars
  _navbarChecked: {
    mt: "calc(0px - {sizes.navbar.height})",
  },
  _btmDashChecked: {
    mb: "calc(0px - {sizes.btmDash.height})",
  },
  // Transitions
  transition: [
    "margin-top {durations.navbar} {easings.navbar}",
    "margin-bottom {durations.btmDash} {easings.btmDash}",
  ].join(", "),
};

const overlayBaseSty: SystemStyleObject = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "black/60",
  backdropFilter: "blur(2px)",
  // Bury it until clicked, just in case it interfers in anyway
  zIndex: "0",
  opacity: 0,
  visibility: "hidden",
  pointerEvents: "none",
  transition:
    "opacity 0.3s ease, visibility 0.3s ease, backdrop-filter 0.3s ease",
  cursor: "pointer",
};

const overlaySty: SystemStyleObject = {
  ...overlayBaseSty,
  _drawerChecked: {
    opacity: 1,
    visibility: "visible",
    pointerEvents: "auto",
    zIndex: "overlay",
  },
};

const sidebarSty: SystemStyleObject = {
  position: "absolute",
  width: "drawer.width",
  height: "100%",
  zIndex: "drawer",
  top: 0,
  left: 0,
  // hidden by default
  transform: "translateX(-100%)",
  transition:
    "transform {durations.drawer} {easings.drawer}, width {durations.sidebar} {easings.sidebar}",
  _sidebarResizing: {
    transition: "transform 0s",
  },
  _drawerChecked: {
    transform: "translateX(0)",
  },
};

const rightSidebarSty: SystemStyleObject = {
  position: "absolute",
  width: "rightDrawer.width",
  height: "100%",
  zIndex: "rightDrawer",
  top: 0,
  right: 0,
  // hidden by default
  transform: "translateX(100%)",
  transition: "transform {durations.drawer} {easings.drawer}",
  // TODO
  // _sidebarResizing: {
  //   transition: "transform 0s",
  // },
  _rightDrawerChecked: {
    transform: "translateX(0)",
  },
};

const rightDrawerOverlaySty: SystemStyleObject = {
  ...overlayBaseSty,
  _rightDrawerChecked: {
    opacity: 1,
    visibility: "visible",
    pointerEvents: "auto",
    zIndex: "rightDrawerOverlay",
  },
};

const btmDrawerSty: SystemStyleObject = {
  position: "absolute",
  height: "btmDrawer.height",
  width: "100%",
  left: "50%",
  transform: {
    // Further down in case the bottom dash is transparent
    base: "translateX(-50%) translateY(calc(100% + {sizes.btmDash.height}))",
    _btmDrawerChecked: "translateX(-50%) translateY(0)",
  },
  zIndex: "btmDrawer",
  bottom: "0",
  // // TODO review how this moves
  transition: ["transform", "height"].join(
    " {durations.btmDash} {easings.btmDash}, ",
  ),
};

const btmDrawerOverlaySty: SystemStyleObject = {
  ...overlayBaseSty,
  _btmDrawerChecked: {
    opacity: 1,
    visibility: "visible",
    pointerEvents: "auto",
    zIndex: "btmDrawerOverlay",
  },
};

const btmDashSty: SystemStyleObject = {
  height: "{sizes.btmDash.height}",
  minHeight: "{sizes.btmDash.height}",
  flexShrink: 0,
  bottom: "0",
  position: "relative",
  transition: "transform {durations.btmDash} {easings.btmDash}",
  _btmDashChecked: {
    transform: "translateY({sizes.btmDash.height})",
  },
  zIndex: "btmDrawer",
  // // [NOTE 1]: Hide bottom Dash on > sm
  // minWidthBtmDash: {
  //   transform: "translateY({sizes.btmDash.height})",
  // },
};

const layoutContainerSty: SystemStyleObject = {
  display: "flex",
  flexDirection: "column",
  gap: "0",
  height: "100dvh",
  position: "relative",
  overflow: "hidden",
};

const navbarSty: SystemStyleObject = {
  zIndex: "navbar",
  height: "navbar.height",
  minHeight: "navbar.height",
  flexShrink: 0,
  top: "0",
  position: "relative",
  transition: "transform {durations.navbar} {easings.navbar}",
  _navbarChecked: {
    transform: `[translateY(calc(0px - {sizes.navbar.height}))]`,
  },
};

const mainContentSty: SystemStyleObject = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  transition: ["margin-left {durations.drawer} {easings.drawer}"].join(", "),
};

export const LayoutRecipe = defineSlotRecipe({
  className: "mainLayout",
  description: "The main Layout",
  slots: [
    "mainContent",
    "btmDash",
    "overlay",
    "rightDrawerOverlay",
    "navbar",
    "layoutContainer",
    "mainArea",
    "sidebar",
    // TODO let's rename this to drawer, it will never be a sidebar
    "rightSidebar",
    "btmDrawerOverlay",
    "btmDrawer",
  ],
  base: {
    sidebar: sidebarSty,
    mainArea: mainAreaSty,
    layoutContainer: layoutContainerSty,
    navbar: navbarSty,
    mainContent: mainContentSty,
    btmDash: btmDashSty,
    overlay: overlaySty,
    rightDrawerOverlay: rightDrawerOverlaySty,
    rightSidebar: rightSidebarSty,
    btmDrawerOverlay: btmDrawerOverlaySty,
    btmDrawer: btmDrawerSty,
  },
  defaultVariants: {
    navbar: true,
    leftSidebar: "responsive",
  },
  variants: {
    navbar: {
      false: {
        navbar: {
          transform: "translateY(-100%)",
          display: "none",
        },
        mainArea: {
          mt: "calc(0px - {sizes.navbar.height})",
        },
      },
    },
    btmDash: {
      none: {
        btmDash: {
          display: "none",
          transform: "translateY({sizes.btmDash.height})",
        },
        mainArea: {
          mb: "calc(0px - {sizes.btmDash.height})",
        },
      },
      mobileOnly: {
        mainArea: {
          minWidthBtmDash: {
            mb: "calc(0px - {sizes.btmDash.height})",
          },
        },
        btmDash: {
          minWidthBtmDash: {
            transform: "translateY({sizes.btmDash.height})",
          },
        },
      },
      all: {},
    },
    leftSidebar: {
      none: {
        sidebar: {
          transform: "translateX(-100%)",
          display: "none",
        },
        mainContent: {
          ml: "0",
        },
        overlay: {
          display: "none",
        },
      },
      responsive: {
        overlay: {
          // Only show overlay on smaller screens when drawer is open
          minWidthDrawer: {
            display: "none",
          },
        },
        sidebar: {
          minWidthDrawer: {
            transition: "transform {durations.sidebar} {easings.sidebar}",
            width: "sidebar.width",
            zIndex: "sidebar",
          },
        },
        mainContent: {
          minWidthDrawer: {
            flex: 1,
            zIndex: "mainContent",
            transition: "margin-left {durations.sidebar} {easings.sidebar}",
            _drawerChecked: {
              ml: "{sizes.sidebar.width}",
            },
            _sidebarResizing: {
              transition: "transform 0s ",
            },
          },
        },
      },
    },
    storybook: {
      true: {
        layoutContainer: {
          // This probably makes it possible to use with Storybook
          height: "100%",
          position: "relative",
        },
      },
    },
  },
});
