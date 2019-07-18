<template>
  <b-container fluid style="text-align:right;">
    <link rel="stylesheet" href="/ms.css">

    <b-form @submit="createProduct" >
      <b-row class="my-1">

        <!-- title -->

        <!--ar title-->
        <b-col sm="12">
          <b-form-group id="product-title-group" label="العنوان الخاص بالمنتج باللغة العربية:" label-for="product-title"
                        description="هذا العنوان سيظهر لمستخدمين اللغةالعربية">
            <b-form-input required :state="product.title.ar.length > 4" id="product-title" v-model="product.title.ar" type="text"></b-form-input>
          </b-form-group>
        </b-col>

        <!--en title-->
        <b-col sm="12">
          <b-form-group id="product-title-group" label="العنوان الخاص بالمنتج باللغة الانجليزية:" label-for="product-title"
                        description="هذا العنوان سيظهر لمستخدمين اللغة الانجليزية">
            <b-form-input required :state="product.title.en.length > 4" id="product-title" v-model="product.title.en" type="text"></b-form-input>
          </b-form-group>
        </b-col>

        <!-- price -->
        <b-col sm="12">
          <b-form-group id="product-title-group" label="سعر المنتج:" label-for="product-price"
                        description="من فضلك تأكد ان لوحة المفاتيح باللغة الانجليزية و انت تضيف السعر">
            <b-form-input required :state="product.price > 0" id="product-price" v-model.number="product.price" type="number"></b-form-input>
          </b-form-group>
        </b-col>

        <!-- if has discount -->
        <b-col sm="12">
          <b-form-group id="product-title-group" label="وضع سعر مخفض:" label-for="product-hasDiscount"
                        description="برجاء اختيار هذا الاختيار ان كنت تريد وضع سعر مخفض لهذا المنتج لفترة زمنية مجدولة">
            <b-form-checkbox
                    id="product-hasDiscount"
                    v-model="product.hasDiscount"
                    :value="true"
                    :unchecked-value="false"
            >
              هل تريد وضع تخفيض مجدول على هذا المنتج
            </b-form-checkbox>
          </b-form-group>
        </b-col>

        <!-- discount price -->
        <b-col sm="12" v-if="product.hasDiscount">
          <b-form-group id="product-title-group" label="سعر التخفيض:" label-for="product-price"
                        description="من فضلك يجب ان يكون سعر الخصم أقل من سعر المنتج الاصلى">
            <b-form-input :state="product.discountPrice < product.price && product.discountPrice != null" id="product-price" v-model.number="product.discountPrice" type="number"></b-form-input>
          </b-form-group>
        </b-col>

        <!-- details -->

        <!--ar details-->
        <b-col sm="12">
          <b-form-group id="product-details-group" label="وصف المنتج باللغة العربية:" label-for="product-details"
                        description="هذا الوصف الذى سيظهر لمستخدمين اللغة العربية">
            <b-form-textarea
                    style="
                         border: 1px solid #e1e1e1;
                         border-radius: 5px;
                         "
                    id="product-details"
                    v-model="product.details.ar"

                    rows="3"
                    max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </b-col>


        <!--en details-->
        <b-col sm="12">
          <b-form-group id="product-details-group" label="وصف المنتج باللغة الانجليزية:" label-for="product-details"
                        description="هذا الوصف سيظهر لمستخدمين اللغة الانجليزية">
            <b-form-textarea
                    style="
                         border: 1px solid #e1e1e1;
                         border-radius: 5px;
                         "
                    id="product-details"
                    v-model="product.details.en"
                    rows="3"
                    max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </b-col>


        <!-- categories -->
        <b-col sm="12">
          <b-form-group id="product-details-group" label="القسم:" label-for="product-categories"
                        description="من فضلك اختر القسم الذى ينتمى له المنتج">
            <multiselect v-model="product.categories"
                         :options="categories"
                         :multiple="true"
                         :close-on-select="false"
                         :clear-on-select="false"
                         :preserve-search="true"
                         placeholder="الاقسام"
                         label="name" track-by="_id"
                         :preselect-first="true"
                         selectedLabel="تم"
                         deselectLabel="انقر للازالة"
                         selectLabel="اختر"
                         style="font-size: 12px; text-align: center !important;"
            >
            </multiselect>
          </b-form-group>
        </b-col>

        <!--specification-->
        <b-row>
          <b-col sm="12">
            <p>اضافة المواصفات مثلا الكاميرة ٨ ميجا </p>
          </b-col>
          <b-col sm="3">
            <b-form-group id="product-title-group" label="اسم الصفة باللغة العربية:" label-for="product-price"
                          description="مثلا الكاميرة او حجم الشاشة">
              <b-form-input   v-model.number="newSpec.title.ar"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="3">
            <b-form-group id="product-title-group" label="التفاصيل للصفة باللغة العربية:" label-for="product-price"
                          description="مثلا ١٨ ميجا او ١٠ بوصة">
              <b-form-input   v-model.number="newSpec.details.ar"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="3">
            <b-form-group id="product-title-group" label="اسم الصفة باللغة الانجليزية:" label-for="product-price"
                          description="Example Camera or Screen size">
              <b-form-input   v-model.number="newSpec.title.en"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="3">
            <b-form-group id="product-title-group" label="التفاصيل للصفة باللغة الانجليزية:" label-for="product-price"
                          description="Example 18M or 10 Inch">
              <b-form-input   v-model.number="newSpec.details.en"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12">
            <b-button @click="addSpec" :disabled="newSpec.title.ar.length < 1 || newSpec.title.en.length < 1 || newSpec.details.ar.length < 1 || newSpec.details.en.length < 1" variant="outline-success">اضافة الخاصية</b-button>

          </b-col>
        </b-row>
      </b-row> <!-- end of specs-->
      <!--show specs-->
      <div v-if="tableOfSpecs.length >= 1">
        <b-table striped hover small dark  :items="tableOfSpecs"></b-table>
      </div>

      <!--<button type="submit">انشاء منتج</button>-->
    </b-form>
  </b-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        product:{
          title:{
            ar:'',
            en:''
          },
          details:{
            ar:'',
            en:'',
          },
          categories:[],
          attributes:[],
          price:0,
          hasDiscount:false,
          discountPrice:null,
          discountEnd:null,
          images:[],
          specs:[],
          SizeTableImage:'',
        },
        categories:[],
        newSpec:{
          title:{
            ar:'',
            en:''
          },
          details:{
            ar:'',
            en:''
          }
        },
        tableOfSpecs:[

        ]

      }
    },
    mounted(){
      this.fetchCategories()
    },
    methods:{
      fetchCategories(){
        axios.get('/app/category/get-parents').then(res => this.categories = res.data.cats)
      },
      createProduct(e){
        e.preventDefault();
        console.log('s')

      },
      async addSpec(){
        const newSpec2 =  {
          title:{
            ar:this.newSpec.title.ar,
            en:this.newSpec.title.en
          },
          details:{
            ar:this.newSpec.details.ar,
            en:this.newSpec.details.en
          }
        }
        await this.product.specs.push(newSpec2);
        await this.removeNewSpec()

      },
      removeNewSpec(){
        const newItemForTable = {
          'الاسم بالعربى':this.newSpec.title.ar,
          'الوصف بالعربى':this.newSpec.details.ar,
          'الاسم بالانجليزية':this.newSpec.title.en,
          'الوصف بالانجليزية':this.newSpec.details.en
        };
        this.tableOfSpecs.push(newItemForTable);
        this.newSpec.title.ar = '';
        this.newSpec.title.en = '';
        this.newSpec.details.ar = '';
        this.newSpec.details.en = '';
      }



    },

  }
</script>

<style>

</style>
