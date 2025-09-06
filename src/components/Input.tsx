import { cva, type RecipeVariantProps } from "@ryangreenup/panda-daisy-components-styled-system/css";
import { styled } from "@ryangreenup/panda-daisy-components-styled-system/jsx";

const inputStyle = cva({
  base: {
    border: "default",
    borderRadius: "field",
    fontSize: "field",

    px: 2,
    py: 1,
    _placeholder: { color: "content.placeholder" },

    _focus: {
      outline: "none",
      borderColor: "primary",
    },
  },
  variants: {
    variant: {
      primary: {
        borderColor: "primary",
      },
      secondary: {
        borderColor: "secondary",
      },
      ghost: {
        borderColor: "transparent",
      },
      accent: {
        bg: "accent",
      },
      neutral: {
        borderColor: "neutral",
      },
      info: {
        borderColor: "info",
      },
      success: {
        borderColor: "success",
      },
      warning: {
        borderColor: "warning",
      },
      error: {
        borderColor: "error",
      },
    },
  },
});

export type InputVariants = RecipeVariantProps<typeof inputStyle>;
export const Input = styled("input", inputStyle);
