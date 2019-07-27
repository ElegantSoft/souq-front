<template>
  <b-container fluid style="text-align:right;">
    <link rel="stylesheet" href="/ms.css">

    <b-form @submit="createProduct">
      <b-row class="my-1">

        <!-- title -->

        <!--ar title-->
        <b-col sm="12">
          <b-form-group id="product-title-group" label="العنوان الخاص بالمنتج باللغة العربية:" label-for="product-title"
                        description="هذا العنوان سيظهر لمستخدمين اللغةالعربية">
            <b-form-input required :state="product.title.ar.length > 4" id="product-title" v-model="product.title.ar"
                          type="text"></b-form-input>
          </b-form-group>
        </b-col>

        <!--en title-->
        <b-col sm="12">
          <b-form-group id="product-title-group" label="العنوان الخاص بالمنتج باللغة الانجليزية:"
                        label-for="product-title"
                        description="هذا العنوان سيظهر لمستخدمين اللغة الانجليزية">
            <b-form-input required :state="product.title.en.length > 4" id="product-title" v-model="product.title.en"
                          type="text"></b-form-input>
          </b-form-group>
        </b-col>

        <!-- price -->
        <b-col sm="12">
          <b-form-group id="product-title-group" label="سعر المنتج:" label-for="product-price"
                        description="من فضلك تأكد ان لوحة المفاتيح باللغة الانجليزية و انت تضيف السعر">
            <b-form-input required :state="product.price > 0" id="product-price" v-model.number="product.price"
                          type="number"></b-form-input>
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
            <b-form-input :state="product.discountPrice < product.price && product.discountPrice != null"
                          id="product-price" v-model.number="product.discountPrice" type="number"></b-form-input>
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
            <h5 class="mt-3 mb-3 text-success">اضافة المواصفات مثلا الكاميرة ٨ ميجا </h5>
          </b-col>
          <b-col sm="3">
            <b-form-group id="product-title-group" label="اسم الصفة باللغة العربية:" label-for="product-price"
                          description="مثلا الكاميرة او حجم الشاشة">
              <b-form-input v-model="newSpec.title.ar"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="3">
            <b-form-group id="product-title-group" label="التفاصيل للصفة باللغة العربية:" label-for="product-price"
                          description="مثلا ١٨ ميجا او ١٠ بوصة">
              <b-form-input v-model="newSpec.details.ar"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="3">
            <b-form-group id="product-title-group" label="اسم الصفة باللغة الانجليزية:" label-for="product-price"
                          description="Example Camera or Screen size">
              <b-form-input v-model="newSpec.title.en"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="3">
            <b-form-group id="product-title-group" label="التفاصيل للصفة باللغة الانجليزية:" label-for="product-price"
                          description="Example 18M or 10 Inch">
              <b-form-input v-model="newSpec.details.en"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12">
            <b-button block @click="addSpec"
                      :disabled="newSpec.title.ar.length < 1 || newSpec.title.en.length < 1 || newSpec.details.ar.length < 1 || newSpec.details.en.length < 1"
                      variant="success">اضافة الخاصية
            </b-button>

          </b-col>
        </b-row>
      </b-row> <!-- end of specs-->
      <!--show specs-->
      <div v-if="tableOfSpecs.length >= 1">
        <b-table striped hover small :items="tableOfSpecs"></b-table>
      </div>


      <!--attributes-->
      <b-row>
        <b-col sm="12">
          <h5 class="mt-3 mb-3 text-success">اضافة المتغيرات مثلا المساحة ١٦ جيجا و ٣٢ جيجا و ٦٤ جيجا </h5>
        </b-col>

        <b-col sm="4">
          <b-form-group id="product-title-group" label="اسم المتغير باللغة العربية :" label-for="product-price"
                        description="مثلا المساحة او اللون">
            <b-form-input v-model="newAttr.attr_name.ar"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="8">
          <b-form-group id="product-title-group"
                        label="ادخل المتغيرات باللغة العربية متبوعة بفاصلة , (ستاجد الفاصلة عند الضغط على shift + 'و' ) :"
                        label-for="product-price"
                        description=" مثلا: احمر,اخضر,اصفر,ازرق">
            <b-form-input v-model="newAttr.attr_values.ar"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col sm="4">
          <b-form-group id="product-title-group" label="اسم المتغير باللغة الانجليزية :" label-for="product-price"
                        description="Example: storage or color">
            <b-form-input v-model="newAttr.attr_name.en"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="8">
          <b-form-group id="product-title-group"
                        label="ادخل المتغيرات باللغة الانجليزية متبوعة بفاصلة , (ستاجد الفاصلة عند الضغط على shift + 'و' ) :"
                        label-for="product-price"
                        description=" Example: red,blue,green">
            <b-form-input v-model="newAttr.attr_values.en"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="12">
          <b-button block @click="addAttr"
                    :disabled="newAttr.attr_name.ar.length < 1 || newAttr.attr_name.en.length < 1 || newAttr.attr_values.ar.length < 1 || newAttr.attr_values.en.length < 1"
                    variant="success">اضافة المتغيرات
          </b-button>

        </b-col>

        <!--show attr-->
        <b-col sm="12" v-if="tableOfAttrs.length >= 1">
          <table class="table table-striped table-sm table-hover ">
            <thead>
            <tr>
              <th scope="col">اسم المتغير عربى</th>
              <th scope="col">اسم المتغير انجليزى</th>
              <th scope="col">المتغيرات بالعربية</th>
              <th scope="col">المتغيرات بالانجليزية</th>
              <th scope="col">حذف</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(table,i) in tableOfAttrs" :key="i">
              <th scope="row">{{table.arTitle}}</th>
              <td>{{table.enTitle}}</td>
              <td v-html="table.arAttr"></td>
              <td v-html="table.enAttr"></td>
              <td>
                <b-button @click="deleteAttr(i)" variant="danger"> حذف</b-button>
              </td>
            </tr>

            </tbody>
          </table>


        </b-col>
        <div class="row" v-if="tableOfAttrs.length >= 1">
          <div class="col-12">
            <h5 class="mt-3 mb-3 text-success">عند الانتهاء من اضافة كل المتغيرات اضغط هنا لاضافة القطع </h5>
          </div>

          <div class="col-6">
            <div class="row">
              <div class="col-12">
              </div>
              <b-col sm="12" v-for="(attr,i) in product.attributes" :key="i">
                <label> اسم المتغير
                  <span class="text-success">{{attr.attr_name.ar +' - ' + attr.attr_name.en}} </span>
                </label>
                <select class="form-control" @change="selectChanged($event,i)">
                  <option v-for="(value ,i) in attr.attr_values" :value="i" :key="i">{{value.ar+' - '+value.en}}
                  </option>
                </select>

              </b-col>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <b-col sm="12">
                <b-form-group id="product-title-group" label="عدد القطع فى هذا المنتج فى المخزن "
                              label-for="product-price"
                              description=" مثال ٥ قطع ">
                  <b-form-input v-model="newPieces.inStock"></b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12">
                <b-form-group id="product-title-group" label="السعر لهذه القطعة " label-for="product-price"
                              description=" مثال ٢٠٠ ">
                  <b-form-input v-model="newPieces.inStock"></b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12">
                <b-form-group id="product-title-group" label="وضع سعر مخفض:"
                              description="برجاء اختيار هذا الاختيار ان كنت تريد وضع سعر مخفض لهذا المنتج لفترة زمنية مجدولة">
                  <b-form-checkbox
                    v-model="newPieces.hasDiscount"
                    :value="true"
                    :unchecked-value="false"
                  >
                    هل تريد وضع تخفيض مجدول على هذا المنتج
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <!-- discount price -->
              <b-col sm="12" v-if="newPieces.hasDiscount">
                <b-form-group id="product-title-group" label="سعر التخفيض:" label-for="product-price"
                              description="من فضلك يجب ان يكون سعر الخصم أقل من سعر المنتج الاصلى">
                  <b-form-input v-model="newPieces.discountPrice" type="number"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="12" v-if="newPieces.hasDiscount">
                <b-form-group label="تاريخ انتهاء التخفيض:" label-for="product-price"
                              description="لن يعمل التخفيض عند انتهاء التاريخ">
                  <datepicker style="width:100%" placeholder="تاريخ انتهاء التخفيض" v-model="newPieces.discountEnd"
                              name="DisCountEnd"></datepicker>
                </b-form-group>
              </b-col>
              <b-col sm="12">

                <b-button block variant="success">اضافة القطعة</b-button>

              </b-col>

            </div>
          </div>
        </div>
      </b-row>
      <!--<button type="submit">انشاء منتج</button>-->
    </b-form>
  </b-container>
