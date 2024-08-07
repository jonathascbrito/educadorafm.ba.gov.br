<template>
  <div id="main" class="main d-flex flex-column">
    <div class="margin-top">

    </div>
    <div class="main-container">
      <div class="row pt-0">
        <div class="col-12 list px-4 pt-0 d-block d-sm-none">
          <!-- <router-link :to="{ name: 'Programs', params: {id_program: program.id}}" style="color: white">
            <h6 class="mt-0 mb-3 ml-0" style="color: white; font-family: 'Poppins Semibold', sans-serif; font-size: 24px;"><i class="fa fa-arrow-left"></i></h6>
          </router-link> -->
          <button @click="goBack" style="color: white">
            <h6 class="mt-0 mb-3 ml-0" style="color: white; font-family: 'Poppins Semibold', sans-serif; font-size: 24px;"><i class="fa fa-arrow-left"></i></h6>
          </button>
          <div class="row align-items-center">
            <div class="col-12" style="color: white">
              <a class="collapse-indicator-chevron" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" style="text-decoration: none; color: white">
                <h6 class="d-flex justify-content-between">
                  {{ program.name }}
                  <i class="bi bi-chevron-down"></i>
                </h6>
                <hr style="width: 100%; border-top: 3px solid #fff;" />
              </a>
            </div>
          </div>
          <div class="collapse custom-collapse" id="collapseExample">
            <div class="card pt-2">
              <a href="">
                <img :src="`https://ingest.educadorafm.ba.gov.br/${program.picture.path}`" class="card-img-top mb-3"/>
              </a>
              <div class="stamp-program" v-if=" 'chamada'+program.id != idPlay "
                   @click="playMP3(
                 'https://ingest.educadorafm.ba.gov.br/'+program.url,
                 'chamada'+program.id,
                 'https://ingest.educadorafm.ba.gov.br'+program.picture.path,
                 'Chamada',
                 program.name,
                 program.id
                 )"
              >
                <img class="img-fluid"
                     :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/moldura_invisivel_play.svg`">
              </div>
              <div class="stamp-program" v-if=" 'chamada'+program.id == idPlay " @click="pauseMP3('chamada'+program.id)">
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
                  <ShareNetwork class="p-4" style="text-align: center"
                                v-for="network in networks"
                                :network="network.network"
                                :key="network.network"
                                :url='`https://educadorafm.ba.gov.br/programa/${program.id}`'
                                :title='`Conheça o programa ${program.name} da rádio Educadora FM 107.5.`'
                                description="*Baixe agora o novo App da Educadora FM 107.5* - Android: rebrand.ly/educadorafmandroid | iOS: rebrand.ly/educadorafmios"
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
              <div v-html="program.description">{{ program.description }}</div>
            </div>
            <hr style="width: 100%; border-top: 3px solid #fff;" />
          </div>
        </div>
        <div class="col-2 list ml-4 pt-0 d-none d-sm-block">
          <!-- <router-link :to="{ name: 'Programs', params: {id_program: program.id}}" style="color: white">
            <h6 class="mt-0 mb-2 ml-0" style="color: white; font-family: 'Poppins Semibold', sans-serif; font-size: 24px;"><i class="fa fa-arrow-left"></i></h6>
          </router-link> -->
          <button @click="goBack" style="color: white">
            <h6 class="mt-0 mb-3 ml-0" style="color: white; font-family: 'Poppins Semibold', sans-serif; font-size: 24px;"><i class="fa fa-arrow-left"></i></h6>
          </button>
          <div class="card pt-2">
            <a href="">
              <img :src="`https://ingest.educadorafm.ba.gov.br/${program.picture.path}`" class="card-img-top mb-3"/>
            </a>
            <div class="stamp-program" v-if=" 'chamada'+program.id != idPlay "
                 @click="playMP3(
                 'https://ingest.educadorafm.ba.gov.br/'+program.url,
                 'chamada'+program.id,
                 'https://ingest.educadorafm.ba.gov.br'+program.picture.path,
                 'Chamada',
                 program.name,
                 program.id
                 )"
            >
              <img class="img-fluid"
                   :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/moldura_invisivel_play.svg`">
            </div>
            <div class="stamp-program" v-if=" 'chamada'+program.id == idPlay " @click="pauseMP3('chamada'+program.id)">
              <img class="img-fluid"
                   :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/moldura_invisivel_pause.svg`">
            </div>
            <!--
            <div class="card-body p-0">
              <a href="" style="text-decoration: none"></a>
            </div>
            -->
          </div>
          <div class="ml-1" style="color: white; font-family: 'Poppins medium', sans-serif">
            <div class="dropdown ml-1 mt-2" @click="ingestInfoSharedInternas">
              <a class="ml-3" data-bs-toggle="dropdown" style="margin-left: 15px; cursor: pointer">
                <i class="fas fa-share-alt" style="color: white"></i>
              </a>
              <ul class="dropdown-menu">
                <ShareNetwork class="p-2" style="text-align: center"
                              v-for="network in networks"
                              :network="network.network"
                              :key="network.network"
                              :url='`https://educadorafm.ba.gov.br/programa/${program.id}`'
                              :title='`Conheça o programa ${program.name} da rádio Educadora FM 107.5.`'
                              description="*Baixe agora o novo App da Educadora FM 107.5* - Android: rebrand.ly/educadorafmandroid | iOS: rebrand.ly/educadorafmios"
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
            <div v-html="program.description" style="font-size: 14px">{{ program.description }}</div>
          </div>
        </div>

        <div class="d-flex col-12 col-sm-10 col-lg-10 col-xl-10 col-xxl-10">
          <div class="container">
            <div class="row list ml-1">
              <div class="col-6 col-sm-3 col-lg-3 col-xxl-2" v-for="edition in editions" :key="edition.id">
                <div class="card">
                  <a href="">
                    <img :src="`https://ingest.educadorafm.ba.gov.br/thumbnail/upload/img/${edition.picture.name}`"
                         class="card-img-top mb-1" style="max-width: 219px; max-height: 219px"/>
                  </a>
                  <div class="stamp-program" v-if=" edition.id != idPlay "
                       @click="playMP3(
                        'https://ingest.educadorafm.ba.gov.br/'+edition.mp3_upload.url,
                        edition.id,
                        'https://ingest.educadorafm.ba.gov.br/thumbnail/upload/img/'+edition.picture.name,
                        edition.edition,
                        program.name,
                        edition.program_id,
                        '/program/'+edition.program_id+'/edicao/'+edition.id,
                        edition.thin_line,
                        edition.description
                       )">
                    <img class="img-fluid"
                         :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/${edition.program_id}.svg`"
                         style="max-width: 219px; max-height: 219px">
                  </div>
                  <div class="stamp-program" v-if=" edition.id == idPlay " @click="pauseMP3(edition.id)">
                    <img class="img-fluid"
                         :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/pause/${edition.program_id}.svg`"
                         style="max-width: 219px; max-height: 219px">
                  </div>
                  <div class="card-body p-0 mb-2" style="max-width: 219px; max-height: 219px">
                    <a style="text-decoration: none">
                      <router-link
                        :to="{ name: 'edition_details', params: { id_program: program.id, id_edition: edition.id }}">
                        <h5 class="card-line mb-0 pb-0" style="font-family: 'Poppins light', sans-serif; font-weight: 400;">
                          <TruncateTextHelperComponent :max-caracteres="65" :texto-completo="`${edition.thin_line}`"/>
                        </h5>
                        <p class="card-text mt-0">{{ formattedDate(edition.edition) }}</p>
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
import axios from 'axios'
import TruncateTextHelperComponent from '../components/helpers/TruncateTextHelperComponent.vue'

