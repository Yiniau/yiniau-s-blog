module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'blog-api-server',
      script    : '~/yiniau-s-blog/server/server.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },

    // // Second application
    // {
    //   name      : 'WEB',
    //   script    : 'web.js'
    // }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'yiniau',
      host : '45.77.16.113',
      ref  : 'origin/master',
      repo : 'git@github.com:Yiniau/yiniau-s-blog.git',
      path : '~/yiniau-s-blog',
      'post-deploy' : 'cd ~/yiniau-s-blog/server && npm install && cd ~/yiniau-s-blog && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
};
