<template>
  <div>
    <div class="rating" ref="rating">
      <div class="averageRating">
        <div class="ratingScore">
          <p class="score">{{ info.foodScore }}</p>
          <p class="msg_a">综合评分</p>
          <p class="msg_b">高于周边{{ info.rankRate }}%的商家</p>
        </div>
        <div class="ratingStar">
          <div class="star">
            <Star :score="info.serviceScore" size="20"></Star>
            <p class="msg_a">服务态度</p>
            <p class="msg_b">{{ info.serviceScore }}</p>
          </div>
          <div class="star">
            <Star :score="info.score" size="20"></Star>
            <p class="msg_a">商家评分</p>
            <p class="msg_b">{{ info.score }}</p>
          </div>
          <div class="deliverTime">
            <p class="msg_a">营业时间</p>
            <p class="msg_b">{{ info.workTime }}</p>
          </div>
        </div>
      </div>
      <div class="nullDiv"></div>
      <div class="mainRating">
        <div class="ratingList">
          <div class="countInfo">
            <div
              class="ratingBtn"
              :class="{ checked: btnType === 2 }"
              @click="all"
            >
              全部{{ allRating }}
            </div>
            <div
              class="ratingBtn"
              :class="{ checked: btnType === 0 }"
              @click="good"
            >
              满意{{ goodRating }}
            </div>
            <div
              class="ratingBtn"
              :class="{ checked: btnType === 1 }"
              @click="bad"
            >
              不满意{{ badRating }}
            </div>
            <div class="notNull" @click="toggle">
              <span
                class="iconfont icon-duigou"
                :class="{ noText: !onlyShowText }"
              ></span>
              <p class="msg">只看与内容的评价</p>
            </div>
          </div>
          <ul>
            <li v-for="(item, index) in ratingArr" :key="index">
              <div class="iconfont icon-geren2"></div>
              <div class="right">
                <div class="msg_a">
                  <p class="user">{{ item.username }}</p>
                  <p class="time">{{ item.formatRateTime }}</p>
                </div>
                <div class="msg_b">
                  <Star :score="item.score" size="15" class="star"></Star>
                  <p v-show="item.deliveryTime">
                    配送时间：{{ item.deliveryTime }}分钟
                  </p>
                </div>
                <div class="msg_c">
                  {{ item.text }}
                </div>
                <div class="msg_d">
                  <span
                    class="iconfont"
                    :class="
                      item.rateType ? 'icon-chaping' : 'icon-dianzan_kuai'
                    "
                  ></span>
                  <div
                    v-for="(recommend, index) in item.recommends"
                    :key="index"
                  >
                    {{ recommend }}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "../../../components/Star";
import { mapState } from "vuex";
import dayjs from "dayjs";
export default {
  name: "ShopRating",
  data() {
    return {
      btnType: 2,
      onlyShowText: true,
    };
  },
  components: { Star },
  computed: {
    ...mapState(["info", "rating"]),
    ratingArr() {
      const { rating, onlyShowText, btnType } = this;
      return rating.filter((item) => {
        const { rateType, text } = item;
        /*onlyShowText: true/false
        !onlyShowText||text.length>0

        btnType: 0/1/2
        btnType==2||btnType==rateType
        */
        return (
          (!onlyShowText || text.length > 0) &&
          (btnType == 2 || btnType == rateType)
        );
      });
    },
    allRating() {
      if (this.onlyShowText) {
        return this.rating.reduce((total, current) => {
          if (current.text.length > 0) {
            total++;
          }
          return total;
        }, 0);
      } else {
        return this.rating.length;
      }
    },
    goodRating() {
      if (this.onlyShowText) {
        return this.rating.reduce((total, current) => {
          if (current.text.length > 0 && current.rateType === 0) {
            total++;
          }
          return total;
        }, 0);
      } else {
        return this.rating.reduce((total, current) => {
          if (current.rateType === 0) {
            total++;
          }
          return total;
        }, 0);
      }
    },
    badRating() {
      return this.allRating - this.goodRating;
    },
  },
  methods: {
    all() {
      this.btnType = 2;
    },
    good() {
      this.btnType = 0;
    },
    bad() {
      this.btnType = 1;
    },
    toggle() {
      this.onlyShowText = !this.onlyShowText;
    },
  },
  watch: {
    rating() {
      this.rating.forEach((element) => {
        let formatTime = dayjs(element.rateTime).format("YYYY-MM-DD HH:mm:ss");
        this.$set(element, "formatRateTime", formatTime);
      });
    },
  },
  mounted() {
    this.$store.dispatch("getShopRating");
  },
};
</script>

