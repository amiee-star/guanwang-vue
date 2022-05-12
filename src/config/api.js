import http from "./http";

var API = {};

// API.wxLoginUrl = "/v1/api/wechat/show/login";
API.getQRcodeFile = "/v1/api/template/getQRcodeFile?tempid=";
//图形验证码
API.getCodeImg = "/v1/api/index/verify/code";
API.wxLogin = () => {
  return http.get("/v1/api/wechat/show/login")
}
API.modesToken = () => {
  return http.get("/v1/m/scene/models/access_token")
}
API.logout = () => {
  return http.get("/v1/api/index/logout")
}
// API.isWxBind = "/v1/api/account/detail";
/* ------------ 首页相关的接口  start ------------- */
// 首页(焦点图+解决方案)
API.homeIndex = (params) => {
  // return http.get("/scene-portal/home/index", params);
  // v1/api/index/news
  return http.get("/v1/api/index/", params);
};
//展厅定制需求提交
API.submitForms = (params) => {
  return http.postByBody("/v1/api/index/forms", params);
};
//首页精品案例
API.homeBoutique = (params) => {
  return http.get("/v1/api/index/recom/boutique", params);
};

//免费建展banner
API.getHallBanner = (params) => {
  return http.get("/v1/api/index/free/scene/banners", params);
};

//精品案例banner
API.getCaseBanner = (params) => {
  return http.get("/v1/api/index/classic/case/banners", params);
};

// 媒体列表 type  1：媒体资讯，2：帮助文档，3：文章
API.mediaList = (params) => {
  return http.get("/v1/m/scene/news/newsList", params);
};
// 媒体详情
API.mediaInfo = (params) => {
  return http.get("/v1/m/scene/news/info", params);
};
// 获取定制类型数据
API.getCustomTypes = (params) => {
  return http.get("/v1/api/index/form/customs/type", params);
};
// 获取展台面积数据
API.getAreas = (params) => {
  return http.get("/v1/api/index/areas", params);
};
// 获得累计定制展厅数量
API.getHallCount = (params) => {
  return http.get("/v1/api/index/statistics/scenes", params);
};
// 提交展厅定制信息
// /v1/api/index/
API.handleHallInfo = (params) => {
  return http.postByBody("/v1/api/index/form/customs", params);
};
/* ------------ 首页相关接口  end ------------- */

/* ------------ 展厅相关接口 start ------------- */
//获取展厅列表，type 0：获取全部，1：获取精选展厅
API.getSceneList = (params) => {
  // return http.get("/scene-portal/xcx/getPCSceneList", params);
  return http.get("/v1/api/index/getCasePageList", params);
};

//获取展厅筛选数据
// API.getTypeList = ()=>{
//     return http.get("/v1/api/index/getTypeList")
// }

//获取展厅分类
API.getTypeList = () => {
  return http.get("/v1/api/index/getTypeList");
};

//获取展厅面积
API.getAreaType = () => {
  return http.get("/v1/api/index/getAreaType");
};
//获取精品案例行业
API.getStyleList = () => {
  // return http.get("/v1/api/index/getStyleList");
  return http.get("/v1/api/index/getCaseStyleList");
};
//获取精品案例类型
API.getMoldList = () => {
  // return http.get("/v1/api/index/getStyleList");
  return http.get("/v1/api/index/getCaseTypeList");
};

//获取展厅的详情
API.getSceneInfo = (params) => {
  // return http.get("/v1/api/index/getCaseDetails");
  return http.get(`/v1/api/index/getCaseDetails/${params}`);
};
// /scene-portal/674757b7-e678-f6db-e077-456e9bce03bf/api/info?tempid=674757b7-e678-f6db-e077-456e9bce03bf
API.getHallInfo = (params) => {
  return http.get(`/v1/m/template/edit/${params}/detail`);
};


// 素材编辑的信息
API.getEditInfo = (params)=>{
  return http.get(`/v1/m/scene/picture/getEditInfo/${params}`)
}

