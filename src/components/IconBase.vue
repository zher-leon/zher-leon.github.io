<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="`${vbFrom} ${vbTo} ${vbWidth} ${vbHeight}`"
    :aria-labelledby="iconName"
    :preserveAspectRatio="unlockAspectRatio?'none':''"
    role="presentation"
  >
    <title v-if="iconName" lang="en">{{iconName}}</title>
    <g v-bind="fill">
      <slot />
    </g>
  </svg>
</template>

<script>
// 以更好的方式管理svg图标
// 出处：https://cn.vuejs.org/v2/cookbook/editable-svg-icons.html
export default {
  props: {
    iconName: {
      type: String,
      default: null
    },
    width: {
      type: [Number, String],
      default: 14
    },
    height: {
      type: [Number, String],
      default: 14
    },
    iconColor: {
      type: String,
      default: '#4A4A4A'
    },
    // 如果遇到了图标无法正常显示的情况，请检查viewbox大小
    // iconfont中的图标viewbox大小都是1024 1024
    vbFrom: {
      type: [Number, String],
      default: 0,
    },
    vbTo: {
      type: [Number, String],
      default: 0,
    },
    vbWidth: {
      type: [Number, String],
      default: 1024
    },
    vbHeight: {
      type: [Number, String],
      default: 1024
    },
    unlockAspectRatio: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    fill(){
      if (this.iconColor === ''){
        return {}
      }
      return {
        fill: this.iconColor
      }
    }
  }
}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  /* margin-bottom: -2px;  */
}
</style>