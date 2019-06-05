import Vue from "vue";
import Vuex, { Store } from "vuex";
Vue.use(Vuex);

import node from "./modules/node";
import mindMap from "./modules/mindMap";
import history from "./modules/history";

const state = {
  global: {
    title: localStorage.getItem("title") || "Not named",
    themeIndex: +localStorage.getItem("themeIndex") || 0,
    themeList: [
      {
        main: "#eda938",
        light: "#f4cc87",
        dark: "#e79021",
        ex: "#ce7529",
        assist: "#1980da"
      },
      {
        main: "#ff4c26",
        light: "#ffcabc",
        dark: "#e83f1d",
        ex: "#c12a0f",
        assist: "#0e95ac"
      },
      {
        main: "#50b843",
        light: "#c3e5bd",
        dark: "#28ab17",
        ex: "#038b00",
        assist: "#790595"
      },
      {
        main: "#2d99d7",
        light: "#e2f5ff",
        dark: "#2786c3",
        ex: "#2375af",
        assist: "#ca6c27"
      },
      {
        main: "#b347d2",
        light: "#e4c0ef",
        dark: "#a623c9",
        ex: "#9621c3",
        assist: "#009000"
      },
      {
        main: "#555555",
        light: "#e9e9e9",
        dark: "#434343",
        ex: "#262626",
        assist: "#860314"
      }
    ]
  }
};

const mutations = {};

const getters = {
  getGlobal: state => state.global
};

export default new Store({
  state,
  mutations,
  getters,
  modules: {
    node,
    mindMap,
    history
  }
});
