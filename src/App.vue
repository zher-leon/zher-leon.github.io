<template>
  <div class="main">
    <div class="catalogue">
      
    </div>
    <div class="content">

    </div>
    <About />
  </div>
</template>

<script>
/* eslint-disable */
import { ref } from 'vue'
import tools from '@utils/tools'
import About from "@components/About.vue"
export default {
  name: 'App',
  components: {
    About
  },
  setup() {
    return {
    }
  },
  mounted() {
    tools.hello()
  },
  methods: {
  },
}
</script>

<style lang="scss">
@import "@styles/common.scss";

#app, html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  color: #ffffff;
  font-family: "Source Sans Pro","Helvetica Neue",Helvetica,Arial,sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
}

.main {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1.5fr 3fr 1fr;

  .catalogue {
    border: 1px solid black;
  }

  // .about {
  //   background-color: $deep-grey;
  //   border-radius: 5px 0 0 5px;
  // }
}
</style>
