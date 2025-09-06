import { JSX, splitProps } from "solid-js";
import { classesFromRecipe } from "../styles";
import { RightSidebar } from "../Drawers";
import { css, cx } from "@ryangreenup/panda-daisy-components-styled-system/css";

const rightDrawerStyles = css({
  backgroundColor: "base.200",
  borderLeft: "default",
  borderRadius: "lg 0 0 lg",
  boxShadow: "2xl",
  backdropFilter: "blur(8px)",
});

export const RightDrawerStyled = (props: JSX.IntrinsicElements["aside"]) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <RightSidebar
      {...others}
      class={cx(classesFromRecipe.rightSidebar, rightDrawerStyles, local.class)}
    />
  );
};
