import { children, JSX, splitProps } from "solid-js";
import { LabelPropsWithoutChildren } from "./types";
import { cx } from "../../../styled-system/css";
import { classesFromRecipe } from "./styles";
import { createPeerId } from "../../presets/layout/layout";

export const RightDrawerOverlay = (props: LabelPropsWithoutChildren) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <label
      {...others}
      for={createPeerId("rightDrawer")}
      class={cx(classesFromRecipe.rightDrawerOverlay, local.class)}
    />
  );
};

export const BtmDrawerOverlay = (props: LabelPropsWithoutChildren) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <label
      {...others}
      for={createPeerId("btmDrawer")}
      class={cx(classesFromRecipe.btmDrawerOverlay, local.class)}
    />
  );
};

// TODO let's rename this, it will always be a drawer
export const RightSidebar = (props: JSX.IntrinsicElements["aside"]) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);
  return (
    <aside {...others} class={cx(classesFromRecipe.rightSidebar, local.class)}>
      {safeChildren()}
    </aside>
  );
};

export const BtmDrawer = (props: JSX.IntrinsicElements["aside"]) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);
  return (
    <aside {...others} class={cx(classesFromRecipe.btmDrawer, local.class)}>
      {safeChildren()}
    </aside>
  );
};
