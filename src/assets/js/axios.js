import axios from 'axios'
// import NProgress from 'nprogress'
// import Promise from 'bluebird';
// // import {message} from 'antd';

// window.Promise = Promise;
// Promise.config({
//     longStackTraces: true,
//     warnings: false // note, run node with --trace-warnings to see full stack traces for warnings
// });

// 默认服务地址，数组类型
// axios.defaults.baseURI = defUrl[0];
// 请求头参考
// https://www.jianshu.com/p/c81ec1a547ad
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // Form Data 模式
// axios.defaults.headers.post['Content-Type'] = 'application/json'; // Request Payload 模式
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'; // Form Data 文件流模式(与x-www-form-urlencoded相似)
axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("sessionId");

/**
 * lw get统一请求
 * @param url 地址 例如：'/api/getList?page=1&index=1' Query String Parameters 模式，参数可使用qs将json转换成"page=1&index=1"格式
 * @param name 地址名称
 * @param config 配置
 */
const get = (url, name = 'defUrl', config) => {
  let getUrl = window[name] + url;
  return new Promise((resolve, reject) => {
    // NProgress.start();
    // NProgress.set(0.5);
    // NProgress.inc();

    axios.get(getUrl).then(res => {
      // NProgress.done();
      resolve(res.data);
    }).catch(function (error) {
      // NProgress.done();
      if (error.response) {
        switch (error.response.status) {
          case 500:
            // message.error(error.response.data.error);
            break;
          case 401:
            // message.warn('用户信息失效！请先登录');
            break;
          default:
            // message.warn('连接错误！');
            break;
        }
      } else {
        // message.warn('连接超时！');
      }
      reject()
    });
  })
}

/**
 * lw post 统一请求
 * @param url 地址 例如：'/api/getList'
 * @param parms 支持 Query String Parameters、Form Data、Request Payload
 * @param name 地址名称
 * @param config 配置
 */
const post = (url, parms, name = 'defUrl', config) => {
  console.log(parms);
  !name && (name = 'defUrl');
  let postUrl = window[name] + url;
  return new Promise((resolve, reject) => {
    // NProgress.start();
    // NProgress.set(0.5);
    // NProgress.inc();
    axios.post(postUrl, parms).then(res => {
      // NProgress.done();
      resolve(res.data);
    }).catch(function (error) {
      // NProgress.done();
      if (error.response) {
        switch (error.response.status) {
          case 500:
            // message.error(error.response.data.error);
            break;
          case 401:
            // message.warn('用户信息失效！请先登录');
            break;
          default:
            // message.warn('连接错误！');
            break;
        }
      } else {
        // message.warn('连接超时！');
      }
      reject()
    });
  })
}


function setAuthorization(token) {
  axios.defaults.headers.common['Authorization'] = token;
}

function setPostContentType(contentType) {
  axios.defaults.headers.post['Content-Type'] = contentType;
}

export default {
  get,
  post,
  setAuthorization,
  setPostContentType
}
