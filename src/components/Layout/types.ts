import { Component, JSX } from "solid-js";

export type LabelPropsWithoutChildren = Omit<
  JSX.IntrinsicElements["label"],
  "children" | "for"
>;

export type DivPropsWithoutChildren = Omit<JSX.IntrinsicElements["div"], "children">;

// Generic component types for layout components
export type NavbarComponent = Component<JSX.IntrinsicElements["nav"]>;
export type MainAreaComponent = Component<JSX.IntrinsicElements["div"]>;
export type SidebarComponent = Component<JSX.IntrinsicElements["aside"]>;
export type RightSidebarComponent = Component<JSX.IntrinsicElements["aside"]>;
export type BtmDrawerComponent = Component<JSX.IntrinsicElements["aside"]>;
export type MainComponent = Component<JSX.IntrinsicElements["main"]>;
export type BtmDashComponent = Component<JSX.IntrinsicElements["footer"]>;
export type LayoutContainerComponent = Component<JSX.IntrinsicElements["div"]>;

export interface LayoutComponentsType {
  Navbar: NavbarComponent;
  MainArea: MainAreaComponent;
  Sidebar: SidebarComponent;
  RightSidebar: RightSidebarComponent;
  BtmDrawer: BtmDrawerComponent;
  Main: MainComponent;
  BtmDash: BtmDashComponent;
  LayoutContainer: LayoutContainerComponent;
}

// Partial type for styled components that may not implement all components yet
// export type StyledLayoutType = Partial<LayoutComponentsType>;

