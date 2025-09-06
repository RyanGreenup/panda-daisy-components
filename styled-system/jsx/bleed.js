import { createMemo, mergeProps, splitProps } from 'solid-js'
import { createComponent } from 'solid-js/web'

import { getBleedStyle } from '../patterns/bleed.js';
import { styled } from './factory.js';

export const Bleed = /* @__PURE__ */ function Bleed(props) {
  const [patternProps, restProps] = splitProps(props, ["inline","block"])

const styleProps = getBleedStyle(patternProps)        
const mergedProps = mergeProps(styleProps, restProps)

return createComponent(styled.div, mergedProps)
}