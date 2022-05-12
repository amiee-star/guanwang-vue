var utils = {};
if(!Date.prototype.Format ){
    Date.prototype.Format = function (fmt) { //author: meizz 
        var o = {
          "M+": this.getMonth() + 1, //月份 
          "d+": this.getDate(), //日 
          "h+": this.getHours(), //小时 
          "m+": this.getMinutes(), //分 
          "s+": this.getSeconds(), //秒 
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
          "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }
}



//数据提交时间
utils.getMsgTime = function (num) {
    var currT = new Date();
    var createT = new Date(num);
    var currNum = currT.getTime();
    var creatNum = createT.getTime();
    var miss = currNum - creatNum;
    miss = miss / 1000 / 60; //以分为单位
    if (miss <= 1) {
      return "刚刚";
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
      return createT.Format("MM-dd");
    }
  
    if (currY > cY) {
      return createT.Format("yyyy-MM-dd");
    }
    return "刚刚";
  }

utils.formatItem = function(item){
    var obj = Object.assign({}, item.attributes);
    obj.id = item.id;
    obj.cid = item.cid;
    var d = item.get('createdAt');
    var t = new Date();
    obj.createAt = d;
    obj._createAt = utils.getMsgTime(d);
    obj.updatedAt = d;
    return obj;
}


export default utils;