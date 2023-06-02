const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      allurewriter(on,config);
      return config

      // implement node event listeners here
    },
  },
});


const allurewriter=require('@shelex/cypress-allure-plugin/writer')