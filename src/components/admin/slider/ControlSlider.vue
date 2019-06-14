<template>
     <div class="row form-container container" >
<!-- slider -->
          <div class="form-group mb-2" style="border-bottom:1px #e1e1e1 solid" v-for="(slider,i) in sliders" :key="i">
               <div >
                    <span>رقم السلايدر {{i+1}}</span>
                    <br>
                    <span class="text-muted text ">الصورة</span>
                    <img :src="'/uploads/slider/'+slider.image" style="height:200px; width:auto; border:1px #eae1e1 solid; padding: 3px;">
               </div>
               <div class="col-sm-12">
                    <div class="form-group" >
                         <label for="">القسم الرئيسى</label>
                         <select class="form-control show-tick">
                              <option value="category">قسم</option>
                              <option value="product">منتج</option>
                         </select>
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
     },
     methods:{
          fetchSlider(){
               axios.get('/admin/slider/fetch-slider').then(res=>this.sliders = res.data.slider)
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
