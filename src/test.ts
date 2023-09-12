import { Octokit } from "@octokit/core"
// import { createTokenAuth } from '@octokit/auth-token'

// const githubConfig = {
//   login: "zher-leon",
//   repo: "github.io.zher-leon", //项目名称
//   branch: "Notes", //项目分支
//   note_root_path: "NoteRoot", //笔记目录
//   deployment_ciphertext:
//     "nbrQ3EO7u+6g8SWPc6X5NTZvS5kccFvGnaYlO9hzGpyzIUUJhc7dzmJcOQtFDd8+", //部署令牌密文
// };

// 如果需要修改库，才需要token(auth)
const octokit = new Octokit();

const user = await octokit.request('GET /users/{username}', {
  username: 'zher-leon',
})