const express = require('express');
const routerLogin = require('./routers/login.router');
const routerUser = require('./routers/user.router');
const routerCategory = require('./routers/category.router');
const routerPost = require('./routers/post.router');

const app = express();

app.use(express.json());

app.use('/login', routerLogin);
app.use('/user', routerUser);
app.use('/categories', routerCategory);
app.use('/post', routerPost);

module.exports = app;
