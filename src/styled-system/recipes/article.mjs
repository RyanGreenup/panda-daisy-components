import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const articleFn = /* @__PURE__ */ createRecipe('article', {}, [])

const articleVariantMap = {}

const articleVariantKeys = Object.keys(articleVariantMap)

export const article = /* @__PURE__ */ Object.assign(memo(articleFn.recipeFn), {
  __recipe__: true,
  __name__: 'article',
  __getCompoundVariantCss__: articleFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: articleVariantKeys,
  variantMap: articleVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, articleVariantKeys)
  },
  getVariantProps: articleFn.getVariantProps,
})