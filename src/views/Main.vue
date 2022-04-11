<template>
  <template v-for="(note, idx) in notesList" :key="note.name">
    <Article :note="note" :count="idx"/>
  </template>
</template>

<script>
import Article from '@components/Article.vue'
import { ref, computed } from 'vue'
import store from '@store/index.js'

export default {
  components: {
    Article
  },
  setup(){ 
    const notesList = computed(() => store.state.filesInfo)
    
    return {
      notesList,
      screenHeight: document.body.offsetHeight - 50 + 'px'
    }
  }
}
</script>

<style lang='scss'>
  
</style>