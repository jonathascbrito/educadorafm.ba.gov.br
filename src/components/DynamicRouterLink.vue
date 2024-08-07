<template>
  <router-link to="/" class="d-flex">
    <div class="cover d-flex align-items-center" id="img_card_compartilhar">
      <img :src="imageUrl"/>
    </div>
    <div class="d-flex flex-column text mx-3">
      <label class="m-0" id="name_compartilhar">{{ program }}</label>
      <span class="color-default">{{ name }}</span>
    </div>
  </router-link>
</template>

<script setup>
export default {
  props: ['imageUrl', 'name', 'program', 'url'],
  mounted () {
    console.log(this.imageUrl)
  }
}
</script>

<style scoped>

</style>
