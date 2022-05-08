<template>
  <div>
    <div class="goods">
      <div class="left">
        <ul>
          <li
            v-for="(item, index) in goods"
            :key="index"
            :class="{ activeBc: index === currentIndex }"
            @click="currentScroll(index)"
          >
            <img :src="item.icon" v-if="item.icon" />
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <li v-for="(item, index) in goods" :key="index" ref="foodClass">
            <h4>{{ item.name }}</h4>
            <ul>
              <li
                v-for="(food, index) in item.foods"
                :key="index"
                @click="foodShow(food)"
              >
                <img :src="food.icon" class="foodIcon" />
                <h5 class="foodName">{{ food.name }}</h5>
                <p class="foodMs" v-if="food.description">
                  {{ food.description }}
                </p>
                <div :class="food.description ? 'foodInfo' : 'teshu'">
                  <p>月售{{ food.sellCount }}份</p>
                  <p>好评率{{ food.rating }}%</p>
                </div>
                <div class="foodPrice">
                  <p class="new">￥{{ food.price }}</p>
                  <p class="old" v-show="food.oldPrice">
                    ￥{{ food.oldPrice }}
                  </p>
                </div>
                <CarControl class="carCon" :food="food">CarControl</CarControl>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCar class="shopCar"></ShopCar>
    </div>
    <Food class="foodMask" :itemFood="itemFood" v-show="isShow"></Food>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
import CarControl from "../../../components/CarControl";
import Food from "../../../components/Food";
import ShopCar from "../../../components/ShopCar";
export default {
  data() {
    return {
      scrollY: 0,
      topsArr: [],
      itemFood: {},
      isShow: false,
    };
  },
  components: { CarControl, Food, ShopCar },
  computed: {
    ...mapState(["goods"]),
    currentIndex() {
      const { scrollY, topsArr } = this;
      //寻找滚动位置的下标
      const index = topsArr.findIndex((item, index) => {
        return scrollY >= item && scrollY < topsArr[index + 1];
      });
      return index;
    },
  },
  methods: {
    //初始化scrollY
    _initScrollY() {
      this.bsRight.on("scroll", (position) => {
        // console.log(position);
        this.scrollY = Math.abs(position.y);
      });
      this.bsRight.on("scrollEnd", (position) => {
        this.scrollY = Math.abs(position.y);
      });
    },
    //初始化topsArr
    _initTopsArr() {
      const tops = [];
      const lis = this.$refs.foodClass;
      let top = 0;
      tops.push(top);
      lis.forEach((li) => {
        tops.push(li.offsetTop + li.offsetHeight);
      });
      this.topsArr = tops;
    },
    currentScroll(index) {
      const positionY = this.topsArr[index];
      //使左侧被点击的元素立即生效
      // this.scrollY = positionY;
      //使右侧的列表滚动到相应位置，scrollTo(x,y,time,easing);easing类型为对象
      this.bsRight.scrollTo(0, -positionY, 100);
    },
    //食品显示
    foodShow(food) {
      this.itemFood = food;
      this.isShow = true;
    },
    closeFood() {},
  },
  watch: {
    goods() {
      this.$nextTick(() => {
        //在列表挂载完毕后创建滚动
        this.bsLeft = new BScroll(".left", {
          pullUpLoad: true, //重新加载
          click: true,
          disableTouch: false,
        });
        this.bsRight = new BScroll(".right", {
          pullUpLoad: true, //重新加载
          probeType: 2, //滚动的监听方式
          click: true,
          mouseWheel: true,
        });
        this._initScrollY();
        this._initTopsArr();
      });
    },
  },
  mounted() {
    this.$store.dispatch("getShopGoods");
    this.$bus.$on("closeFood", (isShow) => {
      this.isShow = isShow;
    });
  },
  beforeDestroy() {
    this.$bus.$off("closeFood");
  },
};
</script>

<style lang="less" scoped>
.activeBc {
  background-color: #f5f5f5;
  color: #02a774;
}
.goods {
  width: 100%;
  overflow: hidden;
  .left {
    float: left;
    height: 57%;
    width: 20%;
    background-color: #eee;
    overflow: hidden;
    position: absolute;
    top: 35%;
    left: 0px;
    ul > li {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: center;
      img {
        height: 15px;
        width: 15px;
        margin-top: 15px;
        // margin-left: 15px;
        margin-right: 5px;
      }
      p {
        margin-top: 15px;
        font-size: 0.9rem;
        font-weight: bold;
      }
    }
  }
  .right {
    float: right;
    height: 57%;
    width: 80%;
    overflow: hidden;
    position: absolute;
    top: 35%;
    left: 20%;
    ul > li {
      width: 100%;
      h4 {
        width: 100%;
        height: 30px;
        line-height: 30px;
        background: #eee;
        border-left: 1px solid #aaa;
        padding-left: 20px;
        color: #aaa;
        font-size: 0.9rem;
        font-weight: 550;
      }
      ul > li {
        width: 100%;
        height: 120px;
        padding: 20px;
        position: relative;
        box-sizing: border-box;
        .foodIcon {
          height: 70px;
          width: 70px;
        }
        .foodName {
          font-size: 1.1rem;
          font-weight: bold;
          position: absolute;
          top: 20px;
          left: 100px;
        }
        .foodMs {
          width: 60%;
          height: 20px;
          line-height: 20px;
          font-size: 0.9rem;
          color: #aaa;
          position: absolute;
          top: 45px;
          left: 100px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .teshu {
          display: flex;
          position: absolute;
          top: 55px;
          left: 100px;
          p {
            margin-right: 20px;
            font-size: 0.9rem;
            color: #aaa;
          }
        }
        .foodInfo {
          display: flex;
          position: absolute;
          top: 70px;
          left: 100px;
          p {
            margin-right: 20px;
            font-size: 0.9rem;
            color: #aaa;
          }
        }
        .foodPrice {
          display: flex;
          position: absolute;
          top: 90px;
          left: 100px;
          .new {
            font-size: 1rem;
            font-weight: bold;
            color: red;
          }
          .old {
            font-size: 0.8rem;
            color: #aaa;
            margin-left: 5px;
            line-height: 18px;
            text-decoration: line-through;
          }
        }
        .carCon {
          position: absolute;
          top: 90px;
          right: 20px;
        }
      }
    }
  }
  .shopCar {
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
  }
}
.foodMask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>