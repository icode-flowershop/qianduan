import axios from "axios";
import {Message} from "element-ui";
//封装请求头
const http = axios.create({
  baseURL: '',
});
//axios请求前的拦截
http.interceptors.request.use(req => {
  return req;
});

//axios响应后的拦截
http.interceptors.response.use(res => {
  return res;
}, error => {
  let _res = error.response;

  if(_res.status === 404){
    Message.error({message: '资源未找到'});
  }else if(_res.status === 500){
    Message.error({message: '服务器故障'});
  }
})

export default http