export default {
  name: 'ProgramDetails',
  metaInfo () {
    return {
      title: this.program.name,
      titleTemplate: '%s | Educadora FM 107.5',
      meta: [
        {name: 'description', content: ''},
        {property: 'og:title', content: this.program.name + ' | Educadora FM 107.5'},
        {property: 'og:description', content: ''},
        {property: 'og:url', content: 'https://homologa.irdeb.ba.gov.br/programa/'+this.program.id},
        {property: 'twitter:title', content: this.program.name + ' | Educadora FM 107.5'},
        {property: 'twitter:description', content: ''},
        {property: 'twitter:card', content: 'summary'},
        {property: 'twitter:url', content: 'https://educadorafm.ba.gov.br/programa/'+this.program.id}
      ]
    }
  },
  props: ['playMP3', 'idPlay', 'pauseMP3', 'copyLink'],
  components: {
    TruncateTextHelperComponent
  },
  data () {
    return {
      program: [],
      editions: [],
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
      ]
    }
  },
  mounted () {
    const id = this.$route.params.id
    const headers = {
      'X-API-Key': '44AiC0g%ofjqMY:nakJT3g1YyL{14$[)'
    }
    axios.get(`https://ingest.educadorafm.ba.gov.br/api/getProgramDetails/${id}`, {headers})
      .then(response => {
        this.program = response.data.program
        this.editions = response.data.editions
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
      // const options = {day: '2-digit', month: '2-digit', year: 'numeric'}
      const options = {day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'America/Sao_Paulo'}
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
        id_program: this.program.id,
        program_name: this.program.name,
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

button {
  background-color: transparent;
  border: none;
}
button i:hover {
  transform: scale(1.08);
  transition: 50ms;
}

</style>
