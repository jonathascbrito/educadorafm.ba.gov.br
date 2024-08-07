<template>
  <div class="player d-flex align-items-center mt-0">
    <footer class="w-100 mr-0">
      <div class="row align-items-center">
        <router-link :to="url" class="d-flex col-md-3 d-none d-sm-flex align-items-center">
            <div class="col-7 col-md-3 d-none d-sm-flex align-items-center infor_player" ref="infor_player">
                <div class="cover d-flex align-items-center" id="img_card_compartilhar">
                    <img src="https://ingest.educadorafm.ba.gov.br/img/stamp-programs/Marca-Educa.png"/>
                </div>
                <div class="d-flex flex-column text mx-3">
                    <label class="m-0" id="name_compartilhar">Educadora FM</label>
                    <span class="color-default">Escute ao Vivo</span>
                </div>
            </div>
        </router-link>
        <div class="col-7 col-md-3 d-flex d-sm-none align-items-center infor_player_mobile" ref="infor_player" @click="offCanvasOn">
          <div class="cover d-flex align-items-center" id="img_card_compartilhar">
            <img src="https://ingest.educadorafm.ba.gov.br/img/stamp-programs/Marca-Educa.png"/>
          </div>
          <div class="d-flex flex-column text mx-3">
            <label class="m-0" id="name_compartilhar">Educadora FM</label>
            <span class="color-default">Escute ao Vivo</span>
          </div>
        </div>
        <div class="col-5 col-md-6 d-flex justify-content-end justify-content-md-center align-items-center" style="margin-top: -25px">
          <div class="player-center w-100">
            <div class="d-flex player-center-controls justify-content-center align-items-center">
            </div>
            <div class="d-flex align-items-center mt-4">
              <audio :src="audioSrc" id="player" ref="audioPlayer" type="audio/mpeg" loop preload="metadata"
                     title="Nome da música - Banda">
                <a href="audioSrc">Nome Música</a>
              </audio>
              <div id="player-play" class="mt-1 d-none d-sm-block">
                <button class="icon control btn d-flex justify-content-center align-items-center botao-play mx-3" @click="undoTime">
                  <span style="color: white; font-size: 10px; margin-right: 3px">-15s</span><i class="fa fa-undo" aria-hidden="true" style="color: white; font-size: 20px">
                </i>
                </button>
              </div>
              <div id="player-play" v-if="!isPlaying" @click="playMusic()" class="mt-1">
                <button id="play-player"
                        class="icon play btn d-flex justify-content-center align-items-center botao-play"
                        data-url="https://streaming.educadora.irdeb.ba.gov.br/stream-01" data-id="aovivo"
                        data-img="/img/stamp-programs/Marca-Educa.png" data-name="Educadora FM"
                        data-program="Escute ao Vivo">
                  <i class="fa fa-play-circle" aria-hidden="true">
                  </i>
                </button>
              </div>
              <div id="player-pause" v-if="isPlaying" class="mt-1" @click="pauseAudioT">
                <button id="pause-player" class="icon play btn d-flex justify-content-center align-items-center">
                  <i class="fa fa-pause-circle" aria-hidden="true">
                  </i>
                </button>
              </div>
              <div id="player-play" class="mt-1 d-none d-sm-block">
                <button class="icon control btn d-flex justify-content-center align-items-center botao-play mx-3" @click="redoTime">
                  <i class="fa fa-redo" aria-hidden="true" style="color: white; font-size: 20px">
                  </i>
                  <span class="ml-1" style="color: white; font-size: 10px; margin-left: 3px;">+15s</span>
                </button>
              </div>

              <div id="current-time" class="progress-time inicio mt-2 ml-1 color-default">
              </div>
              <div class="container d-none d-md-block">
                <div class="color-default d-flex justify-content-center" style="font-size: 12px; margin-top: -10px; margin-bottom: -8px" v-if="isPlayingTimeAoVivo">Agora: {{programName}}</div>
                <div class="progress-bar mt-2" ref="progressBar" style="min-width: 150px" @click="seek">
                  <div id="progress" class="progress" style="width: 0;" ref="progress">
                  </div>
                </div>
              </div>

              <div class="progress-time fim mt-2 ml-2 d-none d-sm-block">
                <span id="duration" class="color-default">&nbsp;00:00:00</span>
              </div>
              <div class="dropdown ml-1 mt-2" style="cursor: pointer">
                <a class="ml-3" data-bs-toggle="dropdown" style="margin-left: 15px">
                  <i class="fas fa-share-alt" style="color: white"></i>
                </a>
                <ul class="dropdown-menu">
                  <ShareNetwork class="p-4" style="text-align: center"
                    v-for="network in networks"
                    :network="network.network"
                    :key="network.network"
                    :url="sharing.url"
                    :title="sharing.title"
                    :description="sharing.description"
                    :quote="sharing.quote"
                    :hashtags="sharing.hashtags"
                    :twitterUser="sharing.twitterUser"
                  >
                    <i :class="network.icon" class="mt-3" style="color: white; width: 24px"></i>
                    <!-- <img :src="network.srcImg"  style="width: 24px; height: 24px" class="mb-2"> -->
                  </ShareNetwork>
                  <a class="p-4 btn-clipboard" id="copy_link" style="text-align: center" @click="copyLink()" aria-label="Copiar" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top">
                    <i class="mt-3 fa fa-link" style="color: white; width: 24px"></i>
                  </a>
                </ul>
              </div>
            </div>

          </div>
        </div>
        <div class="col-3 d-flex align-items-center justify-content-end d-none d-md-flex">
          <a style="color: white; cursor: pointer; font-size: 20px" v-if="isMute === false" @click="isMuted()">
            <i class="bi bi-volume-up-fill" aria-hidden="true"></i>
          </a>
          <a style="color: white; cursor: pointer; font-size: 20px" v-if="isMute === true" @click="notMuted()">
            <i class="bi bi-volume-mute-fill" aria-hidden="true"></i>
          </a>
          <div class="volume-bar">
            <input type="range" class="progress-bar" id="volume" nome="volume" min="0" max="100" v-model="volume"
                   width="100%" @change="updateVolume"/>
          </div>
        </div>

      </div>
    </footer>
    <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
      <div class="offcanvas-header" style="margin-top: 35px; padding-bottom: 5px">
        <!--
        <h5 class="offcanvas-title" id="offcanvasBottomLabel">Offcanvas bottom</h5>
        -->
        <i class="fa fa-chevron-down" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></i>
      </div>
      <div class="offcanvas-body small" style="height: calc(100vh - 56px); padding-top: 20px">
        <div class="music-player">
          <div class="edition-details-mobile list">
            <div class="album-card">
              <img src="../assets/img/stamp-programs/Marca-Educa.png" alt="Capa do Álbum" style="max-width: 100%; max-height: 200px;">
            </div>
            <p class="description">Escute Ao Vivo</p>
          </div>
          <div id="player-play" class="mt-1" style="align-content: center; display: flex; justify-content: center; align-items: center; height: 60px">
            <button class="icon play-details btn botao-play d-flex align-items-center" @click="undoTime">
              <span style="color: white; font-size: 10px; margin-right: 3px">-15s</span><i class="fa fa-undo" aria-hidden="true" style="color: white; font-size: 20px">
              </i>
            </button>
            <button id="play-player" v-if="!isPlaying" @click="playMusic()"
                    class="icon play-details btn botao-play"
                    data-url="https://streaming.educadora.irdeb.ba.gov.br/stream-01" data-id="aovivo"
                    data-img="/img/stamp-programs/Marca-Educa.png" data-name="Educadora FM"
                    data-program="Escute ao Vivo">
              <i class="fa fa-play-circle" aria-hidden="true" style="color: white">
              </i>
            </button>
            <div id="player-pause" style="align-content: center; display: flex; justify-content: center; align-items: center; height: 80px">
              <button id="pause-player" class="icon play-details btn" v-if="isPlaying" @click="pauseAudioT">
                <i class="fa fa-pause-circle" aria-hidden="true" style="color: white">
                </i>
              </button>
            </div>
            <button class="icon play-details btn botao-play d-flex align-items-center" @click="redoTime">
              <i class="fa fa-redo" aria-hidden="true" style="color: white; font-size: 20px">
              </i>
              <span class="ml-1" style="color: white; font-size: 10px; margin-left: 3px;">+15s</span>
            </button>
          </div>
          <div class="d-flex justify-content-between">
            <div id="current-time-mobile" class="progress-time inicio mt-2 ml-1 color-default d-block d-sm-none">
              Agora: {{programName}}
            </div>
            <div class="progress-time fim mt-2 ml-2 d-block d-sm-none">
              <span id="duration-mobile" class="color-default">&nbsp;00:00:00</span>
            </div>
          </div>
          <div class="progress-bar-details mt-1" ref="progress-bar-details" @click="seekDetails" @touchstart="startSlide" @touchmove="moveSlide" @touchend="endSlide">
            <div class="progress-bar-fill" id="progress-details"  style="width: 0;" ref="progress-details"></div>
          </div>
          <!--
          <div class="progress-bar-details" id="progressBarDetails" ref="progress-bar-details" @touchstart="startSlide" @touchmove="moveSlide" @touchend="endSlide">
            <div class="progress-bar-fill" id="progressBarFillDetails" :style="{ width: progressWidth }" ref="progress-details"></div>
          </div>
          -->
        </div>
        <div class="dropdown ml-1 mt-3" style="cursor: pointer" @click="ingestInfoShared">
          <a class="ml-0" data-bs-toggle="dropdown" style="margin-left: 2px; font-size: 20px">
            <i class="fas fa-share-alt" style="color: white"></i>
          </a>
          <ul class="dropdown-menu" @click="ingestInfoShared">
            <ShareNetwork class="p-4" style="text-align: center"
                          v-for="network in networks"
                          :network="network.network"
                          :key="network.network"
                          :url="sharing.url"
                          :title="sharing.title"
                          :description="sharing.description"
                          :quote="sharing.quote"
                          :hashtags="sharing.hashtags"
                          :twitterUser="sharing.twitterUser"
            >
              <i :class="network.icon" class="mt-3" style="color: white; width: 24px"></i>
              <!-- <img :src="network.srcImg"  style="width: 24px; height: 24px" class="mb-2"> -->
            </ShareNetwork>
            <a class="p-4 btn-clipboard" id="copy_link" style="text-align: center" @click="copyLink()" aria-label="Copiar" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top">
              <i class="mt-3 fa fa-link" style="color: white; width: 24px"></i>
            </a>
          </ul>
        </div>
        <h6 class="mt-3">Descrição: </h6>
        <div class="edition-details-description" style="color: white">
          A Educadora FM é um patrimônio da Bahia que ao longo de mais de quatro décadas leva música e informação de qualidade aos baianos. A emissora pública é um espaço para o acesso à cultura e à música da Bahia valorizadas internacionalmente. Ritmos variados compõem uma programação diversa a partir da obra de artistas locais, nacionais e internacionais desde os já consagrados até os novos talentos.

          A sua programação musical é reconhecidamente única no universo das rádios na Bahia e valoriza as nossas origens. A Educadora FM é a rádio que mais toca as músicas de nossos artistas garantindo espaço para as músicas com letras e instrumentais. A emissora sempre informa aos ouvintes o nome dos compositores e dos intérpretes de cada canção valorizando o conjunto dos artistas envolvidos em cada trabalho. Os clássicos, sucessos e novas produções convivem em harmonia em uma programação definida a partir de uma pesquisa cuidadosa e de uma ampla seleção musical.

          O conjunto dos programas musicais apresenta uma diversidade ímpar. O forró e outros ritmos nordestinos, o samba que nasceu na Bahia, o blues, reggae, choro, hip hop, a música de orquestra e dos blocos afro são alguns dos estilos que têm seu espaço garantido. Na sua programação a música baiana convive com aquelas de origem latino-americana, caribenha e africana. Os sotaques e produções internacionais não se restringem a um único idioma na rádio pública da Bahia.
        </div>

          <!-- Adicione mais músicas conforme necessário -->
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import VueSocialSharing from 'vue-social-sharing'

