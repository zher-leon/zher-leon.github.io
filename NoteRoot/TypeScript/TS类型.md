### 前提

​	JS将值分成了8种类型，分别是：

- boolean
- string
- number
- bigint（注意这个是ES2020新增的，如果要用，tsc --target es2020 xxxx.ts）
- symbol
- object
- undefined
- null

​	TS继承了JS的类型设计，所以这也是TS的基本类型。

### boolean

​	只有`true`和`false`

```typescript
const x: boolean = true
```

### string

​	字符串

```typescript
const x: string = 'hello world'
```

### number

​	整数和浮点数

```typescript
const x: number = 3.14
```

### bigint

​	大整数，bigint和number类型不兼容

```typescript
const x: bigint = 0xffffn
```

### symbol

​	所有的Symbol值

```typescript
const x: symbol = Symbol()
```

### object

​	所有的对象、数组、函数

```typescript
const x: object = { name: 'tom' }
const y: object = [1,2,3]
const z: obejct = (n:number) => n + 1
```

### undefined & null

​	`undefined`: 只有undefined一个值，表示暂未定义，可能以后会定义

​	`null`: 只有一个null一个值，表示为空

​	⚠️ 如果有一个变量，没有类型声明，而它的值又是undefined或者null，编译时没有开启`noImplictAny`和`strictNullChecks`，那这个变量的类型会被推断成`any`

​	`undefined`和`null`既是值，也是类型。作为值，它们有一个特殊的地方，任何其他类型的变量都可以赋值为undefined或者null，比如说：

```typescript
let age: number = 18

age = null //ok
age = undefined //ok
```

### 包装对象类型

​	JS的8种类型中，`undefined`和`null`是两个特殊值，`object`是复合类型，剩余5个是`原始类型(primitive value)`，代表基本的、不可再分的值。

​	这5个原始类型：boolean、string、number、bigint、symbol，它们都有对应的`包装对象(指的是这些值在需要时会自动产生的对象)`。

```typescript
'hello'.charAt(1) // 'e'
```

​	比如说上面这个'hello'，执行了charAt()方法，但在JS中，只有对象才有方法，原始类型的值本身没有方法，这段代码之所以可以执行时因为在调用方法时，字符串自动转为了包装类型，charAt()方法其实是定义在包装对象上。

​	在5种原始类型中，bigint和symbol无法直接获取它们的包装类型（就是`Symbol()`和`Bigint()`不能作为构造函数用的意思），其余三种可以。

```typescript
// 这就生成了一个string的包装类型
const x = new String('hello')
typeof x // 'object'

// 生成一个string
const y = new String('world')
typeof y // string
```

### 字面量类型

​	由于包装类型的存在，导致每一个原始类型的值都有包装对象和字面量两种情况。

```typescript
'hello' //字面量
new String('hello') // 包装对象
```

​	为了区分，TS对原始类型使用了大小写两种类型。

```
boolean -> Boolean
string -> String
number -> Number
bigint -> BigInt
symbol -> Symbol
```

​	大写是包含了包装类型和字面量，而小写只包含字面量。

```typescript
const x: String = 'hello' // ok
const y: String = new String('hello') //ok
const z: string = 'hello' // ok
const a: string = new String('hello') // error!!
```

​	建议都是用小写类型，因为绝大部份使用原始类型的场合，都是使用字面量（比如前面的`'hello'.charAt(1)`囖）。而且，TS把许多内置方法的参数都定义成小写类型，用大写会报错喔。

```typescript
const x: Number = 1
Math.abs(x) // error!!
```

​	另外，`Symbol()`和`BigInt()`没法当构造函数用，所以没法直接获取它们的包装对象，如果真的想获取：

```typescript
const x = Object(Symbol())
const y = Object(BigInt())
```

​	但是它们没有使用场景，虽然存在，也可以使用，但没有使用的理由，所以知道就可以。

### Object & object

​	大写的Object代表JS里的广义对象，所有可以转为对象的值，都是Object类型。

```typescript
// let obj: {}; 也可以, {} 是 Object的简写形式
let obj: Object;

// 它们都是ok的...
obj = true
obj = 'hello'
obj = [1,2,3]
obj = { name: 'tom' }
obj = (x) => x + 1

// 但是有两个不可以
obj = undefined // no
obj = null // no, 尽管在JS中，typeof null = 'object'
```

​	小写的object代表JS里的狭义对象，即可以用字面量表示的对象，值包含对象、数组、函数。

```typescript
let obj: obejct;

// okk
obj = [1,3,4]
obj = { name: 'tom' }
obj = (x) => x + 1

// no!!
obj = true
obj = 'hello'
obj = 123
```

### 值类型

​	TS规定单个值也是类型，称为值类型。

```typescript
let x: 'hello';
x = 'hello' //ok
x = 'world' //no!!
```

​	TS在推断类型时，遇到const命令声明的变量，如果没有注明类型，就会认定这个变量是值类型。

```typescript
// x 的类型是'hello'
const x = 'hello'
```

### 联合类型

​	多个类型组合成一个新类型，使用`|`表示，比如`A|B`。

```typescript
let x: number | string

// okkk 
x = 123
x = 'hello'
```

### 交叉类型

​	多个类型组合成一个新类型，使用`&`表示，比如`A&B`，意思是任何一个类型必须同时满足A和B，才属于交叉类型A&B，通常它的主要用途是表示对象的合成：

```typescript
let obj: {
	age: number
} & {
	name: string
}；

// okk
obj = {
	age: 18,
	name: 'tom'
}
```

### type 命令

​	用于定义一个类型的别名。

```typescript
type User = {
	age: number
	name: string
}

let user: User = {
	age: 18,
	name: 'tom'
}
```

​	别名也是有作用域的，同一作用域下不允许有相同别名。

```typescript
type Color = 'red'

if (Math.random() < 0.5) {
	type Color = 'green'
}
```

​	这两个Color是不一样的，不要将它们当作同一个。

### typeof 运算符

​	typeof 操作数是一个值，返回的是该值的TS类型。

```typescript
const x = { age: 18 }

type T = typeof x; // { x:number }
```

​	⚠️ JS的typeof 遵守JS规则，TS的typeof 遵守TS规则。不要将这两个混为一谈，此外，TS在编译的时候不会进行JS的值运算，所以typeof 的参数只能是标识符，不能是需要运算的表达式，比如：

```typescript
type T = typeof Date() // error!!
```

​	另外，typeof命令的参数也不能是类型。

```typescript
type Age = number

type NewAge = typeof Age // error!!
```

### 块级类型

​	TS支持块级类型声明，就是说，可以在代码块中进行类型声明，并且只在当前代码块有效。

```typescript
if (true) {
	type T = number
	let v: T = 5
} else {
	type T = string
	let v: T = 'hello'
}
```

