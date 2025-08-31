import { css } from "../../styled-system/css";
import { Center } from "../../styled-system/jsx";
import { grid } from "../../styled-system/patterns";

export const colors = {
  1: css({ bg: "red.600/50" }),
  2: css({ bg: "blue.600/50" }),
  3: css({ bg: "green.600/50" }),
  4: css({ bg: "yellow.600/50" }),
  5: css({ bg: "purple.600/50" }),
  6: css({ bg: "pink.600/50" }),
  7: css({ bg: "cyan.600/50" }),
  8: css({ bg: "orange.600/50" }),
  9: css({ bg: "lime.600/50" }),
  10: css({ bg: "indigo.600/50" }),
  11: css({ bg: "teal.600/50" }),
  12: css({ bg: "rose.600/50" }),
};

export const PlaceholderIcon = ({ width = "3.5" }: { width?: string } = {}) => (
  <svg class={css({ w: width, h: width })} fill="none" viewBox="0 0 18 18">
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 1v16M1 9h16"
    />
  </svg>
);

export const ContentPlaceholder = ({
  height = "28",
  width,
}: {
  height?: string;
  width?: string;
}) => (
  <div
    class={css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: height,
      width: width,
      rounded: "sm",
      bg: "gray.50",
      color: "gray.400",
      fontSize: "2xl",
    })}
  >
    <PlaceholderIcon />
  </div>
);

export const MainContentPlaceholder = () => (
  <div
    class={css({
      p: "4",
      border: "2px dashed",
      borderColor: "gray.200",
      rounded: "lg",
    })}
  >
    <div class={grid({ columns: 3, gap: "4" })}>
      <ContentPlaceholder height="24" />
      <ContentPlaceholder height="24" />
      <ContentPlaceholder height="24" />
    </div>
    <div class={css({ mb: "4", mt: "4" })}>
      <ContentPlaceholder height="48" />
    </div>
    <div class={grid({ columns: 2, gap: "4" })}>
      <ContentPlaceholder />
      <ContentPlaceholder />
      <ContentPlaceholder />
      <ContentPlaceholder />
    </div>
    <div class={css({ mb: "4", mt: "4" })}>
      <ContentPlaceholder height="48" />
    </div>
  </div>
);

export const DrawerPlaceHolder = () => (
  <Center width="full" height="full" p="4">
    <div
      class={css({
        p: "4",
        border: "2px dashed",
        borderColor: "gray.200",
        rounded: "lg",
        width: "100%",
        height: "100%",
      })}
    >
      <div class={grid({ columns: 3, gap: "4" })}>
        <ContentPlaceholder height="24" />
        <ContentPlaceholder height="24" />
        <ContentPlaceholder height="24" />
      </div>
      <div class={css({ mb: "4", mt: "4" })}>
        <ContentPlaceholder height="48" />
      </div>
      <div class={grid({ columns: 2, gap: "4" })}>
        <ContentPlaceholder />
        <ContentPlaceholder />
      </div>
    </div>
  </Center>
);

export const SidebarPlaceHolder = () => (
  <>
    <ContentPlaceholder height="20" />
    <ContentPlaceholder height="32" />
    <ContentPlaceholder height="20" />
    <ContentPlaceholder height="24" />
  </>
);

export const SidebarContainer = ({ children }: { children: any }) => (
  <div
    class={css({
      p: "4",
      display: "flex",
      flexDirection: "column",
      gap: "3",
      height: "100%",
    })}
  >
    {children}
  </div>
);

import { BtmDashContainer } from "../../src/components/Layout";
import { Label } from "../../src/components/Layout/utilities/PeerInputs";
import Menu from "lucide-solid/icons/menu";
import Box from "lucide-solid/icons/box";
import PanelBottom from "lucide-solid/icons/panel-bottom";
import PanelLeft from "lucide-solid/icons/panel-left";
import PanelRight from "lucide-solid/icons/panel-right";

// TODO these need to be somewhat exported from the layout.
export const LayoutButtons = () => {
  const toggleItemStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.25rem",
    padding: "0.5rem",
    cursor: "pointer",
    fontSize: "xs",
    color: "base.content",
    opacity: 0.8,
    transition: "opacity 0.15s ease",
    "&:hover": {
      opacity: 1,
    },
  };

  const checkedStyle = {
    opacity: 1,
    color: "primary",
    backgroundColor: "primary/10",
    borderRadius: "sm",
  };

  return (
    <BtmDashContainer>
      <Label
        name="drawer"
        class={css({
          ...toggleItemStyles,
          _drawerChecked: {
            ...checkedStyle,
          },
        })}
      >
        <Menu size={20} />
        <span>Sidebar</span>
      </Label>

      <Label
        name="navbar"
        class={css({
          ...toggleItemStyles,
          _navbarChecked: {
            ...checkedStyle,
          },
        })}
      >
        <PanelLeft size={20} />
        <span>Navbar</span>
      </Label>

      <Label
        name="rightDrawer"
        class={css({
          ...toggleItemStyles,
          _rightDrawerChecked: {
            ...checkedStyle,
          },
        })}
      >
        <PanelRight size={20} />
        <span>Right</span>
      </Label>

      <Label
        name="btmDrawer"
        class={css({
          ...toggleItemStyles,
          _btmDrawerChecked: {
            ...checkedStyle,
          },
        })}
      >
        <PanelBottom size={20} />
        <span>Bottom</span>
      </Label>
    </BtmDashContainer>
  );
};
