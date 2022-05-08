<template>
  <div class="footer">
    <router-link to="/home" exact active-class="clickClass" class="nav">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <br />
      <span class="title">首页</span>
    </router-link>
    <router-link to="/search" active-class="clickClass" class="nav">
      <span class="item_icon">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <br />
      <span class="title">搜索</span>
    </router-link>
    <router-link to="/order" active-class="clickClass" class="nav">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <br />
      <span class="title">订单</span>
    </router-link>

    <router-link to="/profile" active-class="clickClass" class="nav">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <br />
      <span class="title">我的</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "FooterGuide",
};
</script>
<style lang="less" scoped>
.footer {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  height: 9%;
  width: 100%;
  padding-top: 2%;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  .nav {
    text-decoration: none;
    color: gray;
    .item_icon {
      i {
        display: inline-block;
        font-size: 30px;
        margin-bottom: 5px;
      }
    }
    .title {
    }
  }
  .clickClass {
    color: #02a774;
  }
}
</style>