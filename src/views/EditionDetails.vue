<template>
  <div id="main" class="main d-flex flex-column">
    <div class="margin-top">

    </div>

    <div class="main-container" style="margin-bottom: 30px">

      <div class="row">
        <div class="col-12 list px-4 pt-0 d-block d-sm-none">
          <button @click="goBack" style="color: white">
            <h6 class="mt-0 mb-3 ml-0" style="color: white; font-family: 'Poppins Semibold', sans-serif; font-size: 24px;"><i class="fa fa-arrow-left"></i></h6>
          </button>
          <div class="d-flex justify-content-center">
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
                        '',
                        edition.thin_line,
                        edition.description
                       )">
                <img class="img-fluid"
                     :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/${edition.program_id}.svg`"
                     style="max-width: 219px; max-height: 219px"
                     @error="handleError">
              </div>
              <div class="stamp-program" v-if=" edition.id == idPlay " @click="pauseMP3(edition.id)">
                <img class="img-fluid"
                     :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/pause/${edition.program_id}.svg`"
                     style="max-width: 219px; max-height: 219px"
                     @error="handleErrorPause">
              </div>
              <div class="card-body p-0 mb-2" style="max-width: 219px; max-height: 219px">
                <h5 class="card-line mb-0 pb-0" style="font-family: 'Poppins', sans-serif; font-weight: 400;">
                  {{edition.thin_line}}
                </h5>
                <p class="card-text mt-0" v-html="formattedDate(edition.edition)"></p>
              </div>
            </div>
          </div>
          <div class="ml-1" style="font-family: 'Poppins', sans-serif; font-weight: 400;color: white">
            <div class="dropdown ml-1 mt-2" @click="ingestInfoSharedInternas">
              <a class="ml-3" data-bs-toggle="dropdown" style="margin-left: 15px; cursor: pointer">
                <i class="fas fa-share-alt" style="color: white"></i>
              </a>
              <ul class="dropdown-menu">
                <ShareNetwork class="p-4" style="text-align: center"
                              v-for="network in networks"
                              :network="network.network"
                              :key="network.network"
                              :url='`https://educadorafm.ba.gov.br/program/${program.id}/edicao/${edition.id}`'
                              :title='`Escute comigo o ${program.name} da Educadora FM 107.5 - ${edition.thin_line}`'
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
            <div v-html="edition.description"></div>
            <div class="mt-5">
              <h4 style="font-family: 'Poppins Semibold', sans-serif; font-size: 24px; line-height: 25px"><img src="../assets/img/svg/lupa_busca.svg" width="26px" class="" style="margin-right: 10px">Tags de Busca</h4>
            </div>

            <div class="mt-4">
              <h6 class="mb-2" style="font-family: 'Poppins Semibold', sans-serif; font-size: 21px; line-height: 25px" v-if="edition.musicas_tags[0] !== '-'">Músicas</h6>
              <p style="text-transform: uppercase; font-family: 'Poppins medium', sans-serif; font-size: 12px; line-height: 16px"><a href="" v-for="(tagMusic, index) in edition.musicas_tags" @click.prevent="tagSearch(tagMusic)" v-if="tagMusic !== '-'" :key="index" style="color: #d7cfcf">{{ index === edition.musicas_tags.length - 1 ? tagMusic : tagMusic + ', ' }}</a></p>
            </div>

            <div class="mt-4">
              <h6 class="mb-2" style="font-family: 'Poppins Semibold', sans-serif; font-size: 21px; line-height: 25px" v-if="edition.genero_tags[0] !== '-'">Gêneros</h6>
              <p style="text-transform: uppercase; font-family: 'Poppins medium', sans-serif; font-size: 12px; line-height: 16px"><a href="" v-for="(tagGenero, index) in edition.genero_tags" @click.prevent="tagSearch(tagGenero)" v-if="tagGenero !== '-'" :key="index" style="color: #d7cfcf">{{ index === edition.genero_tags.length - 1 ? tagGenero : tagGenero + ', '}}</a></p>
            </div>

            <div class="mt-4">
              <h6 class="mb-2" style="font-family: 'Poppins Semibold', sans-serif; font-size: 21px; line-height: 25px" v-if="edition.artistas_tags[0] !== '-'">Intérpretes</h6>
              <p style="text-transform: uppercase; font-family: 'Poppins medium', sans-serif; font-size: 12px; line-height: 16px"><a href="" v-for="(tagArtist, index) in edition.artistas_tags" @click.prevent="tagSearch(tagArtist)" v-if="tagArtist !== '-'" :key="index" style="color: #d7cfcf">{{ index === edition.artistas_tags.length - 1 ? tagArtist : tagArtist + ', ' }}</a></p>
            </div>

            <div class="mt-4">
              <h6 class="mb-2" style="font-family: 'Poppins Semibold', sans-serif; font-size: 21px; line-height: 25px" v-if="edition.compositor_tags[0] !== '-'">Compositores</h6>
              <p style="text-transform: uppercase; font-family: 'Poppins medium', sans-serif; font-size: 12px; line-height: 16px;"><a href="" v-for="(tagAuthor, index) in edition.compositor_tags" @click.prevent="tagSearch(tagAuthor)" v-if="tagAuthor !== '-'" :key="index" style="color: #d7cfcf">{{ index === edition.compositor_tags.length - 1 ? tagAuthor : tagAuthor + ', ' }}</a></p>
            </div>
          </div>
        </div>
        <div class="col-2 list ml-4 d-none d-sm-block">
          <button @click="goBack" style="color: white">
            <h6 class="mt-0 mb-3 ml-0" style="color: white; font-family: 'Poppins Semibold', sans-serif; font-size: 24px;"><i class="fa fa-arrow-left"></i></h6>
          </button>
          <div class="card pt-2">
            <a href="">
              <img :src="`https://ingest.educadorafm.ba.gov.br/thumbnail/upload/img/${edition.picture.name}`" class="card-img-top mb-3"/>
            </a>
            <div class="stamp-program" v-if=" edition.id != idPlay "
                        @click="playMP3(
                        'https://ingest.educadorafm.ba.gov.br/'+edition.mp3_upload.url,
                        edition.id,
                        'https://ingest.educadorafm.ba.gov.br/thumbnail/upload/img/'+edition.picture.name,
                        edition.edition,
                        program.name,
                        edition.program_id,
                        '',
                        edition.thin_line,
                        edition.description
                       )">
              <img class="img-fluid" :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/${edition.program_id}.svg`"
                   @error="handleError">
            </div>
            <div class="stamp-program" v-if=" edition.id == idPlay " @click="pauseMP3(edition.id)">
              <img class="img-fluid" :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/pause/${edition.program_id}.svg`"
                   @error="handleErrorPause">
            </div>
            <div class="card-body p-0">
              <h3 class="mt-0 mb-1 ml-0 mt-2" style="color: white; 'Poppins', sans-serif; font-weight: 400; line-height: 30px">{{program.name}}</h3>
            </div>
          </div>
          <div class="ml-1" style="font-family: 'Poppins medium', sans-serif; font-weight: 400;color: white">
            <div class="dropdown ml-1 mt-0" @click="ingestInfoSharedInternas">
              <a class="ml-3" data-bs-toggle="dropdown" style="margin-left: 15px; cursor: pointer">
                <i class="fas fa-share-alt" style="color: white"></i>
              </a>
              <ul class="dropdown-menu">
                <ShareNetwork class="p-2" style="text-align: center"
                              v-for="network in networks"
                              :network="network.network"
                              :key="network.network"
                              :url='`https://educadorafm.ba.gov.br/program/${program.id}/edicao/${edition.id}`'
                              :title='`Escute comigo o ${program.name} da Educadora FM 107.5 - ${edition.thin_line}`'
                              description="*Baixe agora o novo App da Educadora FM 107.5* - Android: rebrand.ly/educadorafmandroid | iOS: rebrand.ly/educadorafmios"
                              quote="É sua! É da Bahia"
                              hashtags="EducadoraFM,musica,bahia"
                              twitterUser="educadorafmba"
                              :srcImg="`https://ingest.educadorafm.ba.gov.br/thumbnail/upload/img/${edition.picture.name}`"
                >
                  <i :class="network.icon" class="mt-3" style="color: white; width: 24px"></i>
                  <!-- <img :src="network.srcImg"  style="width: 24px; height: 24px" class="mb-2"> -->
                </ShareNetwork>
                <a class="p-2" id="copy_link" style="text-align: center" @click="copyLink">
                  <i class="mt-3 fa fa-link" style="color: white; width: 24px"></i>
                </a>
              </ul>
            </div>
            <hr style="size: 1px; background: white; opacity: 1;">
            <div v-html="program.description" style="font-size: 14px"></div>
          </div>
        </div>

        <div class="d-flex col-8 d-none d-sm-block">
          <div class="container">
            <div class="col-9" style="color: white; font-family: 'Poppins', sans-serif">
              <h3 v-html="'Edição: '+ formattedDate(edition.edition)" class="mb-4" style="'Poppins', sans-serif; font-weight: 400; line-height: 25px; font-size: 21px">
              </h3>
              <div class="col-3" style="cursor: pointer;">
                <!--<a @click="share">
                  <i class="fas fa-share-alt"></i>
                </a>-->
              </div>

              <h5 class="mb-3" style="font-family: 'Poppins medium', sans-serif; font-weight: 400; font-size: 16px">{{edition.thin_line}}</h5>
              <div v-html="edition.description" style="font-size: 14px; font-family: 'Poppins medium', sans-serif">

              </div>

              <div class="mt-5">
                <h4 style="font-family: 'Poppins Semibold', sans-serif; font-size: 24px; line-height: 25px"><img src="../assets/img/svg/lupa_busca.svg" width="26px" class="" style="margin-right: 10px">Tags de Busca</h4>
              </div>

             <div class="mt-4">
                <h6 class="mb-2" style="font-family: 'Poppins Semibold', sans-serif; font-size: 21px; line-height: 25px" v-if="edition.musicas_tags[0] !== '-'">Músicas</h6>
                <p style="text-transform: uppercase; font-family: 'Poppins medium', sans-serif; font-size: 12px; line-height: 16px"><a href="" v-for="(tagMusic, index) in edition.musicas_tags" @click.prevent="tagSearch(tagMusic)" v-if="tagMusic !== '-'" :key="index" style="color: #d7cfcf">{{ index === edition.musicas_tags.length - 1 ? tagMusic : tagMusic + ', ' }}</a></p>
              </div>

              <div class="mt-4">
                <h6 class="mb-2" style="font-family: 'Poppins Semibold', sans-serif; font-size: 21px; line-height: 25px" v-if="edition.genero_tags[0] !== '-'">Gêneros</h6>
                <p style="text-transform: uppercase; font-family: 'Poppins medium', sans-serif; font-size: 12px; line-height: 16px"><a href="" v-for="(tagGenero, index) in edition.genero_tags" @click.prevent="tagSearch(tagGenero)" v-if="tagGenero !== '-'" :key="index" style="color: #d7cfcf">{{ index === edition.genero_tags.length - 1 ? tagGenero : tagGenero + ', '}}</a></p>
              </div>

              <div class="mt-4">
                <h6 class="mb-2" style="font-family: 'Poppins Semibold', sans-serif; font-size: 21px; line-height: 25px" v-if="edition.artistas_tags[0] !== '-'">Intérpretes</h6>
                <p style="text-transform: uppercase; font-family: 'Poppins medium', sans-serif; font-size: 12px; line-height: 16px"><a href="" v-for="(tagArtist, index) in edition.artistas_tags" @click.prevent="tagSearch(tagArtist)" v-if="tagArtist !== '-'" :key="index" style="color: #d7cfcf">{{ index === edition.artistas_tags.length - 1 ? tagArtist : tagArtist + ', ' }}</a></p>
              </div>

              <div class="mt-4">
                <h6 class="mb-2" style="font-family: 'Poppins Semibold', sans-serif; font-size: 21px; line-height: 25px" v-if="edition.compositor_tags[0] !== '-'">Compositores</h6>
                <p style="text-transform: uppercase; font-family: 'Poppins medium', sans-serif; font-size: 12px; line-height: 16px;"><a href="" v-for="(tagAuthor, index) in edition.compositor_tags" @click.prevent="tagSearch(tagAuthor)" v-if="tagAuthor !== '-'" :key="index" style="color: #d7cfcf">{{ index === edition.compositor_tags.length - 1 ? tagAuthor : tagAuthor + ', ' }}</a></p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3" style="height: 70px">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import TruncateTextHelperComponent from '../components/helpers/TruncateTextHelperComponent.vue'

