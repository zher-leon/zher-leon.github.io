<template>
  <div class="about">
    <div class="top">
       <a-avatar :src="avatar" :size="180" />
       <div class="info">
          <div class="name">Zher-Leon</div>
          <div class="proverbs">这个家伙很懒，什么都没有留下~</div>
          <div class="more">
            <GithubOutlined/><WeiboOutlined /><ZhihuOutlined /><QqOutlined />
          </div>
       </div>
    </div>
    <div class="bottom">
      <a-divider>目录</a-divider>
    </div>
  </div>
</template>

<script>
import avatar from "../static/image/avatar.png"

export default {
  setup() {
    return {
      avatar
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
      font-size: 25px;
      > div {
        height: 50px;
      }
      .name {
        margin-top: 10px;
      }

      .proverbs {
        font-size: 16px;
      }

      .anticon {
        font-size: 28px;
        padding: 10px;
        border-radius: 5px;
        &:hover {
          cursor: pointer;
          background-color: $light-grey;
        }
      }
    }
  }

  .bottom {
    padding: 0 10px;
    .ant-divider{
      color: white;
      border-color: #6e6e6e;
      
    }
  }
}
</style>