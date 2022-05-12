/*
表达验证的规则
 */

export default {
  newcheckNum(rule, value, callback) {
    var r = /^\+?[1-9][0-9]*$/;
    if (!value) {
      callback();
    } else {
      if (!r.test(value)) {
        callback(new Error("请输入正整数"));
      } else {
        if (value < 50) {
          callback(new Error("不能小于50"));
        } else if (value > 20000) {
          callback(new Error("不能大于20000"));
        } else {
          callback();
        }
      }
    }
  },
  checkNum(rule, value, callback) {
    var r = /^\+?[1-9][0-9]*$/;
    if (!value) {
      callback(new Error("不能为空"));
    } else {
      if (!r.test(value)) {
        callback(new Error("请输入正整数"));
      } else {
        if (value < 50) {
          callback(new Error("不能小于50"));
        } else if (value > 20000) {
          callback(new Error("不能大于20000"));
        } else {
          callback();
        }
      }
    }
  },
  checkPhone(rule, value, callback) {
    // var mobile = /^1|8[3|4|5|6|7|8|9]\d{9}$/,
    var mobile = /^1[23456789]\d{9}$/,
      phone = /^0\d{2,3}-?\d{7,8}$/;
    // return mobile.test(tel) || phone.test(tel);
    if (!value) {
      callback(new Error("手机号不能为空"));
    } else {
      if (mobile.test(value) || phone.test(value)) {
        callback();
      } else {
        return callback(new Error("请输入正确的手机号"));
      }
    }
  },
  checkPhone2(rule, value, callback) {
    // var mobile = /^1|8[3|4|5|6|7|8|9]\d{9}$/,
    var mobile = /^1[23456789]\d{9}$/,
        phone = /^(0|4)\d{2,3}-?\d{7,8}$/;
    // return mobile.test(tel) || phone.test(tel);
    if (!value) {
      callback();
    } else {
      if (mobile.test(value) || phone.test(value)) {
        callback();
      } else {
        return callback(new Error("请输入正确的手机号"));
      }
    }
  },
  checkMobile(rule, value, callback) {
    var mobile = /^1|8[3|4|5|6|7|8|9]\d{9}$/;
    // return mobile.test(tel) || phone.test(tel);
    if (!value) {
      callback();
    } else {
      if (mobile.test(value)) {
        callback();
      } else {
        return callback(new Error("请输入正确的手机号"));
      }
    }
  },
  checkEmail(rule, value, callback) {
    var mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (!value) {
      callback();
    } else {
      if (mailReg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱格式"));
      }
    }
  },
  checkUrl(rule, value, callback) {
    var reg = /(http|https):\/\/([\w.]+\/?)\S*/;
    if (!value) {
      callback(new Error("地址不能为空"));
    } else {
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的地址"));
      }
    }
  },
  checkPwd(rule, value, callback) {
    if (!value) {
      callback(new Error("密码不能为空"));
    } else{
      var reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z,.:;，。？''""；；‘’“”·、_~!@#%$^&*()<>{}【】|?\/+=-]+$)(?![a-z0-9]+$)(?![a-z,.:;，。？''""；；‘’“”_~!@#%$^&*()<>{}【】|?/+=-]+$)(?![0-9,.:;，。？''""；；‘’“”_~!@#%$^&*()<>{}【】|?/+=-]+$)[a-zA-Z0-9,.:;，。？''""；；‘’“”_~!@#%$^&*()<>{}【】|?/+=-]{8,16}$/
      if (!reg.test(value) || value.length < 8 || value.length > 16) {
        callback(
          new Error("密码需要8-16位大小写字母、数字、特殊符号至少三种组合")
        );
      } else {
        callback();
      }
    }
  },
  checkCode(rule, value, callback) {
    if (!value) {
      callback(new Error("请输入正确的验证码"));
    } else {
      callback();
    }
  },
  sceneName(rule, value, callback) {
    //展厅名称校验
    if (!value) {
      callback(new Error("请输入展厅名称"));
    } else {
      // value = value.trim();
      if (value.length < 1 || value.length > 30) {
        callback(new Error("请输入1-30个文字"));
      } else {
        callback();
      }
    }
  },
};