export default {
  name: 'EditionDetails',
  metaInfo () {
    return {
      title: this.program.name +' - '+this.formattedDate2(this.edition.edition),
      titleTemplate: '%s | Educadora FM 107.5',
      meta: [
        {name: 'description', content: this.edition.description},
        {property: 'og:title', content: this.program.name+' - '+this.formattedDate2(this.edition.edition)+ ' | Educadora FM 107.5'},
        {property: 'og:description', content: ''},
        {property: 'og:url', content: 'https://educadorafm.ba.gov.br/program/'+this.program.id+'/edicao/'+this.edition.id},
        {property: 'twitter:title', content: 'TESTE'+' - '+this.edition.edition + ' | Educadora FM 107.5'},
        {property: 'twitter:description', content: this.edition.description},
        {property: 'twitter:card', content: 'summary'},
        {property: 'twitter:url', content: 'https://educadorafm.ba.gov.br/program/'+this.program.id+'/edicao/'+this.edition.id}
      ]
    }
  },
  components: {TruncateTextHelperComponent},
  props: ['playMP3', 'idPlay', 'pauseMP3', 'copyLink'],
  data () {
    return {
      program: [],
      edition: [],
      audioSrc: '',
      id_prov: '',
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
        // { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', srcImg: 'https://ingest.educadorafm.ba.gov.br/svg/logo_educadorafm.svg' },
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
    const id = this.$route.params.id_edition
    const headers = {
      'X-API-Key': '44AiC0g%ofjqMY:nakJT3g1YyL{14$[)'
    }
    axios.get(`https://ingest.educadorafm.ba.gov.br/api/getEditionDetails/${id}`, {headers})
      .then(response => {
        this.program = response.data.program
        this.edition = response.data.edition
      })
      .catch(error => {
        console.log(error)
      })

  },
  methods: {
    goBack () {
      window.history.back()
    },
    tagSearch (tag) {
      this.$emit('search', tag)
    },
    formattedDate (editionDate) {
      editionDate = editionDate + ' 00:00:00'
      const date = new Date(editionDate)
      const options = {day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'America/Sao_Paulo'}
      const formatted = date.toLocaleDateString('pt-BR', options)
      const separator = ' &bull; '
      return formatted.split('/').join(separator)
    },
    formattedDate2 (editionDate) {
      editionDate = editionDate + ' 00:00:00'
      const date = new Date(editionDate)
      // const options = {day: '2-digit', month: '2-digit', year: 'numeric'}
      const options = {day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'America/Sao_Paulo'}
      return date.toLocaleDateString('pt-BR', options)
    },
    handleError (event) {
      event.target.src = 'https://ingest.educadorafm.ba.gov.br/img/stamp-programs/Marca-Acervo.svg'
    },
    handleErrorPause (event) {
      event.target.src = 'https://ingest.educadorafm.ba.gov.br/img/stamp-programs/pause/Marca-Acervo.svg'
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
        id_edition: this.edition.id,
        edition_edition: this.edition.edition,
        origin: 'site'
      }
      // console.log(this.edition)
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

<style scoped>
button {
  background-color: transparent;
  border: none;
}
button i:hover {
  transform: scale(1.08);
  transition: 50ms;
}
</style>
