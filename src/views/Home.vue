<template>
<div id="main" class="main d-flex flex-column">
  <LoaderHome />
  <div class="margin-top">
  </div>
  <div class="main-container">
    <ProgramListComponent v-if="editionsLoaded" :programs="programsList" :options="glideOptionsPrograms"/>
    <HighLightsComponent v-if="editionsLoaded" :editions="editionsHighlight" :options="glideOptions" :mp3Play="playMP3" :idPlay="idPlay" :pauseMp3="pauseMP3"/>
    <CarouselBannersComponent />
    <SliderComponent v-if="editionsLoaded" :editions="stand" :options="glideOptions" v-for="stand in stands" :key="stand.order" :mp3Play="playMP3" :idPlay="idPlay" :pauseMp3="pauseMP3"/>
    <div class="mt-3 d-block d-sm-none" style="height: 70px">
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import {Glide, GlideSlide} from 'vue-glide-js'
import ProgramListComponent from '../components/sliders/ProgramListComponent.vue'
import HighLightsComponent from '../components/sliders/HighLightsComponent.vue'
import CarouselBannersComponent from '../components/CarouselBannersComponent.vue'
import SliderComponent from '../components/sliders/SliderComponent.vue'
import LoaderHome from './LoaderHome.vue'

export default {
  name: 'Home',
  metaInfo () {
    return {
      title: 'Home',
      titleTemplate: '%s | Educadora FM 107.5',
      meta: [
        {name: 'description', content: 'Página Inicial'},
        {property: 'og:title', content: 'Home | Educadora FM 107.5'},
        {property: 'og:description', content: 'Página Inicial'},
        {property: 'og:url', content: 'https://educadorafm.ba.gov.br'},
        {property: 'twitter:title', content: 'Home | Educadora FM 107.5'},
        {property: 'twitter:description', content: 'Página Inicial'},
        {property: 'twitter:card', content: 'summary'},
        {property: 'twitter:url', content: 'https://educadorafm.ba.gov.br'}
      ]
    }
  },
  props: ['playMP3', 'idPlay', 'pauseMP3'],
  components: {
    LoaderHome,
    ProgramListComponent,
    HighLightsComponent,
    CarouselBannersComponent,
    SliderComponent,
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide
  },
  data () {
    return {
      editions: [],
      programsList: [],
      editionsHighlight: [],
      stands: [],
      editionsLoaded: false,
      testes: [],
      glideOptions: {
        type: 'slider',
        perView: 6,
        bound: true,
        controls: true,
        breakpoints: {
          1300: {
            perView: 6
          },
          800: {
            perView: 4
          },
          500: {
            perView: 2.5
          }
        }
      },
      glideOptionsPrograms: {
        perView: 10,
        perTouch: 10,
        bound: true,
        controls: true,
        breakpoints: {
          1300: {
            perView: 10
          },
          800: {
            perView: 4
          },
          500: {
            perView: 2.5
          }
        }
      }
    }
  },
  mounted () {
    // console.log('Home mounted')
  },
  beforeCreate () {
    // console.log('Home antes Criada')
  },
  created () {
    // console.log('Aqui Criar')
  },
  beforeMount () {
    this.loadEditions()
    var offcanvasElement = document.getElementById('navbarNav')
    // eslint-disable-next-line
    var offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement)
    if (offcanvas != null) {
      offcanvas.hide()
      console.log(offcanvas)
    }
  },
  methods: {
    async loadEditions () {
      try {
        const headers = {
          'X-API-Key': '44AiC0g%ofjqMY:nakJT3g1YyL{14$[)'
        }
        const response = await axios.get('https://ingest.educadorafm.ba.gov.br/api/getStandEight', {headers})
        const responseProgramList = await axios.get('https://ingest.educadorafm.ba.gov.br/api/getProgramsListCarrossel', {headers})
        const responseHighlights = await axios.get('https://ingest.educadorafm.ba.gov.br/api/getHighlights', {headers})
        const responseStands = await axios.get('https://ingest.educadorafm.ba.gov.br/api/homeSite', {headers})
        this.programsList = responseProgramList.data.programs
        this.editionsHighlight = responseHighlights.data.editions
        responseHighlights.data.acervo.program_id = 'Marca-Acervo'
        this.editionsHighlight.unshift(responseHighlights.data.acervo)
        this.stands = responseStands.data.estantes_home
        // console.log(this.editionsHighlight)
        this.editions = response.data.editions
        this.arraySort(this.editionsHighlight)
        this.editionsLoaded = true
      } catch (error) {
        console.error(error)
      }
    },
    arraySort (array) {
      return array.sort(() => Math.random() - 0.5)
    }
  }

}
</script>

<style scoped>
.prev-button {
  background-color: #ccc;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.next-button {
  background-color: #ccc;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
