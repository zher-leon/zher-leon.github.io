type AuthorityMap = {
  /**
   * 用户名
   */
  username: string
  /**
   * 仓库名
   */
  repo: string
  /**
   * 笔记存放分支
   */
  branch: string
  /**
   * 笔记存放目录
   */
  noteRoot: string
  token?: string
}

const token = import.meta.env.VITE_AUTH_TOKEN ?? ''

const auth: AuthorityMap = {
  token,
  username: 'zher-leon',
  repo: 'github.io.zher-leon',
  branch: 'Notes',
  noteRoot: 'NoteRoot'
}

export default auth;
