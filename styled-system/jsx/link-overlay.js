import { createMemo, mergeProps, splitProps } from 'solid-js'
import { createComponent } from 'solid-js/web'

import { getLinkOverlayStyle } from '../patterns/link-overlay.js';
import { styled } from './factory.js';

export const LinkOverlay = /* @__PURE__ */ function LinkOverlay(props) {
  const [patternProps, restProps] = splitProps(props, [])

const styleProps = getLinkOverlayStyle(patternProps)        
const mergedProps = mergeProps(styleProps, restProps)

return createComponent(styled.a, mergedProps)
}