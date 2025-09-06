import { createMemo, mergeProps, splitProps } from 'solid-js'
import { createComponent } from 'solid-js/web'

import { getStackStyle } from '../patterns/stack.js';
import { styled } from './factory.js';

export const Stack = /* @__PURE__ */ function Stack(props) {
  const [patternProps, restProps] = splitProps(props, ["align","justify","direction","gap"])

const styleProps = getStackStyle(patternProps)        
const mergedProps = mergeProps(styleProps, restProps)

return createComponent(styled.div, mergedProps)
}