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

    // TODO VARIANT: verticalBorder
    // borderBottom: "default",
    bg: "base.200",
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
    display: "block",
    // color: "base.content",

    // TODO VARIANT: verticalBorder
    // If it's enabled, we make this darker with a bottom border to visually
    // separate
    bg: "base.200",
    // borderBottom: "default",
  }),
  th: css({
    // TODO should this padding be a default?
    px: 4,
    py: 3,
    textAlign: "left",
    fontSize: "sm",
    fontWeight: "semibold",
    color: "base.content",
    display: "flex",
    alignItems: "center",

    borderBottom: "default",
    // TODO VARIANT: verticalBorder
    // borderRight: "default",
    // _last: { borderRight: "none" },
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
    overflow: "hidden",
  }),
  tableBody: css({
    bg: "base.100",
  }),
  tableRow: css({
    borderBottom: "default",
    _hover: {
      // TODO I need a hover background color
      // bg: "color-mix(in sRGB, var(--colors-base-100) 90%, var(--colors-base-content))",
      bg: "primary/20",
      transition: "background 0.3s ease",
    },
    bg: {
      // TODO I need a striped color
      // TODO VARIANT
      _even: "base.100",
      _odd: "base.100",
    },
  }),
  tableCell: css({
    px: 4,
    py: 3,
    // fontSize: "sm",
    // color: "gray.900",
    display: "flex",
    alignItems: "center",

    // TODO VARIANT: verticalBorder
    // borderRight: "default",
    // _last: { borderRight: "none" },
  }),

  footer: css({
    px: 4,
    py: 3,
    borderTop: "default",
    bg: "base.200",
    fontSize: "sm",
    color: "base.content",
    textAlign: "center",
    // TODO common token
    roundedBottom: "lg",
  }),
};
