'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var express = require('express');
var app = express.createServer();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

var Message = mongoose.model('Message', {
  name: String,
  name2: String,
  role: String,
  startTime: String,
  date: Date,
  duration: Number,
  approved: Boolean
});

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if (baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  /*
   * You can add a proxy to your backend by uncommenting the line below.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.9.0/README.md
   */
  // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', changeOrigin: true});

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]' // Only needed for angular apps
}));

gulp.task('serve', ['watch'], function() {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function() {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function() {
  browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function() {
  browserSyncInit(conf.paths.dist, []);
});


app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

app.get('/api/message', GetMessages);

app.post('/api/message', function(req, res) {
  console.log(req.body);
  var message = new Message(req.body);
  // message.collection.drop();
  message.save();

  res.status(200);
})

mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
  if (!err) {
    console.log(("we are connected to mongo"));
  }
})

app.delete('/api/message/', function(req, res) {
 var id = req.params.id;
 console.log((id));

 Message.findOneAndRemove({_id: id}, function(err){});
})

var server = app.listen(5000, function() {
  console.log('listening on port', server.address().port);
})

function GetMessages(req, res) {
  Message.find({}).exec(function(err, result) {
    res.send(result);
  })
}
