# Vuex Learning Notes

Author: Zher Leon

Last Update: Aug 29, 2021

---

### ⏳ Vuex

​	专为vue.js开发的状态管理模式，也集中到Vue devtools中进行调试。

​	👍**安装**

​	通过文件

​	`	<script src="/path/to/vuex.js"></script>`

​	NPM

​	`npm install vuex --save`

每个Vuex应用的核心就是store，可以理解为一个容器，存储应用中大部分的状态(state)，但是它又和单纯的全局对象有些不同：

- Vuex的存储状态是响应式的，vue组件从store读取的状态如果发生改变，那么组件也会更新，
- 不能直接修改store的状态。能改变store中状态的唯一途径就就是显式地提交mutation（commit mutation）。

```
// 配置vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		count: 0
	},
	mutations: {
		increment(state) {
			state.count++
		}
	}
})
```

```
// 获取与触发变更
store.commit('increment')  //触发
console.log(store.state.count)  // 获取变量->count = 1
```

​	在能在Vue组件中访问store，我们需要给Vue实例提供创建好的store，方便我们在使用时能通过this.$store访问。一下是注入的方式：

```
// ES5
new Vue({
	el: '#app',
	store: store
})
// ES6
new Vue({
	el: '#app',
	store
})
```

​	成功注入之后，就可以在全局的组件中使用Vuex啦，比如在某个组件中就可以使用如下：

```
methods: {
	increment() {
		this.$store.commit('increment')
		console.log(this.$store.state.count)
	}
}
```

⚠ 请务必使用提交mutation的方式去修改状态，而不是直接通过store.state.count去进行修改，虽然这样子确实也是可行的。使用提交mutation可以让我们的意图更加明显，在vue-devtools中也可以记录下我们的每次commit，方便我们debug，如果直接进行修改，则可能需要大量的时间调试来找到错误。

### ⏳ State

​	Vuex通过store选项，提供了一种机制将状态从根组件注入到每一个子组件中。只要在根实例上注册store，子组件能通过this.$store访问。

​	**mapState**

​	如果需要获取多个状态，那将这些状态都声明为计算属性会很麻烦，为了解决这个问题，可以使用辅助函数mapState帮助生成计算属性。

```
import { mapState } from 'vuex'

export default {
	computed: mapState({
		// 箭头函数可以使代码更简练
		count: state => state.count,
		// 传字符串参数'count'等同于‘state => state.count'
		countAlias: 'count',
		// 为了能够使用'this'获取局部状态，必须使用常规函数
		countPlusLocalState(state) {
			return state.count + this.localCount
		}
	})
}
```

​	计算属性的名字与子节点的名字相同时，甚至可以只给mapState传递一个字符串数组。

```
computed: mapState([
	// 映射 this.count为store.state.count，之后可以通过this.count获取store.state.count
	'count'
])
```

​	**对象展开运算符**

​	mapState返回一个对象，使用对象展开运算符可以将该对象传给computed属性，这样就可以和局部计算属性混合使用了。

```
computed: {
	//使用对象展开运算符将此对象混入到外部对象中
	...mapState({
		// ...
	})
}
```

### ⏳  Getters

​	假如我们需要对某个状态进行计算或者进行一些别的操作，比如对Vuex中某个状态中的列表进行过滤计数，可以在组件中有这样的操作：

```
computed: {
	doneTodosCount() {
		return this.$store.state.todos.filter( todo => todo.done ).length
	}
}
```

​	但是，如果有好几个组件都要用到这样的操作呢？要么复制这个函数要么将这个函数抽取到一个共享函数然后再在各个地方导入它，反正怎么看都不够优雅。

​	Vuex允许我们在store中定义getter，就像计算属性一样，getter的返回值回根据它的依赖被缓存起来，且只有当它的依赖发生了改变才会被从新计算。

```
const store = new Vuex.Store({
	state: {
		todos: [
			{ id: 1, text: '...', done: true },
			{ id: 2, text: '...', done: false }
		]
	},
	getters: {
		doneTodos: state => {
			return state.todos.filter(todo => todo.done)
		}
	}
})
```

