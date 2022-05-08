<template>
  <div>
    <div class="Car" @click="listShow">
      <div
        class="iconfont icon-gouwuchekong"
        :class="{ highLight: totalCount }"
      ></div>
      <div class="foodCount" v-show="totalCount">{{ totalCount }}</div>
      <div class="foodInfo">
        <p class="price">￥{{ totalPrice }}</p>
        <p class="deliverFee">配送费￥{{ info.deliveryPrice }}</p>
      </div>
      <div
        class="goToPay"
        :class="{ highLight: totalPrice >= info.minPrice }"
        @click.stop="goToPay"
      >
        {{ payText }}
      </div>
    </div>
    <div class="listMask" v-show="carListShow" @click="listShow">
      <transition name="shopCarA">
        <div class="carList" @click.stop v-show="animateShow">
          <div class="carNav">
            <div class="textCar">购物车</div>
            <div class="remove" @click="removeCar">清空</div>
          </div>
          <ul>
            <li v-for="(item, index) in shopCar" :key="index">
              <div class="name">{{ item.name }}</div>
              <div class="price">￥{{ item.price }}</div>
              <CarControl class="CarControl" :food="item"></CarControl>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import CarControl from "./CarControl";
export default {
  name: "ShopCar",
  data() {
    return {
      carListShow: false,
      animateShow: false,
    };
  },
  components: { CarControl },
  computed: {
    ...mapState(["info", "shopCar"]),
    ...mapGetters(["totalCount", "totalPrice"]),
    payText() {
      const { minPrice } = this.info;
      if (this.totalPrice >= minPrice) {
        return "去结算";
      } else if (this.totalPrice < minPrice && this.totalPrice) {
        return `还差￥${minPrice - this.totalPrice}起送`;
      } else {
        return `￥${minPrice}起送`;
      }
    },
  },
  methods: {
    listShow() {
      if (this.totalCount) {
        this.carListShow = !this.carListShow;
        this.animateShow = !this.animateShow;
      }
    },
    removeCar() {
      this.$confirm("确定要清空吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
        customClass: "alterMsg",
      }).then(() => {
        this.$store.dispatch("removeCar");
      });
    },
    goToPay() {},
  },
  watch: {
    totalCount() {
      if (this.totalCount === 0) {
        this.carListShow = false;
        this.animateShow = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common/less/mixins.less";
div {
  .Car {
    width: 100%;
    height: 8%;
    position: relative;
    position: fixed;
    bottom: 0px;
    left: 0px;
    background-color: rgb(19, 29, 41);
    z-index: 50;
    .iconfont {
      width: 40px;
      height: 40px;
      background-color: rgb(81, 79, 79);
      border-radius: 50%;
      text-align: center;
      line-height: 40px;
      color: #aaa;
      font-size: 1.6rem;
      border: 5px solid rgb(19, 29, 41);
      position: absolute;
      top: -10px;
      left: 20px;
    }
    .highLight {
      background-color: #02a774;
      color: #f5f5f5;
    }
    .foodCount {
      width: 20px;
      height: 15px;
      background-color: red;
      color: #f5f5f5;
      font-size: 0.8rem;
      font-weight: bold;
      text-align: center;
      line-height: 15px;
      border-radius: 7px;
      position: absolute;
      top: -8px;
      left: 55px;
    }
    .foodInfo {
      position: absolute;
      top: 10px;
      left: 80px;
      .price {
        color: #f5f5f5;
        font-weight: bold;
      }
      .deliverFee {
        margin-top: 5px;
        color: #aaa;
        font-size: 0.8rem;
      }
    }
    .goToPay {
      width: 30%;
      height: 100%;
      background-color: rgb(81, 79, 79);
      position: absolute;
      right: 0px;
      text-align: center;
      line-height: 55px;
      font-size: 0.9rem;
      font-weight: bold;
      color: #f5f5f5;
    }
    .highLight {
      background-color: #02a774;
      color: #f5f5f5;
    }
  }
  .listMask {
    width: 100%;
    height: 92%;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 40;
    .shopCarA-enter-active,
    .shopCarA-leave-active {
      transition: 0.3s;
    }
    .shopCarA-enter,
    .shopCarA-leave-to {
      transform: translateY(100%);
    }
    .shopCarA-enter-to,
    .shopCarA-leave {
      transform: translate(0);
    }
    .carList {
      width: 100%;
      background-color: #f5f5f5;
      position: absolute;
      bottom: 0px;
      left: 0px;
      .carNav {
        width: 100%;
        height: 40px;
        background-color: #eee;
        padding-left: 20px;
        padding-right: 20px;
        line-height: 40px;
        border: 1px solid #bbb;
        box-sizing: border-box;
        border-left: none;
        border-right: none;
        .textCar {
          float: left;
        }
        .remove {
          width: 50px;
          height: 100%;
          float: right;
          text-align: center;
          border: 1px solid #bbb;
          border-top: none;
          border-bottom: none;
          box-sizing: border-box;
          background-color: #f2f2f2;
        }
      }
      ul {
        width: 100%;
        max-height: 300px;
        display: block;
        overflow: scroll;
        li {
          width: 100%;
          height: 50px;
          position: relative;
          .name {
            line-height: 50px;
            position: absolute;
            left: 20px;
          }
          .price {
            line-height: 50px;
            color: red;
            font-weight: bold;
            position: absolute;
            right: 120px;
          }
          .CarControl {
            position: absolute;
            right: 20px;
            top: 12px;
          }
        }
      }
    }
  }
}
</style>