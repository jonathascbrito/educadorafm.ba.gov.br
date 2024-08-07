<template>
  <div class="d-none d-lg-block">
    <div class="d-flex list carousel slide carousel slide carousel-fade m-0 p-0 mb-4" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="row list">
            <div class="col-12 col-md-6 col-lg-6 ">
              <router-link to="/selo" tag="a" class="nav-link d-flex align-items-center m-0 p-0">
                <div class="card sonosfera">
                  <img src="../assets/img/carrossel/Banner-Selo.png" width="100%">
                </div>
              </router-link>
            </div>
            <div class="col-12 col-md-6 col-lg-6 ">
              <router-link to="/festival" tag="a" class="nav-link d-flex align-items-center m-0 p-0">
                <div class="card sonosfera">
                  <img src="../assets/img/carrossel/Banner-Festival.png" width="100%">
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarouselBannersComponent'
}
</script>

<style scoped>

</style>
