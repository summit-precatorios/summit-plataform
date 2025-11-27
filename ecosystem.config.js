module.exports = {
  apps: [
    {
      name: "NextAppName",
      //   exec_mode: 'cluster',
      instances: "2", // Or a number of instances
      script: "npm run start",
      args: "start",
      env_local: {
        APP_ENV: "local", // APP_ENV=local
      },
      env_dev: {
        APP_ENV: "dev", // APP_ENV=dev
      },
      env_prod: {
        APP_ENV: "prod", // APP_ENV=prod
      },
    },
  ],
};
