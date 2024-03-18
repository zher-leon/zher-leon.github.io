### 它是什么

- 微软开发的
- 可以看成是JS的超集，它不是新的语言，而是增强JS的功能
- JS属于动态类型语言，TS的作用是为JS引入一个更强大、更严格的静态类型系统。

### 优点与缺点

优点: 

- 有利于静态分析，不用运行代码就可以确定变量类型，从而进行推断，在开发阶段进行静态检查，降低线上风险
- 每个值、每个变量、每个运算符都有严格的类型约束，能更容易发现错误，节省开发时间
- 更好的IDE支持，语法提示和自动补全
- 有助于代码重构

缺点：

- 丧失了动态类型的灵活性
- 增加了工作量，不仅要编写功能，还要写类型
- 更高的学习成本
- 引入了独立的编译步骤，运行TS之前需要编译成JS

### 使用

#### 编译

​	JS的运行环境，也就是浏览器和Node.js无法识别TS代码，所以需要先将TS转为JS，这个过程就是编译(complie)，TS官方没有做运行环境，只提供了编译器。

​	编译就是把跟类型声明和相关的代码都删除，只留下JS部分，编译时会做类型检查，编译完之后，它就是JS，所以运行时就不会再检查类型了。

#### TypeScript Playground

​	官方提供的在线编译页面，[尝试一下](http://www.typescriptlang.org/play/)。

#### tsc编译器

​	官方提供的编译器，将TS编译成JS。

##### 安装

```typescript
// 全局安装tsc
npm install -g typescript
// 验证是否安装成功
tsc -v
```

##### 编译

1. 编译单个文件

   ```typescript
   tsc app.ts
   ```

2. 编译多个文件

   ```
   tsc app.ts file.ts
   ```

3. 编译多个文件成一个文件

   ```
   tsc app.ts file.ts --outFile app.js
   ```

4. 编译文件到指定路径

   ```
   tsc app.ts --outDir dist
   ```

5. 编译指定版本的JS（tsc默认会将TS编译成很低版本的JS, 即es3）

   ```
   tsc --target es2015 app.ts
   ```

##### 编译错误处理

​	编译过程没报错就是编译成功了，如果编译报错会显示错误信息，但是即使出现报错也依然会编译出JS产物。因为TS团队认为编译器的作用只是给出编译错误，至于如何处理错误，这是开发者自己的判断。

​	如果希望一旦报错就停止编译，就可以：

```
tsc --noEmitOnError app.ts
```

​	还有一个`--noEmit`参数，可以只检查类型而不生成产物：

```
tsc --noEmit app.ts
```

#### tsconfig.json

​	TS允许将tsc的编译参数写在配置文件`tsconfig.json`。只要当前目录有这个文件，tsc会自动读取，所以运行时可以不写参数。

```
tsc app.ts file.ts --outFile dist/app.js
```

​	这条指令可以写成tsconfig.json：

```json
{
	files: ["app.ts", "file.ts"],
  compilerOptions: {
    outFile: "dist/app.js"
  }
}
```

​	有了这个配置文件，就可以直接使用tsc编译。

#### ts-node模块

​	`ts-node`是一个非官方的npm模块，可直接运行TS代码。

```
npm install -g ts-node
```

​	安装后可以直接运行TS脚本：

```
ts-node app.ts
```

​	当然，如果不想安装ts-node，可以通过npx调用它来运行TS脚本：

```
npx ts-node app.ts
```

​	如果不带任何参数，则会提供一个TS的命令行REPL运行环境：

```
$ ts-node
> const twice = (x:string) => x + x;
> twice('abc')
'abcabc'
> 
```

​	ts-node 可方便我们做简单调试。