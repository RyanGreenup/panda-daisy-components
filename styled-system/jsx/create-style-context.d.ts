/* eslint-disable */
import type { SlotRecipeRuntimeFn, RecipeVariantProps } from '../types/recipe';
import type { JsxHTMLProps, JsxStyleProps, Assign } from '../types/system-types';
import type { JsxFactoryOptions } from '../types/jsx';
import type { Component, JSX, ComponentProps } from 'solid-js'

interface UnstyledProps {
  unstyled?: boolean
}
type ElementType<P extends Record<string, any> = {}> = keyof JSX.IntrinsicElements | Component<P>

type SvaFn<S extends string = any> = SlotRecipeRuntimeFn<S, any>
interface SlotRecipeFn {
  __type: any
  __slot: string
  (props?: any): any
}
type SlotRecipe = SvaFn | SlotRecipeFn

type InferSlot<R extends SlotRecipe> = R extends SlotRecipeFn ? R['__slot'] : R extends SvaFn<infer S> ? S : never

type StyleContextProvider<T extends ElementType, R extends SlotRecipe> = Component<
  JsxHTMLProps<ComponentProps<T> & UnstyledProps, Assign<RecipeVariantProps<R>, JsxStyleProps>>
>

type StyleContextConsumer<T extends ElementType> = Component<
  JsxHTMLProps<ComponentProps<T> & UnstyledProps, JsxStyleProps>
>

export interface StyleContext<R extends SlotRecipe> {
  withRootProvider: <T extends ElementType>(Component: T) => StyleContextProvider<T, R>
  withProvider: <T extends ElementType>(
    Component: T,
    slot: InferSlot<R>,
    options?: JsxFactoryOptions<ComponentProps<T>>
  ) => StyleContextProvider<T, R>
  withContext: <T extends ElementType>(
    Component: T,
    slot: InferSlot<R>,
    options?: JsxFactoryOptions<ComponentProps<T>>
  ) => StyleContextConsumer<T>
}

export declare function createStyleContext<R extends SlotRecipe>(recipe: R): StyleContext<R>