<template>
  <div class="article-wrapper">
    <Star class="star" :style="{[startPosition]: -20 + 'px'}"/>
    <div class="title">
      <span>{{ title }}</span>
    </div>
    <div class="article" :style="{'-webkit-line-clamp': isExpand ? null : 5}" @click="isExpand = !isExpand">
      <p>
        拖拽交互常见于各种前端编辑器里，而“编辑器”是一个集成前端技术能力的综合性工程，其中就会涉及到各种形式的拖拽交互，因为“拖拽”是提升用户体验的重要交互方式，所以需要对拖拽的交互效果做各种定制化，作为开发者理应熟练掌握“拖拽”的应用！
        最近在开发一款低代码平台，所以借此机会分享一下关于“拖拽”这一交互的基础知识和实践经验，希望可以给有需要的同学提供一点参考。
        一、HTML5 中的拖放
        拖（Drag）和放（Drop）是 HTML5 标准的组成部分，了解掌握之后，举一反三，有助于提升我们在拖拽场景下技术方案的设计能力。
        1.1 draggable 属性
        现代浏览器中，不难发现，图片标签（<img />）是可以被长按拖拽，但如果需要自定义的 DOM 节点可以被拖拽需要配置以告诉浏览器提供对元素（Element / Tag）支持拖拽的能力。
        而元素是否允许被拖放且可响应 API 操作依赖于 draggable 全局标签属性
        draggable 是一个布尔值类型的标签属性：

        true：元素可被拖拽
        false：元素不可拖拽
        大文件分片上传核心方法

在JavaScript中，文件FIle对象是Blob对象的子类，Blob对象包含一个重要的方法slice通过这个方法，我们就可以对二进制文件进行拆分
使用 FormData 格式进行上传
服务端接口接受到数据，通过 multiparty 库对数据进行处理
区分 files 和 fields，通过 fse.move 将上传的文件移动到目标路径下
客户端使用 Promise.all 方法，当监听到所有切片已上传完，调用 merge 接口，通知服务端进行切片的合并
使用 Stream 对切片边读边写，设置可写流的 start
Promise.all判断所有切片是否写入完毕

进度条

使用浏览器 XMLHttpRequest 的 onprogress 的方法对进度进行监听
2、番外篇：断点续传服务端做法


当用户在听一首歌的时候，如果听到一半（网络下载了一半），网络断掉了，用户需要继续听的时候，文件服务器不支持断点的话，则用户需要重新下载这个文件。而Range支持的话，客户端应该记录了之前已经读取的文件范围，网络恢复之后，则向服务器发送读取剩余Range的请求，服务端只需要发送客户端请求的那部分内容，而不用整个文件发送回客户端，以此节省网络带宽。


如果Server支持Range，首先就要告诉客户端，咱支持Range，之后客户端才可能发起带Range的请求。这里套用唐僧的一句话，你不说我怎么知道呢。response.setHeader('Accept-Ranges', 'bytes');


Server通过请求头中的Range: bytes=0-xxx来判断是否是做Range请求，如果这个值存在而且有效，则只发回请求的那部分文件内容，响应的状态码变成206，表示Partial Content，并设置Content-Range。如果无效，则返回416状态码，表明Request Range Not Satisfiable（www.w3.org/Protocols/r… ）。如果不包含Range的请求头，则继续通过常规的方式响应。

作者：火车头
链接：https://juejin.cn/post/7071877982574346277
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
时间切片计算文件hash：计算hash耗时的问题，不仅可以通过web-workder，还可以参考React的Fiber架构，通过requestIdleCallback来利用浏览器的空闲时间计算，也不会卡死主线程
抽样hash：文件hash的计算，是为了判断文件是否存在，进而实现秒传的功能，所以我们可以参考布隆过滤器的理念, 牺牲一点点的识别率来换取时间，比如我们可以抽样算hash
根据文件名 + 文件修改时间 + size 生成hash
网络请求并发控制：大文件由于切片过多，过多的HTTP链接过去，也会把浏览器打挂， 我们可以通过控制异步请求的并发数来解决，这也是头条的一个面试题
慢启动策略：由于文件大小不一，我们每个切片的大小设置成固定的也有点略显笨拙，我们可以参考TCP协议的慢启动策略， 设置一个初始大小，根据上传任务完成的时候，来动态调整下一个切片的大小， 确保文件切片的大小和当前网速匹配
并发重试+报错：并发上传中，报错如何重试，比如每个切片我们允许重试两次，三次再终止
文件碎片清理

作者：火车头
链接：https://juejin.cn/post/7071877982574346277
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
      </p>
    </div>
    <div class="footer">
      <span>Last Commit 2022/02/02 By Zher Leon</span>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, computed, toRefs, watchEffect } from 'vue'
import Star from '@icons/Star.vue'
import myAvatar from "@static/image/avatar.png"

export default defineComponent({
  components: {
    Star
  },
  props: {
    count: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: 'There needs a title.'
    },
    expand: {
      type: Boolean,
      default: false
    }
  },
  setup(props){ 
    const { count, expand } = toRefs(props)
    const startPosition = computed(() => count.value % 2 === 0 ? 'right' : 'left')
    
    const isExpand = ref(false)
    
    watchEffect(() => {
      isExpand.value = expand.value
    })

    return {
      startPosition,
      myAvatar,
      isExpand
    }
  }
})
</script>

<style lang='scss' scoped>
@import "@styles/theme.scss";
@import "@styles/common.scss";

.article-wrapper {
  @include themify() {
    width: 100%;
    // height: 300px;
    // max-height: 300px;
    border-radius: 10px;
    background-color: themed('block-background');
    border: 1px solid themed('border-color');
    position: relative;
    margin-bottom: 30px;
    margin-top: 10px;
    flex: 1;
    padding: 0 30px;
    // overflow: hidden;

    .star {
      position: absolute;
      top: -20px;
      // right: -20px;
    }

    .title {
      padding-left: 20px; 
      font-size: 18px;
      font-weight: 600;
      margin: 10px 0;
      // margin-top: 10px;
    }

    .article {
      // border: 1px solid red;
      width: 100%;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      // -webkit-line-clamp: 5; //想要的行数
      -webkit-box-orient: vertical;
      cursor: pointer;
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      color: themed('text-grey');
      margin: 20px 0;
    }
  }
}
</style>