<template>
  <div class="shopHeader">
    <div class="main">
      <div class="header" :style="{ backgroundImage: `url(${info.bgImg}) ` }">
        <span
          class="iconfont icon-jiantou"
          @click="$router.push('/home')"
        ></span>
      </div>
      <img :src="info.avatar" class="shopLogo" />
      <div class="shopInfo">
        <div class="mainInfo">
          <span class="pinpai">品牌</span>
          <h1 class="shopName">{{ info.name }}</h1>
          <span
            class="iconfont icon-sanjiaoxing"
            @click="shopInfoShow = true"
          ></span>
        </div>
        <div class="takeInfo">
          <p>{{ info.score }} 月售{{ info.sellCount }}单</p>
          <p>{{ info.description }}</p>
          <p>约{{ info.deliveryTime }}分钟</p>
          <p>距离{{ info.distance }}</p>
        </div>
        <div class="discount" v-if="info.supports">
          <span class="first" :class="typeClass[`${info.supports[0].type}`]">{{
            info.supports[0].name
          }}</span>
          <p>{{ info.supports[0].content }}</p>
          <span
            class="iconfont icon-sanjiaoxing1"
            @click="discountShow = true"
          ></span>
          <span class="disNum">{{ info.supports.length }}个优惠</span>
        </div>
      </div>
    </div>
    <div class="maskShop" v-show="shopInfoShow">
      <div class="hintInfo">
        <div class="title">
          <span class="pinpai">品牌</span>
          <h1 class="shopName">{{ info.name }}</h1>
        </div>
        <div class="mainInfo">
          <span class="info1"
            >{{ info.score }}
            <p>评分</p>
          </span>
          <span class="info2"
            >{{ info.sellCount }}单
            <p>月售</p></span
          >
          <span class="info2"
            >{{ info.description }}
            <p>约{{ info.deliveryTime }}分钟</p></span
          >
          <span class="info2"
            >{{ info.deliveryPrice }}元
            <p>配送费用</p></span
          >
          <span class="info2"
            >约{{ info.distance }}
            <p>距离</p></span
          >
        </div>
        <span class="gonggao">—— 公告 ——</span>
        <p class="miaoshu">
          {{ info.bulletin }}
        </p>
      </div>
      <span class="iconfont icon-guanbi" @click="shopInfoShow = false"></span>
    </div>
    <div class="discountMask" v-show="discountShow">
      <div class="main">
        <h1 class="title">优惠活动</h1>
        <span class="iconfont icon-guanbi" @click="discountShow = false"></span>
        <ul>
          <li v-for="(item, index) in info.supports" :key="index">
            <span class="first" :class="typeClass[`${item.type}`]">{{
              item.name
            }}</span>
            <p>{{ item.content }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      shopInfoShow: false,
      discountShow: false,
      typeClass: ["green", "orange", "red"],
    };
  },
  computed: {
    ...mapState(["info"]),
  },
  mounted() {
    this.$store.dispatch("getShopInfo");
  },
};
</script>

<style lang="less" scoped>
@import "../common/less/mixins.less";
.shopHeader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .main {
    width: 100%;
    height: 30%;
    .header {
      width: 100%;
      height: 30%;
      background-repeat: no-repeat;
      .iconfont {
        margin-left: 5px;
        font-size: 2rem;
        color: white;
        line-height: 60px;
      }
    }
    .shopLogo {
      width: 90px;
      height: 90px;
      position: absolute;
      top: 2%;
      left: 50%;
      transform: translateX(-50%);
    }
    .shopInfo {
      width: 100%;
      height: 70%;
      .mainInfo {
        width: 100%;
        display: flex;
        position: absolute;
        top: 15%;
        justify-content: center;
        .pinpai {
          font-size: 0.9rem;
          display: inline-block;
          width: 35px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          border-radius: 2px;
          background-color: gold;
          font-weight: bold;
          margin-top: 4px;
        }
        .shopName {
          font-size: 1.5rem;
          font-weight: bolder;
          margin-left: 10px;
        }
        .iconfont {
          margin-top: 4px;
          margin-left: 10px;
        }
      }
      .takeInfo {
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;
        top: 20%;
        p {
          margin-left: 10px;
          font-size: 1rem;
        }
      }
      .discount {
        width: 90%;
        height: 28px;
        line-height: 28px;
        // display: flex;
        // justify-content: center;
        position: absolute;
        top: 25%;
        font-size: 0.8rem;
        color: #aaa;
        margin-left: 5%;
        border: 1px solid #ccc;
        .first {
          font-size: 0.7rem;
          display: block;
          width: 28px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 2px;
          font-weight: bold;
          color: white;
          float: left;
          margin-left: 10px;
          margin-top: 6px;
        }
        p {
          width: 60%;
          float: left;
          margin-left: 10px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .iconfont {
          float: right;
          margin-right: 10px;
          font-size: 0.8rem;
        }
        .disNum {
          float: right;
          margin-right: 5px;
        }
      }
    }
  }
  .maskShop {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 100;
    .hintInfo {
      width: 88%;
      height: 35%;
      background-color: aliceblue;
      border-radius: 5px;
      margin: 50% auto;
      padding: 20px;
      box-sizing: border-box;
      .title {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 10px;
        .pinpai {
          font-size: 0.9rem;
          display: inline-block;
          width: 35px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          border-radius: 2px;
          background-color: gold;
          font-weight: bold;
          margin-top: 4px;
        }
        .shopName {
          font-size: 1.5rem;
          font-weight: bolder;
          margin-left: 10px;
        }
      }
      .mainInfo {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 20px;
        .info1 {
          text-align: center;
          font-size: 1.2rem;
          font-weight: bold;
          p {
            margin-top: 10px;
            font-size: 0.9rem;
            font-weight: 100;
            text-align: center;
            color: #aaa;
          }
        }
        .info2 {
          font-size: 1.1rem;
          font-weight: bold;
          text-align: center;
          margin-left: 10px;
          p {
            margin-top: 10px;
            font-size: 0.9rem;
            font-weight: 100;
            text-align: center;
            color: #aaa;
            text-align: center;
          }
        }
      }
      .gonggao {
        display: inline-block;
        width: 100%;
        text-align: center;
        color: #aaa;
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
    .iconfont {
      width: 50px;
      height: 50px;
      font-size: 3rem;
      color: aliceblue;
      display: block;
      margin: -45% auto;
    }
  }
  .discountMask {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    overflow: hidden;
    .main {
      width: 100%;
      height: 40%;
      background-color: aliceblue;
      position: absolute;
      bottom: 0px;
      .title {
        height: 13%;
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        margin-top: 20px;
      }
      .iconfont {
        font-size: 3rem;
        position: absolute;
        top: 0px;
        right: 0px;
      }
      ul {
        height: 75%;
        width: 90%;
        margin: 0 auto;
        overflow: scroll;
        // margin-bottom: 10px;
        li {
          margin-top: 20px;
          .first {
            font-size: 0.8rem;
            display: block;
            width: 30px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            border-radius: 2px;
            // background-color: #02a774;
            font-weight: bold;
            color: white;
            float: left;
            margin-left: 10px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>