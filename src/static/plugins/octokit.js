import { Octokit } from '@octokit/core'
import { createTokenAuth } from '@octokit/auth-token'
import { githubConfig } from "@config/config.js"

const install = function() {
  const _octokit = new Octokit()

  // token 在写文件的时候需要用到
  if(githubConfig.token) {
    console.log(githubConfig.token)
    
    const auth = createTokenAuth(githubConfig.token)
    _octokit.hook.wrap("request", auth.hook)
    _octokit.auth = auth
  }
    
  window.$octokit = _octokit
  return _octokit
}

export {
  install
}