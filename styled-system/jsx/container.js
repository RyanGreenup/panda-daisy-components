import { createMemo, mergeProps, splitProps } from 'solid-js'
import { createComponent } from 'solid-js/web'

import { getContainerStyle } from '../patterns/container.js';
import { styled } from './factory.js';

export const Container = /* @__PURE__ */ function Container(props) {
  const [patternProps, restProps] = splitProps(props, [])

const styleProps = getContainerStyle(patternProps)        
const mergedProps = mergeProps(styleProps, restProps)

return createComponent(styled.div, mergedProps)
}