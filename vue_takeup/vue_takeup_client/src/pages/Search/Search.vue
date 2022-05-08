<template>
  <div class="search">
    <Header title="搜索"></Header>
    <form class="center" @submit.prevent="search">
      <input type="text" placeholder="请输入商家或美食名称" v-model="keyword" />
      <button>提交</button>
    </form>
    <div class="shopList" v-if="!isNoShop">
      <ul>
        <router-link
          :to="{ path: '/shop', query: { id: item.id } }"
          tag="li"
          v-for="item in keyShop"
          :key="item.id"
        >
          <img :src="imgBaseUrl + item.image_path" />
          <div class="shopInfo">
            <p class="msg_a">{{ item.name }}</p>
            <p class="msg_b">月售{{ item.recent_order_num }}单</p>
            <p class="msg_c">
              {{ item.float_minimum_order_amount }}元起送/距离{{
                item.distance
              }}
            </p>
          </div>
        </router-link>
      </ul>
    </div>
    <div class="noShop" v-if="isNoShop">很抱歉! 无搜索结果</div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import { mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      keyword: "",
      imgBaseUrl: "http://cangdu.org:8001/img/",
      isNoShop: false,
    };
  },
  components: { Header },
  computed: {
    ...mapState(["keyShop"]),
  },
  methods: {
    search() {
      //获取关键词
      const keyword = this.keyword.trim();
      //异步请求数据
      if (keyword) {
        this.$store.dispatch("getKeyShop", keyword);
      } else {
        alert("未输入搜索信息！");
      }
    },
  },
  watch: {
    keyShop(value) {
      if (value.length) {
        this.isNoShop = false;
      } else {
        this.isNoShop = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  position: absolute;
  top: 0;
  overflow: hidden;
  width: 100%;
  height: 91%;
  .center {
    width: 100%;
    height: 10%;
    padding: 10px;
    box-sizing: border-box;
    input {
      width: 70%;
      height: 90%;
      background-color: #eee;
      border: none;
      border-radius: 3px;
      padding-left: 5%;
      font-size: 1.2rem;
    }
    button {
      background-color: #02a774;
      width: 15%;
      height: 90%;
      border: none;
      border-radius: 3px;
      margin-left: 5%;
      font-size: 1.2rem;
      color: white;
      box-shadow: 2px 2px 2px #000;
    }
    button:active {
      box-shadow: -2px -2px 2px #fff;
    }
  }
  .shopList {
    width: 100%;
    height: 80%;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    overflow: scroll;
    ul > li {
      width: 100%;
      height: 80px;
      border-bottom: 1px solid #ccc;
      padding-top: 10px;
      box-sizing: border-box;
      display: flex;
      img {
        width: 60px;
        height: 60px;
      }
      .shopInfo {
        height: 60px;
        margin-left: 15px;
        p {
          height: 20px;
          line-height: 20px;
          font-size: 1rem;
        }
      }
    }
  }
  .noShop {
    text-align-last: center;
    font-size: 1.2rem;
  }
}
</style>