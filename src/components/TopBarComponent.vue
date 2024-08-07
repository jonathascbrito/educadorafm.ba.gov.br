<template>
  <div class="top-bar" style="">
    <header id="header" class="row d-flex position-relative m-0" style="width: 100%">
      <div id="header-overlay" class="header-overlay">
      </div>
      <div class="col-1 d-lg-none">
        <a class="navbar-toggler" href="#" data-bs-toggle="offcanvas" data-bs-target="#navbarNav" aria-controls="navbarNav">
          <i class="fas fa-bars pt-1" style="color: white; font-size: 18px"></i>
        </a>
      </div>
      <div class="col mx-md-3">
        <form class="form-inline" @submit.prevent="performSearch">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="" id="basic-addon1">
                  <img class="logo" src="../assets/img/svg/lupa_busca.svg" style="width: 22px;height: 22px;">
              </span>
            </div>
            <input
              type="text"
              placeholder="Buscar"
              v-model="searchQueryT"
            >
          </div>
        </form>
      </div>
      <div class="col-1 mx-4 d-none d-md-block">
        <div class="social-media d-flex ml-auto justify-content-end">
          <div class="button-social-media">
            <a href="https://www.facebook.com/educadorafmba/" target="_blank" style="text-decoration: none">
              <button class="d-flex justify-content-center align-items-center">
                <img class="logo" src="../assets/img/svg/top_social_icons_top_social_icon_facebook.svg" style="width: 83px;height: 22px">
              </button>
            </a>
          </div>
          <div class="button-social-media">
            <a href="https://www.instagram.com/educadorafmba/" target="_blank" style="text-decoration: none">
              <button class="d-flex justify-content-center align-items-center">
                <img class="logo" src="../assets/img/svg/top_social_icons_top_social_icon_instagram.svg" style="width: 83px;height: 22px">
              </button>
            </a>
          </div>
          <div class="button-social-media">
            <a href="https://twitter.com/educadorafmba" target="_blank" style="text-decoration: none">
              <button class="d-flex justify-content-center align-items-center">
                <img class="logo" src="../assets/img/svg/top_social_icons_top_social_icon_twitter.svg" style="width: 83px;height: 22px">
              </button>
            </a>
          </div>
        </div>
      </div>

    </header>
  </div>
</template>

<script>
export default {
  name: 'TopBarComponent',
  props: ['searchQuery'],
  data () {
    return {
      searchQueryT: ''
    }
  },
  methods: {
    search () {
      if (this.searchQuery.trim() !== '') {
        // console.log('Top Bar ' + this.searchQueryT)
        // this.$router.push({ path: '/resultados', query: { q: this.searchQueryT, playMP3: this.playMP3, idPlay: this.idPlay, pauseMP3: this.pauseMP3, sharing: this.sharing } })
        // this.searchQuery = ''
      }
    },
    performSearch () {
      // console.log('performSearch ' + this.searchQueryT)
      this.$emit('search', this.searchQueryT)
    }
  }
}
</script>

<style scoped>

</style>
