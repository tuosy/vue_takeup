<template>
  <div class="food">
    <div class="main">
      <div class="imgInfo">
        <img v-lazy="itemFood.image" />
        <span class="iconfont icon-jiantou" @click="closeFood"></span>
      </div>
      <div class="foodInfo">
        <h4 class="name">{{ itemFood.name }}</h4>
        <p class="msg_a" v-if="itemFood.info">{{ itemFood.info }}</p>
        <div class="other">
          <p>月售{{ itemFood.sellCount }}份</p>
          <p>好评率{{ itemFood.rating }}%</p>
        </div>
        <h2 class="price">￥{{ itemFood.price }}</h2>
        <CarControl :food="itemFood" class="carControl"></CarControl>
      </div>
    </div>
  </div>
</template>

<script>
import CarControl from "./CarControl";
export default {
  name: "Food",
  components: { CarControl },
  props: {
    itemFood: Object,
  },
  methods: {
    closeFood() {
      this.$bus.$emit("closeFood", false);
    },
  },
};
</script>

<style lang="less" scoped>
.food {
  width: 100%;
  height: 100%;
  .main {
    width: 80%;
    background-color: #f5f5f5;
    border-radius: 5px;
    margin: 35% auto;
    .imgInfo {
      width: 100%;
      height: 300px;
      box-sizing: border-box;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
      }
      .iconfont {
        color: white;
        font-size: 1.6rem;
        position: absolute;
        top: 5px;
        left: 5px;
      }
    }
    .foodInfo {
      width: 100%;
      padding: 20px;
      position: relative;
      box-sizing: border-box;
      .name {
        height: 25px;
        width: 95%;
        font-size: 1.1rem;
        font-weight: bold;
        line-height: 25px;
      }
      .msg_a {
        width: 100%;
        color: #aaa;
        font-size: 1rem;
        margin-top: 5px;
        line-height: 25px;
      }
      .other {
        margin-top: 5px;
        display: flex;
        p {
          height: 20px;
          line-height: 20px;
          font-size: 1rem;
          color: #aaa;
          margin-right: 20px;
        }
      }
      .price {
        color: red;
        font-weight: bold;
        margin-top: 15px;
      }
      .carControl {
        position: absolute;
        bottom: 15px;
        right: 25px;
      }
    }
  }
}
</style>