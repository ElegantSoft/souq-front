<template>
  <div style="text-align:right">
    <link rel="stylesheet" href="/ms.css" />
    <b-col sm="12">
      <b-form-group
        label="الاقسام:"
        label-for="product-categories"
        description="من فضلك اختر الاقسام الخاصة بالكوبون او اتركها فارغة ان كنت تريد عمل كوبون للمنتجات"
      >
        <multiselect
          v-model="modelCategories"
          :options="categories"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="الاقسام"
          :custom-label="handleNameCat"
          track-by="_id"
          :preselect-first="true"
          selectedLabel="تم"
          deselectLabel="انقر للازالة"
          selectLabel="اختر"
          style="font-size: 12px; text-align: center !important;"
        ></multiselect>
      </b-form-group>
    </b-col>
    <b-col sm="12">
      <b-form-group
        label="المنتجات:"
        label-for="product-categories"
        description="من فضلك اختر المنتجات الخاصة بالكوبون او اتركها فارغة ان كنت تريد عمل كوبون للاقسام"
      >
        <multiselect
          v-model="modelProducts"
          :options="products"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="المنتجات"
          :custom-label="handleNameProduct"
          track-by="_id"
          :preselect-first="true"
          selectedLabel="تم"
          deselectLabel="انقر للازالة"
          selectLabel="اختر"
          style="font-size: 12px; text-align: center !important;"
        ></multiselect>
      </b-form-group>
    </b-col>
    <b-col sm="12">
      <b-form-group
        label="الحد الادنى لاستخدام الكوبون:"
        label-for="product-title"
        description="هو الحد الادنى لمجموع المبلغ فى السلة  "
      >
        <b-form-input v-model.number="min" type="text"></b-form-input>
      </b-form-group>
    </b-col>
    <b-col sm="12">
      <b-form-group
        label="قيمة الخصم:"
        label-for="product-title"
        description="هى القيمة التى تخصم من اجمالى مبلغ الطلب للعميل  "
      >
        <b-form-input v-model.number="discount" type="text"></b-form-input>
      </b-form-group>
    </b-col>
    <b-col sm="12">
      <b-form-group
        label="الكوبون:"
        label-for="product-title"
        description="ادخل الكوبون مثلا (ASD345)  "
      >
        <b-form-input v-model="code" type="text"></b-form-input>
      </b-form-group>
    </b-col>
    <button type="button" class="btn btn-block btn-success" @click="create">اضافة كوبون</button> 
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      categories: [],
      products: [],
      min: 0,
      code: 0,
      discount: 0,
      modelCategories: [],
			modelProducts: [],    
  

    };
  },
  mounted() {
    this.getCategories();
    this.getProducts();
  },
  methods: {
    getCategories() {
      Axios.get("/app/category/get-children").then(
        res => (this.categories = res.data.cats)
      );
    },
    getProducts() {
      Axios.get("/moderator/product/all-names").then(
        res => (this.products = res.data.products)
      );
    },
    handleNameCat(cat) {
      return cat.name.ar + " " + cat.name.en;
    },
    handleNameProduct(cat) {
      return cat.title.ar + " " + cat.title.en;
    },
    create() {
      Axios.post("/moderator/coupon/", {
        newCoupon: {
					product: this.modelProducts,
					category: this.modelCategories,
					min: this.min,
					code: this.code,
					discount: this.discount,
				}
      }).then(res => {
        if (res.status == 201) {
          alert("تم الاضافة بنجاح");
        }
      });
    }
  }
};
</script>
