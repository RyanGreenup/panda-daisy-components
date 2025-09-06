import { JSX, splitProps } from "solid-js";
import { classesFromRecipe } from "../styles";
import { Navbar } from "../Layout";
import { css, cx } from "@ryangreenup/panda-daisy-components-styled-system/css";

const navbarDaisyStyles = css({
  backgroundColor: "base.200",
  borderBottom: "default",
  gap: "2",
  boxShadow: "lg",
});

export const NavbarStyled = (props: JSX.IntrinsicElements["nav"]) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <Navbar
      {...others}
      class={cx(classesFromRecipe.navbar, navbarDaisyStyles, local.class)}
    />
  );
};
