<template>
  <div class="truncate">{{ textoLimitado}}</div>
</template>

<script>
export default {
  name: 'TruncateTextHelperComponent',

  props: {
    textoCompleto: {
      type: String,
      required: true
    },
    maxCaracteres: {
      type: Number,
      required: true
    }
  },
  computed: {
    textoLimitado () {
      if (this.textoCompleto.length > this.maxCaracteres) {
        const lastSpaceIndex = this.textoCompleto.lastIndexOf(' ', this.maxCaracteres)
        if (lastSpaceIndex !== -1) {
          return this.textoCompleto.substring(0, lastSpaceIndex) + '...'
        } else {
          return this.textoCompleto.substring(0, this.maxCaracteres) + '...'
        }
      } else {
        return this.textoCompleto
      }
    }
  }
}
</script>

<style scoped>

.truncate {
  white-space: break-spaces;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
