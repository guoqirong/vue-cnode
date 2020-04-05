import axios from 'axios'

const httpRequest = axios.create({
  timeout: 1000 * 60,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

httpRequest.defaults.withCredentials = false

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
httpRequest.adornUrl = (actionName) => {
  // 非生产环境, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (process.env.NODE_ENV !== 'production' ? '/proxyApi' : window.SITE_CONFIG.baseUrl) + actionName
}

/**
 * 响应拦截
 */
httpRequest.interceptors.response.use(response => {
  if (response && response.status === 403) { // 403, token失效
    console.error('登录失败')
  } else if (response && response.status !== 200) { // 403, token失效
    console.error('请求失败')
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default httpRequest