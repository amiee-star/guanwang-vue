import QS from "qs";
import commCount from "./comm_const";
import store from "@/store";
import API from "../config/api";

Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

var utils = {};
var transfer = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }

  return fmt;
};

// Date对象Transfer对象，将时间戳转换成日期对象
Date.CustomerDateFormat = function(timeSpan, fmt, formatDateNullValue) {
  if (!timeSpan) {
    if (formatDateNullValue) {
      return formatDateNullValue;
    }

    return "无";
  }

  var date = new Date(timeSpan);

  return transfer.call(date, fmt);
};

function setTp(typ) {
  return function(obj) {
    return Object.prototype.toString.call(obj) === "[object " + typ + "]";
  };
}
utils.isArray = setTp("Array");
utils.isFunction = setTp("Function");
utils.isObject = setTp("Object");
utils.isString = setTp("String");
utils.isNumber = setTp("Number");

//kefu
utils.showKf = function() {
  var leftVal = (screen.width - 800) / 2;
  var topVal = (screen.height - 600) / 2;
  window.open(
    "https://tb.53kf.com/code/client/10176396/7",
    "_blank",
    "width=800,height=600,toolbars=yes,resizable=yes,scrollbars=yes,left=" +
    leftVal +
    ",top=" +
    topVal
  );
  return false;
};

//格式化时间
utils.commonDateFormat = function(datetime,fmt) {  
   if(!datetime){
   return "-"; 
   } 
   if (parseInt(datetime)==datetime) {
     if (datetime.length==10) {
       datetime=parseInt(datetime)*1000;//时间戳为10位需*1000，时间戳为13位的话不需乘1000
     } else if(datetime.length==13) {
       datetime=parseInt(datetime);
     }
   }
   datetime=new Date(datetime);
   var o = {
   "M+" : datetime.getMonth()+1,                 //月份   
   "d+" : datetime.getDate(),                    //日   
   "h+" : datetime.getHours(),                   //小时   
   "m+" : datetime.getMinutes(),                 //分   
   "s+" : datetime.getSeconds(),                 //秒   
   "q+" : Math.floor((datetime.getMonth()+3)/3), //季度    
   "S"  : datetime.getMilliseconds()             //毫秒   
   };   
   if(/(y+)/.test(fmt))   
   fmt=fmt.replace(RegExp.$1, (datetime.getFullYear()+"").substr(4 - RegExp.$1.length));   
   for(var k in o)   
   if(new RegExp("("+ k +")").test(fmt))   
   fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
   return fmt;
}


//获取地址栏参数
utils.getQueryString = function(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
  if (r != null) return unescape(r[2]);
  return null;
};

//校验数据
utils.check = {};

//手机号码
utils.check.mobile = function(data) {
  var reg = /^(13|14|15|16|17|18|19)[0-9]{9}$/;
  return reg.test(data);
};

//Email
utils.check.email = function(data) {
  var reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
  return reg.test(data);
};

//qq
utils.check.qq = function(data) {
  var reg = /^[1-9]([0-9]{5,11})$/;
  return reg.test(data);
};

//数据提交时间
utils.getMsgTime = function(num) {
  var currT = new Date();
  var createT = new Date(num);
  var currNum = currT.getTime();
  var creatNum = createT.getTime();
  var miss = currNum - creatNum;
  miss = miss / 1000 / 60; //以分为单位
  if (miss <= 1) {
    return "1分钟前";
  }

  if (miss < 60) {
    return Math.floor(miss) + "分钟前";
  }

  miss = miss / 60; //以小时为单位
  if (miss < 24) {
    return Math.floor(miss) + "小时前";
  }

  miss = miss / 24; //以天为单位
  if (miss <= 3) {
    return Math.floor(miss) + "天前";
  }
  var currY = currT.getFullYear();
  var cY = createT.getFullYear();
  if (currY == cY) {
    return createT.Format("MM月dd日");
  }
  if (currY > cY) {
    return createT.Format("yyyy年MM月dd日");
  }
  return "1分钟前";
};

utils.formatAudioTime = function(num) {
  if (num <= 0 || !num) {
    return "--";
  }
  var second = Math.floor(num % 60);
  num = num / 60;
  var minute = Math.floor(num);
  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;
  return `${minute}:${second}`;
};

// 添加参数
utils.urlAddParams = function(url, obj) {
  if (!url || !obj) {
    return url;
  }
  let urls = url.split("?");
  let params = QS.parse(urls[1]);
  params = Object.assign(params, obj);
  return urls[0] + "?" + QS.stringify(params);
};

