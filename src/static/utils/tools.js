
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

export default {
  getCatalogy,
  smoothScrollTo
  
}