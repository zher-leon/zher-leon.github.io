<template>
  <a-config-provider
    :theme="{
      ...themeConfig,
      algorithm: colorMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
  >
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import themeConfig from '@styles/theme'
import { theme } from 'ant-design-vue'

import { colorMode } from '@hooks/useColorMode'

</script>

<style lang="scss">

</style>
