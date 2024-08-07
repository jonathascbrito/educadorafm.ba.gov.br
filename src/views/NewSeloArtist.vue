<template>
  <div id="main" class="main d-flex flex-column">
    <div class="margin-top">

    </div>
    <div class="main-container">
      <div class="row pt-0">
        <div class="list px-4 pt-0 col-12 col-sm-2 col-lg-2 col-xl-2 col-xxl-2">
          <button @click="goBack" style="color: white">
            <h6 class="mt-0 mb-3 ml-0" style="color: white; font-family: 'Poppins Semibold', sans-serif; font-size: 24px;"><i class="fa fa-arrow-left"></i></h6>
          </button>
          <div class="card pt-2">
            <a href="">
              <img :src="`https://ingest.educadorafm.ba.gov.br/${artist.picture.path}`" class="card-img-top mb-3"/>
            </a>
            <div class="stamp-program" v-if="'spot'+artist.id != idPlay "
                 @click="playMP3(
                               'https://ingest.educadorafm.ba.gov.br/'+artist.spot_url,
                               'spot'+artist.id,
                               'https://ingest.educadorafm.ba.gov.br/'+ artist.picture.path,
                                artist.trabalho,
                                'Selo Educadora FM',
                                artist.name,
                                `/selo/artista/${artist.id}`
                            )">
              <img class="img-fluid" :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/moldura_invisivel_play.svg`">
            </div>
            <div class="stamp-program" v-if="'spot'+artist.id == idPlay " @click="pauseMP3('spot'+artist.id)">
              <img class="img-fluid"
                   :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/moldura_invisivel_pause.svg`">
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
                              :url='`https://educadorafm.ba.gov.br/selo/artista/${artist.id}`'
                              :title='`Escute ${artist.name} que faz parte do Selo Educadora FM Independente.`'
                              description='*Baixe agora o novo App da Educadora FM 107.5* - Android: rebrand.ly/educadorafmandroid | iOS: rebrand.ly/educadorafmios'
                              quote="É sua! É da Bahia"
                              hashtags="EducadoraFM,EducadoraFM107.5,musica,bahia"
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
            <div v-html="artist.description" style="font-family: 'Poppins medium', sans-serif; font-size: 14px"></div>
          </div>
        </div>
        <div class="d-flex col-12 col-sm-10 col-lg-10 col-xl-10 col-xxl-10">
          <div class="container ml-5">
            <span v-for="ep in editions" :key="ep.id">
              <h2 class="title mt-1 mr-2 mb-2">{{ep.ep_name}}</h2>
            <hr class="d-none d-md-block" style="width:100%; text-align:center; color: white; margin-top: 4px;">
            <vue-glide :options="glideOptions" class="row list p-0 gx-0 d-block d-sm-none">
              <template slot="control">
                <button ref="buttonPrev" style="background-color: #383838" data-glide-dir="<" class="d-none">
                  <i class="fa fa-angle-left" aria-hidden="true" style="color: white"></i>
                </button>
                <button ref="buttonNext" style="background-color: #383838" data-glide-dir=">" class="d-none">
                  <i class="fa fa-angle-right" aria-hidden="true" style="color: white"></i>
                </button>
              </template>
              <vue-glide-slide class="p-0" style="margin-bottom: 0px">
                <div class="card" style="background-color: #383838; max-width: 219px">
                  <a :href="'/selo/'">
                    <img :src="'https://ingest.educadorafm.ba.gov.br/thumbnail/'+ ep.picture.path"
                         class="card-img-top mb-1" style="max-width: 219px"/>
                  </a>
                  <div class="stamp">
                    <!-- <img class="" src="https://educadorafm.ba.gov.br/logo.png" width="100%"> -->
                    <!--<img src="/img/stamp-programs/Marca-Educa.png" width="100%">-->
                  </div>
                  <div class="stamp-program" v-if=" ep.id != idPlay "
                       @click="playMP3(
                         'https://ingest.educadorafm.ba.gov.br/'+ep.url,
                          ep.id,
                          'https://ingest.educadorafm.ba.gov.br/thumbnail/'+ ep.picture.path,
                          ep.music_work,
                          'Selo Educadora FM',
                          ep.ep_name,
                          `/selo/artista/${artist.id}`
                          )">
                    <img class="img-fluid" :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/selo.svg`">
                  </div>
                  <div class="stamp-program" v-if=" ep.id == idPlay " @click="pauseMP3(ep.id)">
                    <img class="img-fluid"
                         :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/pause/selo.svg`">
                  </div>
                  <div class="card-body p-0">
                    <a style="text-decoration: none">
                      <h5 class="card-title ml-1" style="font-family: 'Poppins light', sans-serif; font-size: 13px">{{ artist.name }}</h5>
                      <p class="card-text ml-1" style="font-family: 'Poppins light', sans-serif; font-size: 13px">Música: {{ ep.music_work }} <br/>
                        Album: {{ ep.ep_name }}
                      </p>
                    </a>
                  </div>
                </div>
              </vue-glide-slide>
              <vue-glide-slide class="p-0" style="margin-bottom: 0px">
                <div class="card" style="background-color: #383838; max-width: 219px">
                  <a :href="'/selo/'">
                    <img :src="'https://ingest.educadorafm.ba.gov.br/thumbnail/'+ ep.especial_seis.picture.path"
                         class="card-img-top mb-1" style="max-width: 219px"/>
                  </a>
                  <div class="stamp">
                    <!-- <img class="" src="https://educadorafm.ba.gov.br/logo.png" width="100%"> -->
                    <!--<img src="/img/stamp-programs/Marca-Educa.png" width="100%">-->
                  </div>
                  <div class="stamp-program" v-if=" ep.especial_seis.id != idPlay "
                       @click="playMP3(
                       'https://ingest.educadorafm.ba.gov.br/'+ep.especial_seis.mp3_upload.url,
                             ep.especial_seis.id,
                             'https://ingest.educadorafm.ba.gov.br/thumbnail/'+ ep.picture.path,
                              ep.trabalho,
                              'Especial das Seis',
                              ep.name,
                              `/selo/artista/${artist.id}`
                          )">
                    <img class="img-fluid" :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/21.svg`"
                         style="max-width: 219px">
                  </div>
                  <div class="stamp-program" v-if="ep.especial_seis.id == idPlay " @click="pauseMP3(ep.especial_seis.id)">
                    <img class="img-fluid"
                         :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/pause/21.svg`">
                  </div>
                  <div class="card-body p-0">
                    <a style="text-decoration: none;">
                      <h5 class="card-title ml-1" style="font-family: 'Poppins light', sans-serif; font-size: 13px">{{ ep.especial_seis.thin_line }}</h5>
                    </a>
                  </div>
                </div>
              </vue-glide-slide>
              <vue-glide-slide class="p-0" style="margin-bottom: 0px">
                <div class="card" style="background-color: #383838; max-width: 219px">
                  <a :href="'/selo/'">
                    <img :src="'https://ingest.educadorafm.ba.gov.br/thumbnail/'+ ep.multicultura.picture.path"
                         class="card-img-top mb-1" style="max-width: 219px"/>
                  </a>
                  <div class="stamp">
                    <!-- <img class="" src="https://educadorafm.ba.gov.br/logo.png" width="100%"> -->
                    <!--<img src="/img/stamp-programs/Marca-Educa.png" width="100%">-->
                  </div>
                  <div class="stamp-program" v-if=" ep.multicultura.id != idPlay "
                       @click="playMP3('https://ingest.educadorafm.ba.gov.br/'+ep.multicultura.mp3_upload.url,
                              ep.multicultura.id,
                              'https://ingest.educadorafm.ba.gov.br/thumbnail/'+ ep.multicultura.picture.path,
                              ep.trabalho,
                              'Multicultura',
                              ep.name,
                              `/selo/artista/${artist.id}`
                              )">
                    <img class="img-fluid" :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/36.svg`"
                         style="max-width: 219px">
                  </div>
                  <div class="stamp-program" v-if="ep.multicultura.id == idPlay " @click="pauseMP3(ep.multicultura.id)">
                    <img class="img-fluid"
                         :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/pause/36.svg`">
                  </div>
                  <div class="card-body p-0">
                    <a style="text-decoration: none">
                      <h5 class="card-title ml-1" style="font-family: 'Poppins light', sans-serif; font-size: 13px">{{ ep.multicultura.thin_line }}</h5>
                    </a>
                  </div>
                </div>
              </vue-glide-slide>
            </vue-glide>
            <div class="row list mb-3 d-none d-sm-flex">
              <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 mb-2">
                <div class="card" style="background-color: #383838; max-width: 219px">
                  <a :href="'/selo/'">
                    <img :src="'https://ingest.educadorafm.ba.gov.br/thumbnail/'+ ep.picture.path"
                         class="card-img-top mb-1" style="max-width: 219px"/>
                  </a>
                  <div class="stamp">
                    <!-- <img class="" src="https://educadorafm.ba.gov.br/logo.png" width="100%"> -->
                    <!--<img src="/img/stamp-programs/Marca-Educa.png" width="100%">-->
                  </div>
                  <div class="stamp-program" v-if=" ep.id != idPlay "
                       @click="playMP3(
                         'https://ingest.educadorafm.ba.gov.br/'+ep.url,
                          ep.id,
                          'https://ingest.educadorafm.ba.gov.br/thumbnail/'+ ep.picture.path,
                          ep.music_work,
                          'Selo Educadora FM',
                          ep.ep_name,
                          `/selo/artista/${artist.id}`
                          )">
                    <img class="img-fluid" :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/selo.svg`">
                  </div>
                  <div class="stamp-program" v-if=" ep.id == idPlay " @click="pauseMP3(ep.id)">
                    <img class="img-fluid"
                         :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/pause/selo.svg`">
                  </div>
                  <div class="card-body p-0">
                    <a style="text-decoration: none">
                      <h5 class="card-title ml-1" style="font-family: 'Poppins light', sans-serif; font-size: 13px">{{ artist.name }}</h5>
                      <p class="card-text ml-1" style="font-family: 'Poppins light', sans-serif; font-size: 13px">Música: {{ ep.music_work }} <br/>
                        Album: {{ ep.ep_name }}
                      </p>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 mb-2">
                <div class="card" style="background-color: #383838; max-width: 219px">
                  <a :href="'/selo/'">
                    <img :src="'https://ingest.educadorafm.ba.gov.br/thumbnail/'+ ep.especial_seis.picture.path"
                         class="card-img-top mb-1" style="max-width: 219px"/>
                  </a>
                  <div class="stamp">
                    <!-- <img class="" src="https://educadorafm.ba.gov.br/logo.png" width="100%"> -->
                    <!--<img src="/img/stamp-programs/Marca-Educa.png" width="100%">-->
                  </div>
                  <div class="stamp-program" v-if=" ep.especial_seis.id != idPlay "
                       @click="playMP3(
                       'https://ingest.educadorafm.ba.gov.br/'+ep.especial_seis.mp3_upload.url,
                             ep.especial_seis.id,
                             'https://ingest.educadorafm.ba.gov.br/thumbnail/'+ ep.picture.path,
                              ep.ep_name,
                              'Especial das Seis',
                              artist.name,
                              `/selo/artista/${artist.id}`
                          )">
                    <img class="img-fluid" :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/21.svg`"
                         style="max-width: 219px">
                  </div>
                  <div class="stamp-program" v-if="ep.especial_seis.id == idPlay " @click="pauseMP3(ep.especial_seis.id)">
                    <img class="img-fluid"
                         :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/pause/21.svg`">
                  </div>
                  <div class="card-body p-0">
                    <a style="text-decoration: none;">
                      <h5 class="card-title ml-1" style="font-family: 'Poppins light', sans-serif; font-size: 13px">{{ ep.especial_seis.thin_line }}</h5>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 mb-2">
                <div class="card" style="background-color: #383838; max-width: 219px">
                  <a :href="'/selo/'">
                    <img :src="'https://ingest.educadorafm.ba.gov.br/thumbnail/'+ ep.multicultura.picture.path"
                         class="card-img-top mb-1" style="max-width: 219px"/>
                  </a>
                  <div class="stamp">
                    <!-- <img class="" src="https://educadorafm.ba.gov.br/logo.png" width="100%"> -->
                    <!--<img src="/img/stamp-programs/Marca-Educa.png" width="100%">-->
                  </div>
                  <div class="stamp-program" v-if=" ep.multicultura.id != idPlay "
                       @click="playMP3('https://ingest.educadorafm.ba.gov.br/'+ep.multicultura.mp3_upload.url, ep.multicultura.id,
                              'https://ingest.educadorafm.ba.gov.br/thumbnail/'+ ep.picture.path,
                              ep.ep_name,
                              'Multicultura',
                              artist.name,
                              `/selo/artista/${artist.id}`
                              )">
                    <img class="img-fluid" :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/36.svg`"
                         style="max-width: 219px">
                  </div>
                  <div class="stamp-program" v-if="ep.multicultura.id == idPlay " @click="pauseMP3(ep.multicultura.id)">
                    <img class="img-fluid"
                         :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/pause/36.svg`">
                  </div>
                  <div class="card-body p-0">
                    <a style="text-decoration: none">
                      <h5 class="card-title ml-1" style="font-family: 'Poppins light', sans-serif; font-size: 13px">{{ ep.multicultura.thin_line }}</h5>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            </span>
          </div>
        </div>
      </div>
      <div class="mt-3" style="height: 90px">
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import TruncateTextHelperComponent from '../components/helpers/TruncateTextHelperComponent.vue'

