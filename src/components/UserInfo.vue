<template>
  <div class="user-info">
    <a-card hoverable style="border-radius: 6px; overflow: hidden;" class="card">
      <template #cover>
        <img :src="InfoBackground"/>
      </template>
      <template class="ant-card-actions" #actions>
        <github-outlined key="github" style="font-size:24px"/>
        <qq-outlined key="qq" style="font-size:24px"/>
        <zhihu-outlined key="zhihu" style="font-size:24px"/>
      </template>
      <div class="detail">
        <div class="detail-info">
          <a-avatar :src="myAvatar" :size="80"/>
          <span class="name">Zher Leon</span>
        </div>
        <div style="padding-top: 30px">
          这个家伙很懒，什么都没有留下~
        </div>
      </div>
    </a-card>
  </div>
</template>
<script>
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import myAvatar from "@static/image/avatar.png"
import InfoBackground from "@static/image/infobg.jpg"
export default defineComponent({
  components: {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
  },
  setup() {
    return {
      myAvatar,
      InfoBackground
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@styles/theme.scss";
@import "@styles/common.scss";
.user-info {
  @include themify() {
    min-width: 280px;
    width: 280px;
    margin: 20px;
    border-radius: 10px;
    // background-color: themed('block-background');

    .card {
      background-color: themed('block-background');
    }
    :deep(.ant-card-actions) {
      background-color: themed('block-background');
    }

    .detail {
      position: relative;
      // border: 1px solid red;
      top: -10px;

      .detail-info {
        display: flex;
        align-items: center;
        position: absolute;
        top: -60px;
        .name {
          margin: -20px 0 0 20px;
          font-size: 20px;
          font-weight: 700;
        }
      }
    }
  }
}

</style>