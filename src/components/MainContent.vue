<template>
  <div class="content">
    <!-- Suspense 其实还是个实验性的语法 - 2022/3/26 -->
    <suspense>
      <template #default>
        <template v-for="(note, idx) in notesList" :key="note.name">
          <Article :note="note" :count="idx"/>
        </template>
      </template>
      <template #fallback>
        <a-spin />
      </template>
    </suspense>
  </div>
</template>

<script>
import { ref, defineComponent, computed, onMounted } from 'vue'
import Article from '@components/Article.vue'
import store from '@store/index.js'
export default defineComponent({
  components: {
    Article
  },
  setup(){
    const notesList = computed(() => store.state.filesInfo)
    // onMounted(async () => {
    //   const test = await octokit.getNoteContent("84c96337b9e535f36421a82e707653dde42aa9e8")
    //   // console.log('test ', Buffer.from(test.data.content, "base64").toString("utf8"))
    //   console.log('test', test)
    // })
    return {
      notesList,
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