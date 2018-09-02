module.exports = {
  apps: [{
    name: 'sshub',
    script: 'api.js',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
