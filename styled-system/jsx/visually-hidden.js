import { createMemo, mergeProps, splitProps } from 'solid-js'
import { createComponent } from 'solid-js/web'

import { getVisuallyHiddenStyle } from '../patterns/visually-hidden.js';
import { styled } from './factory.js';

export const VisuallyHidden = /* @__PURE__ */ function VisuallyHidden(props) {
  const [patternProps, restProps] = splitProps(props, [])

const styleProps = getVisuallyHiddenStyle(patternProps)        
const mergedProps = mergeProps(styleProps, restProps)

return createComponent(styled.div, mergedProps)
}