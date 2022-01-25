import note from "@utils/note.js"

export default {
  setUserConfig,
  setCatalogy
}

/**
 * 设置用户基础信息
 * @param {Object} userConfig 用户配置信息
 */
function setUserConfig(state, userConfig) {
  Object.keys(userConfig).forEach((key) => {
    note.setGitHubConfig(key, userConfig[key]);
  });
  state.config = userConfig
}

/**
 * 设置目录信息
 * @param {Object} catalogy 
 */
function setCatalogy(state, catalogy) {
  console.log('cata>>', catalogy);
  // if(!catalogy) return;
  state.catalogy = catalogy
}