<template>
  <div class="login">
    <div class="main">
      <router-link to="/" class="iconfont icon-biaoqing"></router-link>
      <h1>硅谷外卖</h1>
      <form class="login_info" @submit.prevent="login">
        <div class="login_way">
          <a class="msgLogin" :class="{ checked: loginWay }" @click="msgLogin"
            >短信登录</a
          >
          <a class="keyLogin" :class="{ checked: !loginWay }" @click="keyLogin"
            >密码登录</a
          >
        </div>
        <input :placeholder="msg1" v-model="phone" />
        <button
          :disabled="!rightPhone"
          v-show="loginWay"
          @click.prevent="getCode"
          class="check"
          :class="{ isClick: !rightPhone || timeOut != 0 }"
        >
          {{ timeOut ? `已发送(${timeOut}s)` : "获取验证码" }}
        </button>
        <input
          type="text"
          v-show="loginWay"
          placeholder="验证码"
          v-model="code"
        />
        <input
          placeholder="密码"
          :type="isShow ? 'text' : 'password'"
          v-show="!loginWay"
          v-model="pwd"
        />
        <button
          class="changeBtn"
          @click.prevent="isShow = !isShow"
          v-show="!loginWay"
          :class="{ btnOn: isShow }"
        >
          <div class="switch" :class="isShow ? 'on' : 'off'"></div>
          <span>{{ isShow ? "abc" : "" }}</span>
        </button>
        <input
          type="text"
          placeholder="验证码"
          v-show="!loginWay"
          v-model="captcha"
        />
        <img
          src="http://localhost:4000/captcha"
          v-show="!loginWay"
          @click="getCaptcha"
          ref="captcha"
        />
        <p v-show="loginWay">
          温馨提示：未注册硅谷外卖账号的手机号，登陆时
          将自动注册，且代表已同意<span>《用户服务协议》</span>
        </p>
        <button class="btn">登录</button>
      </form>
      <a href="#" class="about">关于我们</a>
    </div>
    <Hint class="hint" :msg="hint.msg" v-show="hint.isAlert"></Hint>
  </div>
</template>

