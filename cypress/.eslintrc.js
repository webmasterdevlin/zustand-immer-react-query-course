module.exports = {
  plugins: ["testing-library", "cypress"],
  extends: ["plugin:testing-library/recommended", "plugin:cypress/recommended"],
  root: true,
  env: {
    "cypress/globals": true,
  },
};
