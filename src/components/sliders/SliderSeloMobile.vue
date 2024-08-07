<template>
  <div>
    <div class="d-flex align-items-center mb-3 mt-0">
      <div>
        <h2 class="title mb-0" style="font-family: 'Poppins Medium', sans-serif; font-size: 21px; line-height: 25px">
          {{temp.name}}
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
      <vue-glide-slide v-for="artist in temp.artists" :key="artist.id" class="p-0" style="margin-bottom: 0px">
        <div class="card" style="background-color: #383838">
          <a :href="'/selo/'">
            <img :src="'https://ingest.educadorafm.ba.gov.br/thumbnail/'+ artist.picture.path"
                 class="card-img-top mb-1"/>
          </a>
          <div class="stamp">
            <!-- <img class="" src="https://educadorafm.ba.gov.br/logo.png" width="100%"> -->
            <!--<img src="/img/stamp-programs/Marca-Educa.png" width="100%">-->
          </div>
          <div class="stamp-program" v-if=" artist.id != idPlay "
               @click="mp3Play(
                           'https://ingest.educadorafm.ba.gov.br/'+artist.url,
                            artist.id,
                            'https://ingest.educadorafm.ba.gov.br/'+ artist.picture.path,
                            artist.name,
                            'Selo Educadora FM',
                            'selo',
                            `/selo/artista/${artist.id}`,
                            `Álbum: ${artist.trabalho}`,
                            artist.description
                            )">
            <img class="img-fluid" :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/selo.svg`">
          </div>
          <div class="stamp-program" v-if=" artist.id == idPlay " @click="pauseMp3(artist.id)">
            <img class="img-fluid" :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/pause/selo.svg`">
          </div>
          <div class="card-body p-0 mb-3 mt-0">
            <a style="font-family: 'Poppins medium'; font-size: 12px;">
              <router-link :to="{ name: 'selo_artista', params: { id: artist.id }}">
                <h5 class="card-title" style="font-family: 'Poppins medium', sans-serif; font-size: 12px">{{ artist.name }}</h5>
                <p class="card-text" style="font-family: 'Poppins medium', sans-serif; font-size: 12px">Música: {{ artist.music }} <br/>
                  Album: {{ artist.trabalho }}
                </p>
              </router-link>
            </a>
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
  name: 'SliderSeloMobile',
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
    TruncateTextHelperComponent
  },
  props: ['temp', 'options', 'mp3Play', 'idPlay', 'pauseMp3'],
  data () {
    return {
      editionsLoaded: false
    }
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

</style>
