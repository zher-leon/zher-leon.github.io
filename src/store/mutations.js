import note from "@utils/note.js"

export default {
  setUserConfig,
  setCatalogy,
  setTheme
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

/**
 * 设置主题
 * @param {"light" | "dark"} colorScheme 配色方案名称
 */
 function setTheme(state, colorScheme){
  const body = document.getElementsByTagName("body")[0]
  body.setAttribute("data-theme", colorScheme)
  state.theme = colorScheme
}