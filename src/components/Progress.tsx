import { cva, type RecipeVariantProps } from "../../styled-system/css";
import { styled } from "../../styled-system/jsx";
import { Accessor, JSXElement, Show } from "solid-js";

const progressStyle = cva({
  base: {
    bg: "base.300",
    borderRadius: "full",
    overflow: "hidden",
    position: "relative",
  },
  variants: {
    size: {
      sm: {
        h: "0.25rem",
      },
      md: {
        h: "0.5rem",
      },
      lg: {
        h: "0.75rem",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const progressBarStyle = cva({
  base: {
    h: "full",
    borderRadius: "full",
    transition: "all 0.3s ease",
  },
  variants: {
    variant: {
      default: {
        bg: "primary",
      },
      success: {
        bg: "success",
      },
      warning: {
        bg: "warning",
      },
      error: {
        bg: "error",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const ProgressContainer = styled("div", progressStyle);
const ProgressBar = styled("div", progressBarStyle);

export type ProgressVariants = RecipeVariantProps<typeof progressStyle> &
  Pick<RecipeVariantProps<typeof progressBarStyle>, "variant">;

export interface ProgressProps extends ProgressVariants {
  value: Accessor<number>;
  max?: Accessor<number>;
  showLabel?: Accessor<boolean>;
  children?: JSXElement;
  class?: string;
}

export function Progress(props: ProgressProps): JSXElement {
  const percentage = () => Math.min(Math.max((props.value() / (props.max?.() || 100)) * 100, 0), 100);

  return (
    <div style={{ display: "flex", "align-items": "center", gap: "0.5rem" }}>
      <ProgressContainer
        size={props.size}
        class={props.class}
        style={{ flex: "1" }}
      >
        <ProgressBar
          variant={props.variant}
          style={{ width: `${percentage()}%` }}
        />
      </ProgressContainer>
      <Show when={props.showLabel?.()}>
        <span style={{
          "font-size": "0.75rem",
          color: "var(--colors-base-content)",
          "min-width": "2rem",
          "text-align": "right",
        }}>
          {Math.round(percentage())}%
        </span>
      </Show>
      {props.children}
    </div>
  );
}
