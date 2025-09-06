import { defineConfig } from "tsdown";
import solid from "rolldown-plugin-solid";

// export both js and jsx
export default defineConfig([
  {
    entry: ["./src/index.ts"],
    platform: "neutral",
    dts: true,
    plugins: [solid({ solid: { generate: "ssr" } })],
  },
  {
    entry: ["./src/index.ts"],
    platform: "neutral",
    dts: false,
    inputOptions: {
      jsx: "preserve",
    },
    outExtensions: () => ({
      js: ".jsx",
    }),
  },
]);
