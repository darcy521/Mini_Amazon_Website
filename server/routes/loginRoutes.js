const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config({ path: "./config.env" });
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;
const User = require('../models/user');

const router = express.Router();
router.use(cookieParser());

router.use(session({
    secret: 'darcy0421',  // 用于加密cookie的密钥
    resave: false,              // 不重新保存session，除非被修改
    saveUninitialized: false,   // 不保存未初始化的session
    name: 'session_id',
    cookie: {
        maxAge: 1000 * 60 * 30,    // 0.5 hour
        httpOnly: true,                 // 防止客户端脚本注入访问cookies
        secure: false                   // 当前通过http可以访问，如果为true则需要https
    },
    store: MongoStore.create({
        mongoUrl: MONGODB_URI,   // Database url
        collectionName: 'sessions',           // link to collection 'sessions' from mongodb
        ttl: 60 * 30             // 数据库存储session的存活时间， 0.5 hour
    })
}));

// check user status, default API to home page
router.get('/', (req, res) => {
    if (req.session.login) {
        res.send(req.session.username + ", welcome to Mini Amazon!" + req.sessionID);
    } else {
        res.send("Welcome to Mini Amazon!");
    }
})

// API - POST login existing user
router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    try {
        const user =  await User.findOne({ email: username });
        if (!user) {
            return res.status(404).send({ message: 'User not found'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid credentials'});
        }

        req.session.user = { id: user._id, role: user.role };
        req.session.isAuth = true;  // 标记用户为已认证
        console.log('session: ', req.session);
        console.log(`Login API Result: `, user);
        res.status(200).send({ message: `Welcome ${user.name}, you are logged in!`, data: user });
    } catch (err) {
        console.log(`Login API Error: `, err.message);
        res.status(500).send({ message: 'Error login process', error: err.message });
    }
})


// API - GET logout current user
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send("Error in destroying session");
        }
        // res.redirect('/');
        res.send("Session destroyed and logged out");
    })
})

module.exports = router;

