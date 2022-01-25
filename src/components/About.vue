<template>
  <div class="about">
    <div class="top">
       <a-avatar :src="avatar" :size="160" />
       <div class="info">
          <div class="name">Zher-Leon</div>
          <div class="proverbs">这个家伙很懒，什么都没有留下~</div>
          <div class="more">
            <GithubOutlined/><WeiboOutlined /><ZhihuOutlined /><QqOutlined />
          </div>
       </div>
    </div>
    <div class="bottom">
      <a-divider>MENU</a-divider>
      <div class="catalogy-list">
        <span v-for="(v, i) in catalogy" :key="i" class="item">
        {{ v.name}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "../static/image/avatar.png"
import store from "@store/index"
import { computed } from "vue"
export default {
  setup() {
    const catalogy = computed(() => {
      return store.state.catalogy
    })
    console.log('catalogy>>', catalogy.value)
    return {
      avatar,
      catalogy
    }
  }
}
</script>

<style lang="scss">
@import "@styles/common.scss";
.about {
  background-color: $deep-grey;
  border-radius: 5px 0 0 5px;

  .top {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 50px 10px;

    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      font-size: 22px;
      > div {
        height: 50px;
      }
      .name {
        margin-top: 10px;
      }

      .proverbs {
        font-size: 14px;
      }

      .anticon {
        font-size: 28px;
        padding: 10px;
        border-radius: 5px;
        @include hover-on();
      }
    }
  }

  .bottom {
    padding: 0 10px;    
    .ant-divider {
      color: $text-grey;
      font-weight: 700;
      border-color: #6e6e6e;
    }
    .catalogy-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      .item {
        font-weight: 600;
        font-size: 15px;
        width: 100%;
        text-align: center;
        padding: 5px 0;
        @include hover-on;
      }
    }
  }
}
</style>