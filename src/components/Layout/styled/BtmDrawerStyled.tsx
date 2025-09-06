import { JSX, splitProps } from "solid-js";
import { classesFromRecipe } from "../styles";
import { BtmDrawer } from "../Drawers";
import { css, cx } from "@ryangreenup/panda-daisy-components-styled-system/css";

const btmDrawerDaisyStyles = css({
  backgroundColor: "base.200",
  borderTop: "default",
  borderRadius: "lg lg 0 0",
  boxShadow: "2xl",
  roundedBottom: "0",
  roundedTop: "lg",

  // width: "clamp({sizes.sm}, {sizes.md}, 100%)",

  // maxWidth: "drawer.maxWidth",
  margin: "0 auto",
  backdropFilter: "blur(8px)",
});

export const BtmDrawerStyled = (props: JSX.IntrinsicElements["aside"]) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <BtmDrawer
      {...others}
      class={cx(classesFromRecipe.btmDrawer, btmDrawerDaisyStyles, local.class)}
    />
  );
};
