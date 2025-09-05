import { css, sva } from "../../../styled-system/css";

export const tableStyles = {
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
};

export const table = sva({
  slots: [
    "outerHeader",
    "header",
    "row",
    "cell",
    "th",
    "outerFooter",
    "body",
    "table",
    "globalSearchInput",
    "container",
  ],
  base: {
    container: {
      bg: "base.100",
      rounded: "box",
      border: "default",
      shadow: "box",
    },
    globalSearchInput: {
      w: "full",
      maxW: "20rem",
    },
    table: {
      borderCollapse: "separate",
      borderSpacing: "0",
    },
    body: {
      bg: "base.100",
    },
    outerFooter: {
      px: 4,
      py: 3,
      borderTop: "default",
      bg: "base.200",
      fontSize: "sm",
      color: "base.content",
      textAlign: "center",
      roundedBottom: "box",
    },
    outerHeader: {
      p: 4,
      rounded: "box",
    },
    row: {
      _hover: {
        bg: "base.hover",
        transition: "background 0.3s ease",
      },
    },
    cell: {
      px: 4,
      py: 3,
      display: "flex",
      alignItems: "center",
    },
    th: {
      px: 4,
      py: 3,
      textAlign: "left",
      fontSize: "sm",
      fontWeight: "semibold",
      color: "base.content",
      display: "flex",
      alignItems: "center",

      borderBottom: "default",
    },
  },
  variants: {
    darkHeader: {
      true: {
        outerHeader: {
          bg: "base.200",
        },

        header: {
          bg: "base.200",
        },
      },
      false: {
        outerHeader: {
          bg: "base.100",
        },
        header: {
          bg: "base.100",
        },
      },
    },
    striped: {
      true: {
        row: {
          bg: {
            _even: "base.100",
            _odd: "color-mix(in sRGB, var(--colors-base-100) 90%, var(--colors-base-content))",
          },
        },
      },
      false: {
        row: {
          bg: "base.100",
        },
      },
    },
    horizontalBorder: {
      true: {
        row: {
          borderBottom: "default",
        },
      },
    },
    verticalBorders: {
      true: {
        outerHeader: {
          bg: "base.200",
          borderBottom: "default",
        },
        header: {
          bg: "base.200",
        },
        cell: {
          borderRight: "default",
          _last: { borderRight: "none" },
        },
        th: {
          borderRight: "default",
          _last: { borderRight: "none" },
        },
      },
    },
    noFooter: {
      true: {
        outerFooter: {
          display: "none",
        },
      },
    },
    noHeader: {
      true: {
        outerHeader: {
          display: "none",
        },
      },
    },
  },
  defaultVariants: {
    darkHeader: true,
    horizontalBorder: true,
  },
});