​	**通过属性访问**

​	Getter回暴露为store.getters对象，可以通过属性的方式访问：

```
store.getters.doneTodos //->[{id:text:'...',done:true}]
```

​	也可以接受getter作为第二个参数：

```
getters: {
	doneTodosCount: (state,getters) => {
		return getters.doneTodos.length
	}
}
```

```
store.getters.doneTodosCount //->1
```

​	由此，可以在任意组件中有这样的调用：

```
computed: {
	doneTodosCount() {
		return this.$store.getters.doneTodosCount
	}
}
```

⚠ getter 在通过属性访问时是作为Vue的响应式系统的一部分缓存在其中的。	

​	**通过方法访问**

​	允许通过让getter返回一个函数来实现给getter传参，在你对store里的数组进行查询时非常有用。

```
// 使用该方法获取state中todos里id与传参id值一致的那个对象
getters: {
	getTodoById: (state) => (id) => {
		return state.todos.find(todo => todo.id === id)
	}
}
// 比如说
store.getters.getTodoById(2) 
// -> { id: 2, text: '...', done: false }
```

**mapGetters**

​	mapGetters 仅仅是将store中的getter映射到局部计算属性：

```
import { mapGetters } from 'vuex'

export default {
	computed: {
	// 使用对象展开符将getter混入到computed对象中
		...mapGetters([
			'doneTodosCount',
			'anotherGetter',
			// ...
		])
	}
}
```

​	如果想讲一个getter属性另取名字，可以：

```
...mapGetters({
	// 之后就可以通过this.doneCount访问 this.$store.getters.doneTodosCount
	doneCount: 'doneTodosCount'
})
```

### ⏳  Mutation

​	更改Vuex的store中的状态唯一的方法是提交 mutation。

```
const state = new Vuex.Store({
	state: {
		count: 1
	},
	mutations: {
		increment (state) {
			state.count++
		}
	}
})
```

​	当然，我们不能直接调用一个 mutation handler，但是想要触发这个handler，可以使用store.commit方法。

```
store.commit('increment')
```

​	**Payload 提交载荷**

​	可以向store.commit传入额外参数，即mutation的载荷(payload)：

```
mutations: {
	increment(state, n) {
		state.count += n
	}
}
```

```
store.commit('increment', 10)
```

​	其实大多数的时候，载荷应该是一个对象，这样可以包含多个字段并且记录的mutation会易读：

```
mutations: {
	increment (state, payload) {
		state.count += payload.amount
	}
}
```

```
store.commit('increment', {
	amount: 10
})
```

​	**对象风格的提交方式**

​	提交mutation的另一种方式是直接使用包含type属性的对象：

```
store.commit({
	type: 'increment',
	amount: 10
})
```

​	当使用对象风格的提交方式时，整个对象都会作为载荷传给mutation，因此handler可以保持不变，如上文mutations的写法即可。

​	**Mutation需要遵守Vue的响应规则**

​	Vuex的store中的状态是响应式的，当我们变更状态时，监视状态的Vue组件也会自动更新，意味着Vue中的mutation也需要跟Vue一样遵守一些规则： 

	- 在store中初始化所有所需的属性
	- 如果要在对象上添加新属性，应该使用 Vue.set(obj，'newProp'，123) 或者以新对象替换老对象，利用使用对象展开运算符：

```
state.obj = { ...state.obj, newProp: 123 }
```

​	**允许使用常量替代Mutation事件类型**

​	在Flux实现中使用常量替代mutation事件类型是很常见的，这样可以使linter之类的工具发挥作用，同时把这些常量放在单独的文件中可以让代码合作者对整个app包含的mutation一目了然。

```
// mutation-type.js
export const SOME_MUTATION = 'SOME_MUTATION'
```

