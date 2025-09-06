import { createMemo, mergeProps, splitProps } from 'solid-js'
import { createComponent } from 'solid-js/web'

import { getSquareStyle } from '../patterns/square.js';
import { styled } from './factory.js';

export const Square = /* @__PURE__ */ function Square(props) {
  const [patternProps, restProps] = splitProps(props, ["size"])

const styleProps = getSquareStyle(patternProps)        
const mergedProps = mergeProps(styleProps, restProps)

return createComponent(styled.div, mergedProps)
}