var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var config = require('./config');
var app = express();
var MongoStore = require('connect-mongo')(express);
var log = require('./log'); //log4js
log.use(app);

// all environments
app.set('port', process.env.PORT || config.serverPort);
app.set('views', path.join(__dirname, 'public/views'));
// app.set('view engine', 'ejs');
app.set('view engine', 'html'); //使用原生html
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser({ keepExtensions: true, uploadDir: './public/upload' }));
app.use(express.methodOverride());
app.use(express.cookieParser());

//session相关
app.use(
  express.session({
    secret: config.cookieSecret,
    cookie: {
      maxAge: 60000 * 30, //30 minutes
    },
    store: new MongoStore({
      url: config.connectString,
    }),
  }),
);

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
