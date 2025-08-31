import { JSX, splitProps } from "solid-js";
import { classesFromRecipe } from "../styles";
import { Sidebar } from "../Sidebar";
import { css, cx } from "../../../../styled-system/css";

const sidebarDaisyStyles = css({
  backgroundColor: "base.200",
  borderRight: "default",
  boxShadow: "xl",
  // TODO this shouldn't cast a shadow on the bottom dash, but this needs to reference design tokens
  // boxShadow: "5px 0 5px -3px rgba(0, 0, 0, 0.1), 4px 0 6px -4px rgba(0, 0, 0, 0.1)",

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