```
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
	state: { ... },
	mutations: {
	//使用ES5风格的计算属性明明功能来使用一个常量作为函数名
		[SOME_MUTATION](state) {
			return state.count++
		}
	}
})
```

​	但，用不用取决个人吧，不喜欢也可以不这么做。

​	**Mutation 必须是同步函数**

```
mutations: {
	someMutation(state) {
		api.callAsyncMethod( () => {
			state.count++
		})
	}
}
```

​	在debug一个app并且观察devtool中的mutation日志，每一条mutation被记录，devtools都需要捕捉到前一状态和后一状态的快照，但是如果像上面这个例子这样写，就会出现那么一种情况：mutation触发的时候，回调函数还没有被调用，devtools不知道什么时候回调函数实际上被应用，导致追踪不到这个变化。

​	**在组件中提交Mutation**

​	可以在组件中使用this.$store.commit('xxx')提交mutation，或者使用mapMutations辅助函数将组件中的methods映射为store.commit调用（需要在根节点注入store）

```
import { mapMutations } from 'vuex'

export default {
	methods: {
		...mapMutations([
			'increment', // 将this.increment()映射为this.$store.commit('increment')
			'incrementBy' // 支持载荷，将this.incrementBy(amount)映射为this.$store.commit('incrementBy', amount)
		]),
		...mapMutations({
			add: 'increment' // 将this.add()映射为this.$store.commit('increment')
		})
	}
}
```

### ⏳ Action

​	Action类似于Mutation，但是不同在于：

- Action 提交的是 mutation，但不是直接变更状态。
- Action 可以包含任何异步操作

​    一个简单的action: 

```
const store = new Vuex.Store({
	state: {
		count: 0
	},
	mutations: {
		increment(state) {
			state.count++
		}
	},
	actions: {
		increment(context) {
			context.commit('increment')
		}
	}
})
```

​	Action函数允许接受一个与store实例具有相同方法和属性的context对象，因此可以调用context.commit提交一个mutation，或者通过context.state和context.getters来获取state和getters。

```
actions: {
	// 参数解构
	increment({ commit }) {
		commit('increment')
	}
}
```

​	**分发Action**

​	Action通过store.dispatch方法触发：

```
store.dispatch('increment')
```

​	乍一看也是触发mutation，但是，mutation必须同步，而在action中就不受约束，可以在action内部执行异步操作：

```
actions: {
	incrementAsync({ commit }) {
		setTimeout(()=>{
			commit('increment')
		},1000)
	}
}
```

​	Actions 同样支持载荷和对象方式进行分发：

```
// 载荷
store.dispatch('incrementAsync',{
	amount: 10
})

// 对象
store.dispatch({
	type:'incrementAsync',
	amount: 10
})
```

来看一个例子：

```
actions: {
	checkOut({ commit, state }, products) {
		// 把当前购物车的物品备份起来
		const savedCartItems = [...state.cart.added]
		// 发出结账请求，清空购物车
		commit(types.CHECKOUT_REQUEST)
		// 购物API接受一个成功回调和一个失败回调
		shop.buyProducts(
			products,
			// 成功操作
			() => commit(types.CHECKOUT_SUCCESS),
			() => commit(types.CHECKOUT_FAILURE, savedCartItems)
		)
	}
}
```

​	**在组件中分发Action**

​	在组件中使用this.$store.dispatch('xxx')分发action，或者使用mapActions辅助函数将组件的methods映射为store.dispatch调用（根节点注入store）

```
import { mapActions } from 'vuex'

export default {
	methods: {
		...mapActions([
		// 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
			'increment', 
		// 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
			'incrementBy'
		]),
		// 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
		...mapActions({
			add:'increment'
		})
	}
}
```

​	**组合Action**

​	store.dispatch可以处理被触发的action的处理函数返回的Promise，并且store.dispatch仍然返回Promise：

```
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

可以这么用：

```
store.dispatch('actionA').then(() => {
  // ...
})
```

还可以在另一个action中：

```
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

再配合一下async / await，就有：

```
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

