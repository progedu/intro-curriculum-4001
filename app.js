// 厳格モード
'use strict';
// 'debug'モジュール呼び出し
const debug = require('debug');
/** 
 * デバッガーを作成する。
 * 第一引数：デバッガーの名前
 * 　　　　　なんでもいいようだが例えば'module:～'という名前をつけておくと
 * 　　　　　"DEBUG=module:* PORT=8000 npm start"というコマンドでアプリを起動すると
 * 　　　　　"module:XXXXXXXXXX"という名前をつけたデバッガーだけが働くようになるので便利
 * 　　　　　絶対に説明不足だと思う。
 * 返り値：ログを出力する関数？
 * 　　返り値関数の引数：出力する内容（文字列以外もおｋ）
*/
// 'module:info'という名前のデバッガーを作成する
const debugInfo = debug('module:info');
/** 
 * 'modele:info'デバッガーで実行する関数
*/
const debugInfoFunc = function () {
  debugInfo('module:info');
}
// デバッガーにログを出力させる間隔（ミリ秒）
const debugIntervalMsec = 1000;
/**
 * 一定時間ごとに関数を実行する
 * 第一引数：実行する関数
 * 第二引数：実行する間隔（ミリ秒）
 */
// １秒毎にデバッガーを動かす
setInterval(debugInfoFunc, debugIntervalMsec);
// 'module:error'という名前のデバッガーを作成する
const debugError = debug('module:error');
/** 
 * 'modele:error'デバッガーで実行する関数
*/
const debugErrorFunc = function () {
  debugError('module:error');
}
// １秒毎にデバッガーを動かす
setInterval(debugErrorFunc, 1000);

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
