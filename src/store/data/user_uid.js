const state = {
    uid: '',
}

const getters = {
    user_uid: (state, getters, rootState) => {
        return state.uid;
    }
}

const actions = {
    setUserUID: ({ commit, state }, payload) => {
        commit('SET_UID', payload.uid)
    }
}

const mutations = {
    SET_UID(state, payload) {
        state.uid = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}