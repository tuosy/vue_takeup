<template>
  <div class="app">
    <router-view></router-view>
    <FooterGuide v-show="isShow"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide";
import Home from "./pages/Home/Home";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: { FooterGuide, Home },
  computed: {
    isShow() {
      return this.$route.meta.showFooter;
    },
  },
  methods: {
    ...mapActions(["getAddress", "getUserInfo"]),
  },
  mounted() {
    this.getAddress();
    this.getUserInfo();
  },
};
</script>

<style>
@import "./assets/css/reset.css";
::-webkit-scrollbar {
  display: none;
}
.app {
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
}
</style>
