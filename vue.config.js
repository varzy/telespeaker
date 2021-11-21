module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: { prependData: `@import "@/styles/resources.scss";` },
      less: { lessOptions: { javascriptEnabled: true } },
    },
  },
};
