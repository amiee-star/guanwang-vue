import Vue from "vue";
import Vuex from "vuex";
import utils from "@/utils/utils";
import API from "@/config/api.js";

Vue.use(Vuex);

var store = new Vuex.Store({
  state: {
    userinfo: "",
    isUpload: false,
    modelId: "",
    isShowCounter: false,
    showSlideVerify: false,
    isShowStandard: false,
    yuanHostList: [],
    token: "",
    modelsToKen: "" //51的token
  },
  //$store.commit
  mutations: {
    initToken(state, token) {
      if (token) {
        state.userinfo = {
          token,
        };
        store
          .dispatch("getUserInfo", { token: token, _quiet: true })
          .catch((e) => {
            //console.log(e);
          });
      }
    },
    setUserInfo(state, userinfo) {
      state.userinfo = userinfo;
      if (userinfo) {
        if (userinfo.token != utils.getUserToken()) {
          utils.setUserToken(userinfo.token);
        }
        console.log(userinfo);
        window.localStorage.setItem("userId", userinfo.id);
        window.localStorage.setItem("phone", userinfo.telephone);
      } else {
        utils.clearUserToken();
        window.localStorage.clear();
      }
    },
    setUserInfoKeyVal(state, { k, v }) {
      Vue.set(state.userinfo, k, v);
    },
    toUploadModel(state, mark) {
      state.isUpload = mark;
    },
    setStates(state, { k, v }) {
      state[k] = v;
    },
  },
  //$store.dispatch
  actions: {
    async getUserInfo({ commit }, params) {
      this.state.token = params;
      var user = await API.getUserInfo(params);
      //!
      // let user = params;
      utils.formatUser(user);
      user.token = params.token;
      commit("setUserInfo", user);
      return Promise.resolve(user);
    },
    async sceneHistory({ commit }, params) {
      //获取浏览记录，并上传
      var obj = utils.getSceneHistory() || {};
      var list = [];
      for (var i in obj) {
        list.push({
          tempid: i,
          time: obj[i],
        });
      }

      if (list.length > 0) {
        await API.history({
          tempids: JSON.stringify(list),
          token: params.token,
        });

        utils.removeSceneHistory();
      }
    },
  },
});

// store.subscribe((mutation )=>{
//   if(mutation.type == "setUserInfo"){
//     if(mutation.payload){
//       utils.setUserInfo(mutation.payload)
//     }else{
//       utils.clearUserInfo();
//     }
//   }
// })

export default store;
