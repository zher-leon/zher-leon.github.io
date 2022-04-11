<template>
  <div class="article-wrapper">
    <Star class="star" :style="{[startPosition]: -20 + 'px'}"/>
    <div class="header">
      <a-tag :color="colorMap[noteType]">{{ noteType }}</a-tag>
      <span class="title">{{ title }}</span>
      <span class="about">
        <span>Last Commit by {{ lastCommit?.name }} on {{ lastCommit?.date }} </span>
      </span>
      <div class="divider"></div>
    </div>

    <div class="article" :style="{'max-height': isExpand ? null : '300px'}">
      <!-- md-editor中使用了Katex来展示数据公式, 不设置noKatex会有一些警告, 但不影响渲染, 目前开发不想看警告, 先关掉吧 -->
      <a-skeleton v-if="!content"/>
      <md-editor else v-model="content" theme="dark" :previewOnly="true" noKatex/>
    </div>
    <div class="footer">
      <div class="operation" @click="isExpand = !isExpand">
        {{ isExpand ? '收起' : '阅读全文'}} 
        <icon-base class="icon" height="12" width="12" iconColor="" :is-expand="isExpand">
          <arrow-down />
        </icon-base>
      </div>
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
import ArrowDown from '@icons/ArrowDown.vue'

const colorMap = {
  JavaScript: 'red',
  Vue: 'orange',
  Vuex: 'purple'
}

export default defineComponent({
  components: {
    Star,
    MdEditor,
    ArrowDown
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
    const { count, note } = toRefs(props)
    const startPosition = computed(() => count.value % 2 === 0 ? 'right' : 'left')
    
    const isExpand = ref(false)
    const title = computed(() => note.value.name.split('.md')[0])
    const noteType = computed(() => note.value.path.split('/').at(-2))
    const commitInfo = ref({})
    let content = ref('')

    onMounted(async () => {
      content.value = await githubApi.getNoteContent(note.value.sha)
      commitInfo.value = await githubApi.getCommitStatusBySHA(note.value.path)
    })

    const lastCommit = computed(() => {
      const commit = commitInfo.value?.[0]?.commit.committer
      console.log('commit', commit)
      if(commit) {
        commit.date = new Date(commit?.date).toLocaleString()
      }
      return commit
    })

    return {
      startPosition,
      myAvatar,
      isExpand,
      content,
      title,
      colorMap,
      noteType,
      lastCommit
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

    .header {
      margin: 10px 0;

      .divider {
        border-top: 2px solid themed('text-1');
        margin-top: 10px;
      }

      .about {
        display: block;
        margin: 5px 0;
        color: themed('text-grey')
      }

      .title {
        font-size: 18px;
        font-weight: 600;
      }
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
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 20px;
      .operation {
        color: themed('primary-color');
        cursor: pointer;
        &:hover {
          color: themed('purple-hover');
          .icon {
            fill: themed('purple-hover');
          }
        }
        .icon {
          fill: themed('primary-color');
          margin: auto 0;
          margin-left: 5px;
          transition: transform .3s;
          &[is-expand="true"] {
            transform: rotate(180deg);
          }
        }
      }
    }

    :deep(.md-preview-wrapper) {
      background: themed('block-background') !important;
    }

    :deep(.ant-tag) {
      padding: 3px 10px;
    }
  }
}
</style>