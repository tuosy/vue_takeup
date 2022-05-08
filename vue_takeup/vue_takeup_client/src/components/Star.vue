<template>
  <div class="star">
    <div v-for="(item, index) in starArr" :key="index">
      <span
        class="iconfont icon-shiwujiaoxing"
        v-show="item == 1"
        :style="{ fontSize: `${size}px` }"
      ></span>
      <span
        class="iconfont icon-ai64"
        v-show="item == 0"
        :style="{ fontSize: `${size}px` }"
      ></span>
      <span
        class="iconfont icon-ai65"
        v-show="item == 0.5"
        :style="{ fontSize: `${size}px` }"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Star",
  props: ["score", "size"],
  computed: {
    starArr() {
      let arr = [];
      let on = Math.floor(this.score);
      for (var i = 0; i < on; i++) {
        arr.push(1);
      }
      if ((this.score - on) * 10 >= 5) {
        arr.push(0.5);
      }
      while (arr.length < 5) {
        arr.push(0);
      }
      return arr;
    },
  },
};
</script>

<style lang="less" scoped>
.star {
  color: #f5a100;
  display: flex;
}
</style>