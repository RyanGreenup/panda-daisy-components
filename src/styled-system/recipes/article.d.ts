/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ArticleVariant {
  
}

type ArticleVariantMap = {
  [key in keyof ArticleVariant]: Array<ArticleVariant[key]>
}



export type ArticleVariantProps = {
  [key in keyof ArticleVariant]?: ConditionalValue<ArticleVariant[key]> | undefined
}

export interface ArticleRecipe {
  
  __type: ArticleVariantProps
  (props?: ArticleVariantProps): string
  raw: (props?: ArticleVariantProps) => ArticleVariantProps
  variantMap: ArticleVariantMap
  variantKeys: Array<keyof ArticleVariant>
  splitVariantProps<Props extends ArticleVariantProps>(props: Props): [ArticleVariantProps, Pretty<DistributiveOmit<Props, keyof ArticleVariantProps>>]
  getVariantProps: (props?: ArticleVariantProps) => ArticleVariantProps
}

/**
 * Professional article layout with typography
 */
export declare const article: ArticleRecipe