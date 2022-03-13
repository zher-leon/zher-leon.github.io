import note from "@utils/note.js"

export default {
  getRootCatalogy,
  getNoteFilesContenjt
}

async function getRootCatalogy({ commit }) {
  await note.getCatalogue((res) => {
    const rep = res.data;
    if (res.code === 200) {
      commit('setCatalogy', rep.root_node.children)
    } else {
      console.error('网络异常或存在映射文件');
    }
  });
}

async function getNoteFilesContenjt({ commit }, filesSHA) {
  await note.getContent(filesSHA, res => {
    console.log('hi??', res)
  })
}