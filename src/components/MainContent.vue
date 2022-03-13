<template>
  <div class="content">
    <template v-for="i in 3" :key="i">
      <Article :count="i" />
    </template>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import Article from '@components/Article.vue'

export default defineComponent({
  components: {
    Article
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