export default {
  name: 'PlayerComponent',
  components: {
    'vue-social-sharing': VueSocialSharing
  },
  props: ['isPlaying', 'isPlayingAoVivo', 'playMusic', 'pauseAudioT', 'audioSrc', 'sharing', 'offCanvasOn', 'redoTime', 'undoTime', 'copyLink', 'url', 'isPlayingTimeAoVivo', 'programName', 'ingestInfoShared'],
  data () {
    return {
      metaDataLoaded: false,
      showDescription: false,
      currentTime: 0,
      duration: 0,
      volume: 50,
      isMute: false,
      progressWidth: '0',
      progressBar: null,
      progressFill: null,
      isSliding: false,
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
         { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', srcImg: './assets/img/svg/whatsapp.svg' },
        // { network: 'wordpress', name: 'Wordpress', icon: 'fab fah fa-lg fa-wordpress', color: '#21759b' },
        // { network: 'xing', name: 'Xing', icon: 'fab fah fa-lg fa-xing', color: '#026466' },
        // { network: 'yammer', name: 'Yammer', icon: 'fab fah fa-lg fa-yammer', color: '#0072c6' },
        // { network: 'Yammer', name: 'Yammer', icon: 'fa fa-link',  srcImg: './assets/img/svg/whatsapp.svg' },
      ]
    }
  },
  watch: {
    isMute () {
      if (this.isMute) {
        this.$refs.audioPlayer.muted = true
        this.volume = 0
      }
      if (!this.isMute) {
        this.$refs.audioPlayer.muted = false
        this.volume = 50
      }
    }
  },
  created () {
    setInterval(() => {
      let currentTime = 0
      let duration = 0
      let minutes = 0
      if (this.$refs.audioPlayer.currentTime) {
        currentTime = this.$refs.audioPlayer.currentTime
        duration = this.$refs.audioPlayer.duration
      }
      const progress = (currentTime / duration) * 100
      document.getElementById('progress').style.width = `${progress}%`
      document.getElementById('progress-details').style.width = `${progress}%`
      //document.getElementById('progressBarDetails').style.width = `${progress}%`
      //document.getElementById('progressBarFillDetails').style.width = `${progress}%`
      if ( Math.floor(currentTime / 60) < 60 ) {
        minutes = Math.floor(currentTime / 60)
      } else {
        minutes = Math.floor(currentTime / 60) - 60
      }
      const seconds = Math.floor(currentTime % 60)
      const hours = Math.floor(currentTime / 3600)
      const display = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
      document.getElementById('current-time').textContent = display
      if(this.isPlayingTimeAoVivo) {
        document.getElementById('current-time-mobile').textContent = `Agora: ${this.programName}`
        document.getElementById('current-time').textContent = ' 107.5'
      } else {
        document.getElementById('current-time-mobile').textContent = display
      }
    }, 1000)
  },
  mounted () {
    this.$emit('playerRef', this.$refs.audioPlayer)
    this.$refs.audioPlayer.addEventListener('loadedmetadata', () => {
      this.metaDataLoaded = true
      this.duration = this.$refs.audioPlayer.duration
      if (this.$refs.audioPlayer.src != this.audioSrc) {
        this.isPlaying = true
        this.isPlayingAoVivo = false
      }
      if (this.duration != Infinity) {
        document.getElementById('duration').textContent = this.formatTime(this.duration)
      } else {
        document.getElementById('duration').textContent = 'Ao Vivo'
      }
      if (this.duration != Infinity) {
        document.getElementById('duration-mobile').textContent = this.formatTime(this.duration)
      } else {
        document.getElementById('duration-mobile').textContent = 'Ao Vivo'
      }
      // console.log(this.formatTime(this.duration));
    })

    //Progress Bar Mobile
    this.progressBar = this.$refs.progressBar;
    this.progressFill = this.$refs.progressFill;
  },
  methods: {
    seek (event) {
      const progressBar = this.$refs.progressBar
      const progress = this.$refs.progress

      // Calcula a posição do clique em relação à barra de progresso
      const clickPosition = event.clientX - progress.getBoundingClientRect().left
      const progressBarWidth = progressBar.clientWidth
      const progressPercent = clickPosition / progressBarWidth

      // calcula a posição correspondente na música
      const audioDuration = this.$refs.audioPlayer.duration
      const seekPosition = audioDuration * progressPercent

      // Move a reprodução para a posição calculada
      this.$refs.audioPlayer.currentTime = seekPosition
    },
    seekDetails (event){
      const progressBar = this.$refs.progressBar
      const progress = this.$refs.progress
      const progressBarDetails = this.$refs['progress-bar-details']
      const progressDetails = this.$refs['progress-details']

      // Calcula a posição do clique em relação à barra de progresso
      const clickPosition = event.clientX - progressDetails.getBoundingClientRect().left
      const progressBarWidth = progressBarDetails.clientWidth
      const progressPercent = clickPosition / progressBarWidth

      // calcula a posição correspondente na música
      const audioDuration = this.$refs.audioPlayer.duration
      const seekPosition = audioDuration * progressPercent

      // Move a reprodução para a posição calculada
      this.$refs.audioPlayer.currentTime = seekPosition
    },
    formatTime (time) {
      time = Math.floor(time)
      let hours = Math.floor(time / 3600)
      let minutes = Math.floor((time - (hours * 3600)) / 60)
      let seconds = time - (hours * 3600) - (minutes * 60)

      if (hours < 10) hours = '0' + hours
      if (minutes < 10) minutes = '0' + minutes
      if (seconds < 10) seconds = '0' + seconds

      let audioTime = hours + ':' + minutes + ':' + seconds

      return audioTime
    },
    updateVolume () {
      this.updatePlayerVolume(this.volume)
    },
    updatePlayerVolume (volume) {
      this.$refs.audioPlayer.volume = volume / 100
    },
    isMuted () {
      this.isMute = true
      console.log(this.isMute)
    },
    notMuted () {
      this.isMute = false
    },
    startSlide(event){
      this.isSliding = true
      this.updateSlidePosition(event)

      console.log('inicio do slide')
    },
    moveSlide(event){
      if((this.isSliding)) {
        this.updateSlidePosition(event)
      }
    },
    endSlide() {
      this.isSliding = false
    },
    updateSlidePosition(event) {
      const progressBar = this.$refs.progressBar
      const progress = this.$refs.progress
      const progressBarDetails = this.$refs['progress-bar-details']
      const progressDetails = this.$refs['progress-details']

      const touch = event.touches[0];
      const slideWidth = progressBarDetails.offsetWidth;
      const slideX = touch.pageX - progressBarDetails.getBoundingClientRect().left;
      const slideProgress = Math.max(0, Math.min(slideX / slideWidth, 1));
      //this.progressWidth = (slideProgress * 100) + '%';

      // calcula a posição correspondente na música
      const audioDuration = this.$refs.audioPlayer.duration
      const seekPosition = audioDuration * slideProgress
      // console.log(seekPosition)

      // Move a reprodução para a posição calculada
      this.$refs.audioPlayer.currentTime = seekPosition

    }
  }
}
</script>

