# Vue3 Learning Notes

Author: Zher Leon

Last Update: Aug 29, 2021

---

### ⏳插槽

#### 具名插槽

​	当需要使用多个插槽的时候，可以为slot提供一个name属性。

```
component - cat.vue

<div>
    <h1>
        从前有一只叫
        <slot name='catname' />
            的小猫咪
     </h1>
      <h2>
            它有一身
        <slot name='skin'/>
        的毛发
    </h2>
</div>

父组件 - main.vue中使用

<div>
	<template v-slot:catname>旺财</template>
	<template v-slot:skin>金色</template>
</div>
```

### $slots

​	$slots是组件插槽集，是组件所有默认插槽、具名插槽的集合，可以用来获取当前组件的插槽集。

​	在一些需求下，需要根据某个插槽是否被用来决定该组件的布局。例如：

`:style="{justifyContent: (!$slots.postfix && (postfix.length === 0))? 'space-between': 'flex-start'}"`

​	$slots中获取到的是被使用的插槽函数，比如说，一个组件中有三个插槽：header、 postfix、footer，但是父组件在使用该子组件的时候，只传入了header和footer，没有使用到postfix，此时，$slots中不会获取到postfix的插槽函数。由此结合上述，如果没有使用postfix，那么使用到的flex布局会时space-between，否则使用flex-start。

![$slots的一个打印结果](Vue3-LearningNotes.assets/image-20210830144908591.png)

​	上图中，就是$slots的一个打印结果，该插件只使用了default默认插槽，因此只存在一个default。

![来源于网络](Vue3-LearningNotes.assets/image-20210830151822006.png)

### ⏳ provide / inject

```
provide：Object | () => Object
```

- provide 允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。
- provide 选项应该时一个对象或返回一个对象的函数。该对象包含可注入其子孙的属性。在该对象中可以使用ES5 Symbols作为key，但只在原生支持Symbol和Reflect.ownKeys的环境下可工作。

**使用场景**：由于vue有$parent属性可以让子组件访问父组件。但孙组件想要访问祖先组件就比较困难。通过provide/inject可以轻松实现跨级访问祖先组件的数据。

> 1. provide相当于加强版父组件prop
> 2. inject相当于加强版子组件props
>
> 有了provide 与 inject，父组件与子组件、孙子组件、曾孙子...组件数据交互，也可以说不仅限于prop的父子组件数据交互，只要在上一层声明provide，那么下一层无论多深都能通过inject来访问到provide的数据。

```
// 父组件
export default {
	name: 'Father',
	provide: {
		name: 'I am Father!!!'
	}
}

// 孙子组件
export default {
	name: 'Grandson',
	inject: [ name ]
}
```

​	当然，这么用也是有缺点的，在任意层级都能访问导致数据追踪比较困难，不知道是哪个层级声明了这个或者哪一层级用了，因此能用vuex就用vuex。

### ⏳ defineAsyncComponent

这是个啥？可以看成是这样：

```
const AsyncComp = defineAsyncComponent(() => {
	new Promise((resolve, reject) => {
		resolve({
			template: '<div>I am Async</div>'
		})
	})
})
```

​	它允许接受一个返回Promise的工厂函数，Promise 的 `resolve` 回调应该在服务端返回组件定义后被调用。你也可以调用 `reject(reason)` 来表示加载失败。

​	`defineAsyncComponent`可以从vue中引用：

```
// 简单用法
import {defineAsyncComponent} from 'vue'
const changeComponent = defineAsyncComponent(() => import('./components/PathConfig.vue'))

// 高级用法，接受一个对象
const changeComponent = defineAsyncComponent({
	loder: import('./components/PathConfig.vue'),
	// 加载异步组件时要用的组件
	loadingComponent: LoadingComponent,
	// 加载失败时要用的组件
	errorComponent: ErrorComponent,
	// 在显示loadingComponent之前的延迟 | 默认值：200 ms
	delay: 1000,
	// 如果提供了timeout，并且加载组件的时间超过了设定值，将显示错误组件，默认值：Infinity(永不超时)
	timeout: 3000
})
```

​	使用场景： 实现组件懒加载。比如说，实现一个点击触发登陆的弹框，但是我们不需要在每次应用程序加载时都加载这个组件，因为只有用户执行特定动作的时候才需要它。

### ⏳ 无渲染组件

[Vue.js中的无渲染组件](https://adamwathan.me/renderless-components-in-vuejs/)



### ⏳ $nextTick()

[vue.nextTick()方法的使用详解（简单明了](https://blog.csdn.net/zhouzuoluo/article/details/84752280)

