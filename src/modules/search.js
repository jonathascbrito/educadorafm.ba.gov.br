const state = {
  playMP3: null,
  idPlay: null,
  pauseMP3: null,
  sharing: null
}

const mutations = {
  setMethods (state, methods) {
    state.playMP3 = methods.playMP3
    state.idPlay = methods.idPlay
    state.pauseMP3 = methods.pauseMP3
    state.sharing = methods.sharing
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
