<template>
  <div class="article-wrapper">
    <Star class="star" :style="{[startPosition]: -20 + 'px'}"/>
    <!-- <div class="title">
      <span>{{ title }}</span>
    </div> -->
    <div class="article" :style="{'-webkit-line-clamp': isExpand ? null : 5}" @click="isExpand = !isExpand">
      {{ content }}
    </div>
    <div class="footer">
      <span>Last Commit 2022/02/02 By Zher Leon</span>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, computed, toRefs, watchEffect, onMounted } from 'vue'
import Star from '@icons/Star.vue'
import myAvatar from "@static/image/avatar.png"
import githubApi from '@/api/github.js'

export default defineComponent({
  components: {
    Star
  },
  props: {
    count: {
      type: Number,
      default: 0
    },
    expand: {
      type: Boolean,
      default: false
    },
    note: {
      type: Object,
      default: () => {}
    }
  },
  setup(props){ 
    const { count, expand, note } = toRefs(props)
    const startPosition = computed(() => count.value % 2 === 0 ? 'right' : 'left')
    
    const isExpand = ref(false)
    
    watchEffect(() => {
      isExpand.value = expand.value
    })
    
    let content = ref('')
    // const content = computed(async() => {
    //   const o = await githubApi.getNoteContent(note.value.sha)
    //   return o
    // })
    onMounted(async () => {
      content.value = await githubApi.getNoteContent(note.value.sha)
      console.log('hi')
      // console.log('content', content)
    })

    return {
      startPosition,
      myAvatar,
      isExpand,
      content
    }
  }
})
</script>

<style lang='scss' scoped>
@import "@styles/theme.scss";
@import "@styles/common.scss";

.article-wrapper {
  @include themify() {
    width: 100%;
    // height: 300px;
    // max-height: 300px;
    border-radius: 10px;
    background-color: themed('block-background');
    border: 1px solid themed('border-color');
    position: relative;
    margin-bottom: 30px;
    margin-top: 10px;
    flex: 1;
    padding: 20px 30px;
    // overflow: hidden;

    .star {
      position: absolute;
      top: -20px;
      // right: -20px;
    }

    .title {
      padding-left: 20px; 
      font-size: 18px;
      font-weight: 600;
      margin: 10px 0;
      // margin-top: 10px;
    }

    .article {
      // border: 1px solid red;
      width: 100%;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      // -webkit-line-clamp: 5; //想要的行数
      -webkit-box-orient: vertical;
      cursor: pointer;
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      color: themed('text-grey');
      margin-top: 20px;
    }
  }
}
</style>