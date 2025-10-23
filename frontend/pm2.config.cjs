module.exports = {
  apps: [
    {
      name: "safarana",
      port: 3012,
      // instances: 'max', // Or a number of instances
      script: "./.output/server//index.mjs",
      args: "start",
      out_file: "/home/kiosana/logs/safarana/out.log",
      error_file: "/home/kiosana/logs/safarana/error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
