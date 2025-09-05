import { defineConfig } from "@pandacss/dev";
import pandaPreset from "@pandacss/preset-panda";
import { DaisyPreset } from "@ryangreenup/panda-daisy-components/presets/daisy/daisy";
import layoutPreset from "@ryangreenup/panda-daisy-components/presets/layout/layout";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  jsxFramework: "solid",

  include: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.mdx",
    "./pages/**/*.mdx",

    // If installed as a node module
    "./node_modules/@ryangreenup/panda-daisy-components/stories/**/*.{js,tsx,ts,tsx,mdx}",
    "./node_modules/@ryangreenup/panda-daisy-components/src/**/*.{js,tsx,ts,tsx,mdx}",

    // If using filepaths
    // "../panda-storybook/stories/**/*.{js,tsx,ts,tsx,mdx}",
    // "../panda-storybook/src/**/*.{js,tsx,ts,tsx,mdx}",
  ],

  presets: [pandaPreset, DaisyPreset, layoutPreset],

  // The output directory for your css system
  outdir: "styled-system",
});
