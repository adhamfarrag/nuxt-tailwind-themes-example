export const state = () => ({
  theme: 'theme-default',
  customThemes: [],
})

export const getters = {
  getTheme: (state) => {
    return state.theme
  },
}

export const mutations = {
  setTheme: (state, payload) => {
    state.theme = payload
  },
  ADD_CUSTOM_THEME: (state, payload) => {
    state.customThemes.push(payload)
  },
}

export const actions = {
  updateTheme({ commit }, payload) {
    commit('setTheme', payload)
  },
  AddCustomThemes({ commit }, payload) {
    commit('ADD_CUSTOM_THEME', payload)
  },
}
