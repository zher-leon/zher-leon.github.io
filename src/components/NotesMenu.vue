<template>
  <div class="menu-wrapper">
    <a-menu
      style="height: 100%"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      @click="handleClick"
    >
      <div class="title">
        笔记目录
      </div>
      <template v-for="e in notes" :key="e.path">
        <a-sub-menu :title="e.name">
          <template #icon>
            <component :is="iconList[e.name]"></component>
          </template>
          <a-menu-item v-for="i in e.children" :key="i.name">
            {{i.name.substr(0, i.name.length - 3)}}
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed, defineAsyncComponent } from "vue";
import store from '@store/index.js'

const iconList = {
  Vue: defineAsyncComponent(() => import('@icons/VueIcon.vue')),
  JavaScript: defineAsyncComponent(() => import('@icons/JavaScriptIcon.vue'))
}

export default defineComponent({
  setup() {
    const screenHeight = computed(() => (document.body.offsetHeight - 50) + 'px')
    const notes = computed(() => store.state.catalogy)
    const selectedKeys = ref(['']);
    const openKeys = ref(['']);
    

    const handleClick = (e) => {
      console.log("click", e);
    };

    const titleClick = (e) => {
      console.log("titleClick", e);
    };

    watch(
      () => openKeys,
      (val) => {
        console.log("openKeys", val);
      }
    );
    return {
      selectedKeys,
      openKeys,
      handleClick,
      titleClick,
      screenHeight,
      notes,
      iconList
    };
  }
});
</script>

<style lang='scss' scoped>
@import "@styles/theme.scss";
@import "@styles/common.scss";
.menu-wrapper {
  @include themify() {
    width: 256px;
    min-width: 280px;
    height: v-bind(screenHeight);
    overflow-y: auto;
    @include hide-scrollbar;

    .title {
      margin: 28px 0 20px 15px; 
      font-size: 15px; 
      font-weight: 700;
      color: themed('text-grey')
    }
  }
}
:deep(.ant-menu) {
  background-color: themed('block-background');
  margin-top: 2px;
}
</style>