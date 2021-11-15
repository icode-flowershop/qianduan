import Vue from 'vue'
import Vuex from 'vuex'
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

};
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
  userInfo,
  user,

})
