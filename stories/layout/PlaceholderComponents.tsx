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
      rounded: "lg",
      _hover: {
        bg: "primary/30",
        transform: "scale(1.05) rotate(2deg)",
        // rotate: "360deg",
      },

      bg: "primary/10",
      transition: "background 0.3s ease, transform 0.3s ease-in-out",
      color: "base.content",
      fontSize: "2xl",
      borderWidth: "1px",
      borderColor: "primary/50",
    })}
  >
    <PlaceholderIcon />
  </div>
);

export const MainContentPlaceholder = (props: { long?: boolean }) => {
  const { long = false } = props;
  return (
    <div
      class={css({
        p: "4",
      })}
    >
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
          <Show when={long}>
            <ContentPlaceholder />
            <ContentPlaceholder />
          </Show>
        </div>
        <Show when={long}>
          <div class={css({ mb: "4", mt: "4" })}>
            <ContentPlaceholder height="48" />
          </div>
        </Show>
      </div>
    </div>
  );
};

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
import {
  DrawerToggleStyled,
  NavbarToggleStyled,
  RightDrawerToggleStyled,
  BtmDrawerToggleStyled,
} from "../../src/components/Layout/styled";

// @ts-ignore
import Menu from "lucide-solid/icons/menu";
// @ts-ignore
import PanelBottom from "lucide-solid/icons/panel-bottom";
// @ts-ignore
import PanelLeft from "lucide-solid/icons/panel-left";
// @ts-ignore
import PanelRight from "lucide-solid/icons/panel-right";
// @ts-ignore
import { createSignal, Show } from "solid-js";

export const LayoutButtons = () => {
  return (
    <BtmDashContainer>
      <DrawerToggleStyled>
        <Menu size={20} />
        <span>Sidebar</span>
      </DrawerToggleStyled>

      <NavbarToggleStyled>
        <PanelLeft size={20} />
        <span>Navbar</span>
      </NavbarToggleStyled>

      <RightDrawerToggleStyled>
        <PanelRight size={20} />
        <span>Right</span>
      </RightDrawerToggleStyled>

      <BtmDrawerToggleStyled>
        <PanelBottom size={20} />
        <span>Bottom</span>
      </BtmDrawerToggleStyled>
    </BtmDashContainer>
  );
};
