<template>
  <div>
    <canvas ref="canvasRef" />
    <div class="quotation">
      <span>We are all in the gutter, </span>
      <span>but some of us are looking at stars.</span>
      <span>- Oscar Wilde</span>
      <div class="enter-block" @click="hanldeScrollView">
        <icon-base
          width="24"
          height="24"
          iconColor=""
        >
          <arrow-down />
        </icon-base>
        Enter my Blog
      </div>
    </div>
    <div class="decorate">
      <star-system />
      <icon-base width="260" height="260">
        <astronaut />
      </icon-base>
      <icon-base width="100" height="100">
        <planet />
      </icon-base>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive, computed, toRaw } from 'vue'
import buildStar from '@utils/buildStar.js'
import ArrowDown from '@icons/ArrowDown.vue'
import StarSystem from '@icons/StarSystem.vue'
import Astronaut from '@icons/Astronaut.vue'
import Planet from '@icons/Planet.vue'

export default {
  components: {
    ArrowDown,
    StarSystem,
    Astronaut,
    Planet
  },
  setup(){ 
    const canvasRef = ref(null)
    const height = computed(() => document.body.clientHeight)
    const width = computed(() => document.body.clientWidth)

    const { init, draw } = buildStar
  
    let ctx = reactive({})
    onMounted(() => {
      ctx = canvasRef.value.getContext('2d')
      canvasRef.value.width = width.value
      canvasRef.value.height = height.value
      init(toRaw(ctx), 200)
      draw(toRaw(ctx))
    })

    return {
      canvasRef,
      height,
      width
    }
  },
  methods: {
    hanldeScrollView() {
      const mainDom = document.getElementById('main')
      mainDom.scrollIntoView({behavior: "smooth"});
    }
  }
}
</script>

<style lang='scss'>
@import "@styles/theme.scss";
@import "@styles/common.scss";

canvas {
  background-color: black;
}
.quotation {
  @include themify() {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: 800px;
    font-size: 28px;
    font-weight: 600;
    span {
      display: block;
      &:nth-child(2) {
        margin-left: 200px;
      }
      &:nth-child(3) {
        font-size: 22px;
        margin-left: 600px;
      }
    }
    .enter-block {
      margin: 0 auto;
      display: flex;
      align-items: center;
      font-size: 18px;
      width: 200px;
      cursor: pointer;
      animation: flow-up-down 3s infinite;
      svg {
        fill: themed('text-white-90');
        margin-right: 10px;
      }
    }
  }
}

.decorate {
  svg {
   &:nth-child(1) {
    position: absolute;
    left: 80%;
    top: 0;
   }
   &:nth-child(2) {
     position: absolute;
     left: 10%;
     top: 60%;
     animation: flow-up-down 7s infinite;
   }
   &:nth-child(3) {
     position: absolute;
     left: 1%;
     top: 40%;
   }
  }
}

</style>