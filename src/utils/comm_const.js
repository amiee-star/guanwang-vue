export default {
    FILETYPE:{
        "pic":1,
        "gif":2,
        "video":3,
        "model":4,
        "zip":5, // zipgif
        "picgif":6,
        "pdf":11,
        "v3d":9,
    },
    MATERIALTYPE: {
      "pic":1,
      "gif":2,
      "video":3,
      "audio":14,
      "model":11,
      "hotPoint":12,
    },
    
    // 价钱相关
    PRICE:{
        free:1 , // 完全免费
        freeLimit:2 ,// 限时免费
        discount: 3, // 折扣
        discountLimit:4, // 限时折扣
        original:5 // 原价
    },
    // 支付状态
    PAYSTATE:{
        error:0, // 失败
        notpay:1, // 未支付
        success:2, // 成功
        refund:3,   // 转入退款
        closed:4,   // 已关闭
        waiting:5   // 等待处理中
    },
    // 支付平台
    PAYPLATFORM:{
        weixin:2,
        zhifubao:1
    },
    //模板类型
    TPLTYPE:{
        general:1,
        enterprise:2
    },
    // 发布状态
    PUBLISH: {
        notpublish: 0,
        publishing: 1,
        published: 2,
        publishFailed: 3
    },
    // 审核状态
    CHECK: {
        notcheck: 0,
        checked: 1,
        checkfail: 2
    },
    // mediaType 媒体数据类型 type 1：媒体资讯，2：帮助文档，3：文章
    MEDIATYPE:{
        information:1,
        help:2,
        article:3,
    }
}