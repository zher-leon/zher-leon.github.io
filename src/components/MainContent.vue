<template>
  <div class="content">
    <!-- Suspense 其实还是个实验性的语法 - 2022/3/26 -->
    <suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <a-spin />
      </template>
    </suspense>
  </div>
</template>

<script>
import { ref, defineComponent, computed, onMounted } from 'vue'
export default defineComponent({
  components: {
  },
  setup(){
    
    return {
      screenHeight: document.body.offsetHeight - 50 + 'px'
    }
  }
})
</script>

<style lang='scss' scoped>
@import "@styles/theme.scss";
@import "@styles/common.scss";

.content {
  @include themify() {
    width: 100%;
    height: v-bind(screenHeight);
    padding: 20px 30px;
    overflow-y: auto;
    @include hide-scrollbar;
  }
}
</style>