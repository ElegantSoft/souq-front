import Vue from "vue";

export const bus = new Vue();
import BootstrapVue from "bootstrap-vue";
import moment from "moment";

Vue.use(BootstrapVue);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueFormGenerator from "vue-form-generator";
Vue.use(VueFormGenerator);

import "vue-form-generator/dist/vfg.css";

Vue.config.productionTip = false;
//packages
Vue.component("multiselect", require("vue-multiselect").default);

Vue.component(
  "add-category",
  require("./components/admin/categories/AddCategory.vue").default
);
Vue.component(
  "edit-category",
  require("./components/admin/categories/edit.vue").default
);
Vue.component(
  "control-slider",
  require("./components/admin/slider/ControlSlider.vue").default
);
Vue.component(
  "control-sliderii",
  require("./components/admin/slider/ControlSlider2.vue").default
);
Vue.component(
  "control-banner",
  require("./components/admin/banners/edit.vue").default
);
Vue.component(
  "index-category",
  require("./components/admin/categories/IndexCategory.vue").default
);

//product
Vue.component(
  "create-product",
  require("./components/admin/product/create.vue").default
);
Vue.component(
  "index-product",
  require("./components/admin/product/index.vue").default
);
Vue.component(
  "edit-product",
  require("./components/admin/product/edit.vue").default
);

Vue.component(
  "vue-pagination",
  require("./components/reuseable/VuePagination.vue").default
);

//cards
Vue.component(
  "create-card-category",
  require("./components/admin/cards/categories/create.vue").default
);
Vue.component(
  "edit-card-category",
  require("./components/admin/cards/categories/edit.vue").default
);
Vue.component(
  "create-card-card",
  require("./components/admin/cards/cards/create.vue").default
);
Vue.component(
  "index-card-category",
  require("./components/admin/cards/categories/index.vue").default
);
Vue.component(
  "index-card-card",
  require("./components/admin/cards/cards/index.vue").default
);
Vue.component(
  "edit-card-card",
  require("./components/admin/cards/cards/edit.vue").default
);

//cites
Vue.component(
  "create-city",
  require("./components/admin/cities/create.vue").default
);
Vue.component(
  "index-city",
  require("./components/admin/cities/index.vue").default
);

//payment
Vue.component(
  "index-payment",
  require("./components/admin/payments/index.vue").default
);
Vue.component(
  "edit-payment",
  require("./components/admin/payments/edit.vue").default
);

//coupons
Vue.component(
  "create-coupon",
  require("./components/admin/coupon/create.vue").default
);

//orders
Vue.component(
  "index-order",
  require("./components/admin/orders/index.vue").default
);
Vue.component(
  "show-order",
  require("./components/admin/orders/show.vue").default
);

var filter = function(text, length, clamp) {
  clamp = clamp || "...";
  var node = document.createElement("div");
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};
var formateDate = function(data) {
  if (data) {
    moment.locale("ar_SA");
    return moment(String(data)).fromNow();
  } else {
    return "";
  }
};

Vue.filter("truncate", filter);
Vue.filter("date", formateDate);

new Vue({
  el: "#app"
});