//格式化处理素材的数据
utils.formateMaterial = function(item, objId, nailObj) {
  //为缩量图加上压缩，等其他参数
  if (item.thumbnail && nailObj) {
    item.thumbnail = utils.urlAddParams(item.thumbnail, nailObj);
  }

  item._imgUrls = [];

  let imgBox = JSON.parse(item.extData.info.custom);

  let imgObj = item.extData.info;

  if (imgObj) {
    if (imgObj.btnText) {
      item.btnText = imgObj.btnText;
    }
    if (imgObj.url) {
      item.url = imgObj.url;
    }
    if (imgObj.target) {
      item.target = imgObj.target;
    }
  }

  if (imgBox != null) {
    let imgArr;
    if (imgBox.detail_album) {
      imgArr = imgBox.detail_album;
    }
    if (imgBox.detail_article) {
      let articleObj = imgBox.detail_article;
      if (articleObj) {
        item.articleId = articleObj.id;
      }
    }

    if (imgBox.btnColor) {
      item.btnColor = imgBox.btnColor;
    }
    console.log(234);
    console.log(imgBox.detail_audio);

    if (imgBox.detail_audio) {
      item.musicUrl = imgBox.detail_audio.musicFile;
    }

    console.log(imgBox);
    (imgArr || []).map((v) => {
      item._imgUrls.push(v);
    });
  }

  //封面
  let thumbImg = {
    fileType: item.fileType,
    picPathCompre: item.thumbnail,
    src: item.thumbnail,
  };
  if (item.fileType == 3) {
    //video
    thumbImg.picPathCompre = item.videoThumb;
  } else {
    thumbImg.picPathCompre = item.thumbnail;
  }

  item._imgUrls.unshift(thumbImg);

  if (!item.headimgurl) {
    item.headimgurl = require("@/assets/images/self/avatar.png");
  }
  item.objId = objId;
  item.username = item.username || "匿名用户";
  item.description = item.description || "";
  item._thumbnail = "";

  if (item.pictures) {
    let obj = {
      "x-oss-process": "image/resize,w_512",
      width: "512",
    };
    for (var i = 0; i < item.pictures.length; i++) {
      item.pictures[i].url = utils.urlAddParams(item.pictures[i].url, obj);
    }
  }

  /* if (item.picks) {
        let obj = {
            "x-oss-process": "image/resize,w_512",
            "width": "512"
        }
        for (var i = 0; i < item.picks.length; i++) {
            item.picks[i] = utils.urlAddParams(item.picks[i], obj);
        }
    } */
  return item;
};

