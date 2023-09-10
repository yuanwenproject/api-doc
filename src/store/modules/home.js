const state = {
  viewApiId: "",
};

const mutations = {
  CHANGE_VIEW_API_ID(state, value) {
    state.viewApiId = value;
  },
};

const actions = {
  changeViewApiId({ commit }, value) {
    commit("CHANGE_VIEW_API_ID", value);
  },
};

const getters = {
  getViewApiId(state) {
    return state.viewApiId;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
