<template>
  <div id="main" class="main d-flex flex-column">
    <div class="margin-top">

    </div>
    <div class="main-container">
      <div class="row">
        <div class="col-12 list px-4 pt-0 d-block d-md-none">
          <button @click="goBack" style="color: white">
            <h6 class="mt-0 mb-3 ml-0" style="color: white; font-family: 'Poppins Semibold', sans-serif; font-size: 24px;"><i class="fa fa-arrow-left"></i></h6>
          </button>
          <div class="row align-items-center">
            <div class="col-12" style="color: white">
              <a class="collapse-indicator-chevron" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" style="text-decoration: none; color: white">
                <h6 class="d-flex justify-content-between">
                  {{party.name}}
                  <i class="bi bi-chevron-down" style="margin-left: 25px"></i>
                </h6>
                <hr style="width: 100%; border-top: 3px solid #fff;" />
              </a>
            </div>
          </div>
          <div class="collapse custom-collapse" id="collapseExample">
            <div class="card pt-2">
              <a href="">
                <img :src="`https://ingest.educadorafm.ba.gov.br/thumbnail/${party.picture.path}`" class="card-img-top mb-3"/>
              </a>
              <div class="stamp-program">
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
                                :url='`https://educadorafm.ba.gov.br/mixtape/festa/${party.id}`'
                                :title='`Conheça a Festa ${party.name} do programa Mixtape da Educadora FM 107.5.`'
                                description='*Baixe agora o novo App da Educadora FM 107.5* - Android: rebrand.ly/educadorafmandroid | iOS: rebrand.ly/educadorafmios'
                                quote="É sua! É da Bahia"
                                hashtags="EducadoraFM,musica,bahia"
                                twitterUser="educadorafmba"
                  >
                    <i :class="network.icon" class="mt-3" style="color: white; width: 24px"></i>
                    <!-- <img :src="network.srcImg"  style="width: 24px; height: 24px" class="mb-2"> -->
                  </ShareNetwork>
                  <a class="p-4" id="copy_link" style="text-align: center" @click="copyLink(window.location.href)">
                    <i class="mt-3 fa fa-link" style="color: white; width: 24px"></i>
                  </a>
                </ul>
              </div>
              <hr style="size: 1px; background: white; opacity: 1;">
              <div style="color: white; font-size: 12px !important">
                <div v-html="party.description" style="font-size: 12px !important; font-weight: 400 !important; "></div>
              </div>
            </div>
            <h2 class="title mt-1 mb-1" style="font-size: 16px">DJs</h2>
            <hr style="width:100%; text-align:center; background-color: white; margin-top: 4px;">
            <div class="row list mb-3">
              <div class="col-6 col-md-3 col-lg-3 mb-2" v-for="dj in djs" :key="dj.id">
                <div class="card" style="background-color: #383838; max-width: 219px">
                  <img :src="`https://ingest.educadorafm.ba.gov.br/thumbnail/${dj.picture.path}`" class="card-img-top mb-3"/>
                  <!--
                  <div class="stamp-program">
                    <img class="img-fluid" src="/img/stamp-programs/mixtape-01.png" width="100%">
                  </div>
                  -->
                  <div class="card-body p-0">
                    <h5 class="card-title">{{ dj.name }}</h5>
                  </div>
                </div>
              </div>
            </div>
            <hr style="width: 100%; border-top: 3px solid #fff;" />
          </div>
        </div>
        <div class="col-2 list ml-4 pt-0 d-none d-md-block">
          <button @click="goBack" style="color: white">
            <h6 class="mt-0 mb-3 ml-0" style="color: white; font-family: 'Poppins Semibold', sans-serif; font-size: 24px;"><i class="fa fa-arrow-left"></i></h6>
          </button>
          <!-- <h5 class="mb-2 ml-1" style="color: white">Programa</h5> -->
          <div class="card pt-2">
            <a href="">
              <img :src="`https://ingest.educadorafm.ba.gov.br/thumbnail/${party.picture.path}`" class="card-img-top mb-3"/>
            </a>
            <div class="stamp-program">
            </div>
            <!--
            <div class="card-body p-0">
              <a href="" style="text-decoration: none"></a>
            </div>
            -->
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
                              :url='`https://educadorafm.ba.gov.br/mixtape/festa/${party.id}`'
                              :title='`Conheça a Festa ${party.name} do programa Mixtape da Educadora FM 107.5.`'
                              description='*Baixe agora o novo App da Educadora FM 107.5* - Android: rebrand.ly/educadorafmandroid | iOS: rebrand.ly/educadorafmios'
                              quote="É sua! É da Bahia"
                              hashtags="EducadoraFM,musica,bahia"
                              twitterUser="educadorafmba"
                >
                  <i :class="network.icon" class="mt-3" style="color: white; width: 24px"></i>
                  <!-- <img :src="network.srcImg"  style="width: 24px; height: 24px" class="mb-2"> -->
                </ShareNetwork>
                <a class="p-2" id="copy_link" style="text-align: center" @click="copyLink('window.location.href')">
                  <i class="mt-3 fa fa-link" style="color: white; width: 24px"></i>
                </a>
              </ul>
            </div>
            <hr style="size: 1px; background: white; opacity: 1;">
            <div style="color: white; font-size: 12px !important">
              <div v-html="party.description" style="font-size: 12px !important; font-weight: 400 !important; "></div>
            </div>
          </div>
        </div>

        <div class="d-block col-12 col-md-10 pl-4">
          <div class="container ml-5 d-none d-md-block">
            <h2 class="title mt-1 mb-1" style="font-size: 16px">DJs</h2>
            <hr style="width: 100%; border-top: 3px solid #fff;" />
            <div class="row list mb-3">
              <div class="col-12 col-md-3 col-lg-3 mb-2" v-for="dj in djs" :key="dj.id">
                <div class="card" style="background-color: #383838; max-width: 219px">
                  <img :src="`https://ingest.educadorafm.ba.gov.br/thumbnail/${dj.picture.path}`" class="card-img-top mb-3"/>
                  <!--
                  <div class="stamp-program">
                    <img class="img-fluid" src="/img/stamp-programs/mixtape-01.png" width="100%">
                  </div>
                  -->
                  <div class="card-body p-0">
                    <h5 class="card-title">{{ dj.name }}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container ml-5">
            <h2 class="title mt-1" style="font-size: 16px">Mixtapes de {{ party.name }}</h2>
            <hr style="width: 100%; border-top: 3px solid #fff;" />
            <div class="col-12 col-md-10 ml-5">
              <div class="row list mb-3">
                <div class="col-6 col-md-3 col-lg-3 mb-2" v-for="edition in party.editions" :key="edition.id">
                  <div class="card" style="background-color: #383838; max-width: 219px">
                    <a>
                      <img :src="`https://ingest.educadorafm.ba.gov.br/thumbnail/${edition.picture.path}`" class="card-img-top mb-1"/>
                    </a>
                    <div class="stamp-program" v-if=" edition.id != idPlay "
                         @click="
                       playMP3('https://ingest.educadorafm.ba.gov.br/'+edition.url,
                       edition.id,
                       'https://ingest.educadorafm.ba.gov.br/thumbnail/upload/img/'+edition.picture.name,
                        party.name,
                        'Mixtape',
                        'mixtape',
                        '/mixtape/festa/'+party.id,
                        `${edition.name} | DJ: ${edition.djs.name}`,
                        party.description
                       )">
                      <img class="img-fluid" :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/mixtape.svg`" style="max-width: 219px">
                    </div>
                    <div class="stamp-program" v-if=" edition.id == idPlay " @click="pauseMP3(edition.id)">
                      <img class="img-fluid" :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/pause/mixtape.svg`" style="max-width: 219px">
                    </div>
                    <div class="card-body p-0">
                      <a style="text-decoration: none">
                        <h5 class="card-line"><TruncateTextHelperComponent :max-caracteres="65" :texto-completo="`${edition.name} | DJ: ${edition.djs.name}`" /></h5>
                        <!--<p class="card-text"><?php echo date('d/m/Y', strtotime($edition->edition)); ?></p>-->
                      </a>
                    </div>
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
  name: 'MixtapeParty',
  metaInfo () {
    return {
      title: 'Mixtape - ' + this.party.name,
      titleTemplate: '%s | Educadora FM 107.5',
      meta: [
        {name: 'description', content: this.party.description},
        {property: 'og:title', content: 'Mixtape - '+ this.party.name + ' | Educadora FM 107.5'},
        {property: 'og:description', content: this.party.description},
        {property: 'og:url', content: 'https://educadorafm.ba.gov.br/mixtape/festa/'+this.party.id},
        {property: 'twitter:title', content: 'Mixtape - '+ this.party.name + ' | Educadora FM 107.5'},
        {property: 'twitter:description', content: this.party.description},
        {property: 'twitter:card', content: 'summary'},
        {property: 'twitter:url', content: 'https://educadorafm.ba.gov.br/mixtape/festa/'+this.party.id}
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
      party: [],
      djs: [],
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
        type: 'carousel',
        perView: 6,
        perTouch: 6,
        bound: true,
        controls: true,
        autoplay: 5000,
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
    goBack () {
      window.history.back()
    },
    async loadEditions () {
      try {
        const id = this.$route.params.id
        const headers = {
          'X-API-Key': '44AiC0g%ofjqMY:nakJT3g1YyL{14$[)'
        }
        axios.get(`https://ingest.educadorafm.ba.gov.br/api/getMixtapeParty/${id}`, {headers})
          .then(response => {
            this.party = response.data.party
            this.djs = response.data.djs
            // console.log(this.party.picture.path)
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
      // console.log('compartilhar')
    },
    ingestInfoSharedInternas () {
      // id_edition, program_id, program_name, edition_edition
      // program_name Mixtape = Party Name
      // program_name Selo = Artist_name
      // program_id Mixtape = Mixtape
      // programa_id Selo = Selo
      // Action (shared, play)
      const requestData = {
        id_program: 'mixtape',
        program_name: 'Mixtape',
        action: 'sharing',
        id_edition: '',
        edition_edition: this.party.name,
        origin: 'site'
      }
      // console.log(this.program)
      const headers = {
        'X-API-Key': '44AiC0g%ofjqMY:nakJT3g1YyL{14$[)'
      }
       axios.post('https://ingest.educadorafm.ba.gov.br/api/ingestInfo', requestData, {headers})
        .then(response => {
          console.log('Resposta da API', response.data);
        })
        .catch(error => {
          console.error('Erro na chamada POST à AEP: ', error)
        })
    }
  }
}
</script>

<style>

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
button {
  background-color: transparent;
  border: none;
}
button i:hover {
  transform: scale(1.08);
  transition: 50ms;
}
</style>
