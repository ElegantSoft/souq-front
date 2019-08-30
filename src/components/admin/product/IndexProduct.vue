<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card product_item_list" style="padding:35px">
        <div class="col-sm-4">
          <div class="form-group">
            <label style="text-align:right">عدد العناصر المعروضة</label>
            <select v-model.number="limit" class="form-control show-tick">
              <option value="5">5</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
				<!-- product-table -->
				<div class="body table-responsive">
          <table class="table table-hover m-b-0">
            <thead>
              <tr>
                <th>#</th>
                <th>الصورة</th>
                <th>العنوان</th>
								<th>العروض</th>
								<th>السعر</th>
								<th>التخفيض</th>
								<th>فى المخزون</th>
                <th data-breakpoints="sm xs md">تعديل او حذف</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cat,i) in categories" :key="cat._id">
                <td>{{i+1}}</td>
                <td>
                  <img :src="'/uploads/cat-thumbs/resized/'+cat.image" width="48" alt="Product img" />
                </td>
                <td>
                  <h5>{{cat.name.ar+' '+cat.name.en}}</h5>
                </td>
                <td>
                  <span class="text-muted">{{cat.parentId ? cat.parentId.name : 'قسم رئيسى'}}</span>
                </td>
                <td>{{cat.productCount}}</td>
                <td>
                  <a
                    :href="'/admin/category/edit/'+cat._id"
                    class="btn btn-default waves-effect waves-float waves-green"
                  >
                    <i class="zmdi zmdi-edit"></i>
                  </a>
                  <button
                    @click="remove(cat,i)"
                    type="button"
                    class="btn btn-default waves-effect waves-float waves-red"
                  >
                    <i class="zmdi zmdi-delete"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
				<!-- product-table -->
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "../../../main";
import axios from "axios";

export default {
  data() {
    return {
      page: 1,
      limit: 5,
      products: [],
      nextPage: null,
      lastPage: 3
    };
  },
  methods: {}
};
</script>

<style>
</style>
