import { CatalogyTree, createCatalogyTree } from '@utils/tools'
import auth from '@/authority/auth'
import octokit from '@/static/plugins/octokit'
import type { OctokitResponse } from '@octokit/types/dist-types/OctokitResponse'

export type OctokitTreeStructure = {
  sha: string;
  url: string;
  truncated: boolean;
  tree: {
    path?: string;
    mode?: string;
    type?: string;
    sha?: string;
    size?: number;
    url?: string;
  }[]
}

/**
 * 通过SHA去获取该SHA指向的结构信息
 * @param {String} sha 哈希值
 * @returns
 */
export const getStructureBySHA = async function (sha: string): Promise<OctokitResponse<OctokitTreeStructure>> {
  const { username, repo, branch } = auth
  try {
    const ret = await octokit.request(
      'GET /repos/{owner}/{repo}/git/trees/{tree_sha}',
      {
        owner: username,
        repo,
        tree_sha: sha,
        ref: branch,
        recursive: 'true' // 是否递归的方式
      }
    )
    return ret
  } catch (err) {
    console.error('err', err)
    return Promise.reject()
  }
}

/**
 * 获取存放笔记的分支下的根目录信息
 * @returns
 */
export const getRepositoryContent = async (): Promise<CatalogyTree> => {
  /**
   * @see https://docs.github.com/cn/rest/reference/repos#get-repository-content
   */
  const { username, repo, branch } = auth

  const ret = await octokit.request(
    'GET /repos/{owner}/{repo}/contents/{path}',
    {
      owner: username,
      repo,
      path: '',
      ref: branch
    }
  )

  const data = Array.isArray(ret.data) ? ret.data : [ret.data]
  const promiseList = []
  data.forEach(item => {
    if (item.name !== '.gitignore') {
      promiseList.push(getStructureBySHA(item.sha))
    }
  })
  const structure = await Promise.all(promiseList)

  console.log('struct', structure)
  return createCatalogyTree(structure[0].data)
}

/**
 * 通过SHA获取某个文件内容
 * @param sha
 */
export async function getNoteContent(sha: string | number): Promise<string> {
  /**
   * @see https://docs.github.com/cn/rest/reference/git#get-a-blob
   */
  const { username, repo, branch } = auth
  const ret = await octokit.request(
    'GET /repos/{owner}/{repo}/git/blobs/{file_sha}',
    {
      owner: username,
      repo,
      file_sha: sha as string,
      ref: branch,
    }
  );

  // 解码base64
  const base64Decoded = atob(ret.data.content)
  const unit8Array = new Uint8Array(base64Decoded.length).fill(0).map((e, i) => base64Decoded.charCodeAt(i))
  const textDecoder = new TextDecoder('utf-8')
  const fileContent = textDecoder.decode(unit8Array)

  return fileContent
}

/**
 * 获取用户信息
 */
export async function getUserInfo() {
  const { username } = auth

  const ret = await octokit.request('GET /users/{username}', {
    username
  })

  return ret.data
}
