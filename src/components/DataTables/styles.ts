import { css } from "../../../styled-system/css";

export const tableStyles = () => ({
  container: css({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    w: "full",
  }),
  searchContainer: css({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  }),
  searchInput: css({
    w: "full",
    maxW: "sm",
    px: "0.75rem",
    py: "0.5rem",
    bg: "base.100",
    border: "field",
    borderRadius: "field",
    color: "base.content",
    outline: "none",
    transition: "border-color 0.15s ease-in-out",
    _focus: {
      borderColor: "primary",
    },
    _placeholder: {
      color: "content.placeholder",
    },
  }),
  tableWrapper: css({
    position: "relative",
    w: "full",
    border: "field",
    borderRadius: "field",
    overflow: "hidden",
    bg: "base.100",
  }),
  table: css({
    w: "full",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  }),
  thead: css({
    bg: "base.200",
    position: "sticky",
    top: 0,
    zIndex: 10,
  }),
  headerRow: css({
    borderBottom: "1px solid token(colors.base.300)",
  }),
  headerCell: css({
    px: "1rem",
    py: "0.75rem",
    textAlign: "left",
    borderRight: "1px solid token(colors.base.300)",
    _last: {
      borderRight: "none",
    },
  }),
  sortButton: css({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    w: "full",
    textAlign: "left",
    bg: "transparent",
    border: "none",
    cursor: "pointer",
    color: "base.content",
    fontWeight: "600",
    outline: "none",
    _hover: {
      color: "primary",
    },
    _disabled: {
      cursor: "default",
      color: "base.content",
    },
  }),
  filterInput: css({
    w: "full",
    mt: "0.5rem",
    px: "0.5rem",
    py: "0.25rem",
    bg: "base.100",
    border: "1px solid token(colors.base.300)",
    borderRadius: "0.25rem",
    fontSize: "0.875rem",
    color: "base.content",
    outline: "none",
    _focus: {
      borderColor: "primary",
    },
    _placeholder: {
      color: "content.placeholder",
    },
  }),
  tbody: css({
    bg: "base.100",
  }),
  bodyRow: css({
    borderBottom: "1px solid token(colors.base.300)",
    transition: "background-color 0.15s ease-in-out",
    _hover: {
      bg: "base.200/50",
    },
    "&:nth-child(even)": {
      bg: "base.100",
    },
    "&:nth-child(odd)": {
      bg: "base.200/30",
    },
  }),
  bodyCell: css({
    px: "1rem",
    py: "0.75rem",
    borderRight: "1px solid token(colors.base.300)",
    _last: {
      borderRight: "none",
    },
  }),
  footer: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    px: "1rem",
    py: "0.5rem",
    bg: "base.200",
    borderRadius: "field",
    fontSize: "0.875rem",
    color: "base.content",
  }),
});

export const virtualTableStyles = () => ({
  scrollContainer: css({
    overflowY: "auto",
  }),
  virtualRow: css({
    position: "absolute",
    top: 0,
    left: 0,
    w: "full",
  }),
});