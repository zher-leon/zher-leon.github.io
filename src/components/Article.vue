<template>
  <div class="article-wrapper">
    <Star class="star" :style="{[startPosition]: -20 + 'px'}"/>
    <!-- <div class="title">
      <span>{{ title }}</span>
    </div> -->
    <div class="article" :style="{'max-height': isExpand ? null : '300px'}" @click="isExpand = !isExpand">
      <!-- md-editor中使用了Katex来展示数据公式, 不设置noKatex会有一些警告, 但不影响渲染, 目前开发不想看警告, 先关掉吧 -->
      <a-skeleton v-if="!content"/>
      <md-editor else v-model="content" theme="dark" :previewOnly="true" noKatex/>
    </div>
    <div class="footer">
      <span>Last Commit 2022/02/02 By Zher Leon</span>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, computed, toRefs, watchEffect, onMounted, watch } from 'vue'
import Star from '@icons/Star.vue'
import myAvatar from "@static/image/avatar.png"
import githubApi from '@/api/github.js'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

export default defineComponent({
  components: {
    Star,
    MdEditor
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
    
    // watchEffect(() => {
    //   isExpand.value = expand.value
    //   console.log('isExpand change>>>', isExpand.value)
    // })

    watch(isExpand, val => {
      console.log('isExpand>>', val)
    })
    
    let content = ref('')

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
    border-radius: 10px;
    background-color: themed('block-background');
    border: 1px solid themed('border-color');
    position: relative;
    margin-bottom: 30px;
    margin-top: 10px;
    flex: 1;
    padding: 10px 30px 20px 30px;

    .star {
      position: absolute;
      top: -20px;
      z-index: 100;
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

    :deep(.md-preview-wrapper) {
      background: themed('block-background') !important;
    }
  }
}
</style>