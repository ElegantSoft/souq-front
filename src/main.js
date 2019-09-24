import Vue from "vue";

export const bus = new Vue();
import BootstrapVue from "bootstrap-vue";

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
Vue.component(
  "create-product",
  require("./components/admin/product/CreateProduct.vue").default
);
Vue.component(
  "index-product",
  require("./components/admin/product/IndexProduct.vue").default
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
new Vue({
  el: "#app"
});
