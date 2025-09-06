import * as solid_js5 from "solid-js";
import { Accessor, Component, JSX, JSXElement } from "solid-js";
import { RecipeVariantProps } from "@ryangreenup/panda-daisy-components-styled-system/css";
import { ComboboxTriggerMode } from "@kobalte/core/combobox";
import { ColumnDef } from "@tanstack/solid-table";
import * as _ryangreenup_panda_daisy_components_styled_system_types0 from "@ryangreenup/panda-daisy-components-styled-system/types";

//#region src/components/Layout/BtmDashContent.d.ts
type DivProps$1 = JSX.IntrinsicElements["div"];
type ButtonProps = JSX.IntrinsicElements["button"];
declare const BtmDashContainer: (props: DivProps$1) => JSX.Element;
interface BtmDashItemProps extends ButtonProps {
  icon?: JSX.Element;
  label?: string;
}
declare const BtmDashItem: (props: BtmDashItemProps) => JSX.Element;
//#endregion
//#region src/presets/layout/layout.d.ts
declare const peerNames: readonly ["navbar", "btmDash", "drawer", "rightDrawer", "btmDrawer"];
type PeerName = (typeof peerNames)[number];
//#endregion
//#region src/components/Layout/ToggleButtons.d.ts
interface ToggleButtonProps extends Omit<JSX.LabelHTMLAttributes<HTMLLabelElement>, "for"> {
  name: PeerName;
  children?: JSX.Element;
}
declare const ToggleButton: (props: ToggleButtonProps) => JSX.Element;
declare const DrawerToggle: (props: Omit<ToggleButtonProps, "name">) => JSX.Element;
declare const NavbarToggle: (props: Omit<ToggleButtonProps, "name">) => JSX.Element;
declare const RightDrawerToggle: (props: Omit<ToggleButtonProps, "name">) => JSX.Element;
declare const BtmDrawerToggle: (props: Omit<ToggleButtonProps, "name">) => JSX.Element;
declare const BtmDashToggle: (props: Omit<ToggleButtonProps, "name">) => JSX.Element;
//#endregion
//#region src/components/Layout/types.d.ts
type LabelPropsWithoutChildren = Omit<JSX.IntrinsicElements["label"], "children" | "for">;
type DivPropsWithoutChildren = Omit<JSX.IntrinsicElements["div"], "children">;
type NavbarComponent = Component<JSX.IntrinsicElements["nav"]>;
type MainAreaComponent = Component<JSX.IntrinsicElements["div"]>;
type SidebarComponent = Component<JSX.IntrinsicElements["aside"]>;
type RightSidebarComponent = Component<JSX.IntrinsicElements["aside"]>;
type BtmDrawerComponent = Component<JSX.IntrinsicElements["aside"]>;
type MainComponent = Component<JSX.IntrinsicElements["main"]>;
type BtmDashComponent = Component<JSX.IntrinsicElements["footer"]>;
type LayoutContainerComponent = Component<JSX.IntrinsicElements["div"]>;
interface LayoutComponentsType {
  Navbar: NavbarComponent;
  MainArea: MainAreaComponent;
  Sidebar: SidebarComponent;
  RightSidebar: RightSidebarComponent;
  BtmDrawer: BtmDrawerComponent;
  Main: MainComponent;
  BtmDash: BtmDashComponent;
  LayoutContainer: LayoutContainerComponent;
}
//#endregion
//#region src/components/Layout/Layout.d.ts
declare const LayoutContainer: (props: JSX.IntrinsicElements["div"]) => JSX.Element;
declare const Navbar: (props: JSX.IntrinsicElements["nav"]) => JSX.Element;
declare const MainArea: (props: JSX.IntrinsicElements["div"]) => JSX.Element;
declare const BtmDash: (props: JSX.IntrinsicElements["footer"]) => JSX.Element;
declare const Main: (props: JSX.IntrinsicElements["main"]) => JSX.Element;
//#endregion
//#region src/components/Layout/Drawers.d.ts
declare const RightSidebar: (props: JSX.IntrinsicElements["aside"]) => JSX.Element;
declare const BtmDrawer: (props: JSX.IntrinsicElements["aside"]) => JSX.Element;
//#endregion
//#region src/components/Layout/Sidebar.d.ts
declare const Sidebar: (props: JSX.IntrinsicElements["aside"]) => JSX.Element;
//#endregion
//#region src/components/Layout/NavbarContent.d.ts
type DivProps = JSX.IntrinsicElements["div"];
type AnchorProps = JSX.IntrinsicElements["a"];
declare const NavbarContent: (props: DivProps) => JSX.Element;
declare const NavbarStart: (props: DivProps) => JSX.Element;
declare const NavbarCenter: (props: DivProps) => JSX.Element;
declare const NavbarEnd: (props: DivProps) => JSX.Element;
declare const NavbarLink: (props: AnchorProps) => JSX.Element;
//#endregion
//#region src/components/Layout/HamburgerIcon.d.ts
type LabelProps = JSX.IntrinsicElements["label"];
interface HamburgerIconProps extends LabelProps {
  name?: string;
}
declare const HamburgerIcon: (props: HamburgerIconProps) => JSX.Element;
//#endregion
//#region src/components/Layout/index.d.ts
declare const LayoutComponents: LayoutComponentsType;
declare const NavbarComponents: {
  NavbarContent: (props: solid_js5.JSX.HTMLAttributes<HTMLDivElement>) => solid_js5.JSX.Element;
  NavbarStart: (props: solid_js5.JSX.HTMLAttributes<HTMLDivElement>) => solid_js5.JSX.Element;
  NavbarCenter: (props: solid_js5.JSX.HTMLAttributes<HTMLDivElement>) => solid_js5.JSX.Element;
  NavbarEnd: (props: solid_js5.JSX.HTMLAttributes<HTMLDivElement>) => solid_js5.JSX.Element;
  NavbarLink: (props: solid_js5.JSX.AnchorHTMLAttributes<HTMLAnchorElement>) => solid_js5.JSX.Element;
};
declare const BtmDashComponents: {
  BtmDashContainer: (props: solid_js5.JSX.HTMLAttributes<HTMLDivElement>) => solid_js5.JSX.Element;
  BtmDashItem: (props: BtmDashItemProps) => solid_js5.JSX.Element;
};
declare const ToggleComponents: {
  ToggleButton: (props: ToggleButtonProps) => solid_js5.JSX.Element;
  DrawerToggle: (props: Omit<ToggleButtonProps, "name">) => solid_js5.JSX.Element;
  NavbarToggle: (props: Omit<ToggleButtonProps, "name">) => solid_js5.JSX.Element;
  RightDrawerToggle: (props: Omit<ToggleButtonProps, "name">) => solid_js5.JSX.Element;
  BtmDrawerToggle: (props: Omit<ToggleButtonProps, "name">) => solid_js5.JSX.Element;
  BtmDashToggle: (props: Omit<ToggleButtonProps, "name">) => solid_js5.JSX.Element;
};
//#endregion
//#region src/components/Layout/styled/ToggleButtonsStyled.d.ts
interface StyledToggleButtonProps extends ToggleButtonProps {
  variant?: "default";
}
declare const ToggleButtonStyled: (props: StyledToggleButtonProps) => JSX.Element;
declare const DrawerToggleStyled: (props: Omit<StyledToggleButtonProps, "name">) => JSX.Element;
declare const NavbarToggleStyled: (props: Omit<StyledToggleButtonProps, "name">) => JSX.Element;
declare const RightDrawerToggleStyled: (props: Omit<StyledToggleButtonProps, "name">) => JSX.Element;
declare const BtmDrawerToggleStyled: (props: Omit<StyledToggleButtonProps, "name">) => JSX.Element;
declare const BtmDashToggleStyled: (props: Omit<StyledToggleButtonProps, "name">) => JSX.Element;
//#endregion
//#region src/components/Layout/styled/NavbarStyled.d.ts
declare const NavbarStyled: (props: JSX.IntrinsicElements["nav"]) => JSX.Element;
//#endregion
//#region src/components/Layout/styled/BtmDashStyled.d.ts
declare const BtmDashStyled: (props: JSX.IntrinsicElements["footer"]) => JSX.Element;
//#endregion
//#region src/components/Layout/styled/BtmDrawerStyled.d.ts
declare const BtmDrawerStyled: (props: JSX.IntrinsicElements["aside"]) => JSX.Element;
//#endregion
//#region src/components/Layout/styled/RightDrawerStyled.d.ts
declare const RightDrawerStyled: (props: JSX.IntrinsicElements["aside"]) => JSX.Element;
//#endregion
//#region src/components/Layout/styled/SidebarStyled.d.ts
declare const SidebarStyled: (props: JSX.IntrinsicElements["aside"]) => JSX.Element;
//#endregion
//#region src/components/Layout/styled/index.d.ts
declare const StyledLayout: LayoutComponentsType;
declare const StyledToggleComponents: {
  ToggleButton: (props: StyledToggleButtonProps) => solid_js5.JSX.Element;
  DrawerToggle: (props: Omit<StyledToggleButtonProps, "name">) => solid_js5.JSX.Element;
  NavbarToggle: (props: Omit<StyledToggleButtonProps, "name">) => solid_js5.JSX.Element;
  RightDrawerToggle: (props: Omit<StyledToggleButtonProps, "name">) => solid_js5.JSX.Element;
  BtmDrawerToggle: (props: Omit<StyledToggleButtonProps, "name">) => solid_js5.JSX.Element;
  BtmDashToggle: (props: Omit<StyledToggleButtonProps, "name">) => solid_js5.JSX.Element;
};
//#endregion
//#region src/components/Combobox/SingleCombobox.d.ts
interface SingleComboboxProps {
  options: string[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  ref?: (el: HTMLInputElement) => void;
  triggerMode?: ComboboxTriggerMode;
}
declare function SingleCombobox(props: SingleComboboxProps): JSX.Element;
//#endregion
//#region src/components/Combobox/MultiCombobox.d.ts
interface MultiComboboxProps {
  options: string[];
  placeholder?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  label?: string;
  ref?: (el: HTMLInputElement) => void;
  triggerMode?: ComboboxTriggerMode;
}
declare function MultiCombobox(props: MultiComboboxProps): JSX.Element;
//#endregion
//#region src/components/Layout/utilities/useResizeKeybindings.d.ts
interface ResizeKeybindingsOptions {
  cssVariable: string;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  stepSize?: number;
  onResize?: (widthPx: number) => void;
  enabled?: boolean;
  onResizeStart?: () => void;
  /**
   * Should the Sidebar automatically open when the user triggers resize?
   */
  autoOpen?: Accessor<boolean>;
}
declare function useResizeKeybindings(options: ResizeKeybindingsOptions): {
  isActive: Accessor<boolean>;
  resize: (direction: "increase" | "decrease") => void;
};
//#endregion
//#region src/components/DataTables/VirtualizedDatatable.d.ts
interface VirtualizedDataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  enableGlobalFilter?: boolean;
  enableColumnFilters?: boolean;
  enableSorting?: boolean;
  searchPlaceholder?: string;
  height?: string;
  estimateSize?: () => number;
  overscan?: number;
}
declare function VirtualizedDataTable<T>(props: VirtualizedDataTableProps<T>): JSXElement;
//#endregion
//#region src/components/VirtualList.d.ts
interface VirtualListProps {
  count: Accessor<number>;
  estimateSize?: () => number;
  height?: string;
  overscan?: number;
  renderItemCallback: (index: number, size: number) => JSX.Element;
}
declare function VirtualList(props: VirtualListProps): JSX.Element;
//#endregion
//#region src/components/VirtualPhotoGrid.d.ts
interface Photo {
  id: string;
  url: string;
  title: string;
  date?: string;
}
interface VirtualPhotoGridProps {
  photos: Photo[];
  columns?: number;
  height?: string;
  overscan?: number;
  selectedPhotoId?: string;
  onPhotoClick?: (photo: Photo) => void;
  onPhotoDblClick?: (photo: Photo) => void;
}
declare function VirtualPhotoGrid(props: VirtualPhotoGridProps): JSX.Element;
//#endregion
//#region src/components/Progress.d.ts
declare const progressStyle: _ryangreenup_panda_daisy_components_styled_system_types0.RecipeRuntimeFn<{
  size: {
    sm: {
      h: "0.25rem";
    };
    md: {
      h: "0.5rem";
    };
    lg: {
      h: "0.75rem";
    };
  };
}>;
declare const progressBarStyle: _ryangreenup_panda_daisy_components_styled_system_types0.RecipeRuntimeFn<{
  variant: {
    default: {
      bg: "primary";
    };
    success: {
      bg: "success";
    };
    warning: {
      bg: "warning";
    };
    error: {
      bg: "error";
    };
  };
}>;
type ProgressVariants = RecipeVariantProps<typeof progressStyle> & Pick<RecipeVariantProps<typeof progressBarStyle>, "variant">;
interface ProgressProps extends ProgressVariants {
  value: Accessor<number>;
  max?: Accessor<number>;
  showLabel?: Accessor<number>;
  children?: JSXElement;
  class?: string;
}
declare function Progress(props: ProgressProps): JSXElement;
//#endregion
//#region src/components/Badge.d.ts
declare const Badge: _ryangreenup_panda_daisy_components_styled_system_types0.StyledComponent<"span", {
  variant?: "default" | "neutral" | "success" | "warning" | "error";
}>;
//#endregion
//#region src/components/Button.d.ts
declare const Button: _ryangreenup_panda_daisy_components_styled_system_types0.StyledComponent<"button", {
  variant?: "primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "warning" | "error" | "outline" | "link" | "ghost";
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  fullWidth?: boolean;
}>;
//#endregion
export { Badge, BtmDash, BtmDashComponents, BtmDashContainer, BtmDashItem, BtmDashStyled, BtmDashToggle, BtmDashToggleStyled, BtmDrawer, BtmDrawerStyled, BtmDrawerToggle, BtmDrawerToggleStyled, Button, SingleCombobox as Combobox, type DivPropsWithoutChildren, DrawerToggle, DrawerToggleStyled, HamburgerIcon, type LabelPropsWithoutChildren, LayoutComponents, LayoutContainer, Main, MainArea, MultiCombobox, Navbar, NavbarCenter, NavbarComponents, NavbarContent, NavbarEnd, NavbarLink, NavbarStart, NavbarStyled, NavbarToggle, NavbarToggleStyled, Progress, RightDrawerStyled, RightDrawerToggle, RightDrawerToggleStyled, RightSidebar, Sidebar, SidebarStyled, SingleCombobox, StyledLayout, type StyledToggleButtonProps, StyledToggleComponents, ToggleButton, type ToggleButtonProps, ToggleButtonStyled, ToggleComponents, VirtualList, VirtualPhotoGrid, VirtualizedDataTable, useResizeKeybindings };