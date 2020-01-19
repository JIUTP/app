import axios from 'axios';
import Qs from 'qs';

// 环境切换
if (process.env.NODE_ENV == 'development') {
	axios.defaults.baseURL = 'http://localhost:8080';}
else if (process.env.NODE_ENV == 'debug') {
	axios.defaults.baseURL = '';
}
else if (process.env.NODE_ENV == 'production') {
	axios.defaults.baseURL = '';
}

//超时
axios.defaults.timeout = 10000
//请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
    response => {
        return Promise.resolve(response);
    },
    error => {
        return Promise.reject(error);
    }
);

//响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
       return Promise.reject(error) 
    }
)


//get
export function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        })
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}

//post
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, Qs.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}

