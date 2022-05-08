export default {
    //购物车的商品数量
    totalCount(state) {
        return state.shopCar.reduce((total, currentFood) => {
            return total + currentFood.count
        }, 0)
    },
    //购物车的商品价格
    totalPrice(state) {
        return state.shopCar.reduce((total, currentFood) => {
            return total + currentFood.count * currentFood.price
        }, 0)
    }
}