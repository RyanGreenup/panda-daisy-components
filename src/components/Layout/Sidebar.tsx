import { children, JSX, splitProps } from "solid-js";
import { DivPropsWithoutChildren, LabelPropsWithoutChildren } from "./types";
import { createPeerId } from "~/presets/layout/layout";
import { css, cx } from "../../../styled-system/css";
import { classesFromRecipe } from "./styles";
import { resize } from "./utilities/directives/resize";
// TODO move this

export const Overlay = (props: LabelPropsWithoutChildren) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <label
      {...others}
      for={createPeerId("drawer")}
      class={cx(classesFromRecipe.overlay, local.class)}
    />
  );
};

export const Sidebar = (props: JSX.IntrinsicElements["aside"]) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);
  return (
    <aside {...others} class={cx(classesFromRecipe.sidebar, local.class)}>
      {safeChildren()}
      <SidebarHandle />
    </aside>
  );
};

export const SidebarHandle = (props: DivPropsWithoutChildren): JSX.Element => {
  return (
    <div
      use:resize={{
        // Panda CSS "sizes.sidebar.width" token becomes "--sizes-sidebar-width"
        cssVariable: "--sizes-sidebar-width",
        minWidth: 200,
        maxWidth: 600,
        defaultWidth: 320,
      }}
      class={cx(
        "group",
        css({
          // Hide by Default (on Mobile)
          display: "none",
          // Display only on Devices not using a sidebar
          minWidthDrawer: {
            position: "absolute",
            width: "0px",
            right: "0px",
            _drawerChecked: {
              width: "sidebar.handle.grab.width",
              right: "calc(0px - {sizes.sidebar.handle.grab.width})",
            },
            transition: "right 0.3s ease",
            top: "0",
            height: "100%",
            cursor: "col-resize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
          },
        }),
      )}
    >
      <div
        class={css({
          position: "absolute",
          left: "0",
          height: "sidebar.handle.display.height",
          width: "sidebar.handle.display.width",
          background: "gray.400",
          borderRadius: "3px",
          opacity: 0,
          transition: ["opacity", "width", "height", "transform"].join(
            " 0.3s ease, ",
          ),
          transform: {
            // Hide when the sidebar is closed
            base: "translateX(-100%)",
            // Show only when the sidebar is visible
            _drawerChecked: "translateX(0%)",
          },
          _groupHover: {
            opacity: 1,
            height: "sidebar.handle.display.hover.height",
            width: "sidebar.handle.display.hover.width",
          },
          _sidebarResizing: {
            opacity: 1,
            height: "sidebar.handle.display.hover.height",
            width: "sidebar.handle.display.hover.width",
          },
        })}
      ></div>
    </div>
  );
};
