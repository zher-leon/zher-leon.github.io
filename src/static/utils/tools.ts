
import auth from '@/authority/auth'
import octokit from '@/static/plugins/octokit'
import type { RequestInterface } from '@octokit/types/dist-types/RequestInterface'
import { OctokitTreeStructure } from '@api/github'
import { omit } from 'lodash-es'

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
   * 所有日志文件
   */
  allFiles: Omit<TreeNode, 'children'>[]
  /**
   * 所有assets中的image资源
   */
  allImages: Omit<TreeNode, 'children'>[]
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
  const images = []
  treeMap[noteRoot] = rootNode;
  for(let item of tree) {
    let { path, sha, type } = item;
    // 跳过忽视文件
    if (path.indexOf('.gitignore') !== -1) {
      continue;
    }
    let pathSplit = path.split("/");
    // 新节点
    let newNode: TreeNode = {
      name: pathSplit[pathSplit.length - 1],
      path: `${noteRoot}/${path}`,
      sha: sha,
      ...(type === 'tree' && { children: [] })
    };

    if (path.indexOf('.assets') !== - 1) {
      if (type === 'blob') {
        images.push(newNode)
      }
      continue;
    }

    if (type === 'blob') {
      files.push(newNode)
    }

    //找最后一个"/"的索引
    let index = path.lastIndexOf("/");
    // 获取父节点的key
    let preKey = index === -1 ? noteRoot : path.substr(0, index);
    treeMap[preKey].children.push(newNode); //父节点添加当前节点
    treeMap[path] = newNode; //存入当前节点
  }

  return {
    catalogy: rootNode,
    allFiles: files,
    allImages: images
  }
}

/**
 * 将markdown中有关的图片链接路径进行处理
 * @param markdownText markdown文本
 * @param allImages 所有图片的信息
 */
export function detectLinkAndConvert(markdownText: string, allImages: CatalogyTree['allFiles']) {
  const { username, branch } = auth
  // 根目录路径
  const prefix = `https://raw.githubusercontent.com/${username}/${username}.github.io/${branch}/`;
  // 图片链接的正则表达式模式
  const imageRegexPattern = /!\[([^\]]+)\]\(([^)]+)\)/g;
  // <img>标签的正则表达式模式
  const imgTagRegexPattern = /<img[^>]+src="([^"]+)"[^>]+>/g;

  let modifiedText = markdownText;
  const getPath = (path) => allImages.find(img => img.path.endsWith(path))?.path

  // 处理文件链接
  let match;

  // 处理图片链接
  while ((match = imageRegexPattern.exec(markdownText)) !== null) {
    const original = match[2]
    const path = getPath(original) ?? original
    const modified = prefix + path
    modifiedText = modifiedText.replace(original, modified);
  }

  // 处理<img>标签中的图片链接
  while ((match = imgTagRegexPattern.exec(markdownText)) !== null) {
    const original = match[1]
    const path = getPath(original) ?? original
    const modified = prefix + path
    modifiedText = modifiedText.replace(original, modified);
  }

  return modifiedText
}