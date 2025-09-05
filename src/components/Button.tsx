import { cva, type RecipeVariantProps } from "../../styled-system/css";
import { styled } from "../../styled-system/jsx";

const buttonStyle = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "medium",
    // TODO this isn't right
    borderRadius: "field",
    shadow: "md",
    cursor: "pointer",
    userSelect: "none",

    // Focus styles
    _focus: {
      outline: "none",
      ringWidth: "2px",
      ringColor: "primary",
      ringOffset: "2px",
    },
    transition: "all 0.2s ease",
    _hover: {
      transform: "scale(1.05)",
      // TODO common token
      opacity: 0.9,
    },
    _active: {
      opacity: 0.8,
    },

    // Disabled styles
    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
      pointerEvents: "none",
    },
  },
  variants: {
    variant: {
      primary: {
        bg: "primary",
        color: "content.primary",
      },
      secondary: {
        bg: "secondary",
        color: "content.secondary",
      },
      accent: {
        bg: "accent",
        color: "content.accent",
      },
      neutral: {
        bg: "neutral",
        color: "content.neutral",
      },
      info: {
        bg: "info",
        color: "content.info",
      },
      success: {
        bg: "success",
        color: "content.success",
      },
      warning: {
        bg: "warning",
        color: "content.warning",
      },
      error: {
        bg: "error",
        color: "content.error",
      },
      ghost: {
        bg: "transparent",
        color: "base.content",
        shadow: "none",
        _hover: {
          bg: "base.200",
          opacity: 1,
        },
        _active: {
          bg: "base.300",
          opacity: 1,
        },
      },
      outline: {
        bg: "transparent",
        color: "primary",
        border: "1px solid",
        borderColor: "primary",
        _hover: {
          bg: "primary",
          color: "content.primary",
          opacity: 1,
        },
        _active: {
          bg: "primary",
          color: "content.primary",
          opacity: 0.8,
        },
      },
      link: {
        bg: "transparent",
        color: "link.default",
        textDecoration: "underline",
        textDecorationColor: "link.underline",
        _hover: {
          color: "link.hover",
          textDecorationColor: "link.hover",
          opacity: 1,
        },
        _active: {
          color: "link.hover",
        },
        _focus: {
          ringWidth: "2px",
          ringColor: "link.default",
        },
      },
    },
    size: {
      xs: {
        px: 2,
        py: 1,
        fontSize: "xs",
        minH: "6",
      },
      sm: {
        px: 3,
        py: 1.5,
        fontSize: "sm",
        minH: "8",
      },
      md: {
        px: 4,
        py: 2,
        fontSize: "sm",
        minH: "10",
      },
      lg: {
        px: 6,
        py: 3,
        fontSize: "base",
        minH: "12",
      },
      xl: {
        px: 8,
        py: 4,
        fontSize: "lg",
        minH: "14",
      },
    },
    fullWidth: {
      true: {
        width: "full",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ButtonVariants = RecipeVariantProps<typeof buttonStyle>;
export const Button = styled("button", buttonStyle);
