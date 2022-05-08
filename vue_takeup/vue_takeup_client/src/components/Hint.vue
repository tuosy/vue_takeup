<template>
  <div class="mask">
    <div class="hint">
      <div class="hint_info">
        <span class="iconfont icon-jinggao"></span>
        <div class="msg">{{ msg }}</div>
      </div>
      <button @click="showAlert">确认</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hint",
  props: ["msg"],
  methods: {
    showAlert() {
      this.$bus.$emit("closeAlert");
    },
  },
};
</script>

<style lang="less" scoped>
.mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  .hint {
    height: 25%;
    width: 60%;
    margin: 60% auto;
    padding-top: 3%;
    border-radius: 5px;
    background-color: aliceblue;
    box-sizing: border-box;
    .hint_info {
      width: 100%;
      height: 70%;
      .iconfont {
        width: 100%;
        display: block;
        text-align: center;
        font-size: 5rem;
        color: #f5bc00;
        // font-weight: 200;
      }
      .msg {
        margin-top: 8px;
        font-size: 1rem;
        text-align: center;
      }
    }
    button {
      height: 30%;
      width: 100%;
      background-color: #02a774;
      border: none;
      border-radius: 5px;
      color: white;
      font-size: 1.3rem;
      font-weight: bold;
    }
  }
}
</style>