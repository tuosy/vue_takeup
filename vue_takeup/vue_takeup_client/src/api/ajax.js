//引入axios
import axios from "axios";
//封装ajax请求函数
export default function ajax(url = '', data = {}, type = 'GET') {
    return new Promise((resolve, reject) => {
        if (type === 'GET') {
            //准备query参数
            let dataSrc = ''
            Object.keys(data).forEach(key => {
                dataSrc += key + '=' + data[key] + '&'
            })
            if (dataSrc !== '') {
                dataSrc = dataSrc.substring(0, dataSrc.lastIndexOf('&'))
                url = url + '?' + dataSrc
            }
            var promise = axios.get(url)
        } else {
            //发送POST请求
            promise = axios.post(url, data)
        }
        promise.then(res => {
            //请求成功
            resolve(res.data)
        }).catch(err => {
            //请求失败
            reject(err)
        })
    })
}