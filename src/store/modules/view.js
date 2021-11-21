export default {
  namespaced: true,

  state: {
    // 导航菜单
    navigation: [],
    isNavigationSaved: false,
  },

  mutations: {
    STORE_NAVIGATION(state, navigation) {
      state.navigation = navigation;
      state.isNavigationSaved = true;
    },
  },
};
