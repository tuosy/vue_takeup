<template>
  <div class="main">
    <Header :title="address.name">
      <span class="iconfont icon-sousuo1" slot="left"></span>
      <router-link
        :to="user._id ? '/userInfo' : '/login'"
        class="login"
        slot="right"
      >
        <span
          class="iconfont icon-geren2"
          v-show="user._id"
          style="font-size: 2rem"
        ></span>
        <span v-show="!user._id">登录|注册</span>
      </router-link>
    </Header>
    <div class="show">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(arr, index) in typeArr"
            :key="index"
          >
            <li v-for="(type, index) in arr" :key="index">
              <img :src="baseImageUrl + type.image_url" />
              <p>{{ type.title }}</p>
            </li>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <ShopList></ShopList>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { mapState } from "vuex";
import Header from "../../components/Header";
import ShopList from "../../components/ShopList";
export default {
  name: "Home",
  components: { Header, ShopList },
  data() {
    return {
      baseImageUrl: "https://fuss10.elemecdn.com",
    };
  },
  computed: {
    ...mapState(["address", "categories", "user"]),
    typeArr() {
      //将请求的数据分页管理
      let pageArr = [];
      let arr = [];
      this.categories.forEach((element) => {
        if (arr.length == 0) {
          pageArr.push(arr);
        }
        arr.push(element);
        if (arr.length == 8) {
          arr = [];
        }
        // console.log(pageArr);
      });
      return pageArr;
    },
  },
  watch: {
    //为了让列表创建完成后再去生成轮播实现想过
    categories(value) {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          loop: true, // 循环模式选项

          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
          },
          // autoHeight: true,
          //高度自适应
        });
      });
    },
  },
  mounted() {
    //调用vuex管理的商品分类数据
    this.$store.dispatch("getCategories");
    //商家信息获取
    this.$store.dispatch("getShops");
    // console.log(this.shops);
  },
};
</script>

<style lang="less" scoped>
.main {
  position: absolute;
  top: 0;
  width: 100%;
  height: 91%;
  // box-sizing: border-box;

  .show {
    width: 100%;
    height: 90%;
    overflow-x: hidden;
    overflow-y: scroll;
    .swiper-container {
      height: 40%;
      width: 100%;
      .swiper-wrapper {
        .swiper-slide {
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          border-bottom: 1px solid #ccc;
          box-sizing: border-box;
          li {
            height: 35%;
            width: 18%;
            margin-right: 10px;
            margin-left: 10px;
            margin-top: 10px;
            img {
              height: 80%;
              width: 100%;
              margin-bottom: 5px;
            }
            p {
              font-size: 14px;
              width: 100%;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>