import { createMemo, mergeProps, splitProps } from 'solid-js'
import { createComponent } from 'solid-js/web'

import { getDividerStyle } from '../patterns/divider.js';
import { styled } from './factory.js';

export const Divider = /* @__PURE__ */ function Divider(props) {
  const [patternProps, restProps] = splitProps(props, ["orientation","thickness","color"])

const styleProps = getDividerStyle(patternProps)        
const mergedProps = mergeProps(styleProps, restProps)

return createComponent(styled.div, mergedProps)
}