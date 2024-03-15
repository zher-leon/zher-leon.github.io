import { Octokit } from '@octokit/core'
import auth from '@/authority/auth'
import { createTokenAuth } from '@octokit/auth-token'

const _octokit = new Octokit()

// token 在写文件的时候需要用到
if(auth.token) {
  const tokenAuth = createTokenAuth(auth.token)
  _octokit.hook.wrap("request", tokenAuth.hook)
  _octokit.auth = tokenAuth
}

export default _octokit