</template>

<script>
  import axios from 'axios'
  import Datepicker from 'vuejs-datepicker'

  export default {
    components: {
      Datepicker
    },

    data() {
      return {
        product: {
          title: {
            ar: '',
            en: ''
          },
          details: {
            ar: '',
            en: '',
          },
          categories: [],
          attributes: [],
          price: 0,
          hasDiscount: false,
          discountPrice: null,
          discountEnd: null,
          images: [],
          specs: [],
          pieces: [],
          SizeTableImage: '',
        },
        categories: [],
        newSpec: {
          title: {
            ar: '',
            en: ''
          },
          details: {
            ar: '',
            en: ''
          }
        },
        tableOfSpecs: [],

        //attributes

        newAttr: {
          attr_name: {
            ar: '',
            en: ''
          },
          attr_values: {
            ar: '',
            en: ''

          }
        },

        tableOfAttrs: [],

        newPieces: {
          attributes: [],
          price: null,
          hasDiscount: false,
          discountPrice: null,
          discountEnd: null,
          inStock: 0
        }

      }
    },
    mounted() {
      this.fetchCategories()
    },
    methods: {
      selectChanged(e, i) {
        const selectedValueIndex = e.target.value;
        this.newPieces.attributes[i].attr_value.ar = this.product.attributes[i].attr_values[selectedValueIndex].ar;
        this.newPieces.attributes[i].attr_value.en = this.product.attributes[i].attr_values[selectedValueIndex].en;
        // console.log(selectedValueIndex,i)
      },
      fetchCategories() {
        axios.get('/app/category/get-parents').then(res => this.categories = res.data.cats)
      },
      createProduct(e) {
        e.preventDefault();
        console.log('s')

      },
      async addSpec() {
        const newSpec2 = {
          title: {
            ar: this.newSpec.title.ar,
            en: this.newSpec.title.en
          },
          details: {
            ar: this.newSpec.details.ar,
            en: this.newSpec.details.en
          }
        };
        await this.product.specs.push(newSpec2);
        await this.removeNewSpecAndAssignToTable()

      },
      removeNewSpecAndAssignToTable() {
        const newItemForTable = {
          'الاسم بالعربى': this.newSpec.title.ar,
          'الوصف بالعربى': this.newSpec.details.ar,
          'الاسم بالانجليزية': this.newSpec.title.en,
          'الوصف بالانجليزية': this.newSpec.details.en
        };
        this.tableOfSpecs.push(newItemForTable);
        this.newSpec.title.ar = '';
        this.newSpec.title.en = '';
        this.newSpec.details.ar = '';
        this.newSpec.details.en = '';
      },
      addAttr() {
        const ar_title = this.newAttr.attr_name.ar;
        const en_title = this.newAttr.attr_name.en;

        const ar_values_array = this.newAttr.attr_values.ar.split(',');
        const ar_values_array_filtered = ar_values_array.filter((item) => {
          return item != ''
        });

        const en_values_array = this.newAttr.attr_values.en.split(',');
        const en_values_array_filtered = en_values_array.filter((item) => {
          return item != ''
        });
        let TableOfAttr = {
          arTitle: ar_title,
          enTitle: en_title,
          arAttr: '',
          enAttr: '',
        };
        TableOfAttr.arAttr += '<div>';
        ar_values_array_filtered.forEach((item) => {
          TableOfAttr.arAttr += '<span class="badge badge-success">' + item + '</span>'
        });
        TableOfAttr.arAttr += '</div>';

        TableOfAttr.enAttr += '<div>';
        en_values_array_filtered.forEach((item) => {
          TableOfAttr.enAttr += '<span class="badge badge-success">' + item + '</span>'
        });
        TableOfAttr.enAttr += '</div>';
        this.tableOfAttrs.push(TableOfAttr);

        //add to original product
        let oneAttr = {
          attr_name: {
            ar: ar_title,
            en: en_title
          },
          attr_values: []
        };
        ar_values_array_filtered.forEach((item) => {
          return oneAttr.attr_values.push({
            ar: item,
            en: ''
          })
        });

        oneAttr.attr_values.map((item, i) => {
          return item.en = en_values_array_filtered[i];
        });
        this.product.attributes.push(oneAttr);


        let attribute = {
          attr_name: {
            ar: ar_title,
            en: en_title
          },
          attr_value: {
            ar: ar_values_array_filtered[0],
            en: en_values_array_filtered[0]

          }
        };
        this.newPieces.attributes.push(attribute);
        this.newAttr.attr_name.ar = '';
        this.newAttr.attr_name.en = '';
        this.newAttr.attr_values.ar = '';
        this.newAttr.attr_values.en = ''

      },

      deleteAttr(id) {
        this.$delete(this.tableOfAttrs, id);
        this.$delete(this.product.attributes, id);
        this.$delete(this.newPieces.attributes, id)
      }


    },

  }
</script>

<style>

</style>