//格式化处理展厅的数据
utils.formatItem = function(item, nailObj) {
  nailObj = nailObj || {
    width: 512
  }; //这是缩略图的参数处理

  if (nailObj.width) {
    nailObj["x-oss-process"] = `image/resize,w_${nailObj.width}`; // 兼任 阿里云的压缩
  }

  nailObj["t"] = new Date().getTime();

  // nailObj.t = item.publishTs;
  item._imgUrls = item.images;
  //为缩量图加上压缩，等其他参数
  if (item.thumb && nailObj) {
    item.thumb = utils.urlAddParams(item.thumb, nailObj);
  }
  if (!item.thumb) {
    item.thumb = require("@/assets/images/self/logo-hui.png");
    item._thumbnail = "thumbnail-w";
  } else {
    item._thumbnail = "";
  }

  if (item.pictures) {
    for (var i = 0; i < item.pictures.length; i++) {
      let obj = {
        "x-oss-process": "image/resize,w_512",
        width: "512",
      };
      item.pictures[i].url = utils.urlAddParams(item.pictures[i].url, obj);
    }
  }

  if (!item._imgUrls) {
    if (item.thumbnail) {
      item._imgUrls = [item.thumbnail];
    } else {
      item._imgUrls = [];
    }
  }

  if (!item.headimgurl) {
    item.headimgurl = require("@/assets/images/self/avatar.png");
  }

  if (!item.qrcodeUrl) {
    item.qrcodeUrl = API.getQRcodeFile + item.tempId;
  }

  item.username = item.username || "匿名用户";
  item.name = item.name || "匿名展厅";
  item.description = item.description || "";

  item.likeCount = item.likeCount || 0;

  item.browserCount = item.browserCount || 0;
  item.shareCount = item.shareCount || 0;
  item.commentCount = item.commentCount || 0;
  item.favoriteCount = item.favoriteCount || 0;

  item.createTs = item.publishTs ?
    utils.getMsgTime(item.publishTs) :
    item.createTs;
  item._date = new Date(item.publishTs).Format("yyyy年MM月dd日");

  if (item.floorNum && item.floorNum > 1) {
    item._floorNum = `（${item.floorNum}层）`;
  } else {
    item._floorNum = "";
  }
  if (item.sz) {
    item._sz = `${parseInt(item.sz)}㎡`;
  } else {
    item._sz = "";
  }

  // 购买相关
  // 价格为0，折扣为0或不设置是免费
  // 折扣为 10 是原价
  // 限不限时根据限时字段来判断

  // 是否是限时,

  let overDate = false;
  let currT = new Date();
  if (item.duration) {
    let endT = new Date();
    endT.setDate(endT.getDate() + item.duration);
    item._duration = `${currT.Format("yyyy-MM-dd")} 至 ${endT.Format(
      "yyyy-MM-dd"
    )}，`;
  } else {
    item._duration = "";
  }
  if (item.discountStartTs && item.discountEndTs) {
    let curr = currT.getTime();
    if (item.discountStartTs <= curr && curr < item.discountEndTs) {
      item._discountTime = `${new Date(item.discountStartTs).Format(
        "yyyy-MM-dd"
      )} 至 ${new Date(item.discountEndTs).Format("yyyy-MM-dd")}`;
    } else {
      // 限时打折结束
      item._discountTime = "";
      overDate = true;
    }
  } else {
    item._discountTime = "";
  }
  item.price = item.price || 0;
  if (!item.price || item.discount === 0) {
    // 免费，或者限时免费
    if (item._discountTime) {
      // 是限时免费
      item._priceState = commCount.PRICE.freeLimit;
    } else {
      // 完全免费
      item._priceState = commCount.PRICE.free;
    }
    item._price = 0;
  } else {
    if (item.discount === 1 || !item.discount || overDate) {
      // 折扣 没有设置，或者设置为 1
      // 原价
      // 限时折扣未开始或者已到期
      item._priceState = commCount.PRICE.original;
      item.discount = 1;
      item._price = item.price;
    } else {
      item._price = (item.discount * item.price).toFixed(2);
      if (item._discountTime) {
        // 限时折扣
        item._priceState = commCount.PRICE.discountLimit;
      } else {
        // 不限时折扣
        item._priceState = commCount.PRICE.discount;
      }
    }
  }
  item._discount = (item.discount * 10).toFixed(1);
  if (
    item.publish == commCount.PUBLISH.revise &&
    item.check == commCount.CHECK.checkfail
  ) {
    item.check = commCount.CHECK.notcheck;
  }
  return item;
};

//格式化展厅的数据结构
utils.formatList = function(arr, nailObj) {
  arr = arr || [];
  for (var i = 0, len = arr.length; i < len; i++) {
    var item = arr[i];
    utils.formatItem(item, nailObj);
  }
  return arr;
};

//用户信息处理
utils.formatUser = function(user) {
  if (!user.avatar) {
    user.avatar = require("@/assets/images/self/avatar.png");
  } else {
    let time = new Date().getTime();
    user.avatar += "?v=" + time;
  }
  user.signature = user.signature || "这家伙很懒，什么都没留下~";

  if (user.phone) {
    user._phone = user.phone.substring(0, 3) + "****" + user.phone.slice(-4);
  } else {
    user._phone = "";
  }

  return user;
};

// 获取浏览模式的链接

utils.getArtViewUrl = function(params, host) {
  host = host || window.artHost;
  let url = `${location.protocol +
    process.env.VUE_APP_pdfHost}/sceneFront/index.html`;
  if (params) {
    return `${url}?${QS.stringify(params)}`;
  } else {
    return url;
  }
};
// 获取预览模式的链接

utils.getArtPreviewUrl = function(params, host) {
  host = host || window.artHost;
  let url = `${location.protocol +
    process.env.VUE_APP_ViewURL}sceneFront/index.html`;
  if (params) {
    return `${url}?${QS.stringify(params)}`;
  } else {
    return url;
  }
};

// 获取展厅的编辑模式的链接

utils.getArtEditorUrl = async function(params, host) {
  await store.dispatch("getUserInfo", {
    token: store.state.userinfo.token
  });
  host = host || window.artHost;
  return `${process.env.VUE_APP_EditorURL}?${QS.stringify(params)}`;
};

//获取用户信息
utils.getUserToken = function() {
  return utils.store.getCookie("usertoken");
};
//设置用户信息
utils.setUserToken = function(value) {
  utils.store.setCookie("usertoken", value, 1);
};

