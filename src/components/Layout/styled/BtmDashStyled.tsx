import { JSX, splitProps } from "solid-js";
import { classesFromRecipe } from "../styles";
import { BtmDash } from "../Layout";
import { css, cx } from "@ryangreenup/panda-daisy-components-styled-system/css";

const btmDashDaisyStyles = css({
  backgroundColor: "base.200",
  borderTop: "default",
  gap: "2",
  boxShadow: "lg",
});

export const BtmDashStyled = (props: JSX.IntrinsicElements["footer"]) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <BtmDash
      {...others}
      class={cx(classesFromRecipe.btmDash, btmDashDaisyStyles, local.class)}
    />
  );
};