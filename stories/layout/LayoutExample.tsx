import {
  BtmDash,
  BtmDashContainer,
  BtmDrawer,
  HamburgerIcon,
  LayoutContainer,
  Main,
  MainArea,
  Navbar,
  NavbarContent,
  NavbarStart,
  RightSidebar,
  Sidebar,
} from "../../src/components/Layout";
import { useResizeKeybindings } from "../../src/components/Layout/utilities/useResizeKeybindings";
import { css } from "../../styled-system/css";

import {
  colors,
  ContentPlaceholder,
  DrawerPlaceHolder,
  MainContentPlaceholder,
  SidebarContainer,
  SidebarPlaceHolder,
} from "./PlaceholderComponents";

const LayoutExample = () => {
  const { isActive } = useResizeKeybindings({
    cssVariable: "--sizes-sidebar-width",
    minWidth: 200,
    maxWidth: 600,
    defaultWidth: 320,
    stepSize: 50,
  });

  return (
    <LayoutContainer>
      <Navbar class={colors[2]}>
        <NavbarContent>
          <NavbarStart>
            <HamburgerIcon name="drawer" />
          </NavbarStart>
        </NavbarContent>
      </Navbar>
      <MainArea class={css({ border: "4px solid orange" })}>
        <Sidebar class={colors[4]}>
          <SidebarContainer>
            <SidebarPlaceHolder />
          </SidebarContainer>
        </Sidebar>

        <Main class={colors[5]}>
          <MainContentPlaceholder />
        </Main>
        <RightSidebar class={colors[6]}>
          <SidebarContainer>
            <SidebarPlaceHolder />
          </SidebarContainer>
        </RightSidebar>
        <BtmDrawer class={colors[7]}>
          <DrawerPlaceHolder />
        </BtmDrawer>
      </MainArea>
      <BtmDash class={colors[8]}>
        <BtmDashContainer>
          <ContentPlaceholder height="12" width="12" />
          <ContentPlaceholder height="12" width="12" />
          <ContentPlaceholder height="12" width="12" />
          <ContentPlaceholder height="12" width="12" />
        </BtmDashContainer>
      </BtmDash>
    </LayoutContainer>
  );
};


export default LayoutExample;