//获取展厅的素材详情
API.getObjInfo = (params) => {
  return http.get("/scene-portal/xcx/scene/objInfo", params);
};
// 展厅模板参数
API.getTemplateOne = (params) => {
  return http.get("/scene-portal/xcx/getTemplateOne", params);
};

//自己的展厅列表
API.getMyscenes = (params) => {
  return http.needLogin.get("/v1/api/template/getMyscenes", params);
};
//删除展厅
API.sceneDelete = (params) => {
  console.log(params);
  return http.needLogin.get("/v1/api/template/scene/delete", params);
};

//展厅分类 (分类顺序：按排序值升序)
API.getSceneType = (params) => {
  return http.get("/v1/m/sceneType/getValidList", params);
};

// 展厅的信息编辑
API.sceneSave = (params) => {
  return http.needLogin.fromData("/v1/m/template/edit/saveTempBase", params);
};

// 展厅模板-官网
API.getTemplate = (params) => {
  return http.get("/v1/api/index/getFreePageList", params);
};

// 创建展厅
API.getCopyTempid = (params) => {
  return http.needLogin.get(`/v1/api/template/addFreeTemp/${params}`, params);
};
// 创建展厅
API.myCreat = (params) => {
  return http.needLogin.get(`/v1/api/template/addInfo`, params);
};
// 自动建展
API.autoCreate = (params) => {
  return http.needLogin.post("/scene-portal/api/quick/scene/save", params);
};

//获取他人的展厅列表  /xcx/getOherscenes
API.getOherscenes = (params) => {
  return http.get("/v1/api/index/getOherscenes", params);
};
//获取他人展厅动态数量 收藏数量

API.getOtherUserCount = (params) => {
  return http.get("/v1/api/index/getOtherUserCount", params);
};
//展厅收藏
API.favorite = (params) => {
  return http.needLogin.fromData("/v1/api/template/scene/favorite", params);
};
// 取消展厅收藏
API.unfavorite = (params) => {
  return http.needLogin.fromData("/v1/api/template/scene/unfavorite", params);
};

//展厅点赞--喜欢
API.like = (params) => {
  return http.needLogin.post("/scene-portal/xcx/scene/like", params);
};

//官网浏览历史浏览展厅id
API.history = (params) => {
  return http.needLogin.post("/scene-portal/xcx/history", params);
};
//删除历史记录
API.delHistory = (params) => {
  return http.needLogin.fromData("/v1/api/template/scene/delHistory", params);
};

//展厅的更新评论总数
API.updateCommentCount = (params) => {
  return http.get("/v1/api/index/updateCommentCount", params);
};
//素材的
API.updateObjComment = (params) => {
  return http.get("/scene-portal/xcx/scene/objComment", params);
};

// 点赞数统计
// API.getLikeCount = (params) => {
//   return http.get(
//       `${process.env.VUE_APP_tongjiHost}/eventInfo/getLikeCount`,
//       params
//   );
// };
/* ------------ 展厅相关接口 end ------------- */

/* ------- 登录、注册、用户信息 相关 start ------ */
//根据openid获取帐号信息
API.wxInfo = (openid) => {
  return http.get(`/v1/api/index/account/${openid}/detail`);
};
//获取他人的用户信息 userId
API.getOtherUserInfo = (params) => {
  return http.get("/v1/api/index/getOherscenes", params);
};
//短信验证码
API.sendCode = (params) => {
  return http.postByBody("/v1/api/index/send/code", params);
};
//验证码验证
API.checkCode = (params) => {
  return http.postByBody("/v1/api/index/validate/code", params);
};
// 修改：原为注册start
//登录
API.registerLogin = (params) => {
  return http.postByBody("/v1/api/index/register", params);
};

// 用户名密码登录 新加接口
API.userPswLogin = (params) => {
  return http.postByBody("/v1/api/index/login", params);
};
// 手机验证码登录 新加接口
API.userPhoneLogin = (params) => {
  return http.postByBody("/v1/api/index/phone/login", params);
};
// 忘记密码时：校验手机号是否注册
API.phoneIsLogin = (params) => {
  return http.get("/v1/api/index/validate/phone/is/register", params);
};

