import { css, sva } from "../../../styled-system/css";

// TODO should this be a utility or just a raw  css?
// TODO candidate for either an atomic or preset recipe
export const inputField = css.raw({
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
      // TODO token for card maybe?
      rounded: "lg",
      border: "default",
      // TODO token for shadow on, I suppose card
      shadow: "sm",
    },
    globalSearchInput: css.raw(inputField, {
      w: "full",
      maxW: "20rem",
    }),
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
      // TODO common token
      roundedBottom: "lg",
    },
    outerHeader: {
      p: 4,
    },
    row: {
      _hover: {
        // TODO I need a hover background color
        bg: "primary/20",
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
