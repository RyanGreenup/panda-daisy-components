import {
  BtmDashContainer,
  BtmDashStyled,
  BtmDrawerToggleStyled,
  DrawerToggleStyled,
  HamburgerIcon,
  LayoutContainer,
  Main,
  MainArea,
  NavbarContent,
  NavbarEnd,
  NavbarStart,
  NavbarToggleStyled,
  RightDrawerToggleStyled,
  BtmDrawerStyled,
  NavbarStyled,
  RightDrawerStyled,
  SidebarStyled,
  Button,
} from "@ryangreenup/panda-daisy-components";

import { circle } from "../../styled-system/patterns";
import { css } from "../../styled-system/css";
// @ts-ignore
import Menu from "lucide-solid/icons/menu";
// @ts-ignore
import PanelBottom from "lucide-solid/icons/panel-bottom";
// @ts-ignore
import PanelLeft from "lucide-solid/icons/panel-left";
// @ts-ignore
import PanelRight from "lucide-solid/icons/panel-right";
import { For, JSXElement } from "solid-js";

export default function Layout(props: { children: JSXElement }) {
  return (
    <LayoutContainer>
      <NavbarStyled>
        <NavbarContent>
          <NavbarStart>
            <HamburgerIcon name="drawer" />
          </NavbarStart>
          <NavbarContent>
            <BtmDashContainer>
              <ToggleButtons />
            </BtmDashContainer>
          </NavbarContent>
          <NavbarEnd>
            <div
              class={circle({
                w: "8",
                h: "8",
                bgGradient: "to-r",
                gradientFrom: "primary",
                gradientTo: "secondary",
              })}
            ></div>
          </NavbarEnd>
        </NavbarContent>
      </NavbarStyled>
      <MainArea>
        <SidebarStyled>
          <SidebarContainer>
            <SidebarPlaceHolder />
          </SidebarContainer>
        </SidebarStyled>
        <Main>{props.children}</Main>
        {/* NOTE RightSidebar may be renamed as RightDrawer */}
        <RightDrawerStyled>
          <SidebarContainer>
            <SidebarPlaceHolder />
          </SidebarContainer>
        </RightDrawerStyled>
        <BtmDrawerStyled>
          <BottomDrawerContent />
        </BtmDrawerStyled>
      </MainArea>
      <BtmDashStyled>
        <BtmDashContainer>
          <ToggleButtons />
        </BtmDashContainer>
      </BtmDashStyled>
    </LayoutContainer>
  );
}

const BottomDrawerContent = () => (
  <div
    class={css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "full",
      p: 10,
    })}
  >
    <div
      class={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bg: "base.200",
        border: "box",
        shadow: "box",
        rounded: "box",
        py: 10,
        width: "20rem",

        transition: "all 0.3s ease",
        _hover: {
          bg: "primary/50",
          rotate: "3deg",
          transform: "scale(1.2)",
        },
      })}
    >
      Bottom Drawer
    </div>
  </div>
);

const SidebarContainer = (props: { children: JSXElement }) => {
  return (
    <div
      class={css({
        p: "4",
        display: "flex",
        flexDirection: "column",
        gap: "3",
        height: "100%",
        overflow: "auto",
      })}
    >
      {props.children}
    </div>
  );
};

const SidebarPlaceHolder = () => {
  return (
    <For
      each={Array.from({ length: 100 }, (_, i) => i)}
      fallback={<div>No items</div>}
    >
      {(item, index) => (
        <Button variant="primary" data-index={index()}>
          {item}
        </Button>
      )}
    </For>
  );
};

const ToggleButtons = () => {
  return (
    <>
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
    </>
  );
};
