import { JSXElement, mergeProps, splitProps } from 'solid-js';
import { css } from '../styled-system/css';


export interface ButtonProps {
    primary?: boolean;
    backgroundColor?: string;
    size?: 'small' | 'medium' | 'large';
    label: string;
    [key: string]: any;
}

/** Primary UI component for user interaction */
export const Button = (props: { children: JSXElement }) => {
  return (
    <button
      class={css({
        bg: 'red.300',
        fontFamily: 'Inter',
        px: '4',
        py: '3',
        borderRadius: 'md',
        _hover: { bg: 'red.400' },
      })}
    >
      {props.children}
    </button>
  )
};
