<template>
  <div v-if="isLoading && showPage">
    <div class="container-loader">
      <div class="container">
        <div class="row marcador align-items-center">
          <div class="col mx-auto text-center">
            <img class="img-responsive pulse" src="https://ingest.educadorafm.ba.gov.br/svg/logo_preloader.svg">
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row marcador align-items-center">
          <div class="col mx-auto text-center">
            <div class="loader">
              <div class="line_animation"></div>
              <div class="line_animation"></div>
              <div class="line_animation"></div>
              <div class="line_animation"></div>
              <div class="line_animation"></div>
              <div class="line_animation"></div>
              <div class="line_animation"></div>
              <div class="line_animation"></div>
              <div class="line_animation"></div>
              <div class="line_animation"></div>
              <div class="line_animation"></div>
              <div class="line_animation"></div>
              <div class="line_animation"></div>
              <div class="line_animation"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoaderComponent',
  data () {
    return {
      isLoading: true,
      showPage: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.showPage = false
    }, 3000)
    window.addEventListener('load', () => {
      this.isLoading = false
    })
    // console.log('montando')
  },
  beforeMount () {
    // console.log('depois de montar')
  }
}
</script>

<style scoped>

.container-loader {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: #e6e6e6 !important;
}

.container-loader-erro {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: #e6e6e6;
}

.loader{
  width: 160px;
  height: 100px;
  margin: 70px auto 0;
  margin-top: 30px;
  position: relative;
}
.loader .line_animation{
  /*background-image: linear-gradient( 180deg, #BE1B2E 0%, #383838 50%, #BE1B2E 100% );*/
  background-image: linear-gradient( 180deg, #e6e6e6 20%, #be1b2e 50%, #383838 100% ) !important;
  width: 2px;
  height: 100px;
  display: inline-block;
  margin: 0 2px;
  transform-origin: top;
  animation: dance 1.4s ease-in-out infinite;
}
.loader .line_animation:nth-child(2){ animation-delay: 0.1s; }
.loader .line_animation:nth-child(3){ animation-delay: 0.2s; }
.loader .line_animation:nth-child(4){ animation-delay: 0.3s; }
.loader .line_animation:nth-child(5){ animation-delay: 0.4s; }
.loader .line_animation:nth-child(6){ animation-delay: 0.5s; }
.loader .line_animation:nth-child(7){ animation-delay: 0.6s; }
.loader .line_animation:nth-child(8){ animation-delay: 0.7s; }
.loader .line_animation:nth-child(9){ animation-delay: 0.8s; }
.loader .line_animation:nth-child(10){ animation-delay: 0.9s; }
.loader .line_animation:nth-child(11){ animation-delay: 1s; }
.loader .line_animation:nth-child(12){ animation-delay: 1.1s; }
.loader .line_animation:nth-child(13){ animation-delay: 1.2s; }
.loader .line_animation:nth-child(14){ animation-delay: 1.3s; }
.loader .line_animation:nth-child(15){ animation-delay: 1.4s; }
@keyframes dance{
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.3); }
}

img{
  height: 130px;
  margin-top: 240px;
}

.pulse {
  animation: pulse 0.7s infinite;
  animation-direction: alternate;
  -webkit-animation-name: pulse;
  animation-name: pulse;
}

@-webkit-keyframes pulse {
  0% {
    -webkit-transform: scale(1);

  }
  100% {
    -webkit-transform: scale(1.1);
  ;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1.2);

  }
  100% {
    transform: scale(1.1);

  }
}
</style>
