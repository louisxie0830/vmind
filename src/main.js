import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "../store";

import "normalize.css";
import "../statics/zwicon.css";
import "./registerServiceWorker";
import SubNode from "./components/SubNode.vue";

Vue.component("SubNode", SubNode);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
