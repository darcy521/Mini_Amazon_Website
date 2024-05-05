const express = require('express');
const Greenlock = require('greenlock-express');
const router = express.Router();

const greenlock = Greenlock.create({
  // 服务器环境，使用 'https://acme-v02.api.letsencrypt.org/directory' 来获取真实证书
  // 使用 'https://acme-staging-v02.api.letsencrypt.org/directory' 进行测试
  server: 'https://acme-v02.api.letsencrypt.org/directory',

  // 你的电子邮件地址，用于 Let's Encrypt 的紧急联系和通知
  email: 'honglinya521@gmail.com',

  // 列出你希望证书涵盖的域名
  // 注意：在真实部署前，第一个域名应该是主域名
  approvedDomains: ['example.com', 'www.example.com'],

  // 将证书数据存储在项目根目录下的 'greenlock.d' 目录中
  configDir: './greenlock.d',

  // 根据你的应用环境更新应用的配置
  router,

  // 是否自动同意 Let's Encrypt 的服务条款
  agreeTos: true,

  // 用于证书续订的日志记录
  debug: false
});

greenlock.listen(80, 443);