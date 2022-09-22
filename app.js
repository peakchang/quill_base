const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');


// 라우터 샘플
const mainRouter = require('./routes');

const app = express();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 샘플 라우터 적용
app.use('/', mainRouter);

// 라우터 없을시 에러 발생
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
  });
  
  app.use((err, req, res, next) => {
    console.error(err);
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });
  
  module.exports = app;
