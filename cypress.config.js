const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "ccw6ap",
  viewportHeight: 880,
  viewportWidth: 1280,
  video:true,
  videoCompression: true,
  e2e: {
    setupNodeEvents(on, config) {},
  },
})
