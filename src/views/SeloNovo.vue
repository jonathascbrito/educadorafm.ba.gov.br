<template>
  <div id="main" class="main d-flex flex-column">
    <div class="margin-top">

    </div>
    <div class="main-container">
      <div class="row">
        <div class="col-12 list px-4 pt-0 d-block d-md-none">
          <div class="row align-items-center">
            <div class="col-12" style="color: white">
              <a class="collapse-indicator-chevron" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" style="text-decoration: none; color: white">
                <h6 class="d-flex justify-content-between">
                  Selo Educadora FM Independente
                  <i class="bi bi-chevron-down" style="margin-left: 25px"></i>
                </h6>
                <hr style="width: 100%; border-top: 3px solid #fff;" />
              </a>
            </div>
          </div>
          <div class="collapse custom-collapse" id="collapseExample">
            <div class="card pt-2">
              <a href="">
                <img :src="`${selo.path}`" class="card-img-top mb-3"/>
              </a>
              <div class="stamp-program" v-if=" 'selo_spot' != idPlay "
                   @click="playMP3(
                    `${selo.spot}`,
                    'selo_spot',
                    `${selo.path}`,
                    'Chamada',
                    'Selo Educadora Independente',
                    'selo'
                 )"
              >
                <img class="img-fluid"
                     :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/moldura_invisivel_play.svg`">
              </div>
              <div class="stamp-program" v-if=" 'selo_spot' == idPlay " @click="pauseMP3('selo_spot')">
                <img class="img-fluid"
                     :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/moldura_invisivel_pause.svg`">
              </div>
            </div>
            <div class="ml-1" style="color: white; font-family: 'Poppins', sans-serif">
              <div class="dropdown ml-1 mt-2" @click="ingestInfoSharedInternas">
                <a class="ml-3" data-bs-toggle="dropdown" style="margin-left: 15px">
                  <i class="fas fa-share-alt" style="color: white"></i>
                </a>
                <ul class="dropdown-menu">
                  <ShareNetwork class="p-4" style="text-align: center"
                                v-for="network in networks"
                                :network="network.network"
                                :key="network.network"
                                url="https://educadorafm.ba.gov.br/selo"
                                title="Conheça o projeto Selo Educadora FM Independente."
                                description="O Selo Educadora FM Independente é uma ação da rádio pública da Bahia para promover EPs e CDs de intérpretes, compositores e bandas baianas. *Baixe agora o novo App da Educadora FM 107.5* - Android: rebrand.ly/educadorafmandroid | iOS: rebrand.ly/educadorafmios"
                                quote="É sua! É da Bahia"
                                hashtags="EducadoraFM,musica,bahia"
                                twitterUser="educadorafmba"
                  >
                    <i :class="network.icon" class="mt-3" style="color: white; width: 24px"></i>
                    <!-- <img :src="network.srcImg"  style="width: 24px; height: 24px" class="mb-2"> -->
                  </ShareNetwork>
                  <a class="p-4" id="copy_link" style="text-align: center" @click="copyLink('window.location.href')">
                    <i class="mt-3 fa fa-link" style="color: white; width: 24px"></i>
                  </a>
                </ul>
              </div>
              <hr style="size: 1px; background: white; opacity: 1;">
              <div v-html="selo.description" style="font-family: 'Poppins medium', sans-serif; font-size: 14px"></div>
            </div>
            <hr style="width: 100%; border-top: 3px solid #fff;" />
          </div>
        </div>
        <div class="col-2 list ml-4 pt-0 d-none d-md-block">
          <!-- <h5 class="mb-2 ml-1" style="color: white">Programa</h5> -->
          <div class="card">
            <a href="">
              <img :src="`${selo.path}`" class="card-img-top mb-3"/>
            </a>
            <div class="stamp-program" v-if=" 'selo_spot' != idPlay "
                 @click="playMP3(
                    `${selo.spot}`,
                    'selo_spot',
                    `${selo.path}`,
                    'Chamada',
                    'Selo Educadora Independente',
                    'selo'
                 )"
            >
              <img class="img-fluid"
                   :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/moldura_invisivel_play.svg`">
            </div>
            <div class="stamp-program" v-if=" 'selo_spot' == idPlay " @click="pauseMP3('selo_spot')">
              <img class="img-fluid"
                   :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/moldura_invisivel_pause.svg`">
            </div>
          </div>
          <div class="ml-1" style="color: white; font-family: 'Poppins', sans-serif">
            <div class="dropdown ml-1 mt-2" @click="ingestInfoSharedInternas">
              <a class="ml-3" data-bs-toggle="dropdown" style="margin-left: 15px; cursor: pointer">
                <i class="fas fa-share-alt" style="color: white"></i>
              </a>
              <ul class="dropdown-menu">
                <ShareNetwork class="p-2" style="text-align: center"
                              v-for="network in networks"
                              :network="network.network"
                              :key="network.network"
                              url="https://educadorafm.ba.gov.br/selo"
                              title="Conheça o projeto Selo Educadora FM Independente. "
                              description="O Selo Educadora FM Independente é uma ação da rádio pública da Bahia para promover EPs e CDs de intérpretes, compositores e bandas baianas. *Baixe agora o novo App da Educadora FM 107.5* - Android: rebrand.ly/educadorafmandroid | iOS: rebrand.ly/educadorafmios"
                              quote="É sua! É da Bahia"
                              hashtags="EducadoraFM,musica,bahia"
                              twitterUser="educadorafmba"
                >
                  <i :class="network.icon" class="mt-3" style="color: white; width: 24px"></i>
                  <!-- <img :src="network.srcImg"  style="width: 24px; height: 24px" class="mb-2"> -->
                </ShareNetwork>
                <a class="p-2" id="copy_link" style="text-align: center" @click="copyLink(window.location.href)">
                  <i class="mt-3 fa fa-link" style="color: white; width: 24px"></i>
                </a>
              </ul>
            </div>
            <hr style="size: 1px; background: white; opacity: 1;">
            <div v-html="selo.description" style="font-family: 'Poppins medium', sans-serif; font-size: 14px"></div>
          </div>
        </div>

        <!--
        <div class="d-flex col-12 col-md-10">
          <div class="container ml-5">
            <SliderSeloMobile v-if="editionsLoaded" :options="glideOptions" v-for="temp in temps" :key="temp.id" :temp="temp" :mp3Play="playMP3" :idPlay="idPlay" :pauseMp3="pauseMP3"/>
          </div>
        </div>
        -->
        <div class="d-flex col-12 col-sm-10">
          <div class="container">
            <h2 class="title mt-1 mr-2 mb-2">Artistas</h2>
            <hr class="d-none d-md-block" style="width:100%; text-align:center; color: white; margin-top: 4px;">
            <div class="row list ml-1">
              <div class="col-6 col-sm-3 col-lg-3 col-xxl-2" v-for="artist in artists" :key="artist.id">
                <div class="card">
                  <a>
                    <router-link :to="{ name: 'new_selo_artista', params: { id: artist.id }}">
                      <img :src="`https://ingest.educadorafm.ba.gov.br/thumbnail/${artist.picture.path}`"
                           class="card-img-top mb-1"/>
                    </router-link>
                  </a>
                  <div class="stamp-program" v-if=" artist.id == idPlay " @click="pauseMP3(artist.id)">
                    <img class="img-fluid"
                         :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/pause/Marca-Acervo.svg`"
                         style="max-width: 219px; max-height: 219px">
                  </div>
                  <div class="card-body p-0">
                    <a>
                      <router-link :to="{ name: 'new_selo_artista', params: { id: artist.id }}">
                        <a href="/mixtape/festa/" style="text-decoration: none">
                          <h5 class="card-title" style="font-family: 'Poppins light', sans-serif; font-size: 13px">{{ artist.name }}</h5>
                        </a>
                      </router-link>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-3" style="height: 70px">
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import TruncateTextHelperComponent from '../components/helpers/TruncateTextHelperComponent.vue'
import axios from 'axios'
import {Glide, GlideSlide} from 'vue-glide-js'
import SliderComponent from '../components/sliders/SliderComponent.vue'
import SliderSeloMobile from '../components/sliders/SliderSeloMobile.vue'

export default {
  name: 'Selo',
  metaInfo () {
    return {
      title: 'Selo Educadora FM',
      titleTemplate: '%s | Educadora FM 107.5',
      meta: [
        {name: 'description', content: 'O Selo Educadora FM Independente é uma ação da rádio pública para promover EPs e CDs de intérpretes, compositores e bandas baianas. Estimulando e garantindo a exploração econômica integral do produto fonográfico pelo produtor independente, o Selo promove os trabalhos na Rádio Educadora FM, TVE e redes sociais das emissoras do IRDEB programando as músicas, veiculando spots de divulgação das plataformas digitais dos próprios artistas e garante espaço para a participação deles em programas musicais, jornalísticos e de variedades.'},
        {property: 'og:title', content: 'Selo Educadora FM | Educadora FM 107.5'},
        {property: 'og:description', content: 'O Selo Educadora FM Independente é uma ação da rádio pública para promover EPs e CDs de intérpretes, compositores e bandas baianas. Estimulando e garantindo a exploração econômica integral do produto fonográfico pelo produtor independente, o Selo promove os trabalhos na Rádio Educadora FM, TVE e redes sociais das emissoras do IRDEB programando as músicas, veiculando spots de divulgação das plataformas digitais dos próprios artistas e garante espaço para a participação deles em programas musicais, jornalísticos e de variedades.'},
        {property: 'og:image', content: this.selo.path},
        {property: 'og:url', content: 'https://educadorafm.ba.gov.br/selo/'},
        {property: 'twitter:title', content: 'Selo Educadora FM | Educadora FM 107.5'},
        {property: 'twitter:description', content: 'O Selo Educadora FM Independente é uma ação da rádio pública para promover EPs e CDs de intérpretes, compositores e bandas baianas. Estimulando e garantindo a exploração econômica integral do produto fonográfico pelo produtor independente, o Selo promove os trabalhos na Rádio Educadora FM, TVE e redes sociais das emissoras do IRDEB programando as músicas, veiculando spots de divulgação das plataformas digitais dos próprios artistas e garante espaço para a participação deles em programas musicais, jornalísticos e de variedades.'},
        {property: 'twitter:image', content: this.selo.path},
        {property: 'twitter:card', content: 'summary'},
        {property: 'twitter:url', content: 'https://educadorafm.ba.gov.br/selo'}
      ]
    }
  },
  props: ['playMP3', 'idPlay', 'pauseMP3', 'sharing', 'copyLink'],
  components: {
    SliderSeloMobile,
    SliderComponent,
    TruncateTextHelperComponent,
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide
  },
  data () {
    return {
      selo: [],
      artists: [],
      audioSrc: '',
      id_prov: '',
      editionsLoaded: false,
      networks: [
        // { network: 'baidu', name: 'Baidu', icon: 'fas fah fa-lg fa-paw', color: '#2529d8' },
        // { network: 'buffer', name: 'Buffer', icon: 'fab fah fa-lg fa-buffer', color: '#323b43' },
        // { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' },
        // { network: 'evernote', name: 'Evernote', icon: 'fab fah fa-lg fa-evernote', color: '#2dbe60' },
        // { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', srcImg: './assets/img/svg/facebook.svg' },
        // { network: 'flipboard', name: 'Flipboard', icon: 'fab fah fa-lg fa-flipboard', color: '#e12828' },
        // { network: 'hackernews', name: 'HackerNews', icon: 'fab fah fa-lg fa-hacker-news', color: '#ff4000' },
        // { network: 'instapaper', name: 'Instapaper', icon: 'fas fah fa-lg fa-italic', color: '#428bca' },
        // { network: 'line', name: 'Line', icon: 'fab fah fa-lg fa-line', color: '#00c300' },
        // { network: 'linkedin', name: 'LinkedIn', icon: 'fab fah fa-lg fa-linkedin', color: '#007bb5' },
        // { network: 'messenger', name: 'Messenger', icon: 'fab fah fa-lg fa-facebook-messenger', color: '#0084ff' },
        // { network: 'odnoklassniki', name: 'Odnoklassniki', icon: 'fab fah fa-lg fa-odnoklassniki', color: '#ed812b' },
        // { network: 'pinterest', name: 'Pinterest', icon: 'fab fah fa-lg fa-pinterest', color: '#bd081c' },
        // { network: 'pocket', name: 'Pocket', icon: 'fab fah fa-lg fa-get-pocket', color: '#ef4056' },
        // { network: 'quora', name: 'Quora', icon: 'fab fah fa-lg fa-quora', color: '#a82400' },
        // { network: 'reddit', name: 'Reddit', icon: 'fab fah fa-lg fa-reddit-alien', color: '#ff4500' },
        // { network: 'skype', name: 'Skype', icon: 'fab fah fa-lg fa-skype', color: '#00aff0' },
        // { network: 'sms', name: 'SMS', icon: 'far fah fa-lg fa-comment-dots', color: '#333333' },
        // { network: 'stumbleupon', name: 'StumbleUpon', icon: 'fab fah fa-lg fa-stumbleupon', color: '#eb4924' },
        // { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
        // { network: 'tumblr', name: 'Tumblr', icon: 'fab fah fa-lg fa-tumblr', color: '#35465c' },
        // { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', srcImg: './assets/img/svg/twitter.svg' },
        // { network: 'viber', name: 'Viber', icon: 'fab fah fa-lg fa-viber', color: '#59267c' },
        // { network: 'vk', name: 'Vk', icon: 'fab fah fa-lg fa-vk', color: '#4a76a8' },
        // { network: 'weibo', name: 'Weibo', icon: 'fab fah fa-lg fa-weibo', color: '#e9152d' },
        { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', srcImg: './assets/img/svg/whatsapp.svg' }
        // { network: 'wordpress', name: 'Wordpress', icon: 'fab fah fa-lg fa-wordpress', color: '#21759b' },
        // { network: 'xing', name: 'Xing', icon: 'fab fah fa-lg fa-xing', color: '#026466' },
        // { network: 'yammer', name: 'Yammer', icon: 'fab fah fa-lg fa-yammer', color: '#0072c6' },
        // { network: 'fakeblock', name: 'Custom Network', icon: 'fab fah fa-lg fa-vuejs', color: '#41b883' }
      ],
      glideOptions: {
        type: 'slider',
        perView: 6,
        perTouch: 6,
        bound: true,
        controls: true,
        // autoplay: 5000,
        dragThreshold: 20,
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
      }
    }
  },

  mounted () {
    this.loadEditions()
  },
  beforeMount () {
    var offcanvasElement = document.getElementById('navbarNav')
    // eslint-disable-next-line
    var offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement)
    offcanvas.hide()
  },
  methods: {
    async loadEditions () {
      try {
        const headers = {
          'X-API-Key': '44AiC0g%ofjqMY:nakJT3g1YyL{14$[)'
        }
        axios.get(`http://localhost:8000/api/selo/getSeloIndex`, {headers})
          .then(response => {
            this.selo = response.data.selo
            this.artists = response.data.artists
            // console.log(this.selo)
            // console.log(this.temps)
          })
          .catch(error => {
            console.log(error)
          })
        this.editionsLoaded = true
      } catch (error) {
        console.log(error)
      }
    },
    // eslint-disable-next-line
    formattedDate (edition_date) {
      const date = new Date(edition_date)
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
      return date.toLocaleDateString('pt-BR', options)
    },
    share () {
      console.log('compartilhar')
    },
    ingestInfoSharedInternas () {
      // id_edition, program_id, program_name, edition_edition
      // program_name Mixtape = Party Name
      // program_name Selo = Artist_name
      // program_id Mixtape = Mixtape
      // programa_id Selo = Selo
      // Action (shared, play)
      const requestData = {
        id_program: 'Selo',
        program_name: 'Selo Educadora FM Independente',
        action: 'sharing',
        id_edition: '',
        edition_edition: '',
        origin: 'site'
      }
      // console.log(this.program)
      const headers = {
        'X-API-Key': '44AiC0g%ofjqMY:nakJT3g1YyL{14$[)'
      }
      axios.post('https://ingest.educadorafm.ba.gov.br/api/ingestInfo', requestData, {headers})
        .then(response => {
          // console.log('Resposta da API', response.data)
        })
        .catch(error => {
          console.error('Erro na chamada POST à AEP: ', error)
        })
    }
  }
}
</script>

