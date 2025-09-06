import { cva, type RecipeVariantProps } from "@ryangreenup/panda-daisy-components-styled-system/css";
import { styled } from "@ryangreenup/panda-daisy-components-styled-system/jsx";

const badgeStyle = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    px: "0.625rem",
    py: "0.125rem",
    borderRadius: "selector",
    fontWeight: "medium",
  },
  variants: {
    variant: {
      default: {
        bg: "secondary",
        color: "content.secondary",
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
      neutral: {
        bg: "base.300",
        color: "base.content",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type BadgeVariants = RecipeVariantProps<typeof badgeStyle>;
export const Badge = styled("span", badgeStyle);
