import { css } from "../../../styled-system/css";

// TODO should this be a utility or just a raw  css?
const inputField = css.raw({
  border: "default",
  borderRadius: "field",
  fontSize: "field",

  px: 2,
  py: 1,
  _placeholder: { color: "content.placeholder" },

  _focus: {
    outline: "none",
    borderColor: "primary",
    // ring: "2px",
    // ringColor: "blue.500",
  },
});

export const tableStyles = {
  container: css({
    // w: "min-content",
    // p: 4,
    bg: "base.100",
    rounded: "lg",
    border: "default",
    shadow: "sm",
  }),
  globalSearchContainer: css({
    // TODO uniform tokens
    p: 4,
    borderBottom: "default",
  }),
  globalSearchInput: css(inputField, {
    w: "full",
    maxW: "20rem",
  }),
  table: css({
    borderCollapse: "separate",
    borderSpacing: "0",
  }),
  tableHead: css({
    bg: "base.200",
    borderBottom: "default",
    display: "block",
    // color: "base.content",
  }),
  th: css({
    // TODO should this padding be a default?
    px: 4,
    py: 3,
    textAlign: "left",
    fontSize: "sm",
    fontWeight: "semibold",
    color: "base.content",
    borderRight: "default",
    _last: { borderRight: "none" },
    display: "flex",
    alignItems: "center",
  }),
  headerContainer: css({
    gap: "2",
  }),
  sortButton: css({
    display: "flex",
    alignItems: "center",
    gap: 1,
    bg: "transparent",
    cursor: "pointer",
    fontSize: "sm",
    fontWeight: "semibold",
    color: "base.content",

    // Don't wrap, it misaligns the filters
    whiteSpace: "nowrap",

    // TODO let's do a ghost button
    // Hover to demonstrate interactivity
    w: "full",
    px: 4,
    paddingTop: 2,
    _hover: {
      color: "base.content/80",
      transform: "scale(1.05)",
      transition: "transform 0.3s ease-in-out, color 0.3s ease-in-out",
    },
    _disabled: {
      cursor: "not-allowed",
      color: "content.placeholder",
    },
  }),
  filterInput: css(inputField, {
    // w: "full",
    // mx: "2",
    overflow: "hidden",
    // maxW: "20",
  }),
};
