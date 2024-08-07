<template>
  <div id="main" class="main d-flex flex-column">
    <div class="margin-top">

    </div>
    <div class="main-container">

      <div class="d-flex align-items-center mb-2">
        <div>
          <h2 class="title mb-1">Programas da Educadora FM</h2>
          <span class="subtitle">

          </span>
        </div>
      </div>

      <div class="row list mb-3">
        <div class="col-6 col-md-3 col-lg-2 mb-0" v-for="program in programs" :key="program.url">
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

      <div class="mt-3" style="height: 70px">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Programs',
  metaInfo () {
    return {
      title: 'Programas',
      titleTemplate: '%s | Educadora FM 107.5',
      meta: [
        {name: 'description', content: ''},
        {property: 'og:title', content: 'Programas | Educadora FM 107.5'},
        {property: 'og:description', content: ''},
        {property: 'og:image', content: 'https://ingest.educadorafm.ba.gov.br'},
        {property: 'og:url', content: 'https://homologa.irdeb.ba.gov.br/programas'},
        {property: 'twitter:title', content: 'Programas | Educadora FM 107.5'},
        {property: 'twitter:description', content: ''},
        {property: 'twitter:image', content: 'https://ingest.educadorafm.ba.gov.br'},
        {property: 'twitter:card', content: 'summary'},
        {property: 'twitter:url', content: 'https://educadorafm.ba.gov.br/programas'}
      ]
    }
  },
  data () {
    return {
      programs: []
    }
  },
  mounted () {
    const headers = {
      'X-API-Key': '44AiC0g%ofjqMY:nakJT3g1YyL{14$[)'
    }
    axios.get('https://ingest.educadorafm.ba.gov.br/api/getProgramsList', {headers})
      .then(response => {
        this.programs = response.data.programas
        this.arraySort(this.programs)
        // console.log(response.data.programas)
      })
      .catch(error => {
        console.log(error)
      })
  },
  beforeMount () {
    var offcanvasElement = document.getElementById('navbarNav')
    // eslint-disable-next-line
    var offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement)
    offcanvas.hide()
  },
  methods: {
    arraySort (array) {
      return array.sort(() => Math.random() - 0.5)
    }
  }
}
</script>

<style scoped>

.main .list .card {
  border: 1px solid #383838;
}

@media screen and (max-width: 300px) {
  .title {
    font-size: 14px;
  }
}
</style>
