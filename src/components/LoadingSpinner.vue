<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
    <p>{{ text }}</p>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Buscando...'
    }
  }
}
</script>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
}

.spinner {
  border: 4px solid rgba(252, 248, 248, 0.1);
  border-left-color: #fcfbfb;
  animation: spin 1s linear infinite;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
