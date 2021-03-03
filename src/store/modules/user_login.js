const state = {
    email: '',
  }
  
  const getters = {
    user_login: (state, getters, rootState) => {
      return state.email
    }
  }
  
  const actions = {
    setUserLogin: ({ commit, state }, payload) => {
      commit('SET_EMAIL', payload.email)
    }
  }
  
  const mutations = {
    SET_EMAIL (state, payload) {
      state.email = payload
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }