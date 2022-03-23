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
  antd: () => import("../plugins/antd.js"),
  global: () => import("../plugins/global-component.js"),
  git: () => import('../plugins/gitConfig.js'),
  octokit: () => import('../plugins/octokit.js'),
  // 'md-editor': () => import('../plugins/md-editor.js')
}