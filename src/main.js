import Vue from 'vue'

export const bus = new Vue
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
//packages
Vue.component('multiselect', require('vue-multiselect').default);


Vue.component('add-category', require('./components/admin/categories/AddCategory.vue').default);
Vue.component('control-slider', require('./components/admin/slider/ControlSlider.vue').default);
Vue.component('index-category', require('./components/admin/categories/IndexCategory.vue').default);
Vue.component('create-product', require('./components/admin/product/CreateProduct.vue').default);
Vue.component('vue-pagination', require('./components/reuseable/VuePagination.vue').default);

new Vue({
  el: '#app'
});  
