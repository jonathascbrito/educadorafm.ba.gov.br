<template>
  <div>
    <!-- The modal -->
    <div v-if="isModalVisible" class="modal">
      <div class="modal-content">
        <!--
        <div class="iframe-container" style="width: 100%; height: 100%">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/rJCEIEOeQ18" title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen>
          </iframe>
        </div>
      -->

        <!-- Image d-none d-md-block  -->
        <!--
        <img class="d-block d-md-none center-image" src="https://ingest.educadorafm.ba.gov.br/img/popup_mobile.png" alt="Image">
        <img class="d-none d-md-block" src="https://ingest.educadorafm.ba.gov.br/img/popup_desktop.png" alt="Image">
        -->
        <!-- Close button -->
        <div v-html="contentPopup">

        </div>
        <button @click="hideModal">X</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      isModalVisible: false,
      contentPopup: '',
      videoUrl: '' // Replace with your video URL
    }
  },
  mounted () {
    // Open the modal automatically when the component is mounted
    this.showModal()
    const headers = {
      'X-API-Key': '44AiC0g%ofjqMY:nakJT3g1YyL{14$[)'
    }

    axios.get('https://ingest.educadorafm.ba.gov.br/api/getPopupItem', { headers })
      .then(response => {
        this.contentPopup = response.data.popupItem
        // console.log(this.contentPopup)
      })
  },
  methods: {
    showModal () {
      this.isModalVisible = true
    },
    hideModal () {
      this.isModalVisible = false
    }
  }
}
</script>

<style scoped>
/* Styling for the modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Transparent background */
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.center-image {
  margin: 0 auto;
  max-width: 90%;
  height: auto;
}

.modal-content {
  background-color: transparent;
  padding: 20px;
  border-radius: 5px;
  max-width: 600px;
  border: none;
}

/* Style the close button */
button {
  top: 2px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #be1b2e;;
  color: #fff;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
}

.iframe-container {
  position: relative;
  overflow: hidden;
  padding-top: 56.25%; /* 16:9 aspect ratio (height / width * 100) */
}

.iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>