//清除用户信息
utils.clearUserToken = function() {
  utils.store.removeCookie("usertoken");
};

//添加展厅浏览的历史记录
utils.addSceneHistory = function(tempid) {
  var t = Date.now();
  var obj = utils.getSceneHistory() || {};
  obj[tempid] = t;
  utils.store.setLocalstorage("scenehistory", obj);
};
//获取展厅浏览的历史记录
utils.getSceneHistory = function() {
  return utils.store.getLocalstorage("scenehistory", {});
};

//清除展厅浏览的历史记录
utils.removeSceneHistory = function() {
  utils.store.removeLocalstorage("scenehistory");
};

utils.load = {
  img(file, attrs) {
    // attrs  crossOrigin=anonymous
    let img = new Image();
    attrs = attrs || {};
    for (let i in attrs) {
      img[i] = attrs[i];
    }
    if (typeof file === "string") {
      img.src = file;
    } else {
      img.src = URL.createObjectURL(file);
    }

    return new Promise((resolve, reject) => {
      img.onload = function() {
        resolve(img);
      };
      img.onerror = reject;
    });
  },
  video(file, attrs) {
    // autoplay = true
    let video = document.createElement("video");
    attrs = attrs || {};
    for (let i in attrs) {
      video[i] = attrs[i];
    }

    video.src = URL.createObjectURL(file);
    return new Promise((resolve, reject) => {
      video.oncanplay = function() {
        resolve(video);
      };
      video.onload = function() {
        resolve(video);
      };
      video.onerror = reject;
    });
  },
};

utils.store = {
  // 存储 cookie
  setCookie(name, value, iDay, path) {
    path = path || "/";
    var oDate = new Date();
    iDay = iDay || 0;
    oDate.setDate(oDate.getDate() + iDay);
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    // document.cookie = name + '=' + value + ';expires=' + oDate + "; path="+path;
    document.cookie = `${name}=${value};expires=${oDate.toGMTString()}; path=${path}`;
  },
  // 获取 cookie
  getCookie(name) {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split("=");
      if (arr2[0] === name) {
        try {
          return JSON.parse(arr2[1]);
        } catch (e) {
          return arr2[1];
        }
      }
    }
    return "";
  },

  // 删除 cookie
  removeCookie(name) {
    this.setCookie(name, "", -1);
    this.setCookie(name, "", -1, "/scene-portal");
  },

  // https://github.com/ustbhuangyi/storage

  // 存储 localstorage
  // localStorage.key="value"
  // localStorage.setItem(key, value)
  setLocalstorage(key = "__test__", value) {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    if (window.localStorage) {
      return window.localStorage.setItem(key, value);
    }
    return false;
  },

  // 获取 localstorage
  // localStorage.key
  getLocalstorage(key = "__test__", def = "") {
    if (window.localStorage && localStorage.key) {
      var data = window.localStorage.getItem(key);
      if (data) {
        try {
          return JSON.parse(data);
        } catch (e) {
          return data;
        }
      } else {
        return def;
      }
    } else {
      return def;
    }
  },
  // 删除单个数据 localstorage
  // localStorage.removeItem("key");
  removeLocalstorage(key = "__test__") {
    if (window.localStorage) {
      window.localStorage.removeItem(key);
    }
  },

  // 删除所有数据 localstorage
  clearLocalstorage() {
    return window.localStorage.clear();
  },
};

utils.arr = {
  // 数组去重
  removeRepeat(arr) {
    return Array.from(new Set(arr));
  },
};

utils.drawImg = {
  chooseVideo(videoElement) {
    return new Promise((resolve, reject) => {
      let canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        function(blob) {
          let url = URL.createObjectURL(blob);
          if (url) {
            resolve(url);
          } else {
            reject("error");
          }
        },
        "image/jpeg",
        0.95
      );
    });
  },
};
utils.joinHttp = (val) => {
  if (val.includes(process.env.VUE_APP_pdfHost)) {
    return val
  } else {
    return `${process.env.VUE_APP_pdfHost}${val}`
  }
}

utils.DownloadFile = (response, name, type) => {
  const blob = new Blob([response], {
    type: type
  })
  const href = window.URL.createObjectURL(blob) // 创建下载的链接
  const time = new Date().toLocaleDateString()
  const aEle = document.createElement("a") // 创建a标签
  aEle.href = href
  aEle.download = time + name // 下载后文件名
  document.body.appendChild(aEle)
  aEle.click() // 点击下载
  document.body.removeChild(aEle) // 下载完成移除元素
  window.URL.revokeObjectURL(href) // 释放掉blob对象
}
export default utils;
