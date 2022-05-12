import Ruler from "./index";

export default{
  install(Vue){
    Vue.prototype.$Ruler = Ruler;
  }
}
