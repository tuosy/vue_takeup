<template>
  <div class="shopShow">
    <span class="iconfont icon-xuanxiang"></span>
    <span class="title">附近商家</span>
    <ul class="shopInfo">
      <li v-for="shop in shops" :key="shop.id" @click="$router.push('/shop')">
        <img :src="baseImgUrl + shop.image_path" />
        <div>
          <span>品牌</span>
          <h2>{{ shop.name }}</h2>
          <ul class="support">
            <li v-for="item in shop.supports" :key="item.id">
              {{ item.icon_name }}
            </li>
          </ul>
          <ul class="star">
            <Star class="rating" :score="shop.rating"></Star>
            <p>{{ shop.rating }}</p>
          </ul>
          <p class="monthBuy">近售{{ shop.recent_order_num }}件</p>
          <h4>{{ shop.delivery_mode.text }}</h4>
          <p class="msg">
            ￥{{ shop.float_minimum_order_amount }}起送，{{
              shop.piecewise_agent_fee.tips
            }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Star from "./Star";
export default {
  name: "ShopList",
  data() {
    return {
      baseImgUrl: "http://elm.cangdu.org/img/",
    };
  },
  components: { Star },
  computed: {
    ...mapState(["shops"]),
  },
};
</script>

<style lang="less" scoped>
.shopShow {
  width: 100%;
  height: 60%;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 10px;
  .iconfont {
    color: #ccc;
    display: inline-block;
    margin-right: 5px;
  }
  .title {
    color: #ccc;
  }
  .shopInfo {
    width: 100%;
    li {
      margin-top: 10px;
      position: relative;
    }
    li > img {
      width: 20%;
      height: 100px;
      margin-right: 5px;
    }
    li > div {
      span {
        font-size: 0.8rem;
        display: inline-block;
        width: 30px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        border-radius: 2px;
        background-color: gold;
        position: absolute;
        top: 10%;
        left: 25%;
      }
      h2 {
        width: 40%;
        font-weight: bold;
        position: absolute;
        top: 10%;
        left: 35%;
        font-size: 1rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .support {
        display: flex;
        position: absolute;
        top: 5%;
        right: 5%;
        font-size: 0.9rem;
        color: #aaa;
        li {
          border: 1px solid #ccc;
          margin-left: 8px;
        }
      }
      .star {
        .rating {
          position: absolute;
          top: 42%;
          left: 25%;
        }
        p {
          position: absolute;
          top: 42%;
          left: 45%;
          font-size: 1em;
          font-weight: bolder;
          color: #f5a100;
        }
      }
      .monthBuy {
        position: absolute;
        top: 45%;
        left: 55%;
        font-size: 0.9rem;
        color: #aaa;
      }
      h4 {
        position: absolute;
        top: 42%;
        right: 5%;
        width: 15%;
        height: 18px;
        border: 1px solid skyblue;
        border-radius: 5px;
        color: skyblue;
        font-size: 0.9rem;
        line-height: 15px;
        text-align: center;
        box-sizing: border-box;
      }
      .msg {
        position: absolute;
        top: 75%;
        left: 25%;
        font-size: 0.9rem;
      }
    }
  }
}
</style>