// 获取图形验证码背景图
API.getVerifyImg = (params) => {
  return http.get("/v1/api/index/verify/code/images", params);
};

// 修改 end
//手机号绑定微信并登录
API.bindAndLogin = (params) => {
  return http.postByBody("/v1/api/wechat/bind/telephone", params);
};

//手机号绑定微信
API.bindwx = (params) => {
  return http.post("/v1/api/account/bind/telephone", params);
};
//获取自己的用户信息
API.getUserInfo = (params) => {
  // return http.needLogin.get("/scene-portal/xcx/getUserInfo", params);
  return http.needLogin.get("/v1/api/account/detail", params);
};
//用户信息编辑
API.userInfoEditer = (params) => {
  return http.needLogin.post("/scene-portal/xcx/userInfoEditer", params);
};
//用户信息编辑 - 更换头像
API.editHeadimg = (params) => {
  // return http.needLogin.fromData("/scene-portal/xcx/editHeadimg", params);
  return http.needLogin.fromData("/v1/api/account/old/avatar", params);
};
//用户信息编辑 - 修改昵称
API.editNickname = (params) => {
  //  return http.needLogin.post("/scene-portal/xcx/editNickname",params);
  ///v1/api/account/username
  return http.needLogin.patch("/v1/api/account/nickname", params);
};
// 用户信息编辑 - 修改邮箱
API.editEmail = (params) => {
  // return http.needLogin.post("/scene-portal/xcx/editEmail", params);
  // return http.patch("/v1/api/account/email", params);
  return http.needLogin.patch("/v1/api/account/email", params);
};
//用户信息编辑 - 修改签名
API.editSign = (params) => {
  return http.needLogin.patch("/v1/api/account/signature", params);
  // return http.patch("/v1/api/account/signature", params);
};
// 用户信息编辑 - 解除绑定微信
API.unbindwx = (params) => {
  return http.needLogin.patch("/v1/api/account/unbind/wechat", params);
};
//用户信息编辑 - 绑定微信
API.editBind = (params) => {
  return http.needLogin.patch("/v1/api/account/bind/wechat", params);
};
// 找回/设置密码
API.editPasswordByCode = (params) => {
  //  return http.post(
  //    "/scene-portal/xcx/editPasswordByCode",
  //    params
  //  );
  ///v1/api/index/password/reset
  return http.patch("/v1/api/account/password/reset", params);
};

// 忘记密码
API.forgetPassword = (params) => {
  return http.patch("/v1/api/index/forget/password", params);
};

// 用验证码修改密码
API.changePassword = (params) => {
  return http.patch("/v1/api/account/password/reset", params);
};

// 用新旧密码修改密码
API.changePassword2 = (params) => {
  return http.patch("/v1/api/account/password", params);
};

/* ------------ vr带看配置 相关 start  ------------ */
// 获取主持人列表
API.getCompere = (params) => {
  return http.get("/v1/api/compere", params);
};
// 创建主持人
API.creatCompere = (params) => {
  return http.postByBody("/v1/api/compere", params);
};
//编辑主持人
API.editCompere = (params) => {
  return http.put("/v1/api/compere", params);
};
//删除主持人
API.deleteCompere = (id) => {
  return http.delete(`/v1/api/compere/${id}`);
};
/* ------------ vr带看配置 相关 end  ------------ */


/* ------------ 登录、注册、用户信息 相关 end  ------------ */

/* -------------活动相关 start------------- */
API.getGameInfo = (params) => {
  return http.get("/scene-portal/xcx/game/info", params);
};
API.getRecommend = (params) => {
  return http.get("/scene-portal/xcx/game/recommend", params);
};
/* -------------活动相关 end------------- */

