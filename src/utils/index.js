
/**
 * 日期格式化 gqr
 * @param {*} dateStr
 * @param {*} fmt
 */
export function formatDate (dateStr, fmt) {
  let date = new Date(dateStr)
  if (!date.getFullYear()) {
    console.error('时间格式错误！')
    return ''
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

// 补零函数
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}