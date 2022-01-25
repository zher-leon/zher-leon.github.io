/**
 * 判断数值是否在某一范围之内且数值在某一精度内
 * @param {String} val 被判断的数值
 * @param {Number} from 数值起始位
 * @param {Number} to 数值终止位
 * @param {Number} precision 精度(保留多少位小数)
 * @returns {Promise} 返回Promise,是否在范围内且符合精度的结果
 */
 const isInRange = function(val, from, to, precision) {
  // 判断数值是否在某一范围内
  const isInRange = (Number(val) >= from && Number(val) <= to)
  // 正则判断该数值是否符合精度, 整数的话填写0
  const reg = new RegExp(`\^\\d+(\\.\\d{0,${precision}})?$`)
  const isInPrecision = reg.test(val)
  
  if(isInRange && isInPrecision) {
    return Promise.resolve(Number(val))
  } else {
    return Promise.reject()
  }
}

/**
 * 封装输入框验证方法
 * @param {Function} fn 回调方法
 * @param {String | Array} trigger 触发验证的方式,'blur'或['blur','change']
 * @returns {[v]} 返回封装好的验证方法
 */
const validate = function(fn, trigger='blur') {
  const v = {
    validator(rules,value) {
      return fn(value)
    },
    trigger: trigger
  }
  return [v]
}

/**
 * 判断两个数值的大小
 * @param {Number} min 小值
 * @param {Number} max 大值
 * @param {String} res 返回值，可选返回大值还是返回小值
 * @param {Boolean} isBigger 是否允许两值相等的情况，是为false
 * @returns {Promise} 返回一个Promise
 */
const compareSize = function(min, max, isBigger=true, res='min') {
  let r = res === 'min' ? Number(min) : Number(max)
  if (isBigger) {
		if (max > min) {
			return Promise.resolve(r)
		}
	} else {
		if (max >= min) {
			return Promise.resolve(r)
		}
	}
	return Promise.reject();
}

const linkageVerifiy = (itemRef) => {
  itemRef.onFieldBlur()
}

export default{
  isInRange,
  compareSize,
  validate,
  linkageVerifiy
}