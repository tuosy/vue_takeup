<template>
  <div class="header">
    <slot name="left"></slot>
    <h1>{{ title }}</h1>
    <slot name="right"></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  props: ["title"],
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 10%;
  background-color: #02a774;
  color: white;
  display: flex;
  .iconfont {
    height: 100%;
    margin-left: 20px;
    margin-right: 20px;
    font-size: 2rem;
    line-height: 70px;
  }
  h1 {
    height: 100%;
    width: 50%;
    font-size: 1.4rem;
    text-align: center;
    margin: 20px auto;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .login {
    height: 100%;
    font-size: 1.2rem;
    margin-right: 20px;
    line-height: 65px;
    text-decoration: none;
    color: white;
  }
}
</style>