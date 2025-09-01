/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface LayoutVariant {
  /**
 * @default true
 */
navbar: boolean
btmDash: "none" | "mobileOnly" | "all"
/**
 * @default "responsive"
 */
leftSidebar: "none" | "responsive"
storybook: boolean
}

type LayoutVariantMap = {
  [key in keyof LayoutVariant]: Array<LayoutVariant[key]>
}

type LayoutSlot = "mainContent" | "btmDash" | "overlay" | "rightDrawerOverlay" | "navbar" | "layoutContainer" | "mainArea" | "sidebar" | "rightSidebar" | "btmDrawerOverlay" | "btmDrawer"

export type LayoutVariantProps = {
  [key in keyof LayoutVariant]?: ConditionalValue<LayoutVariant[key]> | undefined
}

export interface LayoutRecipe {
  __slot: LayoutSlot
  __type: LayoutVariantProps
  (props?: LayoutVariantProps): Pretty<Record<LayoutSlot, string>>
  raw: (props?: LayoutVariantProps) => LayoutVariantProps
  variantMap: LayoutVariantMap
  variantKeys: Array<keyof LayoutVariant>
  splitVariantProps<Props extends LayoutVariantProps>(props: Props): [LayoutVariantProps, Pretty<DistributiveOmit<Props, keyof LayoutVariantProps>>]
  getVariantProps: (props?: LayoutVariantProps) => LayoutVariantProps
}

/**
 * The main Layout
 */
export declare const layout: LayoutRecipe