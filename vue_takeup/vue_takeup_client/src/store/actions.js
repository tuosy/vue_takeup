//引入常量模块
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORIES,
    RECEIVE_SHOPS,
    RECEIVE_USER,
    REMOVE_USER,
    RECEIVE_GOODS,
    RECEIVE_INFO,
    RECEIVE_RATING,
    ADD_FOOD_COUNT,
    SUB_FOOD_COUNT,
    REMOVE_SHOP_CAR,
    SEARCH_SHOP,
} from './mutation-types'
//引入异步请求函数
import apiRequest from '../api/index'
export default {
    //异步获取地址
    getAddress(context) {
        let geohash = context.state.latitude + ',' + context.state.longitude
        apiRequest.reqAddress(geohash).then(res => {
            context.commit(RECEIVE_ADDRESS, res.data)
        }, err => {
            console.log(err);
        })
    },
    //异步获取食品分类数组
    getCategories(context) {
        apiRequest.reqFoodType().then(res => {
            context.commit(RECEIVE_CATEGORIES, res.data)
        }, err => {
            console.log(err);
        })
    },
    //异步获取商店数组
    getShops(context) {
        let { longitude, latitude } = context.state
        apiRequest.reqShops(longitude, latitude).then(res => {
            context.commit(RECEIVE_SHOPS, res.data)
        }, err => {
            console.log(err);
        })
    },
    //同步记录用户信息
    recordUser(context, user) {
        context.commit(RECEIVE_USER, user)
    },
    //异步获取用户信息
    getUserInfo(context) {
        apiRequest.reqUserInfo().then(res => {
            if (res.code === 0) {
                context.commit(RECEIVE_USER, res.data)
            }
        }, err => {
            console.log(err);
        })
    },
    //异步清除用户信息
    removeUserInfo(context) {
        apiRequest.reqLogout().then(res => {
            if (res.code === 0) {
                context.commit(REMOVE_USER)
            }
        }, err => {
            console.log(err);
        })
    },
    //异步获取商家商品
    getShopGoods(context) {
        apiRequest.reqShopGoods().then(res => {
            context.commit(RECEIVE_GOODS, res.data)
        }, err => {
            console.log(err);
        })
    },
    //异步获取商家信息
    getShopInfo(context) {
        apiRequest.reqShopInfo().then(res => {
            context.commit(RECEIVE_INFO, res.data)
        }, err => {
            console.log(err);
        })
    },
    //异步获取用户评价
    async getShopRating(context) {
        const res = await apiRequest.reqShopRating()
        if (res.code === 0) {
            const rating = res.data
            context.commit(RECEIVE_RATING, rating)
        }
    },
    //同步更新食品数量
    updateFoodCount(context, { isAdd, food }) {
        if (isAdd) {
            context.commit(ADD_FOOD_COUNT, food)//添加
        } else {
            context.commit(SUB_FOOD_COUNT, food)//减少
        }
    },
    //同步清除购物车
    removeCar(context) {
        context.commit(REMOVE_SHOP_CAR)
    },
    //异步关键词搜索商家
    getKeyShop(context, keyword) {
        let geohash = context.state.latitude + ',' + context.state.longitude
        apiRequest.reqKeyShops(geohash, keyword).then(res => {
            if (res.code === 0) {
                if (res.data instanceof Array) {
                    context.commit(SEARCH_SHOP, res.data)
                } else {
                    context.commit(SEARCH_SHOP, [])
                }
            }
        })
    }
}