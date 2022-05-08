<template>
  <div class="order">
    <Header title="订单"></Header>
    <div class="center">
      <img src="../../assets/takeup.jpeg" />
      <p>登陆后查看外卖订单</p>
      <router-link to="/login" class="btn">立即登录</router-link>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
export default {
  name: "Order",
  components: { Header },
};
</script>

<style lang="less" scoped>
.order {
  position: absolute;
  top: 0;
  width: 100%;
  height: 91%;
  overflow: hidden;
  .center {
    width: 100%;
    height: 90%;
    padding: 10px;
    img {
      width: 40%;
      height: 30%;
      position: absolute;
      top: 30%;
      left: 27%;
    }
    p {
      color: darkgrey;
      position: absolute;
      top: 60%;
      left: 30%;
    }
    .btn {
      position: absolute;
      top: 65%;
      left: 36%;
      border: none;
      background-color: #02a774;
      color: white;
      width: 20%;
      height: 35px;
      border-radius: 5px;
      font-size: 1rem;
      box-shadow: 2px 2px 2px #000;
      text-decoration: none;
      line-height: 35px;
      text-align: center;
    }
    .btn:active {
      box-shadow: -2px -2px 2px #fff;
    }
  }
}
</style>