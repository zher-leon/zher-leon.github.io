<template>
  <div class="top-bar">
    <div class="top-left">
      <div class="logo">
        Zher 的小破站
      </div>
      <a-tabs default-active-key="main" class="tabs-wrapper" v-model:activeKey="currentPage">
        <a-tab-pane key="main">
          <template #tab>
            <span class="tab">
              <HomeOutlined style="font-size:18px"/>
              主页
            </span>
          </template>
        </a-tab-pane>
        <a-tab-pane key="timeline">
          <template #tab>
            <span class="tab">
              <ProfileOutlined style="font-size:18px"/>
              归档
            </span>
          </template>
        </a-tab-pane>
        <a-tab-pane key="works">
          <template #tab>
            <span class="tab">
              <ProjectOutlined style="font-size:18px"/>
              作品
            </span>
          </template>
        </a-tab-pane>
        <a-tab-pane key="aboutme">
          <template #tab>
            <span class="tab">
              <CoffeeOutlined style="font-size:18px"/>
              关于我
            </span>
          </template>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="top-right">
      <a-input-search
        v-model:value="searchVal"
        placeholder="搜点什么吧"
        class="search"
        size="small"
        @search="onSearch"
      >
      </a-input-search>
      <div class="theme-btn">
        <ThemeDark />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, watch } from "vue";
import ThemeDark from '@icons/ThemeDark.vue';
import store from '@store/index.js'
import router from '@/router/index.js'

export default defineComponent({
  components: {
    ThemeDark
  },
  setup() {
    const searchVal = ref(null)
    const currentPage = ref('main')
    watch(currentPage, val => {
      console.log('val>>', val)
      router.push(`/${val}`)
      // store.commit('setCurrentPage', val)
    })
    const onSearch = function() {

    }
    return {
      searchVal,
      currentPage,
      onSearch
    };
  },
});
</script>

<style lang='scss' scoped>
@import "@styles/common.scss";
@import "@styles/theme.scss";

.top-bar {
  @include themify() {
    height: 50px;
    width: 100%;
    background-color: themed("block-background");
    border-radius: 0 0 10px 10px;
    box-shadow: 0 1px 2px themed("border-shadow");
    display: flex;
    justify-content: space-between;
    padding: 0 20px;

    .top-left {
      display: flex;
      align-content: center;
      .logo {
        width: 300px;
        height: 50px;
        font-size: 20px;
        font-weight: 700;
        display: flex;
        align-items: center;
      }

      .tabs-wrapper {
        align-self: flex-start;
        .tab {
          display: flex;
          align-items: center;
          font-size: 14px;
        }
      }
    }


    .top-right {
      display: flex;
      align-items: center;
      .search {
        width: 200px;
        height: 30px;
        border-radius: 5px;
      }
      .theme-btn {
        margin-left: 40px;
        cursor: pointer;
      }
    }


    &:deep(.ant-tabs-bar) {
      border-bottom: unset !important;
      // margin: unset !important;
      margin-top: 5px;
    }
  }
}
</style>