/* -------------素材管理 start ------------- */
// 我的素材
API.getMyMaterial = (params) => {
  return http.needLogin.get("/v1/m/scene/picture/pictureList", params);
};
// 删除素材
API.delMyMaterial = (params) => {
  return http.needLogin.get("/v1/m/scene/picture/deletePicture", params);
};
// 删除素材
API.delModels = (code) => {
  return http.needLogin.delete(`/v1/m/scene/models/${code}`);
};
// 批量删除图片
API.deletePictures = (params) => {
  return http.needLogin.fromData(
      "/v1/m/scene/picture/deleteBatchPicture",
      params
  );
};

//  上传细节图
API.uploadPicks = (params) => {
  return http.needLogin.fromData(
      "/scene-portal/api/v1/picture/uploadPicks",
      params
  );
};

// 获取素材标签，PC端检索条件
API.getPictureTags = (params) => {
  return http.needLogin.get("/v1/m/template/edit/getPictureTags", params);
};

// 上传素材的  图片、视频、pdf
API.imgMaterial = async (data, config) => {
  return http.needLogin.fromData(
      "/v1/m/scene/picture/uploadPicture",
      data,
      config || {}
  );
};
// 素材编辑的  图片、视频
API.editMaterial = (params) => {
  return http.needLogin.fromData("/v1/m/scene/picture/editPicture", params);
};

// 上传素材的  所有gif相关
API.uploadGif = (data, config) => {
  return http.needLogin.fromData(
      "/v1/m/scene/picture/uploadGif",
      data,
      config || {}
  );
};
// 修改素材的 所有gif相关
API.editGif = (data, config) => {
  return http.needLogin.fromData(
      "/v1/m/scene/picture/editGif",
      data,
      config || {}
  );
};

// 上传素材的  所有模型相关
API.uploadModel = (data, config) => {
  return http.needLogin.fromData(
      "/scene-portal/api/v1/picture/uploadModel",
      data,
      config || {}
  );
};
// 上传素材的  51模型相关
API.upload51Model = (data, config) => {
  return http.needLogin.post(
      `${process.env.VUE_APP_UPLOADURL}upload`,
      data,
      true,
      config || {}
  );
};
// 上传模型信息
API.upload51ModelInfo = (data) => {
  return http.needLogin.post(
      "/v1/m/scene/models/upload",
      data,
      true
  );
};

// 修改素材的 所有模型相关
API.editModel = (data, config) => {
  return http.needLogin.fromData("/v1/m/scene/models/", data, config || {});
};
// 音乐分类
API.getMusicType = (params) => {
  return http.needLogin.get("/v1/m/scene/music/getMusicType", params);
};
// 获取音乐 getMusicList
API.getMusicList = (params) => {
  return http.needLogin.get("/scene-portal/xcx/getMusicList", params);
};
//获取推荐音乐
API.publicMusic = (params) => {
  return http.get("/v1/m/scene/music/publicMusic", params);
};
// 上传音乐素材
API.musicUpload = (data, config) => {
  return http.needLogin.fromData(
      "/v1/m/scene/music/uploadMusic",
      data,
      config || {}
  );
};
// 编辑音乐素材
API.musicEdit = (data, config) => {
  return http.needLogin.fromData("/v1/m/scene/music/edit", data);
};
//删除音乐
API.musicDelete = (params) => {
  return http.needLogin.get("/v1/m/scene/music/deleteMusic", params);
};

//批量删除音乐
API.deleteMusics = (params) => {
  return http.needLogin.get("/v1/m/scene/music/deleteMusics", params);
};

// 获取用户音乐
API.musicUserGet = (params) => {
  return http.needLogin.get("/v1/m/scene/music/userMusic", params);
};

//用户上传音乐
API.uploadMusic = (data) => {
  return http.needLogin.fromData("/v1/m/scene/music/uploadMusic", data);
};

