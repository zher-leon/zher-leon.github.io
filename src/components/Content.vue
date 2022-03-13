<template>
  <div class="Content">
    <div class="search-box"></div>

  </div>
</template>

<script>

</script>

<style lang="scss">
@import "@styles/theme.scss";
@import "@styles/common.scss";

.Content {
  @include themify() {
    .search-box {
      width: 100%;
      height: 60px;
      background-color: themed('deep-grey');
    }
  }
}
</style>