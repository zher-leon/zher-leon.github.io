import { useColorMode, createSharedComposable } from '@vueuse/core'

export const colorMode = createSharedComposable(useColorMode)({
  selector: 'body',
  attribute: 'data-theme'
})
