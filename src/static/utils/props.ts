import type { OptionalKeysOf } from 'type-fest'

import { defaults } from 'lodash-es'
import { toRaw } from 'vue'

export const withPropsDefault = <T extends Record<string, any>, K extends Pick<T, OptionalKeysOf<T>>>(
  props: T,
  defaultValue: K
): K & Omit<T, keyof K> => {
  // props 是具有响应式行为的只读reactive
  defaults(toRaw(props), defaultValue)
  return props as unknown as (K & Omit<T, keyof K>)
}