// 添加文章
API.saveArticle = (params) => {
  return http.needLogin.fromData("/v1/m/scene/news/addInfo", params);
};
// 编辑文章
API.updArticle = (params) => {
  return http.needLogin.fromData("/v1/m/scene/news/editInfo", params);
};
// 删除文章
API.delArticle = (params) => {
  return http.needLogin.get("/v1/m/scene/news/deleteInfo", params);
};

// 批量删除文章
API.delArticles = (params) => {
  return http.needLogin.get("/v1/m/scene/news/deleteBatch", params);
};
/* -------------素材管理 end------------- */

/* -------------支付相关 start------------- */
// 校验优惠码
API.payCheckCode = (data, config) => {
  return http.post("/scene-portal/pay/checkCode", data);
};
// 支付下单生成二维码
API.payQrCode = (data, config) => {
  return http.needLogin.post("/scene-portal/pay/payQrCode", data);
};

// 支付结果查询
API.payQuery = (data, config) => {
  return http.needLogin.get("/scene-portal/pay/query", data);
};

// 订单记录
API.payLog = (data, config) => {
  return http.needLogin.post("/scene-portal/pay/log", data);
};
/* -------------支付相关 end ------------- */

/* -------------分享相关 start ------------- */
// 获取分享二维码
// API.generateQRCode = `${process.env.VUE_APP_artHost}/scene-portal/generateQRCode?url=`;
API.generateQRCode = `${process.env.VUE_APP_artHost}/v1/api/index/generateQRCode?url=`;
// 分享设置
API.setShare = (data, config) => {
  return http.needLogin.fromData("/v1/api/template/scene/share", data);
};
// 下载海报
API.uploadQRCode = (data, config) => {
  return http.needLogin.fromData("/v1/api/template/uploadQRCode", data, {
    responseType: "arraybuffer",
  });
};
// 发布展厅
API.publish = (id, config) => {
  return http.needLogin.get(`/v1/m/template/edit/${id}/publish`);
};

// 发布之前查询
API.beforePublish = (id, config) => {
  return http.needLogin.get(`/v1/m/template/edit/${id}/publish/before`);
};
// 查询发布状态
API.publishState = (data, config) => {
  return http.needLogin.fromData("/v1/api/template/scene/publishState", data);
};
/* -------------分享相关 end ------------- */

/* -------------其他接口 start------------- */
// 官网留言
API.messageboard = (params) => {
  return http.post("/scene-portal/xcx/messageboard", params);
};

// 敏感词过滤
API.wordFilter = (params) => {
  return http.get("/scene-portal/comment/wordFilter", params);
};

// 上传文件
API.uploadFile = (data, config) => {
  return http.needLogin.fromData("/v1/api/scene/uploadFile", data);
};
/* -------------其他接口 end ------------- */
/* -------------模板相关 start------------- */

// 模板列表
API.getModelList = (data, config) => {
  // return http.needLogin.get("/scene-portal/fscene/getSceneList", data);
  return http.needLogin.get("/v1/api/account/scenes", data);
};
API.deleteScene = (data, config) => {
  return http.needLogin.get("/v1/api/scene/deleteScene", data);
};
//上传
API.sceneCreate = (data, config) => {
  return http.needLogin.fromData("/v1/api/scene/sceneCreate", data);
};
API.editScene = (data, config) => {
  return http.needLogin.fromData("/v1/api/scene/editScene", data);
};
/* -------------模板相关 end------------- */

/* ------------ 展厅统计相关接口 start ------------- */
//添加历史记录
API.addHistory = (params) => {
  return http.needLogin.fromData(`/v1/api/template/scene/addHistory`, params);
};

//访问次数
API.getVisitsNum = (params) => {
  return http.get(`/v1/m/template/tbl/event/getCallData`,params);
  // return http.get(
  //     `${process.env.VUE_APP_tongjiHost}/eventInfo/getCallData`,
  //     params
  // );
};

