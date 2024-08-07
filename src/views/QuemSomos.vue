<template>
    <div id="main" class="main d-flex flex-column">
      <div class="margin-top">
      </div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-2 mt-2 d-md-block d-none d-sm-block">
              <img  src="https://ingest.educadorafm.ba.gov.br/img/educadorafm.png" alt="Descrição da imagem" class="img-fluid">
            </div>
            <div class="col-lg-10 mb-2 text-quem-somos">
              <h1 class="mt-0">Educadora FM</h1>
              <h5>É sua! É da Bahia</h5>
              <hr style="width:100%; text-align:center; background-color:white; margin-top: 4px;">

              <p>A Rádio Educadora FM, fundada em 1978, é a emissora local que mais abre
                espaço para a música da Bahia. O samba, forró, ritmos nordestinos, músicas de orquestras
                baianas, hip hop, chorinho, blues, reggae, música africana, caribenha, latino-americana e de
                países de língua portuguesa, além da música instrumental e parcerias com DJ´s estão na sua
                programação. Os ouvintes também participam diretamente da programação solicitando músicas
                através do WhatsApp (71) 999641908.</p>
              <p>Um novo transmissor inaugurado em 2021 permite que a rádio seja acompanhada
                por mais de 5 milhões de baianos na frequência 107.5 FM. Além disso, está disponível o
                aplicativo EducadoraPlay para aparelhos celulares (Android e IOS), onde é possível escutar a
                programação ao vivo, enviar mensagens solicitando músicas e verificar a programação diária e
                semanal. Os ouvintes podem escutar a programação da rádio ao vivo também pelo site da Educadora
                FM.</p>
              <p>A Rádio promove ainda o Festival de Música Educadora FM, o maior festival de
                composições inéditas da Bahia, premiando músicos baianos que moram na Bahia e em outras
                localidades do Brasil ou do mundo. Os prêmios variaram entre R$ 1.000,00 e R$ 12.000,00 e as 50
                músicas selecionadas são incorporadas à programação permanente da rádio. A cada ano um artista é
                homenageado por sua vida e obra. Nos últimos anos estes homenageados foram Tom Zé, Elza Soares,
                Caetano Veloso, Gilberto Gil, Mateus Aleluia e Maria Bethânia.</p><br>
              <div class="row ml-3">
                <div class="col-md-4 mt-3">
                  <div class="thumbnail">
                    <img src="https://ingest.educadorafm.ba.gov.br/img/img1.jpeg" alt="educadorafm" style="width:100%;height: 100%">
                  </div>
                </div>
                <div class="col-md-4 mt-3">
                  <div class="thumbnail">
                    <img src="https://ingest.educadorafm.ba.gov.br/img/img2.jpeg" alt="educadorafm" style="width:100%">
                  </div>
                </div>
                <div class="col-md-4 mt-3">
                  <div class="thumbnail">
                    <img src="https://ingest.educadorafm.ba.gov.br/img/img3.jpeg" alt="educadorafm" style="width:100%">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </template>

<script>
export default {
  metaInfo () {
    return {
      title: 'Quem Somos',
      titleTemplate: '%s | Educadora FM 107.5',
      meta: [
        {name: 'description', content: 'Aqui vai a descrição da Página Quem Somos'},
        {property: 'og:title', content: 'Quem Somos | Educadora FM 107.5'},
        {property: 'og:description', content: 'Descrição que irá no Facebook'},
        {property: 'og:image', content: 'https://ingest.educadorafm.ba.gov.br/img/acervo/caymmi.jpeg'},
        {property: 'og:url', content: 'https://homologa.irdeb.ba.gov.br/quem-somos'}
      ]
    }
  }
}
</script>

<style scoped>
.img-fluid{
  width: 260px;
  height: 260px;
  border-radius: 10px;
}
.text-quem-somos{
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
}

.margin-top{
  margin-top: 70px;
}
</style>
