import { defineAnimationStyles, definePreset } from "@pandacss/dev";
import pandaPreset from "@pandacss/preset-panda";
import { articleRecipe } from "./recipes/article.recipe";
import dracula from "./themes/dracula";
import LightTheme from "./themes/light";
import night from "./themes/night";
import synthwave from "./themes/synthwave";

const prefersDarkTheme = dracula;
const darkTheme = night;
const defaultTheme = LightTheme;

// TODO favor data-theme over prefers-color-scheme
const keyframes = {
  comboboxContentShow: {
    from: {
      opacity: 0,
      transform: "translateY(-8px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  comboboxContentHide: {
    from: {
      opacity: 1,
      transform: "translateY(0)",
    },
    to: {
      opacity: 0,
      transform: "translateY(-8px)",
    },
  },
};

const fontSizes = {
  field: { value: "sm" },
};

const backgroundTransition = "background-color 0.2s ease, color 0.2s ease";

export const animationStyles = defineAnimationStyles({
  contentShow: {
    value: {
      transformOrigin: "var(--kb-combobox-content-transform-origin)",
      animationDuration: "0.3s",
      _expanded: {
        animationName: "contentShow",
      },
    },
  },
});

const spacing = {
  navbar: {
    x: { value: "1rem" },
    y: { value: "0.75rem" },
  },
};

const descriptions = {
  box: "card, modal, alert",
  selector: "checkbox, toggle, badge",
  field: "button, input, select, tab",
};

const colors = {
  // Base color system with dark mode
  base: {
    100: {
      value: {
        base: defaultTheme.base[100].value,
        _synthwaveTheme: synthwave.base[100].value,
        _dark: darkTheme.base[100].value,
        _osDark: prefersDarkTheme.base[100].value,
      },
      description: "Adaptive lightest base color",
    },
    200: {
      value: {
        base: defaultTheme.base[200].value,
        _dark: darkTheme.base[200].value,
        _osDark: prefersDarkTheme.base[200].value,
        _synthwaveTheme: synthwave.base[200].value,
      },
      description: "Adaptive light base color",
    },
    300: {
      value: {
        base: defaultTheme.base[300].value,
        _dark: darkTheme.base[300].value,
        _osDark: prefersDarkTheme.base[300].value,
        _synthwaveTheme: synthwave.base[300].value,
      },
      description: "Adaptive medium base color",
    },
    content: {
      value: {
        base: defaultTheme.base.content.value,
        _dark: darkTheme.base.content.value,
        _osDark: prefersDarkTheme.base.content.value,
        _synthwaveTheme: synthwave.base.content.value,
      },
      description: "Adaptive base content color",
    },
    hover: {
      value: "{colors.primary/20}",
    },
  },
  border: {
    default: {
      value: "{colors.base.content/20}",
    },
  },
  content: {
    primary: {
      value: {
        base: defaultTheme.content.primary.value,
        _dark: darkTheme.content.primary.value,
        _osDark: prefersDarkTheme.content.primary.value,
        _synthwaveTheme: synthwave.content.primary.value,
      },
    },
    placeholder: {
      // This is approx what daisy ui does in [^1]
      value: "{colors.base.content/80}",
    },
    secondary: {
      value: {
        base: defaultTheme.content.secondary.value,
        _dark: darkTheme.content.secondary.value,
        _osDark: prefersDarkTheme.content.secondary.value,
        _synthwaveTheme: synthwave.content.secondary.value,
      },
    },
    accent: {
      value: {
        base: defaultTheme.content.accent.value,
        _dark: darkTheme.content.accent.value,
        _osDark: prefersDarkTheme.content.accent.value,
        _synthwaveTheme: synthwave.content.accent.value,
      },
    },
    neutral: {
      value: {
        base: defaultTheme.content.neutral.value,
        _dark: darkTheme.content.neutral.value,
        _osDark: prefersDarkTheme.content.neutral.value,
        _synthwaveTheme: synthwave.content.neutral.value,
      },
    },
    info: {
      value: {
        base: defaultTheme.content.info.value,
        _dark: darkTheme.content.info.value,
        _synthwaveTheme: synthwave.content.info.value,
      },
    },
    success: {
      value: {
        base: defaultTheme.content.success.value,
        _dark: darkTheme.content.success.value,
        _synthwaveTheme: synthwave.content.success.value,
      },
    },
    warning: {
      value: {
        base: defaultTheme.content.warning.value,
        _dark: darkTheme.content.warning.value,
        _synthwaveTheme: synthwave.content.warning.value,
      },
    },
    error: {
      value: {
        base: defaultTheme.content.error.value,
        _dark: darkTheme.content.error.value,
        _synthwaveTheme: synthwave.content.error.value,
      },
    },
  },
  // Brand colors with dark mode
  primary: {
    value: {
      base: defaultTheme.primary.value,
      _dark: darkTheme.primary.value,
      _osDark: prefersDarkTheme.primary.value,
      _synthwaveTheme: synthwave.primary.value,
    },
    description: "Adaptive primary brand color",
  },
  secondary: {
    value: {
      base: defaultTheme.secondary.value,
      _dark: darkTheme.secondary.value,
      _osDark: prefersDarkTheme.secondary.value,
      _synthwaveTheme: synthwave.secondary.value,
    },
    description: "Adaptive secondary brand color",
  },
  accent: {
    value: {
      base: defaultTheme.accent.value,
      _dark: darkTheme.accent.value,
      _osDark: prefersDarkTheme.accent.value,
      _synthwaveTheme: synthwave.accent.value,
    },
    description: "Adaptive accent brand color",
  },
  neutral: {
    value: {
      base: defaultTheme.neutral.value,
      _dark: darkTheme.neutral.value,
      _osDark: prefersDarkTheme.neutral.value,
      _synthwaveTheme: synthwave.neutral.value,
    },
    description: "Adaptive neutral brand color",
  },
  info: {
    value: {
      base: defaultTheme.info.value,
      _dark: darkTheme.info.value,
      _osDark: prefersDarkTheme.info.value,
      _synthwaveTheme: synthwave.info.value,
    },
    description: "Adaptive info brand color",
  },
  success: {
    value: {
      base: defaultTheme.success.value,
      _dark: darkTheme.success.value,
      _osDark: prefersDarkTheme.success.value,
      _synthwaveTheme: synthwave.success.value,
    },
    description: "Adaptive success brand color",
  },
  warning: {
    value: {
      base: defaultTheme.warning.value,
      _dark: darkTheme.warning.value,
      _osDark: prefersDarkTheme.warning.value,
      _synthwaveTheme: synthwave.warning.value,
    },
    description: "Adaptive warning brand color",
  },
  error: {
    value: {
      base: defaultTheme.error.value,
      _dark: darkTheme.error.value,
      _osDark: prefersDarkTheme.error.value,
      _synthwaveTheme: synthwave.error.value,
    },
    description: "Adaptive error brand color",
  },
  link: {
    default: {
      value: {
        base: "oklch(0.55 0.15 264)",
        _dark: "oklch(0.75 0.12 264)",
        _osDark: "oklch(0.75 0.12 264)",
      },
      description: "Interactive link color",
    },
    hover: {
      value: {
        base: "oklch(0.50 0.18 264)",
        _dark: "oklch(0.70 0.15 264)",
        _osDark: "oklch(0.70 0.15 264)",
      },
      description: "Link hover state color",
    },
    underline: {
      value: {
        base: "oklch(0.85 0.05 264)",
        _dark: "oklch(0.40 0.18 264)",
        _osDark: "oklch(0.40 0.18 264)",
      },
      description: "Link underline decoration color",
    },
  },
  text: {
    headings: {
      1: {
        value: {
          base: defaultTheme.base.content.value,
          _dark: darkTheme.base.content.value,
          _osDark: prefersDarkTheme.base.content.value,
        },
      },
      2: {
        value: {
          base: defaultTheme.base.content.value,
          _dark: darkTheme.base.content.value,
          _osDark: prefersDarkTheme.base.content.value,
        },
      },
      3: {
        value: {
          base: defaultTheme.base.content.value,
          _dark: darkTheme.base.content.value,
          _osDark: prefersDarkTheme.base.content.value,
        },
      },
      4: {
        value: {
          base: defaultTheme.base.content.value,
          _dark: darkTheme.base.content.value,
          _osDark: prefersDarkTheme.base.content.value,
        },
      },
      5: {
        value: {
          base: defaultTheme.base.content.value,
          _dark: darkTheme.base.content.value,
          _osDark: prefersDarkTheme.base.content.value,
        },
      },
      6: {
        value: {
          base: defaultTheme.base.content.value,
          _dark: darkTheme.base.content.value,
          _osDark: prefersDarkTheme.base.content.value,
        },
      },
    },
    code: {
      bg: {
        value: {
          base: "oklch(0.35 0.02 264)",
          _dark: darkTheme.base[200].value,
          _osDark: prefersDarkTheme.base[200].value,
          _synthwaveTheme: synthwave.base[200].value,
        },
      },
      content: {
        value: {
          base: "oklch(0.95 0.02 264)",
          _dark: darkTheme.base.content.value,
          _osDark: prefersDarkTheme.base.content.value,
          _synthwaveTheme: synthwave.base.content.value,
        },
      },
    },
  },
  dev: {
    1: {
      value: "bg.blue.600/50",
    },
    2: {
      value: "bg.red.600/50",
    },
    3: {
      value: "bg.green.600/50",
    },
    4: {
      value: "bg.purple.600/50",
    },
    5: {
      value: "bg.orange.600/50",
    },
    6: {
      value: "bg.pink.600/50",
    },
    7: {
      value: "bg.yellow.600/50",
    },
  },
};

export const DaisyPreset = definePreset({
  name: "my-preset",
  presets: [pandaPreset],
  conditions: {
    light: "[data-color-mode=light] &",
    dark: "[data-color-mode=dark] &",
    synthwaveTheme: "[data-theme=synthwave] &",
  },
  globalCss: {
    "html, body": {
      backgroundColor: "base.100",
      color: "base.content",
      // TODO: Should we use dvh for chrome or is vh good enough?
      minHeight: "100dvh",
    },
    "*": {
      transition: backgroundTransition,
    },
  },
  theme: {
    extend: {
      keyframes,
      tokens: {
        spacing,
        foo: {},
      },
      semanticTokens: {
        fontSizes,
        colors,
        shadows: {
          selector: {
            value: "md",
            description: descriptions.selector,
          },
          field: {
            value: "md",
            description: descriptions.field,
          },
          box: {
            value: "md",
            description: descriptions.box,
          },
        },

        radii: {
          selector: {
            value: "0.5rem",
            description: descriptions.selector,
          },
          field: {
            value: "0.25rem",
            description: descriptions.field,
          },
          box: {
            // TODO refer to tokens above
            value: "0.5rem",
            description: descriptions.box,
          },
          depth: {
            value: 0,
          },
          noise: {
            value: 0,
          },
        },
        sizes: {
          border: {
            value: {
              base: "1px",
            },
            description: "Width of a Border",
          },
          selector: {
            value: {
              base: "0.25rem",
              description: `This is for ??? ${descriptions.selector}`,
            },
          },
          field: {
            value: {
              base: "0.25rem",
            },
            description: `This is for ??? ${descriptions.field}`,
          },
        },
        borders: {
          default: {
            value: "{sizes.border} solid {colors.border.default}",
            description:
              "Border to be used for input fields like an input for a combobox or a text area",
          },
          box: {
            value: "{borders.default}",
            description: `Border to be used for ${descriptions.box}`,
          },
          field: {
            value: "{borders.default}",
            description: `Border to be used for ${descriptions.field}`,
          },
          selector: {
            value: "{borders.field}",
            description: `Border to be used for ${descriptions.selector}`,
          },
        },
      },
    },
    recipes: {
      article: articleRecipe,
    },
  },
});

// Notes
// [^1]: packages/daisyui/components/input/object.js
