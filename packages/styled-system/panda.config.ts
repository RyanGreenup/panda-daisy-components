// import { defineConfig } from "@pandacss/dev";
//
// export default defineConfig({
//   // Whether to use css reset
//   preflight: true,
//
//   // Where to look for your css declarations
//   include: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//     "./pages/**/*.{js,jsx,ts,tsx}",
//     "./stories/**/*.{js,jsx,ts,tsx}",
//   ],
//
//   // Files to exclude
//   exclude: [],
//
//   // Useful for theme customization
//   theme: {
//     extend: {},
//   },
//
//   // The output directory for your css system
//   outdir: "styled-system",
// });

import { defineConfig } from "@pandacss/dev";
import pandaPreset from "@pandacss/preset-panda";
import daisyLikePreset from "../../src/presets/daisy/daisy.ts";
import layoutPreset from "../../src/presets/layout/layout";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  jsxFramework: "solid",

  // Where to look for your css declarations
  include: [
    "./pages/**/*.mdx",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.mdx",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./stories/**/*.{js,jsx,ts,tsx}",
  ],

  // Files to exclude
  exclude: [],
  presets: [pandaPreset, daisyLikePreset, layoutPreset],

  // Useful for theme customization
  theme: {
    extend: {
      // recipes: {
      //   tree: treeRecipe,
      // },
    },
  },

  // The output directory for your css system
  outdir: ".",
  clean: false,
});
