<template>
  <div id="app">
    <div class="root">
      <div class="overlay" style="background-color: #ba050c">
        <Loader />
        <Popup v-if="diplayPopup == '1'" />
        <img class="teste" src="./assets/img/educadora2.png" style="width: 50%;">
      </div>
    </div>
  </div>

</template>

<script>
/* eslint-disable */
import Vue, { Transition } from 'vue'
import NavBarComponent from './components/NavBarComponent.vue'
import TopBarComponent from './components/TopBarComponent.vue'
import PlayerComponent from './components/PlayerComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import SliderComponent from './components/sliders/SliderComponent.vue'
import Loader from './views/Loader.vue'
import Popup from './components/Popup.vue'
import axios from 'axios'
import DynamicRouterLink from './components/DynamicRouterLink.vue'

export default {
  name: 'App',
  components: {
    SliderComponent,
    NavBarComponent,
    TopBarComponent,
    PlayerComponent,
    FooterComponent,
    Popup,
    Loader
  },
  data () {
    return {
      teste: [],
      programName: '',
      programInicio: '',
      programFim: '',
      searchQuery: '',
      audioSrc: 'https://streaming.educadora.irdeb.ba.gov.br/stream-01',
      isPlaying: false,
      isPlayingAoVivo: false,
      isPlayingTimeAoVivo: true,
      audioRef: null,
      idPlay: '',
      startX: '',
      startY: '',
      sharing: {
        url: 'https://educadorafm.ba.gov.br',
        title: 'Educadora FM 107.5',
        description: 'Muito mais sintonizada!',
        quote: 'É sua! É da Bahia',
        hashtags: 'EducadoraFM,EducadoraFM107.5,musica,bahia',
        twitterUser: 'educadorafmba'
      },
      ingestSharing: {
        program_id: 'AoVivo',
        program_name: 'Rádio Ao Vivo',
        edition_id: '',
        edition: '',
        url: 'https://educadorafm.ba.gov.br'
      },
      diplayPopup: '0',
      url: '/'
    }
  },
  mounted () {
    const headers= {
      'X-API-Key': '44AiC0g%ofjqMY:nakJT3g1YyL{14$[)'
    }

    axios.get('https://ingest.educadorafm.ba.gov.br/api/getPopup', { headers })
      .then(response => {
        this.diplayPopup = response.data.popup
        //console.log(this.diplayPopup)
      })

    this.updateField()
    setInterval(this.updateField, 120000)
    this.audioRef.addEventListener('pause', () => {
      this.isPlaying = false
    })
    this.audioRef.addEventListener('play', () => {
      this.isPlaying = true
    })
    document.addEventListener('touchstart', this.handleTouchStart)
    document.addEventListener('touchmove', this.handleTouchMove)
  },
  methods: {
    handleTouchStart(event) {
      this.startX = event.touches[0].clientX
      this.startY = event.touches[0].clientY
    },
    handleTouchMove(event) {
      if(!this.startX) return
      if(!this.startY) return

      const currentX = event.touches[0].clientX
      const deltaX = this.startX - currentX


      if(deltaX > 50) {
        this.closeOffcanvas();
        this.startX = null
      }

      const currentY = event.touches[0].clientY
      const deltaY = this.startY - currentY

      if(deltaY < -150) {
        this.closeOffCanvasPlayer();
        this.startY = null
      }

    },
    closeOffCanvasPlayer() {
      var offCanvasElementPlayer = document.getElementById('offcanvasBottom')
      var offcanvas = bootstrap.Offcanvas.getInstance(offCanvasElementPlayer)
      //console.log('offcanvas: ', offcanvas )
      if(offcanvas && offcanvas._isShown) {
        offcanvas.hide()
      }
    },
    closeOffcanvas() {
      var offcanvasElement = document.getElementById('navbarNav')
      var offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement)
      if(offcanvas && offcanvas._isShown) {
        offcanvas.hide()
      }
    },
    offCanvasOn(){
      var offcanvasElementBottom = document.getElementById('offcanvasBottom')
      var offcanvasBottom = new bootstrap.Offcanvas(offcanvasElementBottom)
      offcanvasBottom.show()
    },
    handleSearch (query) {
      this.searchQuery = query
      //console.log('App ' + this.searchQuery)
      this.$router.push({
        path: '/resultados',
        query: {
          q: this.searchQuery,
          idPlay: this.idPlay,
          sharing: this.sharing,
          url: this.url
        },
      })
      this.searchQuery = ''
    },
    updateSearch (url) {
      this.url = url.url
      this.idPlay = url.idPlay
      this.sharing = url.sharing
    },
    updateField () {
      const headers= {
        'X-API-Key': '44AiC0g%ofjqMY:nakJT3g1YyL{14$[)'
      }

      axios.get('https://ingest.educadorafm.ba.gov.br/api/getProgramAoVivo', { headers })
        .then(response => {
          this.programName = response.data.programAoVivo.name
          this.programInicio = response.data.programAoVivo.start
          this.programFim = response.data.programAoVivo.end
        })
    },
    setAudioRef (ref) {
      this.audioRef = ref
    },
    playAoVivo () {

      // document.title = 'DEU PLAY AO VIVO'
      document.querySelectorAll('meta[property=og\\:image]')[0].setAttribute('content', 'https://ingest.educadorafm.ba.gov.br/img/stamp-programs/Marca-Educa.png')
      // Seleciona a meta tag com o atributo property='og:image'
      const ogImageMeta = document.querySelector("meta[property='og:image']");

      // Obtém o conteúdo da meta tag
      const ogImage = ogImageMeta.getAttribute("content");

      // Imprime o valor da meta tag
      console.log(ogImage)

      if (this.audioRef.src != this.audioSrc) {
        this.audioRef.src = this.audioSrc
        // this.ingestInfo('Ao Vivo', 'Educadora FM')
      }
      this.audioRef.play()
      this.idPlay = ''
      //this.isPlaying = true
      if (this.audioRef.src == this.audioSrc) {
        this.isPlayingAoVivo = true
        this.isPlayingTimeAoVivo = true
        const urlImg = 'https://ingest.educadorafm.ba.gov.br/img/stamp-programs/Marca-Educa.png'

        const name = 'Educadora FM'
        const program = 'Escute ao Vivo';
        const description = 'A Educadora FM é um patrimônio da Bahia que ao longo de mais de quatro décadas leva música e informação de qualidade aos baianos. A emissora pública é um espaço para o acesso à cultura e à música da Bahia valorizadas internacionalmente. Ritmos variados compõem uma programação diversa a partir da obra de artistas locais, nacionais e internacionais desde os já consagrados até os novos talentos.\n' +
          '\n' +
          '          A sua programação musical é reconhecidamente única no universo das rádios na Bahia e valoriza as nossas origens. A Educadora FM é a rádio que mais toca as músicas de nossos artistas garantindo espaço para as músicas com letras e instrumentais. A emissora sempre informa aos ouvintes o nome dos compositores e dos intérpretes de cada canção valorizando o conjunto dos artistas envolvidos em cada trabalho. Os clássicos, sucessos e novas produções convivem em harmonia em uma programação definida a partir de uma pesquisa cuidadosa e de uma ampla seleção musical.\n' +
          '\n' +
          '          O conjunto dos programas musicais apresenta uma diversidade ímpar. O forró e outros ritmos nordestinos, o samba que nasceu na Bahia, o blues, reggae, choro, hip hop, a música de orquestra e dos blocos afro são alguns dos estilos que têm seu espaço garantido. Na sua programação a música baiana convive com aquelas de origem latino-americana, caribenha e africana. Os sotaques e produções internacionais não se restringem a um único idioma na rádio pública da Bahia.\n'

        let playInfor = document.getElementsByClassName('infor_player');
        playInfor[0].innerHTML = `
                <div class="cover d-flex align-items-center" id="img_card_compartilhar">
                    <img src="` + urlImg + `"/>
                </div>
                <div class="d-flex flex-column text mx-3">
                    <label class="m-0" id="name_compartilhar">` + name + `</label>
                    <span class="color-default">` + program + `</span>
                </div>
            `
        let play_infor_mobile = document.getElementsByClassName('infor_player_mobile')
        play_infor_mobile[0].innerHTML = `
                <div class="cover d-flex align-items-center" id="img_card_compartilhar">
                    <img src="` + urlImg + `"/>
                </div>
                <div class="d-flex flex-column text mx-3">
                    <label class="m-0" id="name_compartilhar">` + name + `</label>
                    <span class="color-default">` + program + `</span>
                </div>
            `
        let editionDetailsMobile = document.getElementsByClassName('edition-details-mobile')
        editionDetailsMobile[0].innerHTML = `
                <div class="album-card">
                    <img src="` + urlImg +`" alt="Capa do Álbum" style="max-width: 100%; max-height: 200px; margin-bottom: 10px">
                  </div>
                  <p class="description">`+ program +`</p>
                `
        let editionDetailsDescriptionMobile = document.getElementsByClassName('edition-details-description')
        editionDetailsDescriptionMobile[0].innerHTML = description

        this.ingestSharing= {
          program_id: 'AoVivo',
          program_name: this.programName,
          edition_id: '',
          edition: '',
          url: 'https://educadorafm.ba.gov.br'
        }
      }
      this.ingestInfo('AoVivo', this.programName, 'play')
    },
    pauseAudio () {
      this.audioRef.pause()
      //this.isPlaying = false
      this.id_prov = this.idPlay
      this.idPlay = 0
      if (this.audioRef.src == this.audioSrc) {
        this.isPlayingAoVivo = false
      }
      this.$refs.childComponentRef.idPlaySearch = 0
    },
    playMusic () {
      //this.audioRef.src = src
      this.audioRef.play()
      //this.isPlaying = true
      if (this.audioRef.src === this.audioSrc) {
        this.isPlayingAoVivo = true
        this.isPlayingTimeAoVivo = true
        const urlImg = 'https://ingest.educadorafm.ba.gov.br/img/stamp-programs/Marca-Educa.png'
        const name = 'Educadora FM'
        const program = 'Escute ao Vivo'
        this.ingestInfo('AoVivo', this.programName, 'play')
        let playInfor = document.getElementsByClassName('infor_player')
        playInfor[0].innerHTML = `
                <div class="cover d-flex align-items-center" id="img_card_compartilhar">
                    <img src="` + urlImg + `"/>
                </div>
                <div class="d-flex flex-column text mx-3">
                    <label class="m-0" id="name_compartilhar">` + name + `</label>
                    <span class="color-default">` + program + `</span>
                </div>
            `
        let play_infor_mobile = document.getElementsByClassName('infor_player_mobile')
        play_infor_mobile[0].innerHTML = `
                <div class="cover d-flex align-items-center">
                    <img src="`+urlImg+`" id="img_card_compartilhar" data-id="`+this.idPlay+`" data-program="`+program+`" data-edition="`+name+`" data-name="`+program+`"/>
                </div>
                <div class="d-flex flex-column text mx-3">
                    <label class="m-0">`+program+`</label>
                    <span class="color-default">`+name+`</span>
                </div>
            `
        let editionDetailsMobile = document.getElementsByClassName('edition-details-mobile')
        editionDetailsMobile[0].innerHTML = `
                <div class="album-card mb-2">
                    <img src="` + urlImg +`" alt="Capa do Álbum" style="max-width: 100%; max-height: 200px;">
                </div>
                <p class="description">`+ program +`</p>
                `
      } else {
        this.idPlay = this.id_prov
        this.$refs.childComponentRef.idPlaySearch = this.id_prov
      }
    },
    emitFunctionPlayMp3 ( properts ) {
      //console.log(properts)
      this.playMp3(properts.valor, properts.id, properts.img, properts.name_edition, properts.name_program, properts.program_id, properts.url_share, properts.thin_line, properts.description)
    },
    playMp3 (valor, id, img, name_edition, name_program, program_id, url_share=null, thin_line=null, description=null) {
      //console.log(valor)
      if (this.audioRef.src != encodeURI(valor)) {
        this.audioRef.src = valor;
        // this.ingestInfo(id, name_program, name)
      }
      this.audioRef.play()
      this.idPlay = id
      this.isPlayingAoVivo = false
      this.isPlayingTimeAoVivo = false

      const url_img = img
      let name = ''
      if(program_id !== 'selo') {
        name = this.formattedData(name_edition)
      } else {
        name = name_edition
      }
      if(name === 'Invalid Date') {
        name = name_edition
      }
      const program = name_program
      const id_program = program_id
      //para inserir informação do que está tocando no Ingest
      //program_id, program_name, action,edition_edition=null, id_edition = null
      // console.log(id_program)
      this.ingestInfo(id_program, program, 'play', name, id)

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
                <h5 class="card-line mt-2 mb-0 pb-0" style="font-family: 'Poppins light', sans-serif; font-size: 14px; font-weight: 150;">`+ thin_line +`</h5>
                <p class="card-text mt-0" style="color: #fff; font-family: 'Poppins light', sans-serif; font-size: 14px; font-weight: 150"><b style="font-family: 'Poppins Bold', sans-serif; font-size: 16px; font-weight: 150">`+ program +`:</b> `+ name +`</p>
            </div>
        </div>
      `

      let editionDetailsDescriptionMobile = document.getElementsByClassName('edition-details-description')
      editionDetailsDescriptionMobile[0].innerHTML = description

      let urlSplit = []
      if(url_share != null) {
        this.url = url_share
        urlSplit = url_share.split('/')
      }
      if(urlSplit[1] === 'selo') {
        this.sharing = {
          url: 'https://educadorafm.ba.gov.br'+url_share,
          title: `Escute o artista ${program_id} que faz parte do Selo Educadora FM Independente.`,
          description: `Com o álbum ${name}.`,
          quote: 'É sua! É da Bahia',
          hashtags: 'EducadoraFM,musica,RadioEducadoraBA,EducadoraFMPlay',
          twitterUser: 'educadorafmba'
        }
      } else if(urlSplit[1] === 'acervo') {
        this.sharing = {
          url: 'https://educadorafm.ba.gov.br'+url_share,
          title: `Acervo Educadora FM apresenta ${thin_line}`,
          description: `Escute programas especiais com conteúdos exclusivos do Acervo da Rádio Educadora FM fundada em 1978.`,
          quote: 'É sua! É da Bahia',
          hashtags: 'EducadoraFM,Acervo,musica,RadioEducadoraBA,EducadoraFMPlay',
          twitterUser: 'educadorafmba'
        }
      } else if(urlSplit[1] === 'festival'){
        this.sharing = {
          url: 'https://educadorafm.ba.gov.br'+url_share,
          title: `Escute o ${thin_line}`,
          description: `Escute os Especiais das Seis com o vencedores das Edições do Festival de Música Educadora FM.`,
          quote: 'É sua! É da Bahia',
          hashtags: 'EducadoraFM,FestivalDeMusicaEducadoraFM,musica',
          twitterUser: 'educadorafmba'
        }
      } else {
        this.sharing = {
          url: 'http://educadorafm.ba.gov.br'+url_share,
          title: `. Escute comigo a edição: ${name} do ${program} da Educadora FM. ${thin_line}`,
          description: `Muito mais sintonizada!`,
          quote: 'É sua! É da Bahia',
          hashtags: 'EducadoraFM,musica,RadioEducadoraBA,EducadoraFMPlay',
          twitterUser: 'educadorafmba'
        }
      }

      if(urlSplit[1] === 'selo') {
        this.ingestSharing= {
          program_id: 'Selo',
          program_name: program_id,
          edition_id: id,
          edition: name,
          url: 'https://educadorafm.ba.gov.br' + url_share
        }
      } else {
        this.ingestSharing= {
          program_id: program_id,
          program_name: name_program,
          edition_id: id,
          edition: name,
          url: 'https://educadorafm.ba.gov.br' + url_share
        }
      }

    },
    ingestInfo(program_id, program_name, action, edition_edition=null, id_edition = null){
      //id_edition, program_id, program_name, edition_edition
      // program_name Mixtape = Party Name
      // program_name Selo = Artist_name
      // program_id Mixtape = Mixtape
      // programa_id Selo = Selo
      // Action (shared, play)

      const requestData = {
        id_program: program_id,
        program_name: program_name,
        action: action,
        id_edition: id_edition,
        edition_edition: edition_edition,
        origin: 'site'
      }
      const headers = {
        'X-API-Key': '44AiC0g%ofjqMY:nakJT3g1YyL{14$[)'
      }
      axios.post('https://ingest.educadorafm.ba.gov.br/api/ingestInfo', requestData, {headers})
        .then(response => {
          // console.log('Resposta da API', response.data);
        })
        .catch(error => {
          console.error('Erro na chamada POST à AEP: ', error)
        })
    },
    ingestInfoShared(){
      //id_edition, program_id, program_name, edition_edition
      // program_name Mixtape = Party Name
      // program_name Selo = Artist_name
      // program_id Mixtape = Mixtape
      // programa_id Selo = Selo
      // Action (shared, play)
      if(this.ingestSharing.program_name === 'selo') {
        this.ingestSharing.program_name = 'Selo Educadora FM Independente'
      }
      const requestData = {
        id_program: this.ingestSharing.program_id,
        program_name: this.ingestSharing.program_name,
        action: 'sharing',
        id_edition: this.ingestSharing.edition_id,
        edition_edition: this.ingestSharing.edition,
        origin: 'site'
      }
      // console.log (requestData)
      const headers = {
        'X-API-Key': '44AiC0g%ofjqMY:nakJT3g1YyL{14$[)'
      }
      axios.post('https://ingest.educadorafm.ba.gov.br/api/ingestInfo', requestData, {headers})
        .then(response => {
          // console.log(response.data);
        })
        .catch(error => {
          console.error('Erro na chamada POST à AEP: ', error)
        })
    },
    pauseMp3 (id) {
      console.log(id)
      this.audioRef.pause()
      this.id_prov = this.idPlay
      this.idPlay = 0
      this.$refs.childComponentRef.idPlaySearch = 0
    },
    undoTime() {
      this.audioRef.currentTime -=15;
    },
    redoTime() {
      this.audioRef.currentTime +=15;
    },
    formattedData(edition_date){
      const date = new Date(edition_date)
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
      return date.toLocaleDateString('pt-BR', options);
    },
    async copyLink(url_link=null) {
      //this.sharing.url = 'URL TEXTO QUE SERÁ ARMAZENADO'
      //documento.execCommand("copy")
      //console.log(url_link)
      try {
        if(url_link===null){
          await navigator.clipboard.writeText(this.sharing.url);
          // alert("URL copiada para área de transferência")
        } else {
          await navigator.clipboard.writeText(window.location.href);
          // alert("URL copiada para área de transferência")
          url_link = null
        }
      } catch (error) {
        console.error("Erro ao copiar para área de transferência: " , error)
      }
    }
  }
}
</script>

<style>
#app {
  background-color: #383838;
  font-family: 'Poppins', sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.root {
  position: relative;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Cor do tampão e opacidade */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Certifique-se de que o overlay esteja na frente de outros elementos */
}

/* Estilos adicionais para tornar o tampão responsivo */
@media screen and (max-width: 768px) {
  .teste {
    display: none;
  }
  .overlay {
    background-image: url('./assets/img/educadora1.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}

</style>

