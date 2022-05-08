<template>
  <div class="profile">
    <Header title="我的"></Header>
    <div class="center">
      <div class="personInfo">
        <span class="iconfont icon-geren2" id="picture"></span>
        <router-link
          :to="user._id ? '/userInfo' : '/login'"
          class="login"
          v-show="!user.phone || (user.name && user.phone)"
          >{{ user.name || "登录|注册" }}</router-link
        >
        <div
          :class="
            !user.phone || (user.name && user.phone) ? 'phoneNum' : 'phoneNum2'
          "
        >
          <span class="iconfont icon-shouji" id="phone"></span>
          <p class="number">{{ user.phone || "暂无绑定手机号" }}</p>
        </div>

        <span class="iconfont icon-arrowRight-copy-copy-copy" id="back"></span>
      </div>
      <div class="account">
        <div class="info">
          <h1 style="color: #f5a100">{{ money }}<span>元</span></h1>
          <p>我的余额</p>
        </div>
        <div class="info">
          <h1 style="color: rgb(255, 94, 0)">{{ discount }}<span>个</span></h1>
          <p>我的余额</p>
        </div>
        <div class="info" style="border-right: none">
          <h1 style="color: #02a774">{{ point }}<span>分</span></h1>
          <p>我的余额</p>
        </div>
      </div>
      <div class="myOrder borderBottom">
        <span class="iconfont icon-dingdan1" id="myOrder"></span>
        <span>我的订单</span>
        <span class="iconfont icon-arrowRight-copy-copy-copy" id="back"></span>
      </div>
      <div class="pointShop borderBottom">
        <span class="iconfont icon-jifen" id="pointShop"></span>
        <span>积分商城</span>
        <span class="iconfont icon-arrowRight-copy-copy-copy" id="back"></span>
      </div>
      <div class="vip borderBottom">
        <span class="iconfont icon-31huiyuan" id="vip"></span>
        <span>会员卡</span>
        <span class="iconfont icon-arrowRight-copy-copy-copy" id="back"></span>
      </div>
      <div class="serve">
        <span class="iconfont icon-fuwuzhongxin" id="serve"></span>
        <span>服务中心</span>
        <span class="iconfont icon-arrowRight-copy-copy-copy" id="back"></span>
      </div>
      <el-button
        type="danger"
        style="width: 100%; margin-top: 30px"
        v-show="user._id"
        @click="logout"
        >退出登录</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "../../components/Header";
export default {
  name: "Profile",
  components: { Header },
  data() {
    return {
      money: "0.00",
      discount: 0,
      point: 0,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    logout() {
      this.$confirm("确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
        customClass: "alterMsg",
      }).then(() => {
        this.$store.dispatch("removeUserInfo");
        this.$message({
          type: "success",
          message: "退出成功!",
        });
      });
    },
  },
};
</script>

<style lang="less">
@import "../../common/less/mixins.less";
.profile {
  position: absolute;
  top: 0;
  overflow: hidden;
  width: 100%;
  height: 91%;
  .center {
    width: 100%;
    height: 90%;
    .personInfo {
      width: 100%;
      height: 20%;
      background-color: #02a774;
      color: white;
      padding: 10px;
      position: relative;
      #picture {
        font-size: 6rem;
        color: #ccc;
        position: absolute;
        top: 20%;
      }
      .login {
        text-decoration: none;
        color: white;
        position: absolute;
        top: 30%;
        left: 28%;
        font-size: 1.3rem;
      }
      .phoneNum2 {
        position: absolute;
        top: 30%;
        left: 25%;
        display: flex;
        .number {
          margin-top: 3px;
          font-size: 1.3rem;
        }
        #phone {
          font-size: 1.9rem;
        }
      }
      .phoneNum {
        position: absolute;
        top: 56%;
        left: 25%;
        display: flex;
        .number {
          margin-top: 3px;
          font-size: 1.3rem;
        }
        #phone {
          font-size: 1.9rem;
        }
      }
      #back {
        position: absolute;
        font-size: 1.5rem;
        top: 40%;
        right: 10%;
      }
    }
    .account {
      width: 100%;
      height: 15%;
      display: flex;
      border-bottom: 1px solid #ccc;
      .info {
        height: 100%;
        width: 33.3%;
        border-right: 1px solid #ccc;
        h1 {
          font-size: 1.9rem;
          font-weight: bold;
          text-align: center;
          margin-top: 15%;
          span {
            font-size: 1rem;
            font-weight: 200;
          }
        }
        p {
          text-align: center;
          margin-top: 5%;
          font-size: 0.9rem;
          font-weight: 200;
        }
      }
    }
    .borderBottom {
      border-bottom: 1px solid #ddd;
    }
    .myOrder,
    .pointShop,
    .vip,
    .serve {
      width: 100%;
      height: 8%;
      line-height: 45px;
      padding-left: 10px;
      font-size: 1.2rem;
      position: relative;
      #myOrder {
        font-size: 1.2rem;
        color: skyblue;
        margin-right: 5px;
      }
      #pointShop {
        color: rgb(255, 94, 0);
        margin-right: 5px;
        font-size: 1.3rem;
      }
      #vip {
        color: #f5bc00;
        margin-right: 5px;
        font-size: 1.5rem;
      }
      #serve {
        color: #02a774;
        margin-right: 5px;
        font-size: 1.5rem;
      }
      #back {
        position: absolute;
        top: 10%;
        right: 5%;
        color: #ccc;
      }
    }
  }
}
</style>