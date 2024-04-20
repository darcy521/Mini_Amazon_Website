const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config({ path: "./config.env" });
const MONGODB_URI = process.env.MONGODB_URI;

const router = express.Router();

router.use(session({
    secret: 'your_secret_key',  // 用于加密cookie的密钥
    resave: false,              // 不重新保存session，除非被修改
    saveUninitialized: false,   // 不保存未初始化的session
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    },
    store: MongoStore.create({
        mongoUrl: MONGODB_URI,   // Database url
        collectionName: 'sessions'           // link to collection 'sessions' from mongodb
    })
}));

router.post('/login', (req, res) => {
    const username = req.body.username;
    req.session.user = { name: username };
    req.session.isAuth = true;  // 标记用户为已认证
    res.send('Logged in!');
})

module.exports = router;

