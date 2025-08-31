// Import styled components
import { NavbarStyled } from "./NavbarStyled";
import { BtmDashStyled } from "./BtmDashStyled";
import { BtmDrawerStyled } from "./BtmDrawerStyled";
import { RightDrawerStyled } from "./RightDrawerStyled";
import { SidebarStyled } from "./SidebarStyled";

// Export all styled components individually
export { NavbarStyled } from "./NavbarStyled";
export { BtmDashStyled } from "./BtmDashStyled";
export { BtmDrawerStyled } from "./BtmDrawerStyled";
export { RightDrawerStyled } from "./RightDrawerStyled";
export { SidebarStyled } from "./SidebarStyled";

// Export grouped styled components for convenience (keeping existing API)
import { LayoutComponentsType } from "../types";
import { LayoutContainer, Main, MainArea } from "../Layout";

export const StyledLayout: LayoutComponentsType = {
  Navbar: NavbarStyled,
  MainArea: MainArea,
  Sidebar: SidebarStyled,
  RightSidebar: RightDrawerStyled,
  BtmDrawer: BtmDrawerStyled,
  Main: Main,
  BtmDash: BtmDashStyled,
  LayoutContainer: LayoutContainer,
};