export default {
  name: 'SeloArtist',
  metaInfo () {
    return {
      title: 'Selo - '+this.artist.name,
      titleTemplate: '%s | Educadora FM 107.5',
      meta: [
        {name: 'description', content: this.artist.description},
        {property: 'og:title', content: 'Selo - '+this.artist.name+' | Educadora FM 107.5'},
        {property: 'og:description', content: this.artist.description},
        {property: 'og:image', content: 'https://ingest.educadorafm.ba.gov.br/thumbnail/'},
        {property: 'og:url', content: 'https://educadorafm.ba.gov.br/selo/artista/'+this.artist.id},
        {property: 'twitter:title', content: 'Selo - '+this.artist.name+' | Educadora FM 107.5'},
        {property: 'twitter:description', content: this.artist.description},
        {property: 'twitter:image', content: 'https://ingest.educadorafm.ba.gov.br/thumbnail/'},
        {property: 'twitter:card', content: 'summary'},
        {property: 'twitter:url', content: 'https://educadorafm.ba.gov.br/selo/artista/'+this.artist.id}
      ]
    }
  },
  props: ['playMP3', 'idPlay', 'pauseMP3', 'copyLink'],
  components: {
    TruncateTextHelperComponent
  },
  data () {
    return {
      artist: [],
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
        bound: true,
        controls: true,
        breakpoints: {
          800: {
            perView: 3
          },
          500: {
            perView: 1.5
          }
        }
      }
    }
  },
  mounted () {
    const id = this.$route.params.id
    const headers = {
      'X-API-Key': '44AiC0g%ofjqMY:nakJT3g1YyL{14$[)'
    }
    axios.get(`http://localhost:8000/api/selo/getSeloArtist/${id}`, {headers})
      .then(response => {
        this.artist = response.data.artist
        this.editions = response.data.eps
        console.log(this.editions)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    goBack () {
      window.history.back()
    },
    formattedDate (editionDate) {
      editionDate = editionDate + ' 00:00:00'
      const date = new Date(editionDate)
      const options = {day: '2-digit', month: '2-digit', year: 'numeric'}
      return date.toLocaleDateString('pt-BR', options)
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
        program_name: this.artist.name,
        action: 'sharing',
        id_edition: this.artist.id,
        edition_edition: this.artist.trabalho,
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
p:first-letter {
  text-transform: uppercase;
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
