
const getCatalogy = function() {
  // const result = {}
  // if(typeof log )
}

/**
 * 平滑滚动到某个坐标
 * @param {Number} to 需要滚动到的位置
 */
 const smoothScrollTo = (to, lastTop) => {
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
 * 将github API返回的扁平化文件结构转换成树结构
 * @param {Object} obj 文件结构
 * @returns {Object} 树结构
 */
function createCatalogyTree(obj) {
  const { note_root_path } = window.$git
  let trees = obj.tree;
  let tree_map = {};
  let root_node = {
    name: note_root_path,
    path: note_root_path,
    sha: obj.sha,
    children: [],
  }
  const files = []
  console.log('trees', trees)
  tree_map[note_root_path] = root_node;
  for(let item of trees) {
    let { path, sha, type } = item;
    // 跳过忽视文件
    if (path.indexOf(".gitignore") != -1) return;
    let path_split = path.split("/");
    // 新节点
    let new_node = {
      name: path_split[path_split.length - 1],
      path: `${note_root_path}/${path}`,
      sha: sha,
      children: "tree" === type ? [] : undefined,
    };
    //找最后一个"/"的索引
    let index = path.lastIndexOf("/");
    // 获取父节点的key
    let pre_key =
      index === -1 ? note_root_path : path.substr(0, index);
    tree_map[pre_key].children.push(new_node); //父节点添加当前节点
    tree_map[path] = new_node; //存入当前节点
    if(type === 'blob') {
      const { children, ...filesInfo } = new_node
      files.push(filesInfo)
    }
  }
  return {
    catalogy: root_node,
    allFiles: files
  }
}

export default {
  getCatalogy,
  smoothScrollTo,
  createCatalogyTree
}