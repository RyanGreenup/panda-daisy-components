# PandaCSS Preset Export Issue

## Problem

When exporting PandaCSS presets through a package's main `index.ts` file, consuming projects encounter errors during the `panda codegen` process. The codegen attempts to scan and resolve all imports in the entire dependency tree, including component code and their dependencies.

## Why This Happens

### 1. Module Resolution During Codegen

When PandaCSS runs `codegen`, it evaluates your `panda.config.ts` file to understand the configuration. During this evaluation:

- It follows all import statements
- It attempts to resolve every module in the import chain
- It evaluates the code to extract the configuration values

### 2. The Cascade Effect

When importing from a package's main entry point:

```typescript
// This causes problems
import { daisyLikePreset } from "@ryangreenup/panda-daisy-components";
```

The import chain looks like:
1. `panda.config.ts` → imports from package root
2. Package root `index.ts` → exports everything including components
3. Components → import SolidJS, UI libraries, utilities, etc.
4. PandaCSS tries to resolve ALL these imports during codegen

### 3. Resulting Issues

This deep scanning causes several problems:

- **Import Resolution Errors**: PandaCSS encounters imports it can't resolve (browser-only modules, CSS imports, etc.)
- **Performance Degradation**: Scanning unnecessary files slows down codegen
- **Module Format Errors**: Different module systems (ESM, CJS, UMD) can cause parsing failures
- **Unnecessary Dependencies**: The config evaluation shouldn't need to understand component runtime code

## Solution: Targeted Exports

### Package.json Export Configuration

Instead of exposing everything through `index.ts`, use targeted exports in `package.json`:

```json
{
  "exports": {
    ".": {
      "import": "./src/index.ts",
      "types": "./src/index.ts"
    },
    "./presets/*": {
      "import": "./src/presets/*.ts",
      "types": "./src/presets/*.ts"
    }
  }
}
```

### Clean Import Paths

This allows clean, targeted imports:

```typescript
// Direct import - only loads the preset file
import { daisyLikePreset } from "@ryangreenup/panda-daisy-components/presets/daisy/daisy";
```

## Benefits

1. **Faster Codegen**: Only the necessary files are evaluated
2. **No Resolution Errors**: Component dependencies aren't touched
3. **Cleaner Separation**: Config code is isolated from runtime code
4. **Better Developer Experience**: Clear, semantic import paths

## Best Practices

1. **Separate Config Exports**: Always export PandaCSS presets, themes, and recipes through dedicated export paths
2. **Avoid Barrel Exports**: Don't include config exports in main `index.ts` files that also export components
3. **Document Import Paths**: Clearly document the available export paths in your README
4. **Type Safety**: Ensure TypeScript types are properly exported for all paths

## Example Structure

```
package-root/
├── package.json          # Contains targeted exports
├── src/
│   ├── index.ts         # Component exports only
│   ├── components/      # Runtime components
│   └── presets/         # PandaCSS configuration
│       ├── themes/
│       ├── recipes/
│       └── presets.ts
```

This structure ensures clean separation between configuration and runtime code, preventing the cascade of imports during PandaCSS codegen.