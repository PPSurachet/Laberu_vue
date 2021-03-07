const state = {
    id: '',
}

const getters = {
    user_id: (state, getters, rootState) => {
        return state.id;
    }
}

const actions = {
    setUserID: ({ commit, state }, payload) => {
        commit('SET_ID', payload.id)
    }
}

const mutations = {
    SET_ID(state, payload) {
        state.id = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}