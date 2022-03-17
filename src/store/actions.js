import githubAPI from '@/api/github.js'

export default {
  getRootCatalogy,
}

async function getRootCatalogy({ commit }) {
  const ret = await githubAPI.getRepositoryContent()
  commit('setCatalogy', ret.catalogy.children)
  commit('setFileList', ret.allFiles)
}