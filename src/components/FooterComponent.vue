<template>
  <div class="barra-footer">
    <div class="container-fluid w-100 h-100 d-none d-md-block">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-2" style="font-size: 12px">
          &copy;2023 Educadora FM 107.5
        </div>
        <div class="col-7 d-inline-flex align-items-left align-items-center d-none d-sm-block" style="font-size: 12px">
          <router-link tag="a" class="products-links" to="/quem-somos">Quem Somos&nbsp;|</router-link><router-link tag="a" class="products-links" to="/expediente">&nbsp;Expediente&nbsp;|&nbsp;</router-link><router-link tag="a" class="products-links" to="/termo-uso">Termos de Uso&nbsp;|&nbsp;</router-link>Conheça Também:&nbsp;&nbsp;<a class="products-links" href="http://irdeb.ba.gov.br/institucional/tve" target="_blank">TVE BAHIA&nbsp;|</a>&nbsp; <a href="http://educabahia.ba.gov.br/" target="_blank" class="products-links">EDUCA BAHIA&nbsp;|&nbsp;</a><a href="http://irdeb.ba.gov.br" target="_blank" class="products-links">IRDEB</a>
        </div>

        <div class="col-3 d-inline-flex justify-content-end align-items-center">
          <img class="img-fluid" src="../assets/img/svg/bottom_marcas_governo.svg" alt="regua" style="max-height:22px;">
        </div>

      </div>
    </div>
    <div class="container-fluid w-100 h-100 d-block d-md-none">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-12" style="font-size: 12px">
          &copy;2023 Educadora FM 107.5
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
@media screen and (max-width: 700px) {
  .barra-footer {
    height: 25px;
    position: fixed;
  }
}
</style>
