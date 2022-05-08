//引入mutation-types常量
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
import Vue from 'vue'
export default {
    //更新地址信息
    [RECEIVE_ADDRESS](state, address) {
        state.address = address
    },
    //更新食品类型
    [RECEIVE_CATEGORIES](state, categories) {
        state.categories = categories
    },
    //更新商店数据
    [RECEIVE_SHOPS](state, shops) {
        state.shops = shops
    },
    //更新用户信息
    [RECEIVE_USER](state, user) {
        state.user = user
    },
    //退出登录
    [REMOVE_USER](state) {
        state.user = {}
    },
    //更新商品列表
    [RECEIVE_GOODS](state, goods) {
        state.goods = goods
    },
    //更新商家信息
    [RECEIVE_INFO](state, info) {
        state.info = info
    },
    //更新用户评价
    [RECEIVE_RATING](state, rating) {
        state.rating = rating
    },
    //更新食品数量
    [ADD_FOOD_COUNT](state, food) {
        if (!food.count) {
            Vue.set(food, "count", 1)
            state.shopCar.push(food)
        } else {
            food.count++
        }
    },
    [SUB_FOOD_COUNT](state, food) {
        if (food.count) {
            food.count--
            if (food.count === 0) {
                state.shopCar.splice(state.shopCar.indexOf(food), 1)
            }
        }
    },
    //清除购物车
    [REMOVE_SHOP_CAR](state) {
        state.shopCar.forEach(element => {
            element.count = 0
        });
        state.shopCar = []
    },
    //关键词搜索商家
    [SEARCH_SHOP](state, keyShop) {
        state.keyShop = keyShop
    },
}