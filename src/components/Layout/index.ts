// Import all components
import { BtmDrawer, RightSidebar } from "./Drawers";
import { BtmDash, LayoutContainer, Main, MainArea, Navbar } from "./Layout";
import { Sidebar } from "./Sidebar";
import { NavbarContent, NavbarStart, NavbarCenter, NavbarEnd, NavbarLink } from "./NavbarContent";
import { BtmDashStyled, BtmDashContainer, BtmDashItem } from "./BtmDashContent";
import { HamburgerIcon } from "./HamburgerIcon";

// Export all individual components
export { LayoutContainer, Navbar, MainArea, Main, BtmDash } from "./Layout";
export { BtmDrawer, RightSidebar } from "./Drawers";
export { Sidebar } from "./Sidebar";
export { NavbarContent, NavbarStart, NavbarCenter, NavbarEnd, NavbarLink } from "./NavbarContent";
export { BtmDashStyled, BtmDashContainer, BtmDashItem } from "./BtmDashContent";
export { HamburgerIcon } from "./HamburgerIcon";

// Export types
export type { LayoutComponentsType, LabelPropsWithoutChildren, DivPropsWithoutChildren } from './types'

// Export grouped components for convenience (keeping existing API)
export const LayoutComponents: LayoutComponentsType = {
  Navbar,
  MainArea,
  Sidebar,
  RightSidebar,
  BtmDrawer,
  Main,
  BtmDash,
  LayoutContainer,
};

export const NavbarComponents = {
  NavbarContent,
  NavbarStart,
  NavbarCenter,
  NavbarEnd,
  NavbarLink,
};

export const BtmDashComponents = {
  BtmDashStyled,
  BtmDashContainer,
  BtmDashItem,
};
