module.exports = {
  apps: [{
    name: "gateway",
    script: "dist/main.js",
    env_production: {
      RUNNING_ENV: "prod"
    },
    env_development: {
      RUNNING_ENV: "dev"
    }
  }]
}
