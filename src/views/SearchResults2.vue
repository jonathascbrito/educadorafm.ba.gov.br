<template>
  <div id="main" class="main d-flex flex-column">
    <div class="margin-top">
    </div>
    <div class="main-container">
      <button @click="goBack" style="color: white">
        <h6 class="mt-0 mb-3 ml-0" style="color: white; font-family: 'Poppins Semibold', sans-serif; font-size: 24px;"><i class="fa fa-arrow-left"></i></h6>
      </button>
      <h4 style="color: white" class="mb-4">Resultado da Busca para "{{query}}"</h4>
      <div class="d-flex align-items-center mb-2">
        <div>
          <h2 class="title mb-2" v-if="programsList.length !== 0">Programas</h2>
          <h2 class="title mb-2" v-if="programsList.length === 0">Nenhum resultado para Programas</h2>
          <span class="subtitle">
          </span>
        </div>
      </div>
      <div class="row list mb-3">
        <div class="col-6 col-md-3 col-lg-1 mb-0" v-for="program in programsList" :key="program.url">
          <div class="card">
            <a>
              <router-link :to="`${program.url}`" tag="a">
                <img :src="`https://ingest.educadorafm.ba.gov.br/icone/${program.src_img}`" class="card-img-top mb-3" />
              </router-link>
            </a>
            <!--
            <div class="card-body p-0">
              <a href="">
                <h5  class="card-title">{{$program->name}}</h5>
              </a>
            </div>
            -->
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-start flex-column mb-2">
        <h2 class="title mb-2">Edições</h2>

        <!-- Botões de Ordenação -->
        <div class="ml-3">
          <h6 class="mt-0 mb-3 ml-0 d-inline-block mr-2" style="color: white; font-family: 'Poppins Semibold', sans-serif; font-size: 16px;">Ordenar Por:</h6>
          <button class="btn btn-secondary btn-sm" :class="{ 'btn-outline-secondary': orderByOldest }" @click="sortByNewest">Mais Recente</button>
          <button class="btn btn-secondary btn-sm" :class="{ 'btn-outline-secondary': !orderByOldest }" @click="sortByOldest">Mais Antigo</button>
        </div>

        <!-- Botões de Exibição (em uma linha separada) -->
        <div class="ml-3">
          <h6 class="mt-0 mb-3 ml-0 d-inline-block mr-2" style="color: white; font-family: 'Poppins Semibold', sans-serif; font-size: 16px;">Exibir Por:</h6>
          <button class="btn btn-secondary btn-sm" :class="{ 'btn-outline-secondary': showAll}" @click="showAllEditions">Todos</button>
          <button class="btn btn-secondary btn-sm" :class="{ 'btn-outline-secondary': showCategory }" @click="showCategoryEditions">Categoria</button>
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <div class="d-flex col-12 col-sm-12 col-xxl-12" v-if="showAll">
          <div class="container" style="padding-left: 0px; margin-left: 0px">
            <div class="row list">
              <div class="col-6 col-sm-3 col-lg-3 col-xxl-2" v-for="edition in editions" :key="edition.id">
                <div class="card">
                  <a href="">
                    <img :src="`https://ingest.educadorafm.ba.gov.br/thumbnail/upload/img/${edition.picture.name}`"
                         class="card-img-top mb-1"/>
                  </a>
                  <div class="stamp-program" v-show=" edition.id != idPlaySearch "
                       @click="playMP3Search2(
                        'https://ingest.educadorafm.ba.gov.br/'+edition.mp3_upload.url,
                        edition.id,
                        'https://ingest.educadorafm.ba.gov.br/thumbnail/upload/img/'+edition.picture.name,
                        edition.edition,
                        edition.program.name,
                        edition.program.id,
                        edition.program_id === 'Marca-Acervo' ? '/acervo' : `/program/${edition.program_id}/edicao/${edition.id}`,
                        edition.thin_line,
                        edition.description
                       )">
                    <img class="img-fluid"
                         :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/${edition.program_id}.svg`"
                         style=""
                         @error="handleError">
                  </div>
                  <div class="stamp-program" v-show=" edition.id == idPlaySearch " @click="pauseMP3Search2(edition.id)">
                    <img class="img-fluid"
                         :src="`https://ingest.educadorafm.ba.gov.br/img/stamp-programs/pause/${edition.program_id}.svg`"
                         style=""
                         @error="handleErrorPause">
                  </div>
                  <div class="card-body p-0 mb-2" style="">
                    <router-link
                      :to="{ name: 'edition_details', params: { id_program: edition.program_id, id_edition: edition.id }}" style="text-decoration: none">
                      <h5 class="card-line mb-0 pb-0">
                        <TruncateTextHelperComponent :max-caracteres="65" :texto-completo="`${edition.thin_line}`" style="font-family: 'Poppins light', sans-serif; font-weight: 400; font-size: 13px"/>
                      </h5>
                      <p class="card-text mt-0">{{ formattedDate(edition.edition) }}</p>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade" mode="out-in">
        <div v-if="showCategory">
          <SliderSearchComponent v-if="editionsLoaded === true && generos.generoEditions.length !== 0" :options="glideOptions" :editions="generos.generoEditions" :mp3Play="playMP3Search2" :idPlay="idPlaySearch" :pauseMp3="pauseMP3Search2" :busca="query" :key="generoKey"/>
          <SliderSearchArtistsComponent v-if="editionsLoaded === true && artists.artistsEditions.length !== 0" :options="glideOptions" :editions="artists.artistsEditions" :mp3Play="playMP3Search2" :idPlay="idPlaySearch" :pauseMp3="pauseMP3Search2" :busca="query" :key="artistKey"/>
          <SliderSearchAuthorsComponent v-if="editionsLoaded === true && authors.authorsEditions.length !== 0" :options="glideOptions" :editions="authors.authorsEditions" :mp3Play="playMP3Search2" :idPlay="idPlaySearch" :pauseMp3="pauseMP3Search2" :busca="query" :key="authorKey"/>
          <SliderSearchMusicsComponent v-if="editionsLoaded === true && musics.musicsEditions.length !== 0" :options="glideOptions" :editions="musics.musicsEditions" :mp3Play="playMP3Search2" :idPlay="idPlaySearch" :pauseMp3="pauseMP3Search2" :busca="query" :key="musicKey"/>
        </div>
      </transition>
      <!--
      <div class="row list ml-1">
        <div class="col-6 col-sm-3 col-lg-3 col-xxl-2" v-for="edition in generos.generoEditions" :key="edition.id">
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
                        'Program name',
                        edition.program_id,
                        '/program/'+edition.program_id+'/edicao/'+edition.id,
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
                <h5 class="card-line mb-0 pb-0" style="font-family: 'Poppins', sans-serif; font-weight: 400;">
                  <TruncateTextHelperComponent :max-caracteres="65" :texto-completo="`${edition.thin_line}`"/>
                </h5>
                <p class="card-text mt-0">{{ formattedDate(edition.edition) }}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      -->
      <!--
      <ProgramListComponent v-if="editionsLoaded" :programs="programsList" :options="glideOptionsPrograms" :key="programsListKey"/>
      -->
      <!--
      <SliderComponent v-if="editionsLoaded" :editions="stand" :options="glideOptions" v-for="stand in stands" :mp3Play="playMP3" :idPlay="idPlay" :pauseMp3="pauseMP3" :key="resultListKey"/>
      -->
      <div class="mt-3 d-block d-sm-none" style="height: 70px">
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import {Glide, GlideSlide} from 'vue-glide-js'
import ProgramListComponent from '../components/sliders/ProgramListComponent.vue'
import TruncateTextHelperComponent from '../components/helpers/TruncateTextHelperComponent.vue'
import SliderComponent from '../components/sliders/SliderComponent.vue'
import SliderSeloMobile from '../components/sliders/SliderSeloMobile.vue'
import SliderSearchComponent from '../components/sliders/SliderSearchComponent.vue'
import SliderSearchArtistsComponent from '../components/sliders/SliderSearchArtistsComponent.vue'
import SliderSearchAuthorsComponent from '../components/sliders/SliderSearchAuthorsComponent.vue'
import SliderSearchMusicsComponent from '../components/sliders/SliderSearchMusicsComponent.vue'

