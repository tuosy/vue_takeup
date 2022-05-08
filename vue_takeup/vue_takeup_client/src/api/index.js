//封装接口调用函数
/*
[1、根据经纬度获取位置详情](#1根据经纬度获取位置详情) 
[2、获取食品分类列表](#2获取食品分类列表)
[3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)
[4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表) 
[5、获取一次性验证码](#5获取一次性验证码) 
[6、用户名密码登陆](#6用户名密码登陆) 
[7、发送短信验证码](#7发送短信验证码) 
[8、手机号验证码登陆](#8手机号验证码登陆) 
[9、根据会话获取用户信息](#9根据会话获取用户信息) 
[10、用户登出](#10用户登出) */
//引入Ajax请求
import ajax from './ajax'
const baseUrl = '/api'
export default {
    reqAddress(geohash) {
        return ajax(`${baseUrl}/position/${geohash}`)
    },
    reqFoodType() {
        return ajax(`${baseUrl}/index_category`)
    },
    reqShops(longitude, latitude) {
        return ajax(`${baseUrl}/shops`, { longitude, latitude })
    },
    reqKeyShops(geohash, keyword) {
        return ajax(`${baseUrl}/search_shops`, { keyword, geohash })
    },
    // reqTest() {
    //     return ajax(`${baseUrl}/captcha`)
    // },
    reqPwdLogin({ name, pwd, captcha }) {
        return ajax(`${baseUrl}/login_pwd `, { name, pwd, captcha }, 'POST')
    },
    reqSendPhoneCode(phone) {
        return ajax(`${baseUrl}/sendcode`, { phone })
    },
    reqMsgLogin(phone, code) {
        return ajax(`${baseUrl}/login_sms`, { phone, code }, 'POST')
    },
    reqUserInfo() {
        return ajax(`${baseUrl}/userinfo`)
    },
    reqLogout() {
        return ajax(`${baseUrl}/logout`)
    },
    //mockjs模拟数据请求函数
    reqShopGoods() {
        return ajax('/goods')
    },
    reqShopRating() {
        return ajax('/rating')
    },
    reqShopInfo() {
        return ajax('/info')
    },
}