<style lang="less" scoped>
div {
  .rating {
    width: 100%;
    height: 65%;
    position: absolute;
    top: 35%;
    overflow: hidden;
    .averageRating {
      width: 100%;
      height: 25%;
      border-bottom: 1px solid #ddd;
      display: flex;
      .ratingScore {
        width: 40%;
        height: 100%;
        text-align: center;
        border-right: 1px solid #ddd;
        .score {
          font-size: 1.5rem;
          font-weight: bold;
          color: #f5a100;
          margin-top: 30px;
          margin-bottom: 5px;
        }
        .msg_b {
          margin-top: 5px;
          font-size: 0.9rem;
          color: #aaa;
        }
      }
      .ratingStar {
        width: 60%;
        height: 100%;
        padding-top: 20px;
        .star {
          height: 30px;
          display: flex;
          justify-content: center;
          line-height: 30px;
          .msg_a {
            margin-left: 10px;
          }
          .msg_b {
            font-weight: bold;
            color: #f5a100;
          }
        }
        .deliverTime {
          display: flex;
          margin-left: 30px;
          margin-top: 5px;
          .msg_b {
            color: #aaa;
            margin-left: 20px;
          }
        }
      }
    }
    .nullDiv {
      width: 100%;
      height: 5%;
      background-color: #e5e5e5;
      border-bottom: 1px solid #ddd;
    }
    .mainRating {
      width: 100%;
      height: 70%;
      overflow: scroll;
      .ratingList {
        .countInfo {
          width: 100%;
          height: 100px;
          border-bottom: 1px solid #ccc;
          position: relative;
          .ratingBtn {
            height: 30px;
            width: 70px;
            border: 1px solid #ccc;
            float: left;
            background-color: #ccc;
            margin-left: 15px;
            line-height: 30px;
            text-align: center;
            font-size: 1rem;
            margin-top: 15px;
          }
          .checked {
            background-color: #02a774;
            color: #f5f5f5;
          }
          .notNull {
            margin-left: 20px;
            display: flex;
            height: 20px;
            position: absolute;
            bottom: 10px;
            .icon-duigou {
              font-size: 1.3rem;
              color: #02a774;
            }
            .noText {
              color: #aaa;
            }
            .msg {
              font-size: 0.9rem;
              color: #aaa;
              margin-left: 5px;
              line-height: 20px;
            }
          }
        }
        ul {
          width: 100%;
          li {
            width: 100%;
            min-height: 120px;
            display: flex;
            box-sizing: border-box;
            .icon-geren2 {
              font-size: 2.5rem;
              color: skyblue;
              width: 10%;
              height: 100%;
              margin-top: 15px;
              margin-left: 10px;
            }
            .right {
              height: 100%;
              width: 90%;
              padding-top: 20px;
              padding-left: 5px;
              padding-right: 20px;
              box-sizing: border-box;
              .msg_a {
                height: 15px;
                width: 100%;
                line-height: 15px;
                .user {
                  float: left;
                }
                .time {
                  color: #aaa;
                  float: right;
                }
              }
              .msg_b {
                height: 15px;
                display: flex;
                width: auto;
                line-height: 15px;
                p {
                  font-size: 00.9rem;
                  color: #aaa;
                  margin-left: 5px;
                }
              }
              .msg_c {
                width: 100%;
                height: auto;
                margin-top: 5px;
              }
              .msg_d {
                width: 100%;
                float: left;
                margin-top: 10px;
                .icon-dianzan_kuai {
                  width: 20px;
                  height: 20px;
                  display: block;
                  float: left;
                  font-size: 1rem;
                  color: #f5a100;
                  margin-right: 5px;
                }
                .icon-chaping {
                  width: 20px;
                  height: 20px;
                  display: block;
                  float: left;
                  font-size: 1rem;
                  color: #aaa;
                  margin-right: 5px;
                }
                div {
                  float: left;
                  width: auto;
                  height: 20px;
                  border: 1px solid #ccc;
                  color: #a5a5a5;
                  margin-right: 15px;
                  line-height: 20px;
                  margin-bottom: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>