<template>
    <nav class="nav-bar navbar navbar-expand-lg d-flex flex-column pt-0 align-items-center pb-0">
      <div class="offcanvas offcanvas-start flex-column align-items-center" id="navbarNav">
        <div class="nav-bar-header d-flex pl-4 pt-3 pb-4">
          <router-link to="/">
            <img class="logo" src="../assets/img/svg/logo_educadorafm_2.svg" style="width: 161px; height: 99px">
          </router-link>
        </div>

        <div class="nav-bar-header d-flex pb-2">
          <div class="player-radio">
            <div class="row pl-4 pt-2 gx-0">
              <div class="button-social-media col-3">
                <div id="play-radio" v-if="!isPlayingAoVivo">
                  <button id="play" class="d-flex justify-content-center align-items-center ms-2" @click="playAoVivo">
                    <i class="fa fa-play-circle fa-2x" aria-hidden="true">
                    </i>
                  </button>
                </div>
                <div id="pause-radio" v-if="isPlayingAoVivo" data-id="aovivo" @click="pauseAudio">
                  <button id="pause" class="d-flex justify-content-center align-items-center ms-2" data-id="aovivo">
                    <i class="fa fa-pause-circle fa-2x" aria-hidden="true">
                    </i>
                  </button>
                </div>
              </div>
              <div class="col-9 my-auto mx-0">
                <span class="">ESCUTE AO VIVO</span>
              </div>
            </div>
            <div class="row ms-2 gx-0">
              <span class="pt-2" style="font-size: 11px">Agora: <b> {{programName}} </b></span><br/>
              <span class="" style="font-size: x-small">{{programInicio}} - {{programFim}}</span>
            </div>
          </div>
        </div>

        <ul class="navbar-nav flex-column">
          <li class="nav-item" :class="{ active: isCurrentRoute('/') }"  style="margin-left: -27px">
            <router-link to="/" tag="a" class="nav-link d-flex align-items-center">
              <i class="bi bi-house-door-fill" style="font-size: 16px;"></i>
              <span style="">Início</span>
            </router-link>
          </li>
          <li class="nav-item" :class="{ active: isCurrentRoute('/programacao') }" style="margin-left: -25px">
            <router-link to="/programas" tag="a" class="nav-link d-flex align-items-center">
              <i class="fas fa-calendar" style="font-size: 16px"></i>
              <span style="">Programação</span>
            </router-link>
          </li>
          <li class="nav-item" :class="{ active: isCurrentRoute('/programas') }" style="margin-left: -27px">
            <router-link to="/programas" tag="a" class="nav-link d-flex align-items-center">
              <i class="fas fa-folder-open" style="font-size: 16px"></i>
              <span style="">Programas</span>
            </router-link>
          </li>
          <li class="nav-item" :class="{ active: isCurrentRoute('/selo') }" style="margin-left: -25px">
            <router-link to="/selo" tag="a" class="nav-link d-flex align-items-center">
              <i class="fas fa-tag" style="font-size: 16px"></i>
              <span style="">Selo Educadora</span>
            </router-link>
          </li>
          <li class="nav-item" :class="{ active: isCurrentRoute('/festival') }" style="margin-left: -25px">
            <router-link to="/festival" tag="a" class="nav-link d-flex align-items-center">
              <i class="fas fa-music" style="font-size: 16px"></i>
              <span style="">Festival Educadora</span>
            </router-link>
          </li>
          <li class="nav-item" :class="{ active: isCurrentRoute('/acervo') }" style="margin-left: -25px">
            <router-link to="/acervo" tag="a" class="nav-link d-flex align-items-center">
              <i class="fa fa-archive" style="font-size: 16px"></i>
              <span style="">Acervo</span>
            </router-link>
          </li>
          <li class="nav-item" :class="{ active: isCurrentRoute('/mixtape') }" style="margin-left: -25px">
            <router-link to="/mixtape" tag="a" class="nav-link d-flex align-items-center">
              <i class="fa fa-headphones" style="font-size: 16px"></i>
              <span style="">Mixtape</span>
            </router-link>
          </li>
        </ul>
        <div class="nav-footer mt-0 ml-0">
          <a
            href="https://api.whatsapp.com/send?phone=5571997317762&text=Ol%C3%A1,%20equipe%20do%20Multicultura!"
            target="_blank" style="text-decoration: none">
            <div class="d-flex pl-1 pt-2 pb-2 ml-3 mt-2">
              <img src="../assets/img/botao_multicultura.png" style="width: 195px; height: 68px">
            </div>
          </a>

          <a
            href="https://api.whatsapp.com/send?phone=5571999641908&text=Oi.%20Quero%20pedir%20uma%20m%C3%BAsica%20para%20tocar%20na%20Educadora%20FM%20%F0%9F%98%8A"
            target="_blank" style="text-decoration: none">
            <div class="d-flex pl-1 pt-2 pb-2 ml-3 mt-2">
              <img src="../assets/img/botao_tocai.png" style="width: 195px; height: 68px">
            </div>
          </a>
        </div>
        <div class="nav-footer m-0 p-0" style="height: 100%">
          <div class="d-flex flex-column justify-content-end" style="height: 100%">
            <a
              href="https://play.google.com/store/apps/details?id=br.gov.ba.irdeb.educadorafm&pli=1"
              target="_blank" style="text-decoration: none">
              <div class="d-flex ml-5 mt-4">
                <img src="../assets/img/botao_googleplay.png" style="max-width: 200px">
              </div>
            </a>

            <a
              href=""
              target="_blank" style="text-decoration: none">
              <div class="d-flex mt-1 ml-5 mb-4">
                <img src="../assets/img/botao_appstore.png" style="max-width: 200px">
              </div>
            </a>
          </div>
        </div>
      </div>

    </nav>
</template>

<script>
export default {
  name: 'NavBarComponent',
  props: ['programName', 'programInicio', 'programFim', 'playAoVivo', 'pauseAudio', 'isPlayingAoVivo'],
  computed: {
    currentURL () {
      return window.location.pathname
    }
  },
  mounted () {
    // console.log(this.currentURL)
  },
  methods: {
    isCurrentRoute (route) {
      if (route === '/programas' || route === '/') {
        if (route === '/programas') {
          if (this.$route.path.startsWith('/programas') || this.$route.path.startsWith('/program')) {
            return true
          } else {
            return false
          }
        }
        if (route === '/') {
          return this.$route.path === route
        }
      } else {
        return this.$route.path.startsWith(route)
      }
    }
  }
}
</script>

<style scoped>

#navbarNav {
  background-color: #383838;
  border-right: 1px solid red;
  max-width: 235px;
  min-width: 230px;
  min-height: 0;
  flex: 1;
  max-height: 100%;
  overflow-y: auto;
}

.nav-item {
  font-family: 'Poppins medium', sans-serif;
}

</style>
