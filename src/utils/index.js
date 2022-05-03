import { prefix  } from "../router"

/**
 * 日期格式化 gqr
 * @param {*} dateStr
 * @param {*} fmt
 */
export function formatDate (dateStr, fmt) {
  let date = new Date(dateStr)
  if (dateStr !== '' && !date.getFullYear()) {
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

/**
 * 处理qiankun子模块非根目录部署路由问题
 * @param params 路由参数
 */
export const routerPush = (route, router, params) => {
  if (route.path === params || route.path === params.path) return;
  // 解构路由路径
  const { path } = typeof params === 'string'
    ? { path: undefined, }
    : { path: undefined, ...params };
  // 为 path 加上主应用前缀 prefix
  const routerParms = typeof params === 'string' ? prefix + params : {
    ...params,
    ...(path ? { path: prefix + path } : {})
  };
  router.push(routerParms);
};