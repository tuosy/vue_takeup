<template>
  <div>
    <div class="info">
      <div class="main">
        <div class="deliverInfo">
          <h1 class="title">配送信息</h1>
          <div class="msg_a">
            <div class="msg_aa">{{ info.description }}</div>
            <p class="msg_ab">
              由商家负责配送,配送时间大约{{ info.deliveryTime }}分钟, 距离{{
                info.distance
              }}
            </p>
          </div>
          <p class="msg_b">配送费￥{{ info.deliveryPrice }}</p>
        </div>
        <div class="space"></div>
        <div class="active_serve">
          <h1 class="title">活动与服务</h1>
          <ul>
            <li v-for="(item, index) in info.supports" :key="index">
              <div class="msg_a" :class="typeClass[item.type]">
                {{ item.name }}
              </div>
              <p class="msg_b">{{ item.content }}</p>
            </li>
          </ul>
        </div>
        <div class="space"></div>
        <div class="shopPic">
          <h1 class="title">商家实景</h1>
          <ul>
            <li v-for="(pic, index) in info.pics" :key="index">
              <img :src="pic" />
            </li>
          </ul>
        </div>
        <div class="space"></div>
        <div class="shopInfo">
          <h1 class="title">商家信息</h1>
          <div class="msg">
            <h2>品类</h2>
            <p>{{ info.category }}</p>
          </div>
          <div class="msg">
            <h2>商家电话</h2>
            <p>{{ info.phone }}</p>
          </div>
          <div class="msg">
            <h2>地址</h2>
            <p>{{ info.address }}</p>
          </div>
          <div class="msg">
            <h2>营业时间</h2>
            <p>{{ info.workTime }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      typeClass: ["green", "orange", "red"],
    };
  },
  computed: {
    ...mapState(["info"]),
  },
};
</script>

<style lang="less" scoped>
@import "../../../common/less/mixins.less";
.info {
  width: 100%;
  height: 65%;
  position: absolute;
  top: 35%;
  overflow: scroll;
  .main {
    width: 100%;
    .deliverInfo {
      width: 100%;
      height: 120px;
      padding-left: 10px;
      padding-top: 15px;
      box-sizing: border-box;
      .title {
        font-size: 1.2rem;
        font-weight: bold;
      }
      .msg_a {
        width: 90%;
        margin-top: 15px;
        .msg_aa {
          color: #f5f5f5;
          height: 20px;
          width: 70px;
          background-color: rgb(8, 170, 235);
          border-radius: 5px;
          line-height: 20px;
          text-align: center;
          font-size: 0.9rem;
          font-weight: bold;
          margin-right: 15px;
          box-sizing: border-box;
          float: left;
        }
        .msg_ab {
          font-size: 0.9rem;
          line-height: 20px;
        }
      }
      .msg_b {
        margin-top: 5px;
        font-size: 0.9rem;
      }
    }
    .space {
      width: 100%;
      height: 20px;
      background-color: #eee;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }
    .active_serve {
      padding-left: 10px;
      padding-top: 15px;
      box-sizing: border-box;
      width: 100%;
      .title {
        font-size: 1.2rem;
        font-weight: bold;
      }
      ul > li {
        width: 90%;
        height: 20px;
        display: flex;
        margin-top: 15px;
        .msg_a {
          width: 40px;
          height: 18px;
          border-radius: 3px;
          line-height: 18px;
          text-align: center;
          font-size: 0.9rem;
          color: #f5f5f5;
          font-weight: bold;
          box-sizing: border-box;
        }
        .msg_b {
          font-size: 0.9rem;
          line-height: 20px;
          margin-left: 10px;
        }
      }
    }
    .shopPic {
      width: 100%;
      height: 160px;
      padding-left: 10px;
      padding-top: 15px;
      box-sizing: border-box;
      .title {
        font-size: 1.2rem;
        font-weight: bold;
      }
      ul {
        height: 110px;
        margin-top: 10px;
        display: flex;
        overflow-x: scroll;
        li {
          height: 100px;
          width: 125px;
          margin-right: 10px;
          img {
            width: 125px;
            height: 100px;
          }
        }
      }
    }
    .shopInfo {
      width: 100%;
      padding-left: 10px;
      padding-top: 15px;
      box-sizing: border-box;
      .title {
        font-size: 1.2rem;
        font-weight: bold;
      }
      .msg {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ccc;
        line-height: 50px;
        padding-right: 15px;
        box-sizing: border-box;
        h2 {
          float: left;
        }
        p {
          color: #aaa;
          float: right;
        }
      }
    }
  }
}
</style>