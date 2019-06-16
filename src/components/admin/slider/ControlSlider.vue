<template>
     <div class="row form-container container" >
          <link rel="stylesheet" href="/ms.css">
<!-- slider -->
          <div class="form-group col-sm-12 mb-2" style="border-bottom:1px #e1e1e1 solid" v-for="(slider,i) in sliders" :key="i">
               <div >
                    <span>رقم السلايدر {{i+1}}</span>
                    <br>
                    <span class="text-muted text ">الصورة</span>
                    <img :src="'/uploads/slider/'+slider.image" style="height:200px; width:auto; border:1px #eae1e1 solid; padding: 3px;">
               </div>
               <div class="col-sm-12">
                    <div class="form-group" >
                         <label for="">القسم الرئيسى</label>
                         <select v-model="slider.refType" @change="typeChanged(slider)" class="form-control show-tick">
                              <option value="category">قسم</option>
                              <option value="product">منتج</option>
                         </select>
                    </div>
               </div>
               <div class="col-sm-12" v-if="slider.refType == 'category'">
                    <div class="form-group">
                         <label >من فضلك اختر القسم</label>
                         <multiselect v-model="slider.refId"
                                        :options="categories"
                                        :multiple="false"
                                        :close-on-select="true"
                                        :clear-on-select="false"
                                        :preserve-search="true"
                                        placeholder="الاقسام"
                                        label="name" track-by="name"
                                        :preselect-first="false"
                                        selectedLabel="تم"
                                        deselectLabel="انقر للازالة"
                                        selectLabel="اختر"
                                        style="font-size: 12px; text-align: center !important;"
                         >
                         </multiselect>
                    
                    </div>
               </div>

               <div class="col-sm-12" v-if="slider.refType == 'product'">
                    <div class="form-group">
                         <label >من فضلك اختر المنتج</label>
                         <multiselect v-model="slider.refId"
                                        :options="products"
                                        :multiple="false"
                                        :close-on-select="true"
                                        :clear-on-select="false"
                                        :preserve-search="true"
                                        placeholder="المنتجات"
                                        label="title" track-by="_id"
                                        :preselect-first="false"
                                        selectedLabel="تم"
                                        deselectLabel="انقر للازالة"
                                        selectLabel="اختر"
                                        style="font-size: 12px; text-align: center !important;"
                         >
                         </multiselect>
                    </div>
               </div>
               

          </div>
     </div>


</template>

<script>
import axios from 'axios'
export default {
     data(){
          return{
               sliders:[],
               categories:[],
               products:[]
          }
     },
     mounted(){
          this.fetchSlider()
          this.fetchCategories()
          this.fetchProducts()
     },
     methods:{
          fetchSlider(){
               axios.get('/admin/slider/fetch-slider').then(res=>this.sliders = res.data.slider)
          },
          fetchCategories(){
               axios.get('/api/category/get-parents').then(res => this.categories = res.data.cats)
          },
          fetchProducts(){
               axios.get('/api/product/fetch-all').then(res => this.products = res.data.products)
          },
          typeChanged(slider){
               if(slider.refType == 'product'){
                    return slider.refId = this.products[0]
               }
               if(slider.refType == 'category'){
                    return slider.refId = this.categories[0]
               }

          }
     }
}
</script>

<style scoped>
     .form-container {

          
     }
     .slider{
          border:1px solid #e1e1e1;
          padding:30px;
          background-color:beige
     }
</style>
