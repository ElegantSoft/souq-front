<template>
  <div class="form-container row container" style="text-align:right">
    <div class="col-sm-12">
      <div class="form-group">
        <label for>اسم البطاقة باللغة العربية</label>
        <input type="text" class="form-control" v-model="newCategory.title.ar" />
      </div>
    </div>

    <div class="col-sm-12">
      <div class="form-group">
        <label for>اسم البطاقة باللغة الانجليزية</label>
        <input type="text" class="form-control" v-model="newCategory.title.en" />
      </div>
    </div>

    <div class="col-sm-12">
      <div class="form-group">
        <label for>السعر</label>
        <input type="number" class="form-control" v-model.number="newCategory.price" />
      </div>
    </div>

    <div class="col-sm-12">
      <div class="form-group">
        <label for>القسم</label>
        <select v-model="newCategory.category" >
          <option v-for="(cat,i) in categories" :key="i"  :value="cat._id">{{cat.name.ar}}</option>
        </select>
      </div>
    </div>

    <div class="col-sm-12">
      <div class="form-group">
        <button
          @click="addCategory"
          style="width:100%"
          type="button"
          class="mt-3 btn btn-md btn-info"
        >اضافة البطاقة</button>
      </div>
    </div>
    <div class="col-sm-12">
      <p v-if="successAdded" class="alert alert-success p-2">تم اضافة البطاقة بنجاح</p>
      <p v-if="failedAdded" class="alert alert-danger p-2">{{errMessage}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      newCategory: {
        title: {
          ar: "",
          en: ""
        },
        price: 0,
        category:null
      },
      successAdded: false,
      errMessage: "",
      failedAdded: false,
      categories:[]
    };
  },
  mounted(){
    this.getCardCategories()
  },
  methods: {
    getCardCategories(){
      axios.get("/app/card/category/paginate?limit=999999").then(res=>{
        this.categories = res.data.data
      })
    },
    addCategory() {
      this.successAdded = false;
      axios({
        url: "/admin/card/card/create",
        method: "POST",
        data: {
          title: this.newCategory.title,
          price:this.newCategory.price,
          category:this.newCategory.category
        }
      }).then(res => {
        if (res.data.message == "success") {
          this.successAdded = true;
          return setTimeout(this.hideMessage, 3000);
        } else {
          this.errMessage = res.data.message;
          this.failedAdded = true;
          return setTimeout(this.hideMessage, 3000);
        }
      });
    },
    hideMessage() {
      this.successAdded = false;
      this.failedAdded = false;
    }
  }
};
</script>

<style scoped>
.form-container {
  padding: 90px;
}
.slider {
  border: 1px solid #e1e1e1;
  padding: 5px;
  background-color: beige;
}
</style>