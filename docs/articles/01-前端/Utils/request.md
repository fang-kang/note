# request

## request 请求封装 + 避免多次重复请求

request.js

```js
import axios from 'axios'
import ReactDOM from 'react-dom/client'
import { Spin, Modal, notification } from 'antd'
import { Local, cacheKeys } from '@/utils/storage'
import { BASE_URL } from '@/config/url'

// 缓存请求的接口信息
let requestMap = []

/**
 * 检查是不是重复请求
 * @param {Object} config
 */
const checkRepeatRequest = config => {
  const requestInfo = getRequestInfo(config)

  return requestMap.includes(requestInfo)
}

/**
 * 添加请求
 * @param {Object} config
 */
const addRequest = config => {
  if (!config.openPreventRequest) return
  const requestInfo = getRequestInfo(config)
  requestMap.push(requestInfo)
}
/**
 * 移除请求
 * @param {Object} config
 */
const removeRequest = config => {
  if (!config.openPreventRequest) return

  config.data = config.data && JSON.parse(config.data)

  const requestInfo = getRequestInfo(config)
  const data = requestMap.filter(v => v !== requestInfo)
  requestMap = data
}

/**
 * 获取请求信息
 * @param {Object} config
 */

function getRequestInfo(config) {
  return [config.url, config.method, JSON.stringify(config.params), JSON.stringify(config.data)].join('&')
}

function clearRequestMap() {
  console.log('clear')
  requestMap = []
}

let requestCount = 0

// show loading
function showLoading() {
  if (requestCount === 0) {
    const dom = document.createElement('div')
    dom.setAttribute('id', 'loading')
    document.body.appendChild(dom)
    const root = ReactDOM.createRoot(dom)
    root.render(<Spin tip="Loading..." size="large" />)
  }
  requestCount++
}

// hide loading
function hideLoading() {
  requestCount--
  if (requestCount === 0) {
    document.body.removeChild(document.getElementById('loading'))
  }
}

function paramsToQueryString(params = {}) {
  const queryString = Object.keys(params)
    .map(key => `${key}=${params[key] ?? ''}`)
    .join('&')

  return '?' + queryString
}

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  timeout: 300 * 1000,
})

function request(options) {
  if (Object.keys(options.params || {}).length > 0) {
    options.url = options.url + paramsToQueryString(options.params || {})
    options.params = {}
  }

  if (options.openPreventRequest) {
    if (checkRepeatRequest(options)) {
      console.log('===cancelRequest===')
      return Promise.reject('cancelRequest')
    } else {
      addRequest(options)
    }
  }

  return new Promise((resolve, reject) => {
    instance
      .request({
        method: options.method,
        url: options.url,
        ...options,
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const requestHandler = async config => {
  const token = Local.get(cacheKeys.Token)
  config.headers.token = token

  showLoading()

  return config
}

const responseHandler = response => {
  removeRequest(response.config)

  const { code } = response.data

  if (code === 401) {
    Modal.confirm({
      title: '注意',
      content: '您的登录状态已过期,是否重新登录?',
      maskClosable: false,

      onOk: () => {
        /**
         * 这里处理清空用户信息和token的逻辑，后续扩展
         */
        history.replace('/login')
      },
    })
  }

  hideLoading()

  return response?.data
}

const errorHandler = error => {
  if (error?.config) {
    removeRequest(error.config)
  }
  if (error.response) {
    const { data, status, statusText } = error.response

    if (status === 401) {
      notification.error({
        message: '401',
        description: data?.msg || statusText,
        duration: 3,
      })
      /**
       * 这里处理清空用户信息和token的逻辑，后续扩展
       */
      deleteUserInfoAndToken()
      history.replace('/login')
    } else if (status === 403) {
      notification.error({
        message: '403',
        description: data?.msg || statusText,
        duration: 3,
      })
    } else if (status === 500) {
      notification.error({
        message: '500',
        description: data?.msg || statusText,
        duration: 3,
      })
    } else {
      notification.error({
        message: '服务错误',
        description: data?.msg || statusText,
        duration: 3,
      })
    }
  }

  return Promise.reject(error)
}

instance.interceptors.request.use(requestHandler, error => Promise.reject(error))

instance.interceptors.response.use(responseHandler, errorHandler)

/**
 *
 * @param {string} url
 * @param {object} params ?customerName=Vallarta&username=admin&password=admin
 * @param {object} config
 * @returns
 */
const get = (url, params = {}, config = {}) => {
  return request({
    url,
    params,
    method: 'get',
    openPreventRequest: true,
    ...config,
  })
}

/**
 *
 * @param {string} url
 * @param {object} data corresponding backend RequestBody
 * @param {object} params ?customerName=Vallarta&username=admin&password=admin
 * @param {object} config
 * @returns
 */
const post = (url, data = {}, params = {}, config = {}) => {
  return request({
    url,
    data,
    params,
    method: 'post',
    openPreventRequest: true,
    ...config,
  })
}

/**
 *
 * @param {string} url
 * @param {string|number} params /api/item/info/{itemId}
 * @param {object} config
 * @returns
 */
const postId = (url, params = '', config = {}) => {
  url += '/' + params
  params = {}
  return request({
    url,
    params,
    method: 'post',
    openPreventRequest: true,
    ...config,
  })
}

/**
 *
 * @param {string} url
 * @param {object} params ?customerName=Vallarta&username=admin&password=admin
 * @param {object} config
 * @returns
 */
const postForm = (url, params = {}, config = {}) => {
  return request({
    url,
    params,
    method: 'post',
    form: true,
    openPreventRequest: true,
    ...config,
  })
}

/**
 *
 * @param {string} url
 * @param {object} data corresponding backend RequestBody
 * @param {object} params ?customerName=Vallarta&username=admin&password=admin
 * @param {object} config
 * @returns
 */
const download = (url, data = {}, params = {}, config = {}) => {
  return request({
    url,
    data,
    params,
    method: 'post',
    responseType: 'blob',
    openPreventRequest: true,
    ...config,
  })
}

export { get, post, postId, postForm, download }
```
