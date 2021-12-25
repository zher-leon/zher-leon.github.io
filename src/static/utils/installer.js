/**
 * 安装所有的插件依赖
 * Author:      MeetinaXD
 * Last Edit:   Jul 26, 2021.
 *
 * 通过这个脚本，则只需要关心脚本配置本身，安装过程并不需要关心。
 * 原理是执行每个插件脚本的install方法，并挂载到app.config.globalProperties内。
 * 同时，还会为app提供全局注入，可以在实例内使用inject('名称')的方式获取。
 * 技巧出处：https://cn.vitejs.dev/guide/features.html#glob-import
 */

export {
  installPlugins
}

const installIntoApp = function(app, name, object) {
  app.config.globalProperties[name] = object
  app.provide(name, object)
}

/**
 * 安装插件到vue的全局实例globalProperties内
 * @param {App} app 需要安装的app实例
 */
const installPlugins = async function(app){
  for (const _name in modules){
    const _m = await modules[_name]()
    if (!_m.install){
      throw new Error(`Module ${_name} doesn't have 'install' method, load terminated.`)
    }
    const o = _m.install(app)
    if (o instanceof Promise){
      o.then(ret => {
        !!o && installIntoApp(app, _name, ret)
      })
    } else {
      !!o && installIntoApp(app, _name, o)
    }
  }
}

const modules = {
  antd: () => import("../plugins/antd.js")
}