<style>
.accordion {
  background-color: #383838 !important;
  --bs-accordion-bg: #383838;
  --bs-accordion-color: #fff;
  --bs-accordion-border-color: var(--bs-border-color);
  --bs-accordion-border-width: 1px;
  --bs-accordion-border-radius: 0.375rem;
  --bs-accordion-inner-border-radius: calc(0.375rem - 1px);
  --bs-accordion-btn-padding-x: 1.25rem;
  --bs-accordion-btn-padding-y: 1rem;
  --bs-accordion-btn-color: #fff;
  --bs-accordion-btn-bg: var(--bs-accordion-bg);
  --bs-accordion-btn-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23383838'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  --bs-accordion-btn-icon-width: 1.25rem;
  --bs-accordion-btn-icon-transform: rotate(-180deg);
  --bs-accordion-btn-icon-transition: transform 0.2s ease-in-out;
  --bs-accordion-btn-active-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23383838'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  --bs-accordion-btn-focus-border-color: #86b7fe;
  --bs-accordion-btn-focus-box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  --bs-accordion-body-padding-x: 1.25rem;
  --bs-accordion-body-padding-y: 1rem;
  --bs-accordion-active-color: #fff;
  --bs-accordion-active-bg: #e7f1ff;
}

.accordion-item {
  background-color: #383838 !important;
  border: none;
}
.accordion-button:not(.collapsed) {
  background-color: #383838 !important;
  color: white;
}

.accordion-button::after {
  content: '\f078';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  float: right;
}

.accordion-button.collapsed::after {
  content: '\f077';
}

.accordion-header {
  border-bottom: 1px solid #383838 !important;
  margin-bottom: 10px;
}

.accordion-body {
  border-bottom: 1px solid #383838 !important;
}

.accordion-button:focus {
  box-shadow: none;
  outline: none;
}

.custom-collapse {
  background-color: #383838;
  color: #fff;
  transition: all 0.3s ease;
}
.custom-collapse .bi {
  transition: transform 0.3s ease;
}
.custom-collapse.collapsed {
  height: 0;
  overflow: hidden;
}
.custom-collapse.collapsed .bi-caret-down-fill {
  transform: rotate(0deg);
}
.custom-collapse .bi-caret-up-fill {
  transform: rotate(180deg);
}
</style>