export default {
  name: 'Home',
  props: ['query', 'idPlay', 'sharing', 'url'],
  components: {
    SliderSeloMobile,
    SliderComponent,
    SliderSearchComponent,
    SliderSearchArtistsComponent,
    SliderSearchAuthorsComponent,
    SliderSearchMusicsComponent,
    TruncateTextHelperComponent,
    ProgramListComponent,
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  },
  data () {
    return {
      orderByOldest: true,
      showAll: true,
      showCategory: false,
      idPlaySearch: '',
      audioRef: '',
      editions: [],
      generos: [],
      artists: [],
      authors: [],
      musics: [],
      generoKey: 0,
      artistKey: 30,
      authorKey: 60,
      musicKey: 90,
      programListKey: 0,
      resultListKey: 0,
      programsList: [],
      editionsHighlight: [],
      editionsLoaded: false,
      testes: [],
      stands: [],
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
        },
      },
      glideOptionsPrograms: {
        type: 'slider',
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
      },
      idPlayTeste: ''
    }
  },
  watch: {
    query (newQuery) {
      this.loadResults(newQuery)
    }
  },
  mounted () {
    // console.log('Home mounted')
    // this.loadResults()
    this.audioRef = this.$root.$el.querySelector('#player');
    this.idPlaySearch = this.idPlay
    this.idPlayTeste = this.idPlay
    //console.log(this.idPlay + ' idPlay')
    //console.log(this.idPlaySearch + ' idSearch')
    //console.log(this.idPlayTeste + ' idPlayTeste')
  },
  beforeCreate () {
    // console.log('Home antes Criada')
  },
  created () {
    //console.log('Search Results' + this.query)
    this.loadResults(this.query)
  },
  beforeMount () {
    //var offcanvasElement = document.getElementById('navbarNav')
    // eslint-disable-next-line
    //var offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement)
    //offcanvas.hide()
  },
  methods: {
    showAllEditions() {
      this.showAll = true;
      this.showCategory = false;
    },
    showCategoryEditions() {
      this.showAll = false;
      this.showCategory = true;
    },
    sortByDate(editions) {
      if(!this.orderByOldest) {
        return editions.sort((a, b) => new Date(a.edition) - new Date(b.edition));
      } else {
        return editions.sort((a, b) => new Date(b.edition) - new Date(a.edition));
      }
    },
    sortByOldest() {
      this.orderByOldest = false
      this.generos.generoEditions = this.sortByDate(this.generos.generoEditions);
      this.artists.artistsEditions = this.sortByDate(this.artists.artistsEditions);
      this.authors.authorsEditions = this.sortByDate(this.authors.authorsEditions);
      this.musics.musicsEditions = this.sortByDate(this.musics.musicsEditions);
      this.editions.sort((a, b) => {
        return new Date(a.edition) - new Date(b.edition);
      })
    },
    sortByNewest() {
      this.orderByOldest = true
      this.generos.generoEditions = this.sortByDate(this.generos.generoEditions);
      this.artists.artistsEditions = this.sortByDate(this.artists.artistsEditions);
      this.authors.authorsEditions = this.sortByDate(this.authors.authorsEditions);
      this.musics.musicsEditions = this.sortByDate(this.musics.musicsEditions);
      this.editions.sort((a, b) => {
        return new Date(b.edition) - new Date(a.edition);
      })
    },
    goBack () {
      window.history.back()
    },
    updateSearchFather(url, idPlay, sharing) {
      this.$emit('updateSearch', {url, idPlay, sharing})
    },
    async loadResults (query) {
      try {
        const headers= {
          'X-API-Key': '44AiC0g%ofjqMY:nakJT3g1YyL{14$[)'
        }
        //console.log('Buscando os resultados para a busca ' + query)
        const responseProgramList = await axios.post('https://ingest.educadorafm.ba.gov.br/api/search', {'search': this.query}, { headers })
        const responseGeneroList = await axios.post('https://ingest.educadorafm.ba.gov.br/api/getGeneros', {'search': this.query}, { headers })
        const responseArtistsList = await axios.post('https://ingest.educadorafm.ba.gov.br/api/getArtists', {'search': this.query}, { headers })
        const responseAuthorsList = await axios.post('https://ingest.educadorafm.ba.gov.br/api/getAuthors', {'search': this.query}, { headers })
        const responseMusicsList = await axios.post('https://ingest.educadorafm.ba.gov.br/api/getMusics', {'search': this.query}, { headers })
        const responseEditions = await axios.post('https://ingest.educadorafm.ba.gov.br/api/searchEditions', {'search': this.query}, {headers})
        console.log(responseMusicsList.data)
        this.editions = responseEditions.data.resultEditions
        // console.log(responseProgramList)
        // const responseStands = await axios.get('https://ingest.educadorafm.ba.gov.br/api/homeSite')
        this.programsList = responseProgramList.data.programs
        //console.log('This programsList ' + this.programsList)
        this.generos = responseGeneroList.data
        this.artists = responseArtistsList.data
        this.authors = responseAuthorsList.data
        this.musics = responseMusicsList.data
        // const totalGenero = this.generos.generosEditions
        // console.log(totalGenero.length)
        //this.artists = responseArtistsList.data.editions
        //this.authors = responseAuthorsList.data.editions
        //this.musics = responseMusicsList.data.editions
        this.editionsLoaded = true
        this.programListKey++
        this.resultListKey++
        this.generoKey++
        this.artistKey++
        this.authorKey++
        this.musicKey++
        //console.log(this.artists.artistsEditions.length)
      } catch (error) {
        console.error(error)
      }
    },
    formattedDate (editionDate) {
      editionDate = editionDate + ' 00:00:00'
      const date = new Date(editionDate)
      const options = {day: '2-digit', month: '2-digit', year: 'numeric'}
      return date.toLocaleDateString('pt-BR', options)
    },
    playMP3Search2(valor, id, img, name_edition, name_program, program_id, url_share=null, thin_line=null, description=null){
      this.idPlaySearch = id
      console.log(this.idPlaySearch)
      this.$emit('emitFunctionPlayMp3', {valor, id, img, name_edition, name_program, program_id, url_share, thin_line, description})
    },
    playMP3Search (valor, id, img, name_edition, name_program, program_id, url_share=null, thin_line=null, description=null) {
      if (this.audioRef.src != encodeURI(valor)) {
        this.audioRef.src = valor;
      }
      this.audioRef.play()
      this.idPlay = id
      this.idPlaySearch = id
      console.log(this.idPlay)
      const url_img = img
      let name = ''
      if(program_id !== 'selo') {
        name = this.formattedDate(name_edition)
      } else {
        name = name_edition
      }
      if(name === 'Invalid Date') {
        name = name_edition
      }
      const program = name_program
      const id_program = program_id
      let play_infor = document.getElementsByClassName('infor_player')
      play_infor[0].innerHTML = `
                <div class="cover d-flex align-items-center">
                    <img src="`+url_img+`" id="img_card_compartilhar" data-id="`+this.idPlay+`" data-program="`+id_program+`" data-edition="`+name+`" data-name="`+program+`"/>
                </div>
                <div class="d-flex flex-column text mx-3">
                    <label class="m-0">`+program+`</label>
                    <span class="color-default">`+name+`</span>
                </div>
            `
      let play_infor_mobile = document.getElementsByClassName('infor_player_mobile')
      play_infor_mobile[0].innerHTML = `
                <div class="cover d-flex align-items-center">
                    <img src="`+url_img+`" id="img_card_compartilhar" data-id="`+this.idPlay+`" data-program="`+id_program+`" data-edition="`+name+`" data-name="`+program+`"/>
                </div>
                <div class="d-flex flex-column text mx-3">
                    <label class="m-0">`+program+`</label>
                    <span class="color-default">`+name+`</span>
                </div>
            `
      let editionDetailsMobile = document.getElementsByClassName('edition-details-mobile')
      editionDetailsMobile[0].innerHTML = `
                <div class="album-card">
                    <img src="` + url_img +`" alt="Capa do Álbum">
                    <h3>` + program + `</h3>
                    </div>
                    <p class="description">`+ name +`</p>
                </div>`

      editionDetailsMobile[0].innerHTML = `
        <div class="card" style="border: none; background-color: #181818; margin-bottom: 2px">
            <a><img src="`+ url_img +`" class="card-img-top"  style="border: none"/></a>
            <div class="card-body p-0 mb-2">
            <h5 class="card-line mb-0 pb-0" style="font-family: 'Poppins light', sans-serif; font-weight: 400;">`+ thin_line +`</h5>
            <p class="card-text mt-0" style="color: #fff; font-family: 'Poppins light', sans-serif; font-weight: 150"><b>`+ program +`:</b> `+ name +`</p>
            </div>
        </div>
      `
      let editionDetailsDescriptionMobile = document.getElementsByClassName('edition-details-description')
      editionDetailsDescriptionMobile[0].innerHTML = description
      //console.log('Play na mp3 da edição')
      //console.log(this.idPlay)
      //console.log(url_share)
      let urlSplit = url_share.split('/')
      if(urlSplit[1] === 'selo') {
        this.sharing = {
          url: 'https://homologa.irdeb.ba.gov.br'+url_share,
          title: 'Escute comigo os artistas do Selo Educadora FM Independente.',
          description: `Escute o artista ${name} que faz parte do Selo Educadora FM Independente.`,
          quote: 'É sua! É da Bahia',
          hashtags: 'Educadora FM, É sua! É da Bahia',
          twitterUser: 'educadorafm'
        }
        //console.log(this.sharing)
      } else if(urlSplit[1] === 'acervo') {
        this.sharing = {
          url: 'https://homologa.irdeb.ba.gov.br'+url_share,
          title: 'Escute comigo o Acervo da Educadora FM.',
          description: `Escute programas especiais com conteúdos exclusivos do Acervo da Rádio Educadora FM fundada em 1978.`,
          quote: 'É sua! É da Bahia',
          hashtags: 'Educadora FM, É sua! É da Bahia',
          twitterUser: 'educadorafm'
        }
        //console.log(this.sharing)
      } else if(urlSplit[1] === 'festival'){
        this.sharing = {
          url: 'https://homologa.irdeb.ba.gov.br'+url_share,
          title: 'Escute comigo os vencedores do Festival Educadora FM.',
          description: `Escute os Especiais das Seis com o vencedores das Edições do Festival de Música Educadora FM.`,
          quote: 'É sua! É da Bahia',
          hashtags: 'Educadora FM, É sua! É da Bahia',
          twitterUser: 'educadorafm'
        }
      } else {
        this.sharing = {
          url: 'http://homologa.irdeb.ba.gov.br'+url_share,
          title: `Escute comigo a edição: ${name} do ${program} da Educadora FM.`,
          description: `Muito mais sintonizada!`,
          quote: 'É sua! É da Bahia',
          hashtags: 'Educadora FM, É sua! É da Bahia',
          twitterUser: 'educadorafm'
        }
        //console.log(this.sharing)
      }
      // this.ingestInfo(id, name_program, name)
      this.updateSearchFather(url_share, this.idPlay, this.sharing)
    },
    ingestInfo(id, program, edition=null){
      const requestData = {
        id: id,
        program: program,
        edition: edition
      }
      axios.post('http://localhost:8000/api/ingestInfo', requestData)
        .then(response => {
          //console.log('Resposta da API', response.data);
        })
        .catch(error => {
          //console.error('Erro na chamada POST à AEP: ', error)
        })
    },
    pauseMP3Search2(id){
      this.id_prov = this.idPlaySearch
      this.idPlaySearch = 0
      this.idPlay = 0
      this.$emit('emitFunctionPauseMp3', {id})
    },
    pauseMP3Search (id) {
      this.audioRef.pause()
      this.id_prov = this.idPlay
      this.idPlaySearch = 0
      this.idPlay = 0
    },
    handleError (event) {
      event.target.src = 'https://ingest.educadorafm.ba.gov.br/img/stamp-programs/Marca-Acervo.svg'
    },
    handleErrorPause (event) {
      event.target.src = 'https://ingest.educadorafm.ba.gov.br/img/stamp-programs/pause/Marca-Acervo.svg'
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, fade-leave-to {
  opacity: 0;
}
</style>