<style scoped>
.container .progress-bar {
  cursor: pointer;
}

.container .progress-bar .progress:hover {
  background-color: #1e7e34;
}

@media screen and (max-width: 700px) {
  .player {
    width: 100%;
    bottom: 24px;
    position: fixed;
  }
}

@media screen and (max-width: 400px) {
  .player {
    height: 65px;
  }
  footer .text {
    max-height: 65px !important;
  }
}

.offcanvas, .offcanvas-xxl, .offcanvas-xl, .offcanvas-lg, .offcanvas-md, .offcanvas-sm {
  --bs-offcanvas-zindex: 1045;
  --bs-offcanvas-width: 300px;
  --bs-offcanvas-height: 100vh;
  --bs-offcanvas-padding-x: 2rem;
  --bs-offcanvas-padding-y: 2rem;
  --bs-offcanvas-color: #fff;
  --bs-offcanvas-bg: #181818;
  --bs-offcanvas-border-width: 6px;
  --bs-offcanvas-border-color: #fff;
  --bs-offcanvas-box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.card {
  border-radius: 12px;
  background-color: #181818 !important;
}

.card a img {
  border-radius: 12px;
}

.music-player {
  max-width: 400px;
  margin: 0;
  background-color: #181818;
}

.album-card {
  display: block;
  align-items: center;
  margin-bottom: 20px;
}

.album-card h2 {
  font-size: 18px;
}

.description {
  margin-bottom: 20px;
  font-size: 16px;
}

.progress-bar-details {
  width: 100%;
  height: 5px;
  background-color: #b3b3b3;
  border-radius: 5px;
}

.progress-bar-fill {
  height: 100%;
  background-color: #535353;
  border-radius: 5px;
  transition: width 0.3s ease-in-out;
}
.progress-bar-fill:hover {
  background-color: #535353;
}

.play-details {
  font-size: 40px;
  background-color: #181818;
  align-items: center;
  align-content: center;
}

</style>
