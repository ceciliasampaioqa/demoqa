const { defineConfig } = require('cypress')
const cypressSplit = require('cypress-split')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'reports/html/',
    overwrite: true,
    html: true,
    json: true,
    reportFilename: '[name]-report'
  },
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportWidth: 1366,
    viewportHeight: 768,
    retries: {
      runMode: 2,
      openMode: 2
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      cypressSplit(on, config)

      return config
    }
  }
})
