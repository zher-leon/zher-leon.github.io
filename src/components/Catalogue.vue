<template>
  <div class="catalogy">
    <!-- <button @click="handleChange">Click</button> -->
  </div>
</template>

<script>
import { toRef } from "vue"
export default {
  props: {
    text: {
      type: String,
      default: 'Nothing'
    }
  },
  setup(props, { emit }) {
    const texta = toRef(props, 'text')
    const handleChange = function () {
      console.log('txta', texta)
      emit("update:text", 'HI')
    }
    return {
      handleChange,
      texta
    }
  }
}

</script>

<style lang="scss">
@import "@styles/theme.scss";
@import "@styles/common.scss";

.catalogy {
  @include themify() {
    background-color: themed('deep-grey');
  }
}
</style>