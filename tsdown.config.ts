import { defineConfig } from "tsdown";
import solid from "rolldown-plugin-solid";

// export both js and jsx
export default defineConfig([
  {
    entry: ["./src/index.ts"],
    platform: "neutral",
    dts: true,
    // ssr is required for solid start
    // dom is required for client side
    // I CANNOT get it to work for both nor can I figure this out
    // I don't think it's worth the effort when git submodules work painlessly
    plugins: [solid({ solid: { generate: "dom" } })],
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
