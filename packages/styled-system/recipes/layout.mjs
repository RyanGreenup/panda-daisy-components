import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const layoutDefaultVariants = {
  "navbar": true,
  "leftSidebar": "responsive"
}
const layoutCompoundVariants = []

const layoutSlotNames = [
  [
    "mainContent",
    "mainLayout__mainContent"
  ],
  [
    "btmDash",
    "mainLayout__btmDash"
  ],
  [
    "overlay",
    "mainLayout__overlay"
  ],
  [
    "rightDrawerOverlay",
    "mainLayout__rightDrawerOverlay"
  ],
  [
    "navbar",
    "mainLayout__navbar"
  ],
  [
    "layoutContainer",
    "mainLayout__layoutContainer"
  ],
  [
    "mainArea",
    "mainLayout__mainArea"
  ],
  [
    "sidebar",
    "mainLayout__sidebar"
  ],
  [
    "rightSidebar",
    "mainLayout__rightSidebar"
  ],
  [
    "btmDrawerOverlay",
    "mainLayout__btmDrawerOverlay"
  ],
  [
    "btmDrawer",
    "mainLayout__btmDrawer"
  ]
]
const layoutSlotFns = /* @__PURE__ */ layoutSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, layoutDefaultVariants, getSlotCompoundVariant(layoutCompoundVariants, slotName))])

const layoutFn = memo((props = {}) => {
  return Object.fromEntries(layoutSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const layoutVariantKeys = [
  "navbar",
  "btmDash",
  "leftSidebar",
  "storybook"
]
const getVariantProps = (variants) => ({ ...layoutDefaultVariants, ...compact(variants) })

export const layout = /* @__PURE__ */ Object.assign(layoutFn, {
  __recipe__: false,
  __name__: 'layout',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: layoutVariantKeys,
  variantMap: {
  "navbar": [
    "false"
  ],
  "btmDash": [
    "none",
    "mobileOnly",
    "all"
  ],
  "leftSidebar": [
    "none",
    "responsive"
  ],
  "storybook": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, layoutVariantKeys)
  },
  getVariantProps
})