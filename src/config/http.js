import axios from "axios";
import { Message, Loading } from "element-ui";
import QS from "qs";
import Ruler from "@/config/plugin/index";
import store from "@/store";

function showLogin() {
  Ruler.confirm({ msg: "登录信息过期，是否重新登录？", desc: "" })
    .then((res) => {
      if (res == "ok") {
        store.commit("setUserInfo", "");
        Ruler.account({
          options: {
            operate: 0,
          },
        });
      }
    })
    .catch(() => {});
}

var base = process.env.VUE_APP_artHost;
// 创建axios实例
const axiosInstance = axios.create({
  baseURL: base,
  // headers:{
  //   "content-Type":"application/x-www-form-urlencoded"
  // }
  headers: {
    "content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    //loadFn.showLoad();

    if (!config.headers.JmAccessToken && !config.headers.Authorization) {
      config.headers.JmAccessToken = store.state.token
        ? store.state.token.token
        : "";
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// respone拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data) {
      //避免闪屏
      //loadFn.hideLoad(500);
      if (response.data.code == 200 || response.data.code == 0 || response.data.Code == 0) {
        return Promise.resolve(response.data.data || response.data.FilerPath);
      } else if (response.data.code == -1000) {
        store.commit("setUserInfo", "");
        if (!response.config.params || !response.config.params._quiet) {
          showLogin(); //出现提示登录
        }
        return Promise.reject(response.data);
      } else if (response.data.code == -6012) {
        return Promise.reject(response.data);
      } else if (response.data.code == -6013) {
        return Promise.reject(response.data);
      } else if (response.data.code === 40004) {
        return Promise.reject(response.data);
      } else if (response.data.code === 40005) {
        return Promise.reject(response.data);
      }else if (response.data.code === -6014) {
        return Promise.reject(response.data);
      } else {
        if (response.data.constructor == ArrayBuffer) {
          return Promise.resolve(response.data);
        } else {
          var msg = response.data.msg || response.data.message || "服务器错误";
          Message.error(msg);
          return Promise.reject({ code: 500, msg: msg, step: 1 });
        }
      }
    } else {
      Message.error("服务器错误");
      return Promise.reject({ code: 500, msg: "服务器错误", step: 2 });
    }
  },
  (error) => {
    if (error.code !== "ECONNABORTED") {
      Message.error(error.message || "网络错误");
      return Promise.reject(error);
    }
  }
);

function paramsToFormData(params) {
  params = params || {};
  let p;
  if (params.constructor !== FormData) {
    p = new FormData();
    for (let i in params) {
      p.append(i, params[i]);
    }
  } else {
    p = params;
  }
  return p;
}

// 计算剩余容量
function capacityCalc(params) {
  try {
    if (params.has("_capcity") && params.has("file")) {
      // 容量计算, _capcity: -1 表示容量要减少， 1 表示容量增加
      let size = params.get("file").size || 0;
      size = size * parseInt(params.get("_capcity"));
      store.commit("setUserInfoKeyVal", {
        k: "useSpace",
        v: store.state.userinfo.useSpace + size,
      });
      params.delete("_capcity");
    }
  } catch (e) {
    console.error(e);
  }
}

// 校验容量是否足够
function capacityCheck(params) {
  if (params.has("_capcity") && params.has("file")) {
    // 容量计算, _capcity: -1 表示容量要减少， 1 表示容量增加
    let size = params.get("file").size || 0;
    size =
      store.state.userinfo.useSpace + size * parseInt(params.get("_capcity"));
    if (store.state.userinfo.totalSpace < size) {
      let mis =
        (store.state.userinfo.totalSpace - store.state.userinfo.useSpace) /
        1024 /
        1024;
      let msg = `空间不足，剩余空间： ${Math.floor(mis)}M`;
      Message.error(msg);
      return Promise.reject({
        code: 500,
        msg: msg,
      });
    }
  }
}

export default {
  get: function(url, params) {
    return axiosInstance.get(url, { params });
  },
  post: function(url, params, flag = false) {
    params = params || {};
    params = !flag ? QS.stringify(params) : params;
    return axiosInstance.post(url, params);
  },
  put: function(url, params) {
    return axiosInstance.put(url, params);
  },
  delete: function(url, params) {
    return axiosInstance.delete(url, params);
  },
  postByBody: function(url, data) {
    return axiosInstance({
      url,
      data,
      method: "POST",
    });
  },
  postBlob: function(url, data) {
    return axiosInstance({
      url,
      data,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      responseType: "arraybuffer"
    });
  },
  // 新增patch请求
  patch: function(url, data) {
    return axiosInstance({
      url,
      data,
      method: "PATCH",
      headers: {
        "Content-Type": " application/json",
      },
    });
  },
  needLogin: {
    //需要登录的接口，参数必须是带上token
    get: function(url, params) {
      params = params || {};
      // let token = store.state.userinfo ? store.state.userinfo.token : "";
      // if (!token) {
      //   showLogin(); //出现提示登录
      //   return Promise.reject({
      //     msg: "需要登录",
      //     code: 1003,
      //     url: url,
      //     params: params,
      //   });
      // }
      return axiosInstance.get(url, { params });
    },
    delete: function(url, params) {
      return axiosInstance.delete(url, params);
    },
    put: function(url, params) {
      return axiosInstance.put(url, params);
    },
    post: function(url, params, flag = false, config) {
      // console.log(params, "needLogin post");
      params = params || {};
      // let token = store.state.userinfo ? store.state.userinfo.token : "";
      // if (!token) {
      //   showLogin(); //出现提示登录
      //   return Promise.reject({
      //     msg: "需要登录",
      //     code: 1003,
      //     url: url,
      //     params: params,
      //   });
      // }
      params = !flag ? QS.stringify(params) : params;
      return axiosInstance.post(url, params, config);
    },

    patch: function(url, params) {
      params = params || {};
      // let token = store.state.userinfo ? store.state.userinfo.token : "";
      // if (!token) {
      //   showLogin(); //出现提示登录
      //   return Promise.reject({
      //     msg: "需要登录",
      //     code: 1003,
      //     url: url,
      //     params: params,
      //   });
      // }
      // return axiosInstance.patch(url, QS.stringify(params));
      return axiosInstance.patch(url, params);
    },
    async fromData(url, params, config) {
      params = paramsToFormData(params);
      // let token = store.state.userinfo ? store.state.userinfo.token : "";
      // if (!token) {
      //   showLogin(); //出现提示登录
      //   return Promise.reject({
      //     msg: "需要登录",
      //     code: 1003,
      //     url: url,
      //     params: params,
      //   });
      // }
      // await capacityCheck(params);
      let res = await axiosInstance.post(url, params, config);
      // capacityCalc(params);
      return Promise.resolve(res);
    },
  },
  async fromData(url, params, config) {
    params = paramsToFormData(params);
    // await capacityCheck(params);
    let res = await axiosInstance.post(url, params, config);
    // capacityCalc(params);
    return Promise.resolve(res);
  },
};
