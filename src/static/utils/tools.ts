
import auth from '@/authority/auth'
import octokit from '@/static/plugins/octokit'
import type { RequestInterface } from '@octokit/types/dist-types/RequestInterface'
import { OctokitTreeStructure } from '@api/github'

/**
 * 平滑滚动到某个坐标
 * @param {Number} to 需要滚动到的位置
 */
export const smoothScrollTo = (to, lastTop) => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  if (lastTop === scrollTop)
    return ;
  to = Math.min(to, document.body.offsetHeight)
  to = Math.max(to, 0)
  let dy = Math.min(Math.abs(scrollTop - to) / 8, 50)
  if (Math.abs(scrollTop - to) > 1) {
    if (scrollTop > to) {
      window.scrollTo(0, scrollTop - dy)
    } else {
      window.scrollTo(0, scrollTop + dy)
    }
    window.requestAnimationFrame(() => smoothScrollTo(to, scrollTop))
  }
}

/**
 * 值是否为null或者undefined
 */
export function isNully(value: any): boolean {
  return (value === null) || (typeof value === 'undefined')
}

export type TreeNode = {
  /** 名称 */
  name: string
  /** 路径 */
  path: string
  /** 哈希值 */
  sha: string,
  /** 是否存在子节点 */
  children?: TreeNode[]
}

export type CatalogyTree = {
  /**
   * 目录结构
   */
  catalogy: TreeNode
  /**
   * 
   */
  allFiles: Omit<TreeNode, 'children'>[]
}

/**
 * 将github API返回的扁平化文件结构转换成树结构
 */
export function createCatalogyTree(structure: OctokitTreeStructure): CatalogyTree {
  const { noteRoot } = auth
  const { tree } = structure
  let treeMap = {};
  let rootNode: TreeNode = {
    name: noteRoot,
    path: noteRoot,
    sha: structure.sha,
    children: [],
  }
  const files = []
  treeMap[noteRoot] = rootNode;
  for(let item of tree) {
    let { path, sha, type } = item;
    // 跳过忽视文件
    if (path.indexOf('.assets') !== -1) {
      continue;
    }
    let pathSplit = path.split("/");
    // 新节点
    let newNode: TreeNode = {
      name: pathSplit[pathSplit.length - 1],
      path: `${noteRoot}/${path}`,
      sha: sha,
      children: "tree" === type ? [] : undefined,
    };
    //找最后一个"/"的索引
    let index = path.lastIndexOf("/");
    // 获取父节点的key
    let preKey = index === -1 ? noteRoot : path.substr(0, index);
    treeMap[preKey].children.push(newNode); //父节点添加当前节点
    treeMap[path] = newNode; //存入当前节点
    if(type === 'blob') {
      const { children, ...filesInfo } = newNode
      files.push(filesInfo)
    }
  }
  return {
    catalogy: rootNode,
    allFiles: files
  }
}