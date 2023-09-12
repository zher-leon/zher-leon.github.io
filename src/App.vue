<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="220" style="background: #fff">
      </a-layout-sider>
      <a-layout style="padding: 24px">
        <a-layout-content :style="{ background: '#fff' }">
          <RouterView />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
#app {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

html, body {
  width: 100%;
  height: 100%;
}

.ant-spin {
  max-height: unset !important;
}
</style>