<script>
import Hint from "../components/Hint";
import apiRequest from "../api/index";
export default {
  name: "Login",
  data() {
    return {
      phone: "", //手机号或用户名
      timeOut: 0, //发送倒计时
      msg1: "手机号",
      isShow: false, //密码是否隐藏
      loginWay: true, //true表示短信登陆，false表示密码登录
      code: "", //短信验证码
      pwd: "", //密码
      captcha: "", //图片验证码
      hint: {
        msg: "", //提示信息
        isAlert: false, //提示组件展示状态
      },
    };
  },
  components: { Hint },
  methods: {
    msgLogin() {
      this.msg1 = "手机号";
      this.loginWay = true;
    },
    keyLogin() {
      this.msg1 = "手机或用户名";
      this.loginWay = false;
    },
    async getCode() {
      //是否在发送过程中
      if (!this.timeOut) {
        //开始计时
        this.timeOut = 60;
        this.id = setInterval(() => {
          this.timeOut--;
          if (this.timeOut <= 0) {
            clearInterval(this.id);
          }
        }, 1000);
      }
      //发送ajax请求
      const res = await apiRequest.reqSendPhoneCode(this.phone);
      // console.log(res);
      if (res.code === 1) {
        this.hint.msg = res.msg;
        this.hint.isAlert = true;
        //停止计时
        if (this.timeOut) {
          this.timeOut = 0;
          clearInterval(this.id);
          this.id = undefined;
        }
      }
    },
    login() {
      let { phone, pwd, captcha, code } = this;
      if (this.loginWay) {
        //短信登录
        if (!this.rightPhone) {
          this.hint.msg = "手机号码不正确";
          this.hint.isAlert = true;
        } else if (!/^\d{6}$/.test(this.code)) {
          this.hint.msg = "手机验证码不正确";
          this.hint.isAlert = true;
        } else {
          //发送短信登录请求
          apiRequest.reqMsgLogin(phone, code).then(
            (res) => {
              if (res.code === 0) {
                const user = res.data;
                //登录成功进入个人中心
                //保存个人信息
                this.$store.dispatch("recordUser", user);
                this.$router.replace("/profile");
                // console.log(res);
              } else {
                this.hint.msg = res.msg;
                this.hint.isAlert = true;
                // console.log(res);
              }
            },
            (err) => {
              console.log(err);
            }
          );
        }
      } else {
        //密码登录
        if (!phone) {
          this.hint.msg = "手机或用户名不能为空";
          this.hint.isAlert = true;
        } else if (!this.pwd) {
          this.hint.msg = "密码不能为空";
          this.hint.isAlert = true;
        } else if (!this.captcha) {
          this.hint.msg = "图片验证码不能为空";
          this.hint.isAlert = true;
        } else {
          //发送密码登录请求
          const name = phone;
          apiRequest.reqPwdLogin({ name, pwd, captcha }).then(
            (res) => {
              if (res.code === 0) {
                const user = res.data;
                //登录成功进入个人中心
                this.$store.dispatch("recordUser", user);
                this.$router.replace("/profile");
              } else {
                this.getCaptcha();
                this.hint.msg = res.msg;
                this.hint.isAlert = true;
              }
            },
            (err) => {
              console.log(err);
            }
          );
        }
      }
    },
    getCaptcha() {
      this.$refs.captcha.src = "http://localhost:4000/captcha?" + Date.now();
    },
  },
  computed: {
    rightPhone() {
      return /^1\d{10}$/.test(this.phone);
    },
  },
  mounted() {
    this.$bus.$on("closeAlert", () => {
      this.hint.isAlert = false;
    });
  },
  beforeDestroy() {
    this.$bus.$off("closeAlert");
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .main {
    width: 100%;
    height: 100%;
    .iconfont {
      text-decoration: none;
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 2rem;
      color: #ccc;
      font-weight: bold;
    }
    h1 {
      margin-top: 25%;
      text-align: center;
      font-size: 3rem;
      color: #02a774;
      font-weight: bold;
    }
    .login_info {
      position: relative;
      height: 25%;
      width: 100%;
      margin-bottom: 10px;
      .login_way {
        height: 20%;
        width: 45%;
        margin: 0 auto;
        text-align: center;
        font-size: 1rem;
        font-weight: bold;
        margin-top: 30px;
        .msgLogin {
          float: left;
        }
        .keyLogin {
          float: right;
        }
        .checked {
          padding-bottom: 2px;
          color: #02a774;
          border-bottom: 2px solid #02a774;
        }
      }
      input {
        height: 25%;
        width: 80%;
        border: 1px solid #ccc;
        border-radius: 5px;
        display: block;
        margin: 0 auto;
        margin-bottom: 10px;
        font-size: 1rem;
        padding-left: 10px;
        outline: none;
      }
      input:focus {
        border: 1px solid #02a774;
      }
      .isClick {
        color: #ccc;
      }
      .btnOn {
        border-right: none;
        background: #02a774;
      }
      .changeBtn {
        display: inline;
        position: absolute;
        top: 60%;
        right: 10%;
        height: 20px;
        width: 10%;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-sizing: border-box;
        span {
          color: #fff;
          font-size: 0.6rem;
          font-weight: bold;
          position: absolute;
          left: 1px;
          top: 2px;
        }
        .switch {
          background-color: #fff;
          position: absolute;
          top: 0px;
          width: 47%;
          height: 100%;
          border-radius: 100%;
          border: 1px solid #aaa;
          box-sizing: border-box;
        }
        .off {
          left: 0px;
          border-left: none;
        }
        .on {
          border-right: none;
          right: 0px;
        }
      }
      .check {
        border: none;
        background-color: #fff;
        position: absolute;
        font-size: 1rem;
        // color: #ccc;
        top: 27%;
        right: 12%;
      }
      img {
        position: absolute;
        top: 85%;
        right: 8%;
      }
      p {
        font-size: 0.95rem;
        color: #aaa;
        width: 82%;
        margin: 0 auto;
        span {
          font-weight: bold;
          color: #02a774;
        }
      }
      .btn {
        height: 25%;
        width: 82%;
        color: white;
        background-color: #02a774;
        border: 1px solid #ccc;
        border-radius: 5px;
        display: block;
        margin: 0 auto;
        margin-bottom: 10px;
        font-size: 1rem;
        margin-top: 5%;
        box-shadow: 2px 2px 2px #000;
      }
      .btn:active {
        box-shadow: -2px -2px 2px #fff;
      }
    }

    .about {
      text-decoration: none;
      position: absolute;
      top: 90%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1rem;
      color: #aaa;
      width: 20%;
    }
  }
  .hint {
    position: absolute;
    top: 0px;
    left: 0px;
  }
}
</style>