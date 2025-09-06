import { children, JSX, splitProps } from "solid-js";
import { cx } from "@ryangreenup/panda-daisy-components-styled-system/css";
import { classesFromRecipe } from "./styles";
import { Overlay } from "./Sidebar";
import { BtmDrawerOverlay, RightDrawerOverlay } from "./Drawers";
import { useLayoutKeybindings } from "./utilities/useLayoutKeybindings";
import { InputHidden } from "./utilities/PeerInputs";

export const LayoutContainer = (props: JSX.IntrinsicElements["div"]): JSX.Element => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  useLayoutKeybindings();
  // We need to return a fragment to keep inputs as siblings of the container
  return (
    <>
      {/* Hidden toggle inputs - must be siblings of container for CSS selectors */}
      <InputHidden name="navbar" />
      <InputHidden name="btmDash" />
      <InputHidden name="drawer" />
      <InputHidden name="rightDrawer" />
      <InputHidden name="btmDrawer" />

      <div
        {...others}
        class={cx(classesFromRecipe.layoutContainer, local.class)}
      >
        {safeChildren()}
      </div>
    </>
  );
};

export const Navbar = (props: JSX.IntrinsicElements["nav"]) => {
  const [local, others] = splitProps(props, ["class"]);
  return <nav {...others} class={cx(classesFromRecipe.navbar, local.class)} />;
};

export const MainArea = (props: JSX.IntrinsicElements["div"]): JSX.Element => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={cx(classesFromRecipe.mainArea, local.class)}>
      {safeChildren()}
      <Overlay />
      <BtmDrawerOverlay />
      <RightDrawerOverlay />
    </div>
  );
};

export const BtmDash = (props: JSX.IntrinsicElements["footer"]) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <footer
      {...others}
      class={cx(classesFromRecipe.btmDash, local.class)}
    ></footer>
  );
};

export const Main = (props: JSX.IntrinsicElements["main"]) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <main {...others} class={cx(classesFromRecipe.mainContent, local.class)}>
      {safeChildren()}
    </main>
  );
};
