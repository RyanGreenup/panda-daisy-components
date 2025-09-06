import { JSX } from "solid-js";
import { css, cx } from "@ryangreenup/panda-daisy-components-styled-system/css";

type KbdSize = "xs" | "sm" | "md" | "lg" | "xl";

interface KbdProps {
  children: JSX.Element;
  size?: KbdSize;
  class?: string;
}

const kbdStyles = {
  base: css({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "sm",
    backgroundColor: "base.200",
    verticalAlign: "middle",
    paddingX: "0.5em",
    border: "1px solid token(colors.base.content/20)",
    borderBottom: "2px solid token(colors.base.content/20)",
    fontSize: "0.875rem",
    height: "calc(token(sizes.selector) * 6)",
    minWidth: "calc(token(sizes.selector) * 6)",
    fontFamily: "mono",
    fontWeight: "medium",
    userSelect: "none",
  }),
  sizes: {
    xs: css({
      height: "calc(token(sizes.selector) * 4)",
      minWidth: "calc(token(sizes.selector) * 4)",
      fontSize: "0.625rem",
    }),
    sm: css({
      height: "calc(token(sizes.selector) * 5)",
      minWidth: "calc(token(sizes.selector) * 5)",
      fontSize: "0.75rem",
    }),
    md: css({
      height: "calc(token(sizes.selector) * 6)",
      minWidth: "calc(token(sizes.selector) * 6)",
      fontSize: "0.875rem",
    }),
    lg: css({
      height: "calc(token(sizes.selector) * 7)",
      minWidth: "calc(token(sizes.selector) * 7)",
      fontSize: "1rem",
    }),
    xl: css({
      height: "calc(token(sizes.selector) * 8)",
      minWidth: "calc(token(sizes.selector) * 8)",
      fontSize: "1.125rem",
    }),
  },
};

export function Kbd(props: KbdProps): JSX.Element {
  return (
    <kbd
      class={cx(
        kbdStyles.base,
        kbdStyles.sizes[props.size ?? "md"],
        props.class
      )}
    >
      {props.children}
    </kbd>
  );
}
