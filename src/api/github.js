import tools from '@utils/tools.js'
/**
 * 获取存放笔记的分支下的根目录信息
 * @returns 
 */
const getRepositoryContent = async function () {
  /**
   * @see https://docs.github.com/cn/rest/reference/repos#get-repository-content
   */
  const { login, repo, branch, note_root_path } = $git
  try {
    const ret = await $octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: login,
        repo: repo,
        path: "",
        ref: branch
      }
    )
    let catalogyTree = null
    for(const item of ret.data) {
      if(item.type !== 'dir' || item.name !== note_root_path)
        return Promise.reject('目录类型错误或指定笔记目录不存在')
      const o = await getStructureBySHA(item.sha)
      catalogyTree = tools.createCatalogyTree(o.data)
    }
    return Promise.resolve(catalogyTree)
  } catch (err) {
    console.error('err>>', err.toString())
    return Promise.reject('errMsg:', err)
  }
}

/**
 * 通过SHA去获取该SHA指向的结构信息
 * @param {String} sha 哈希值
 * @returns 
 */
const getStructureBySHA = async function(sha) {
  const { login, repo, branch } = $git
  try {
    const ret = await $octokit.request(
      "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
      {
        owner: login,
        repo: repo,
        tree_sha: sha,
        ref: branch,
        recursive: true // 是否递归的方式
      }
    )
    return ret
  } catch(err) {
    console.error('err', err)
    return Promise.reject('errMsg:', err.toString())
  }
}

async function getNoteContent(sha) {
  /**
   * @see https://docs.github.com/cn/rest/reference/git#get-a-blob
   */
  const { login, repo, branch } = $git
  try {
    const ret = await $octokit.request(
      "GET /repos/{owner}/{repo}/git/blobs/{file_sha}",
      {
        owner: login,
        repo: repo,
        file_sha: sha,
        ref: branch,
      }
    );
    const fileContent = Buffer.from(ret.data.content, "base64").toString("utf8")
    return Promise.resolve(fileContent)
  } catch (error) {
    const errorStr = error.toString();
    return Promise.reject('errMsg:', errorStr)
  }
}

async function getCommitStatusBySHA(path) {
  /**
   * @see https://docs.github.com/cn/rest/reference/commits#list-commit-statuses-for-a-reference
   */
  const { login, repo, branch } = $git
  try {
    const ret = await $octokit.request(
      "GET /repos/{owner}/{repo}/commits",
      {
        owner: login,
        repo: repo,
        path: path,
        sha: branch
      }
    )
    return Promise.resolve(ret.data)
  } catch (error) {
    const errorStr = error.toString()
    return Promise.reject('error Message: ', errorStr)
  }
}

async function getUserInfomation() {
  /**
   * @see https://docs.github.com/cn/rest/reference/users#get-a-user
   */
  const { login } = $git
  try {
    const ret = await $octokit.request(
      "GET /users/{username}", { username: login }
    )
    console.log('user info ', ret.data)
    return Promise.resolve(ret.data)
  } catch (error) {
    const errorStr = error.toString()
    return Promise.reject('error Message:', errorStr)
  }
}

export default{
  getRepositoryContent,
  getStructureBySHA,
  getNoteContent,
  getCommitStatusBySHA,
  getUserInfomation
}