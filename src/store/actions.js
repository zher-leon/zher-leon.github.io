import note from "@utils/note.js"

export default {
  getRootCatalogy
}

function getRootCatalogy({ commit }) {
  note.getCatalogue((res) => {
    const rep = res.data;
    if (res.code === 200) {
      commit('setCatalogy', rep.root_node.children)
    } else {
      console.error('网络异常或存在映射文件');
    }
  });
}
