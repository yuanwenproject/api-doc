import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import JsonViewer from "vue-json-viewer";
import ElementUI from "element-ui";
import enterViewport from "./utils/enterViewport";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(JsonViewer).use(ElementUI);
Vue.config.productionTip = false;
Vue.directive("enter-viewport", enterViewport);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
