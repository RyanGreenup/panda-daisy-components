import { css } from "../../../styled-system/css";

export const comboboxStyles = () => ({
  control: css({
    display: "inline-flex",
    justifyContent: "space-between",
    // NOTE must bound in a div to control Width?
    // TODO make this a prop?
    w: "full",
    // TODO semantic token
    outline: "none",
    bg: "base.100",
    border: "field",
    borderRadius: "field",
    color: "base.content",
    transition: "border-color 0.3s, color 0.3s", // ease?
  }),
  controlMulti: css({
    flexWrap: "wrap",
  }),
  inputContainer: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.25rem",
    flex: "1",
  }),
  input: css({
    appearance: "none",
    display: "inline-flex",
    // If the user wants to go the full way to the selector
    // width: "full",
    outline: "none",
    minWidth: "0",
    minHeight: "2rem",
    paddingLeft: "1rem",
    fontSize: "md",
    background: "transparent",
    // TODO make consistent with all border radiuses.
    borderTopLeftRadius: "field",
    borderBottomLeftRadius: "field",
    _placeholder: {
      // TODO consider a different color
      color: "content.placeholder",
    },
  }),
  trigger: css({
    appearance: "none",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    outline: "none",
    borderTopRightRadius: "field",
    borderBottomRightRadius: "field",
    paddingX: "2",
    backgroundColor: "base.300",
    // fontSize: "sm",
    lineHeight: "0",
    borderLeft: "field",
    color: "base.content",
    transition: "0.3 background-color",
  }),
  clearButton: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    w: "1.5rem",
    h: "1.5rem",
    bg: "transparent",
    border: "none",
    borderRadius: "selector",
    cursor: "pointer",
    flexShrink: "0",
    transition: "all 0.15s ease-in-out",
    _hover: {
      bg: "base.200",
    },
  }),
  tag: css({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    px: "0.5rem",
    py: "0.125rem",
    bg: "secondary",
    color: "content.secondary",
    fontSize: "0.75rem",
    fontWeight: "medium",
    borderRadius: "selector",
    flexShrink: "0",
  }),
  tagButton: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    w: "1rem",
    h: "1rem",
    bg: "transparent",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.15s ease-in-out",
    _hover: {
      bg: "base.content",
      opacity: "0.2",
    },
  }),
  content: css({
    backgroundColor: "base.200",
    borderRadius: "selector",
    border: "selector",
    boxShadow: "lg",
    transformOrigin: "var(--kb-combobox-content-transform-origin)",
    animation: "comboboxContentHide 250ms ease-in forwards",
    _expanded: {
      animation: "comboboxContentShow 250ms ease-out",
    },
    /*
     box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    */
  }),
  listbox: css({
    maxH: "20rem",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "0.125rem",
  }),
  item: css({
    // Text color of icons
    color: "base.content",
    borderRadius: "selector",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // TODO token only
    height: "32px",
    paddingX: "8px",
    position: "relative",
    userSelect: "none",
    outline: "none",
    _disabled: {
      opacity: "0.5",
      pointerEvents: "none",
      // TODO we need a text color for disabled content.
      color: "secondary",
    },
    _highlighted: {
      outline: "none",
      bg: "primary",
      color: "content.primary",
    },
  }),
  itemIndicator: css({
    // TODO tokens
    h: "20px",
    w: "20px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  icon: css({
    height: "20px",
    width: "20px",
    flex: "0 0 20px",
  }),
  description: css({
    fontSize: "0.875rem",
    color: "base.content",
    opacity: "0.7",
    mt: "0.5rem",
  }),
  errorMessage: css({
    fontSize: "0.875rem",
    color: "error",
    mt: "0.5rem",
    display: "none",
    _invalid: {
      display: "block",
    },
  }),
});