//收藏量统计
API.getUserCountInfo = (params) => {
  return http.get(`/v1/api/template/getUserCountInfo`, params);
};
//获取展厅访问趋势
API.getTrends = (params) => {
  return http.get(`/v1/m/template/tbl/event/getCallDataBrokenLine`,params);
  // return http.get(
  //     `${process.env.VUE_APP_tongjiHost}/eventInfo/getCallDataBrokenLine`,
  //     params
  // );
};
//获取省级分布
API.getProvincialSpread = (params) => {
  return http.get(`/v1/m/template/tbl/event/getCountProvince`,params);
  // return http.get(
  //     `${process.env.VUE_APP_tongjiHost}/eventInfo/getCountProvince`,
  //     params
  // );
};
// 获取国家分布
API.getCountrySpread = (params) => {
  return http.get(`/v1/m/template/tbl/event/getCountCountry`,params);
  // return http.get(
  //     `${process.env.VUE_APP_tongjiHost}/eventInfo/getCountCountry`,
  //     params
  // );
};
//获取终端分布
API.getTerminalSpread = (params) => {
  return http.get(`/v1/m/template/tbl/event/getCountDevice`,params);
  // return http.get(
  //     `${process.env.VUE_APP_tongjiHost}/eventInfo/getCountDevice`,
  //     params
  // );
};
//获取访客列表
API.getVisitorList = (params) => {
  return http.get(`/v1/m/template/tbl/event/user/getPageList`,params);
  // return http.get(
  //     `${process.env.VUE_APP_tongjiHost}/sceneTemplateUser/getPageList`,
  //     params
  // );
};
//导出访客列表
API.exportVisitorList = (params) => {
  return http.get(`/v1/m/template/tbl/event/user/getPageListExport`,params);
};
//素材统计 - 分页列表
API.getMaterialList = (params) => {
  return http.get(`/v1/m/template/tbl/event/ext/getPageList`,params);
};

//展厅线索 - 分页列表
API.getHallCluesList = (params) => {
  return http.postByBody(`/v1/m/template/tbl/event/visitors`,params);
};

//展厅线索 - 导出
API.exportVisitors = (params) => {
  return http.postBlob(`/v1/m/template/tbl/event/visitors/export`,params);
};

/* ------------ 展厅统计相关接口 end ------------- */

// 我的模型
API.modelsBySize = (params) => {
  return http.get(
      process.env.VUE_APP_APIURL + "model-center-portal/user/modelsBySize",
      params
  );
};

/* ------------ 支付相关接口 end ------------- */
API.wxOrder = (data) => {
  // 微信支付
  return http.postByBody("/v1/api/wechat/pay/unified/order/qrcode", data);
};
API.aliOrder = (data) => {
  // 支付宝支付
  return http.postByBody("/v1/api/ali/pay/unified/order/qrcode", data);
};
API.checkOrderStatus = (data) => {
  // 查询订单支付状态
  return http.get("/v1/api/pay/out_trade_no/flag", data);
};
API.getBillPageList = (data) => {
  // 查询订单列表
  return http.needLogin.get("/v1/api/account/bill", data);
};
API.getBillDetail = (data) => {
  // 查询订单详情
  return http.needLogin.get("/v1/api/account/bill/detail", data);
};
API.platform = (data) => {
  // 清除支付状态
  return http.needLogin.delete("/v1/api/account/other/platform/bill", data);
};
API.updateBalance = (data) => {
  // 查询余额
  return http.needLogin.put("/v1/api/pay/balance", data);
};

//查询增值服务
API.getBuyServe = (params) => {
  return http.needLogin.get(`/v1/api/template/getVarLookServe/${params}`);
};

//支付增值服务
API.buyServe = (params) => {
  return http.needLogin.get(`/v1/api/template/buyVarLookServe`, params);
};

//查询发布服务
API.getPublishPayInfo = (params) => {
  return http.needLogin.get(`/v1/api/template/getPublishPayInfo/${params}`);
};

//支付发布服务
API.savePublishPayInfo = (params) => {
  return http.needLogin.post(`/v1/api/template/publish_pay`, params, true);
};
//支付二维码
API.payCode = (params) => {
  return http.postByBody(`/v1/api/pay`, params);
};
//设置支付密码
API.payPass = (params) => {
  return http.patch(`/v1/api/account/pay/password`, params);
};

