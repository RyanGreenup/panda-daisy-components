import { children, JSX, splitProps } from "solid-js";
import { css, cx } from "../../../styled-system/css";
import { BtmDash } from "./Layout";

type DivProps = JSX.IntrinsicElements["div"];
type ButtonProps = JSX.IntrinsicElements["button"];

// Styles
const styles = {
  container: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100%",
    padding: "0 0.5rem",
    maxWidth: "30rem",
    margin: "0 auto",
  }),
  item: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.25rem",
    padding: "0.5rem",
    borderRadius: "lg",
    cursor: "pointer",
    transition: "all 0.15s ease",
    color: "base.content",
    fontSize: "xs",
    fontWeight: "medium",
    minWidth: "4rem",
    "&:hover": {
      backgroundColor: "base.200",
    },
    "&:active": {
      scale: 0.95,
    },
  }),
  styled: css({
    backgroundColor: "base.100",
    borderTop: "default",
    boxShadow: "0 -4px 6px -1px rgb(0 0 0 / 0.1)",
  }),
};

// Styled BtmDash with mobile-first styling
export const BtmDashStyled = (props: JSX.IntrinsicElements["footer"]) => {
  const [local, others] = splitProps(props, ["class"]);
  return <BtmDash {...others} class={cx(styles.styled, local.class)} />;
};

// Container for organizing btmDash content
export const BtmDashContainer = (props: DivProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={cx(styles.container, local.class)}>
      {safeChildren()}
    </div>
  );
};

// Individual item/action for btmDash
export interface BtmDashItemProps extends ButtonProps {
  icon?: JSX.Element;
  label?: string;
}

export const BtmDashItem = (props: BtmDashItemProps) => {
  const [local, others] = splitProps(props, ["class", "children", "icon", "label"]);
  const safeChildren = children(() => local.children);

  return (
    <button
      type="button"
      {...others}
      class={cx(styles.item, local.class)}
    >
      {local.icon}
      {local.label && <span>{local.label}</span>}
      {safeChildren()}
    </button>
  );
};