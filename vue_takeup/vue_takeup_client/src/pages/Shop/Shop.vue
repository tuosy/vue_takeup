<template>
  <div class="shop">
    <ShopHeader class="shopHeader"></ShopHeader>
    <div class="nav">
      <div>
        <router-link to="/shop/goods" class="link" active-class="checkLink"
          >点餐</router-link
        >
      </div>
      <div>
        <router-link to="/shop/rating" class="link" active-class="checkLink"
          >评价</router-link
        >
      </div>
      <div>
        <router-link to="/shop/info" class="link" active-class="checkLink"
          >商家</router-link
        >
      </div>
    </div>
    <keep-alive>
      <router-view class="shopInfo"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import ShopHeader from "../../components/ShopHeader.vue";
export default {
  components: { ShopHeader },
};
</script>

<style lang="less" scoped>
.shop {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .shopHeader {
    width: 100%;
  }
  .nav {
    width: 100%;
    height: 4%;
    display: flex;
    position: absolute;
    top: 30%;
    justify-content: space-around;
    border-bottom: 1px solid #ddd;
    margin-top: 5px;
    div {
      font-size: 1.2rem;
      .link {
        height: 100%;
        display: block;
        text-decoration: none;
        color: #000;
      }
      .checkLink {
        color: #02a774;
        border-bottom: 2px solid #02a774;
      }
    }
  }
  .shopInfo {
    width: 100%;
    height: 100%;
  }
}
</style>