import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)
const state ={
  goodsCart:[],
  goodsOrder:[],
  setLocalStorage(str){
    localStorage.setItem(`${str}`, JSON.stringify(state[`${str}`]));
  },
  getLocalStorage(str){
    return JSON.parse(localStorage.getItem(`${str}`));
  }
};
const userInfo = {
  //在登录界面获取用户名和用户id
};
const isSignIn = false;

const searchList = [];

const user = {
  setLocalStorage(str){
    localStorage.setItem(`${str}`, JSON.stringify(userInfo));
  },
  getLocalStorage(str){
    return JSON.parse(localStorage.getItem(`${str}`));
  }

}



export default new Vuex.Store({
	state,
  userInfo,//用来存储用户名和id
  user,//对用户信息的操作
  isSignIn,
  searchList,
   /* vuex数据持久化配置 */
	plugins: [
		createPersistedState({
      // 存储方式：localStorage、sessionStorage、cookies
			storage: localStorage,
      // 存储的 key 的key值
			key: "store",
			render(userInfo) {
        // 要存储的数据：本项目采用es6扩展运算符的方式存储了state中所有的数据
        console.log(userInfo)
				return {...userInfo};
			}
		})
	]



})
