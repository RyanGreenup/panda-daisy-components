import { JSX, splitProps } from "solid-js";
import { css, cx } from "../../../styled-system/css";
import { Label } from "./utilities/PeerInputs";

type LabelProps = JSX.IntrinsicElements["label"];

const hamburgerIconStyles = css({
  width: "6",
  height: "6",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  cursor: "pointer",
  "& span": {
    width: "full",
    height: "0.5",
    backgroundColor: "base.content",
    borderRadius: "sm",
    transition: "all 0.3s ease",
  },
  "[data-peer=drawer]:checked ~ * &": {
    "& span:nth-child(1)": {
      transform: "rotate(45deg) translate(5px, 5px)",
    },
    "& span:nth-child(2)": {
      opacity: "0",
    },
    "& span:nth-child(3)": {
      transform: "rotate(-45deg) translate(7px, -6px)",
    },
  },
});

export interface HamburgerIconProps extends LabelProps {
  name?: string;
}

export const HamburgerIcon = (props: HamburgerIconProps) => {
  const [local, others] = splitProps(props, ["class", "name"]);
  
  return (
    <Label 
      name={local.name || "drawer"} 
      class={cx(hamburgerIconStyles, local.class)}
      {...others}
    >
      <span />
      <span />
      <span />
    </Label>
  );
};