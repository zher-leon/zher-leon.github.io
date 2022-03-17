<template>
  <div class="enter">
    <!-- 进入页 -->
    <enter-canvas />
  </div>
  <div class="main" id="main">
    <top-bar />
    <div class="main-content">
      <notes-menu />
      <main-content />
      <user-info />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { ref, computed, onMounted } from 'vue'
import tools from '@utils/tools'
import Content from "@components/Content.vue"
import store from "@store/index"
import { githubConfig } from "@config/config.js"
import ArrowDown from "@components/icon/ArrowDown.vue"
import EnterCanvas from "@components/EnterCanvas.vue"
import TopBar from "@components/TopBar.vue"
import NotesMenu from '@components/NotesMenu.vue'
import UserInfo from '@components/UserInfo.vue'
import MainContent from '@components/MainContent.vue'

export default {
  name: 'App',
  components: {
    Content,
    ArrowDown,
    EnterCanvas,
    TopBar,
    NotesMenu,
    UserInfo,
    MainContent
  },
  setup() {
    const text = ref('Hello world')

    return {
      text
    }
  },
  async created() {
    store.commit('setTheme', 'light')
  },
  mounted() {
    store.commit('setUserConfig', githubConfig)
    store.dispatch('getRootCatalogy')
  },
  methods: {
  },
}
</script>

<style lang="scss">
@import "@styles/theme.scss";
@import "@styles/common.scss";

#app, html, body {
  @include themify() {
    margin: 0;
    padding: 0;
    color: themed('text-white-90');
    background-color: themed('main-background-back');
    // font-family: "Source Sans Pro","Helvetica Neue",Helvetica,Arial,sans-serif;
    font-family: Avenir;
  }
}

html, body {
  height: 100%;
  @include scrollbar-like(5px,5px);
}

#app {
  // height: 100%;
  display: flex;
  flex-direction: column;
}

.main {
  @include themify() {
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;

    .main-content {
      display: flex;
      // justify-content: space-between;
    }
  }
}

.enter {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
</style>
