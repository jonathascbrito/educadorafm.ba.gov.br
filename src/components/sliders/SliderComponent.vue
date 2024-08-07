<template>
<div>
  <div class="d-flex align-items-center mb-3 mt-0">
    <div>
      <h2 class="title mb-0" style="font-family: 'Poppins Medium', sans-serif; font-size: 21px; line-height: 25px">
        {{editions.title}}
      </h2>
    </div>
    <a href="" class="view-more mx-auto mt-0"></a>
    <div slot="control">
      <button class="view-more-left glide--ltr" role="button" style="background-color: #383838" data-glide-dir="<" @click="handleButtonClick1">
        <i class="bi bi-chevron-left" aria-hidden="true" style="color: white"></i>
      </button>
      <button class="view-more-right glide--rtl" role="button" style="background-color: #383838" data-glide-dir=">" @click="handleButtonClick2">
        <i class="bi bi-chevron-right" aria-hidden="true" style="color: white"></i>
      </button>
    </div>
  </div>
  <vue-glide :options="options" class="row list p-0 gx-0">
    <template slot="control">
      <button ref="buttonPrev" style="background-color: #383838" data-glide-dir="<" class="d-none">
        <i class="fa fa-angle-left" aria-hidden="true" style="color: white"></i>
      </button>
      <button ref="buttonNext" style="background-color: #383838" data-glide-dir=">" class="d-none">
        <i class="fa fa-angle-right" aria-hidden="true" style="color: white"></i>
      </button>
    </template>
    <vue-glide-slide v-for="edition in editions.editions" :key="edition.id" class="p-0" style="margin-bottom: 0px">
      <div class="card">
        <a href="">
          <img :src="`https://ingest.educadorafm.ba.gov.br/thumbnail/upload/img/${edition.picture.name}`"
               class="card-img-top mb-2"/>
        </a>
        <div class="stamp-program card-img-top mb-2" v-show="edition.id != idPlay"
             @click="mp3Play(
                   'https://ingest.educadorafm.ba.gov.br/'+edition.mp3_upload.url,
                   edition.id,
                   'https://ingest.educadorafm.ba.gov.br/thumbnail/upload/img/'+edition.picture.name,
                   edition.edition,
                   edition.program.name,
                   edition.program_id,
                   '/program/'+edition.program_id+'/edicao/'+edition.id,
                   edition.thin_line,
                   edition.description
                   )"
        >
          <img class="img-fluid" :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/${edition.program_id}.svg`">
        </div>
        <div class="stamp-program card-img-top mb-2" v-show="edition.id == idPlay" @click="pauseMp3(edition.id)">
          <img class="img-fluid" :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/pause/${edition.program_id}.svg`">
        </div>
        <div class="card-body p-0 mt-0">
          <router-link
            :to="{ name: 'edition_details', params: { id_program: edition.program_id, id_edition: edition.id }}" style="text-decoration: none">
            <h5 class="card-line mb-0 pb-0">
              <TruncateTextHelperComponent :max-caracteres="65" :texto-completo="`${edition.thin_line}`" style="font-family: 'Poppins light', sans-serif; font-weight: 400; font-size: 13px"/>
            </h5>
          </router-link>
        </div>
      </div>
    </vue-glide-slide>
  </vue-glide>
</div>
</template>

<script>
// import Glider from 'glider-js'
import {Glide, GlideSlide} from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'
import TruncateTextHelperComponent from '../helpers/TruncateTextHelperComponent.vue'

export default {
  name: 'SliderComponent',
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
    TruncateTextHelperComponent
  },
  props: ['editions', 'options', 'mp3Play', 'idPlay', 'pauseMp3'],
  data () {
    return {
      editionsLoaded: false
    }
  },
  beforeCreate () {
    // console.log('ANTES DE CRIAR')
  },
  created () {
    // console.log('Slider Criado')
  },
  beforeMount () {
    // console.log('Slider Montado')
  },
  mounted () {
    // this.loadEditions()
  },
  methods: {
    // async loadEditions () {
    //  try {
    //    const response = await axios.get('https://ingest.educadorafm.ba.gov.br/api/getStandEight')
    //    this.editions = response.data.editions
    //    this.editionsLoaded = true
    //  } catch (error) {
    //    console.error(error)
    //  }
    // }
    handleButtonClick1 () {
      this.$refs.buttonPrev.click()
    },
    handleButtonClick2 () {
      this.$refs.buttonNext.click()
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
  border-radius: 12px;
  /* border-radius: 20px; */
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
