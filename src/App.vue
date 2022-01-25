<template>
  <div class="enter" :style="{ height: screenHeight+'px' }">
    <!-- <img :src="background" /> -->
    <enter-canvas></enter-canvas>
    <!-- <canvas ref="canvasRef" :style="{ height: screenHeight + 'px', width: screenWidth + 'px'}" class="canvas"></canvas> -->
    <div class="scroll-btn">
      <icon-base width="50" height="50" iconColor="white" @click="hanldeScrollView">
        <arrow-down />
      </icon-base>
    </div>
  </div>
  <div id="main" class="main" :style="{ minHeight: screenHeight+'px' }">
    <Catalogy v-model:text="text"/>
    <Content />
    <About />
    <!-- <h1 style="color: white;">{{text}}</h1> -->
  </div>
</template>

<script>
/* eslint-disable */
import { ref, computed, onMounted } from 'vue'
import tools from '@utils/tools'
import About from "@components/About.vue"
import Catalogy from "@components/Catalogue.vue"
import Content from "@components/Content.vue"
import store from "@store/index"
import { githubConfig } from "@config/config.js"
import ArrowDown from "@components/icon/ArrowDown.vue"
import background from "@/assets/enter-background.jpg"
import EnterCanvas from "@components/EnterCanvas.vue"

export default {
  name: 'App',
  components: {
    About,
    Catalogy,
    Content,
    ArrowDown,
    background,
    EnterCanvas
  },
  setup() {
    const screenHeight = computed(() => document.body.offsetHeight)
    const screenWidth = computed(() => document.body.offsetWidth)
    const text = ref('Hello world')

    return {
      text,
      screenHeight,
      screenWidth,
      background
    }
  },
  mounted() {
    store.commit('setUserConfig', githubConfig)
    store.dispatch('getRootCatalogy')
  },
  methods: {
    hanldeScrollView() {
      const mainDom = document.getElementById('main')
      mainDom.scrollIntoView({behavior: "smooth"});
    }
  },
}
</script>

<style lang="scss">
@import "@styles/common.scss";

#app, html, body {
  margin: 0;
  padding: 0;
  color: #ffffff;
  background-color: $main-backgropund-color;
  font-family: "Source Sans Pro","Helvetica Neue",Helvetica,Arial,sans-serif;
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
  display: flex;
  flex: 1;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
}

.enter {
  width: 100%;
  // background-color: black;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  .scroll-btn {
    position: absolute;
    margin-bottom: 50px;
    animation: flow-up-down 3s infinite;
    &:hover {
      cursor: pointer;
    }
  }
}

.canvas {
  // color: rgba(45,140,210,0.1)
}
</style>
