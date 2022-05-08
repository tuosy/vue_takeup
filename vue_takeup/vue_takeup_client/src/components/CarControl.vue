<template>
  <div class="carControl">
    <transition name="remove">
      <div
        class="iconfont icon-remove"
        id="remove"
        v-show="food.count"
        @click.stop="updateFoodCount(false)"
      ></div>
    </transition>
    <div class="foodCount" v-show="food.count">{{ food.count }}</div>
    <div
      class="iconfont icon-zengjia"
      id="add"
      @click.stop="updateFoodCount(true)"
    ></div>
  </div>
</template>

<script>
export default {
  name: "CarControl",
  props: {
    food: Object,
  },
  methods: {
    updateFoodCount(isAdd) {
      this.$store.dispatch("updateFoodCount", { isAdd, food: this.food });
    },
  },
};
</script>

<style lang="less" scoped>
.carControl {
  display: flex;
  .remove-enter-active,
  .remove-leave-active {
    transition: all 0.3s;
  }
  .remove-enter,
  .remove-leave-to {
    transform: translateX(20px) rotate(180deg);
    opacity: 0;
  }
  #remove {
    margin-top: 1px;
    font-size: 1.6rem;
    color: #02a774;
  }
  .foodCount {
    // height: 20px;
    // line-height: 27px;
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 1rem;
  }
  #add {
    font-size: 1.8rem;
    color: #02a774;
  }
}
</style>