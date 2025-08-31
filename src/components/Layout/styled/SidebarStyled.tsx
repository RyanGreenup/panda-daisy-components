import { JSX, splitProps } from "solid-js";
import { classesFromRecipe } from "../styles";
import { Sidebar } from "../Sidebar";
import { css, cx } from "../../../../styled-system/css";

const sidebarDaisyStyles = css({
  backgroundColor: "base.200",
  borderRight: "default",
  boxShadow: "xl",
  backdropFilter: "blur(8px)",
});

export const SidebarStyled = (props: JSX.IntrinsicElements["aside"]) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <Sidebar
      {...others}
      class={cx(classesFromRecipe.sidebar, sidebarDaisyStyles, local.class)}
    />
  );
};
