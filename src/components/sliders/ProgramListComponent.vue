<template>
  <div>
    <div class="d-flex align-items-center mb-3 mt-0">
      <div>
        <h2 class="title mb-0" style="font-family: 'Poppins Medium', sans-serif; font-size: 21px; line-height: 25px">
          Programas</h2>
      </div>
      <a href="" class="view-more mx-auto mt-0"></a>
      <button class="view-more-left" role="button" style="background-color: #383838" @click="handleButtonClickProgramListPrev">
        <i class="bi bi-chevron-left" aria-hidden="true" style="color: white"></i>
      </button>
      <button class="view-more-right" role="button" style="background-color: #383838" @click="handleButtonClickProgramListNext">
        <i class="bi bi-chevron-right" aria-hidden="true" style="color: white"></i>
      </button>
    </div>
    <vue-glide :options="options" class="row list mb-3 p-0 gx-0">
      <template slot="control">
        <button ref="buttonPrevProgramList" style="background-color: #383838" data-glide-dir="<" class="d-none">
          <i class="fa fa-angle-left" aria-hidden="true" style="color: white"></i>
        </button>
        <button ref="buttonNextProgramList" style="background-color: #383838" data-glide-dir=">" class="d-none">
          <i class="fa fa-angle-right" aria-hidden="true" style="color: white"></i>
        </button>
      </template>
      <vue-glide-slide v-for="program in programs" :key="program.url">
        <router-link :to="`${program.url}`" tag="a">
          <img :src="`https://ingest.educadorafm.ba.gov.br/icone/${program.src_img}`" class="card-img-top"/>
        </router-link>
      </vue-glide-slide>
    </vue-glide>
  </div>
</template>
<script>
import {Glide, GlideSlide} from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'
export default {
  name: 'ProgramListComponent',
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide
  },
  props: ['programs', 'options'],
  data () {
    return {
      editionsLoaded: false
    }
  },
  methods: {
    handleButtonClickProgramListPrev () {
      this.$refs.buttonPrevProgramList.click()
    },
    handleButtonClickProgramListNext () {
      this.$refs.buttonNextProgramList.click()
    }
  }

}

</script>

<style scoped>
.main .list {
  padding: 0 7px;
}

.main .list .card{
  /** padding: 20px 20px 16px;**/
  /** background-color: #282828; **/
  border-radius: 12px;
  background-color: transparent;
  border: 1px solid #383838;

}
.icone {
  /** padding: 20px 20px 16px;**/
  /** background-color: #282828; **/
  width: 10px;
  border-radius: 12px;
  background-color: transparent;
  border: 1px solid #383838;

}
.main .list .card a img {
  /* border-radius: 12px; */
  border-radius: 20px;
}

.main .list .sonosfera img {
  border-radius: 10px;
}

.main .list .col-12 {
  padding-left: 8px;
  padding-right: 8px;
}

.main .list .card .card-body {
  min-height: 62px;
}

.main .list .card .card-title {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: .24px;
  color: #fff;
  overflow: hidden;
  text-decoration: none;
  margin: 0;
}

.card-line{
  font-size: 13px;
  font-family: 'Poppins', sans-serif;
  font-family: 'Roboto', sans-serif;
  letter-spacing: .15px;
  color: white;
}

.card-title{
  text-decoration: none;
}

.main .list .card .card-text {
  font-size: 12px;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: 4px;
  color: #fff;
  opacity: .6;
}

.main .list .card .btn-play {
  position: absolute;
  right: 16px;
  top: 198px;
  opacity: 1;
}

@media screen and (max-width: 400px) {
  .title {
    font-size: 16px !important;
  }
}
</style>
