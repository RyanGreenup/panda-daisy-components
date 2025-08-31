import { children, JSX, splitProps } from "solid-js";
import { css, cx } from "../../../styled-system/css";

type DivProps = JSX.IntrinsicElements["div"];
type AnchorProps = JSX.IntrinsicElements["a"];

// Helper to create styled components
const createNavbarComponent = (baseStyles: string) => 
  (props: DivProps) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    const safeChildren = children(() => local.children);
    
    return (
      <div {...others} class={cx(baseStyles, local.class)}>
        {safeChildren()}
      </div>
    );
  };

// Styles
const styles = {
  content: css({
    display: "flex",
    alignItems: "center", 
    justifyContent: "space-between",
    padding: "0 1rem",
    height: "100%",
  }),
  section: css({
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  }),
  link: css({
    textDecoration: "none",
    color: "inherit",
    transition: "all 0.15s ease",
    "&:hover": { opacity: 0.7 },
  }),
};

// Components
export const NavbarContent = createNavbarComponent(styles.content);
export const NavbarStart = createNavbarComponent(styles.section);
export const NavbarCenter = createNavbarComponent(cx(styles.section, css({ gap: "2rem" })));
export const NavbarEnd = createNavbarComponent(styles.section);

export const NavbarLink = (props: AnchorProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);
  
  return (
    <a {...others} class={cx(styles.link, local.class)}>
      {safeChildren()}
    </a>
  );
};