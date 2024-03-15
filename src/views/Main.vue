<template>
  <a-layout>
    <!-- 顶部 -->
    <a-layout-header class="header dark-bg-primary">
      <div class="logo">
        <img v-if="colorMode === 'dark'" src="/public/logo_dark.png" alt="logo" />
        <img v-else src="/public/logo_light.png" alt="logo" />
      </div>

      <a-space v-show="content" class="content-title">
        📒 {{ currentFile?.name.replace('.md', '') }}
      </a-space>

      <a-space class="infos">
        <!-- 主题 -->
        <moon class="icon-park" v-if="colorMode === 'dark'" @click="handleChangeThemeMode('light')" />
        <sun class="icon-park" v-else @click="handleChangeThemeMode('dark')" />
        <!-- git 主页 -->
        <github-outlined class="github" @click="handleJumpToPgae(userInfo.github)" />

        <a-divider type="vertical" class="divider" />

        <!-- 头像 -->
        <a-avatar :src="userInfo.avatar" :size="42" alt="Avatar" />
        <!-- 用户信息 -->
        <a-space direction="vertical" :size="4">
          <span class="name-text">{{ userInfo.name }}</span>
          <div class="bio-text">{{ userInfo.bio }}</div>
        </a-space>
      </a-space>
    </a-layout-header>

    <!-- 底部 -->
    <a-layout class="content-layout">
      <!-- 侧栏 -->
      <a-layout-sider width="220" class="sider dark-bg-primary">
        <component :is="Menu" mode="inline" @click="handleOpenChange" :inlineCollapsed="true" />
        <LoadingIcon v-if="loading" :size="15" />
      </a-layout-sider>

      <!-- 内容 -->
      <a-layout-content class="content">
        <LoadingIcon :size="18" :spinning="contentLoading">
          <div class="markdown-content">
            <md-preview
              v-model="content"
              :theme="(colorMode as Themes)"
              editorId="node-preview"
              :preview="true"
              :readOnly="true"
              noKatex
            />
            <md-catalog
              v-if="content"
              :theme="(colorMode as Themes)"
              editorId="node-preview"
              class="markdown-catalog"
            />
          </div>
        </LoadingIcon>
      </a-layout-content>
    </a-layout>

  </a-layout>
</template>

<script setup lang="tsx">
import EasyMenu from '@/components/EasyMenu'
import { CatalogyTree, TreeNode } from '@/static/utils/tools'
import { getNoteContent, getRepositoryContent, getUserInfo } from '@api/github'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import { GithubOutlined } from '@ant-design/icons-vue'
import { MdPreview, MdCatalog, Themes } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { MenuInfo } from 'ant-design-vue/es/menu/src/interface'
import LoadingIcon from '@components/Loading'
import { Sun, Moon } from '@icon-park/vue-next'
import { useColorMode } from '@vueuse/core'

const repositioryContent = ref<CatalogyTree>(null)
const menuOperations = {
  asItem: null,
  setItem: null
}
const userInfo = ref({
  name: '',
  avatar: '',
  bio: '',
  github: ''
})
const content = ref('')
const currentFile = ref<TreeNode>(null)
const currentKey = ref(null)
const loading = ref(true)
const contentLoading = ref(false)

const Menu = EasyMenu({}, ({ asItem, setItem }) => {
  Object.assign(menuOperations, {
    asItem,
    setItem
  })
})

const colorMode = useColorMode()

/**
 * 生成左侧笔记列表
 */
const gengerateMenuByCatalogy = (catalogy: CatalogyTree['catalogy']) => {
  if (!catalogy.children) {
    return;
  }

  const { asItem, setItem } = menuOperations
  const convertItem = (nodes: TreeNode[]) => {
    const ret = nodes.map(node => {
      let childNode = null
      if (node.children) {
        childNode = convertItem(node.children)
      }
      return asItem(
        node.name.replace('.md', ''),
        node.sha,
        null,
        childNode
      )
    })

    return ret
  }
  const menuItems = convertItem(catalogy.children)
  setItem(menuItems)
}

/**
 * 跳转到url
 */
const handleJumpToPgae = (url: string) => {
  window.open(url)
}

/**
 * 选中MenuItem，获取内容
 */
const handleOpenChange = (menuInfo: MenuInfo) => {
  const { key } = menuInfo

  if (key === currentKey.value) {
    return;
  }

  currentKey.value = key
  contentLoading.value = true

  getNoteContent(key)
    .then(file => {
      content.value = file

      const { allFiles } = repositioryContent.value
      currentFile.value = allFiles.find(e => e.sha === key)
    })
    .finally(() => {
      contentLoading.value = false
    })
    .catch(() => {
      message.error('文件内容获取异常')
    })
}

const handleChangeThemeMode = (theme: 'dark' | 'light') => {
  colorMode.value = theme
}

getRepositoryContent()
  .then(ret => {
    gengerateMenuByCatalogy(ret.catalogy)
    repositioryContent.value = ret
  })
  .finally(() => {
    loading.value = false
  })
  .catch(() => {
    message.error('初始化失败')
  })

getUserInfo()
  .then(ret => {
    userInfo.value = {
      name: ret.name,
      avatar: ret.avatar_url,
      bio: ret.bio,
      github: ret.html_url
    }
  })
  .catch(() => {
    message.error('个人信息获取失败')
  })

</script>

<style lang="scss" scoped>
@import "@styles/common.scss";

.sider {
  background-color: var(--background);
  border-right: 1px solid var(--border-default);
  overflow-y: auto;
  @include scrollbar-like;
}

.content {
  background-color: var(--background-secondary);
}

.header {
  border-bottom: 1px solid var(--border-default);
  padding-inline: 0 !important;
  display: flex;
  align-items: center;
  background-color: var(--background);

  .divider {
    height: 20px;
  }

  .logo {
    width: 220px;
    display: flex;
    align-items: center;
    padding-left: 25px;

    img {
      width: 120px;
    }
  }

  .icon-park {
    font-size: 20px;
    transform: translateY(2px);
    cursor: pointer;
    @include fix-icon-park;
  }

  .github {
    font-size: 20px;
    cursor: pointer;
  }

  .infos {
    margin-left: auto;
    padding: 0 8px;
    line-height: 14px;

    .name-text {
      font-size: 14px;
      color: var(--text-1);
    }

    .bio-text {
      font-size: 12px;
      color: var(--text-2);
      max-width: 150px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .content-title {
    height: 40px;
    line-height: 32px;
    padding: 4px 8px;
    border-radius: 8px;
    background-color: rgba(#fff, .08);
    font-size: 14px;
  }
}

.markdown-content {
  width: 100%;
  height: 100%;
  display: flex;
  overflow-y: auto;
  @include scrollbar-like;
}

.markdown-catalog {
  min-width: 150px;
  padding: 8px 8px 8px 0;
  overflow-y: auto;
  @include scrollbar-like;
}

</style>
