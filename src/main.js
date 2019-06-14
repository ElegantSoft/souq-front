import Vue from 'vue'

export const bus = new Vue

Vue.config.productionTip = false
Vue.component('add-category', require('./components/admin/categories/AddCategory.vue').default);
Vue.component('control-slider', require('./components/admin/slider/ControlSlider.vue').default);
Vue.component('index-category', require('./components/admin/categories/IndexCategory.vue').default);
Vue.component('vue-pagination', require('./components/reuseable/VuePagination.vue').default);

new Vue({
  el: '#app'
});  
