import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Programs from '../views/Programs.vue'
import ProgramDetails from '../views/ProgramDetails.vue'
import Acervo from '../views/Acervo.vue'
import EditionDetails from '../views/EditionDetails.vue'
import Festival from '../views/Festival.vue'
import Selo from '../views/Selo.vue'
import SeloArtist from '../views/SeloArtist.vue'
// eslint-disable-next-line
import SearchResults from '../views/SearchResults.vue'
import Mixtape from '../views/Mixtape.vue'
import MixtapeParty from '../views/MixtapeParty.vue'
import QuemSomos from '../views/QuemSomos.vue'
import Expediente from '../views/Expediente.vue'
import NotFound from '../views/NotFound.vue'
import TermoUso from '../views/Politcs.vue'
import AcervoProgram from '../views/AcervoProgram.vue'
// eslint-disable-next-line
import SearchResults2 from '../views/SearchResults2.vue'
import VueMeta from 'vue-meta'
import FestivalEditionDetails from '../views/FestivalEditionDetails.vue'
import SeloNovo from '../views/SeloNovo.vue'
import NewSeloArtist from '../views/NewSeloArtist.vue'

Vue.use(Router)
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/expediente',
    name: 'Expediente',
    component: Expediente
  },
  {
    path: '/quem-somos',
    name: 'Quem-Somos',
    component: QuemSomos
  },
  {
    path: '/termo-uso',
    name: 'Termo-Uso',
    component: TermoUso
  },
  {
    path: '/programas',
    name: 'Programs',
    component: Programs
  },
  {
    path: '/programa/:id',
    name: 'ProgramDetails',
    component: ProgramDetails
  },
  {
    path: '/program/:id_program/edicao/:id_edition',
    name: 'edition_details',
    component: EditionDetails
  },
  {
    path: '/acervo',
    name: 'acervo',
    component: Acervo
  },
  {
    path: '/acervo/programa/:id',
    name: 'AcervoPrograma',
    component: AcervoProgram
  },
  {
    path: '/festival',
    name: 'festival',
    component: Festival
  },
  {
    path: '/festival/edicao/:id_edition',
    name: 'festival_edition_detail',
    component: FestivalEditionDetails
  },
  {
    path: '/selo',
    name: 'selo',
    component: Selo
  },
  {
    path: '/new_selo',
    name: 'selo_novo',
    component: SeloNovo
  },
  {
    path: '/selo/artista/:id',
    name: 'selo_artista',
    component: SeloArtist
  },
  {
    path: '/new_selo/artista/:id',
    name: 'new_selo_artista',
    component: NewSeloArtist
  },
  {
    path: '/mixtape',
    name: 'mixtape',
    component: Mixtape
  },
  {
    path: '/mixtape/festa/:id',
    name: 'mixtape_party',
    component: MixtapeParty
  },
  {
    path: '/resultados',
    name: 'search-results',
    component: SearchResults2,
    props: (route) => ({
      query: route.query.q,
      playMP3: route.query.playMP3,
      idPlay: route.query.idPlay,
      pauseMP3: route.query.pauseMP3,
      sharing: route.query.sharing
    }),
    meta: {
      methods: {
        playMp3: null,
        pauseMp3: null
      }
    }
  },
  {
    path: '*',
    component: NotFound
  }
]

export default new Router({
  mode: 'history', // permite usar URLs amigáveis sem a Hastag(#)
  routes
})
