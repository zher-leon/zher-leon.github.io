<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script>
import { ref, onMounted, reactive, computed } from 'vue'

export default {
  components: {
  },
  setup(){ 
    const canvasRef = ref(null)
    const height = computed(() => document.body.clientHeight)
    const width = computed(() => document.body.clientWidth)
  
    let ctx = reactive({})
    onMounted(() => {
      ctx = canvasRef.value.getContext('2d')
      canvasRef.value.width = width.value
      canvasRef.value.height = height.value
      getStarCoordinate(300)
      printCricle(100,300,7)
    })

    const printCricle = function(x, y, r) {
      ctx.save();
      var rad = ctx.createRadialGradient(x, y, 0, x, y, r);
      // 给这个星点设置一个渐变色
      rad.addColorStop(0, 'rgba(255,255,255,0.8)');
      rad.addColorStop(0.1, 'rgba(255,255,255,0.8)');
      rad.addColorStop(0.2, 'rgba(255,255,255,0.08)');
      rad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = rad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    
    const getPixelRatio = function() {
      const backingStore = ctx.backingStorePixelRatio || ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1
      return (window.devicePixelRatio || 1) / backingStore
    }

    const getStarCoordinate = function(num) {
      const starList = []
      for(let i = 0; i < num; i++) {
        const x = Math.random() * width.value
        const y = Math.random() * height.value
        const r = Math.random() * 10
        starList.push({x,y,r})
        printCricle(x,y,r)
      }
    }

    return {
      canvasRef,
      ctx,
      printCricle,
      getPixelRatio,
      getStarCoordinate
    }
  }
}
</script>

<style lang='scss'>
canvas {
  background-color: black;
  // width: 100%;
  // height: 100%;
}
</style>