//开发者相关接口
//查询当前开发者信息
API.getDeveloperInfo = (params) => {
  return http.needLogin.get(`/v1/api/developer/info`, params);
};

//上传布展工具logo
API.uplogo = (params) => {
  return http.needLogin.fromData(`/v1/api/developer/${params.id}/logo`, params);
};

//查询当前开发者套餐信息
API.getDeveloperPackages = (params) => {
  return http.needLogin.get(`/v1/api/developer/packages`, params);
};

//开发者模板列表
API.getPageList = (params) => {
  return http.needLogin.get(`/v1/api/dev/temp/getPageList`, params);
};

//删除模板
API.deleteTemp = (params) => {
  return http.needLogin.get(`/v1/api/dev/temp/delete`, params);
};

//申请为开发者
API.developer = (params) => {
  return http.needLogin.post(`/v1/api/developer`, params);
};

//h5获取banner
API.getBanners = (params) => {
  return http.needLogin.get(`/v1/api/index/h5/banners`, params);
};

//h5行业解决方案
API.getTrades = (params) => {
  return http.needLogin.get(`/v1/api/index/h5/trades`, params);
};

//开发者发布
API.Kfpublish = (id) => {
  return http.needLogin.get(`/v1/api/dev/temp/${id}/publish`);
};

//企业信息
API.application = (params) => {
  return http.postByBody(`/v1/api/index/forms`, params);
};

//模板管理 - 配置
API.tempConfig = (params) => {
  return http.get(`/v1/api/dev/temp/config`, params);
};

//帮助中心-帮助视频
API.getVideo = (params) => {
  return http.get(`/v1/api/index/getHelpVideoList`, params);
};
//帮助中心-帮助文档分类
API.getFile = (params) => {
  return http.get(`/v1/api/index/getHelpCategoryList`, params);
};
//帮助中心-常见问题
API.getProblem = (params) => {
  return http.get(`/v1/api/index/getHelpIssueList`, params);
};
//帮助中心-帮助文档详情
API.getFileDetail = (params) => {
  return http.get(`/v1/api/index/getHelpDocDetailsList`, params);
};
// 帮助中心 -搜索
API.searchInfo = (params) => {
  return http.get(`/v1/api/index/searchHelpDocList`, params);
};
// 查询视频信息
API.videoInfo = (params) => {
  return http.get(`/v1/api/index/getHelpVideo`, params);
};
// 查询模型列表
API.modalList = (params) => {
  return http.get(`/v1/m/scene/models`, params);
};

// 获取所有模型分类
API.getTypeAllLists = () => {
  return http.get(`/v1/m/scene/models/codes`)
}

// 修改模型;
API.modalEdit = (params) => {
  return http.needLogin.post(`/v1/m/scene/models/`, params, true);
};
// 查询模型信息   v1/m/scene/models/
API.modalInfo = (params) => {
  return http.get(`/v1/m/scene/models/${params}/detail`);
};
// 新的精品案例详情
API.caseInfo = (params) => {
  return http.get(`/v1/api/index/getNewCaseDetails`, params);
};
// 获取会展聚合页
API.getSolvedList = () => {
  return http.get(`/v1/api/index/template/agg/banners`);
};
// 获取banner列表
API.getBannerList = (params) => {
  return http.get(`/v1/api/index/banners`, params);
};
// 获取tags列表 (图片,动图,视频)
API.getPicTags = (params) => {
  return http.get(`/v1/m/scene/picture/getUpdateInfo`, params);
};

// 微信分享
API.shareConfig = (params) => {
  return http.get(`/scene-portal/shareConfig`, params);
};

// 通过优惠码查询优惠券
API.couponCode = (couponCode) => {
  return http.get(`/v1/api/coupons/code/${couponCode}`);
};
export default API;
