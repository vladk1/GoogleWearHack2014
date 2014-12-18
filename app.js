
/**
 * Module dependencies.
 */


var express = require('express')
  , routes = require('./routes')
  , config = require('./config').config;

var WebSocketServer = require("ws").Server

var app = module.exports = express.createServer();

// socket io
// var io = require('socket.io');

// // socket io setup
// io = io.listen(app);

// // configure socket.io
// io.configure(function () {
  
//   // recommended production testing
//   //io.enable('browser client minification');  // send minified client
//   //io.enable('browser client etag');          // apply etag caching logic based on version number
//   //io.enable('browser client gzip');          // gzip the file
  
//   // io.set('log level', 1); // reduce level of logging to warning only
  
//   io.set('transports', [
//       'websocket'
//     , 'flashsocket'
//     , 'htmlfile'
//     , 'xhr-polling'
//     , 'jsonp-polling'
//   ]);
  
  
// });




// configure express
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// remote control the presentation server code

routes.setupRemotePresenter(app, config);
app.listen(process.env.PORT || 3000);
routes.informCurrentAddress(app.address(), __dirname, app.address().port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);




var wss = new WebSocketServer({server: app})
console.log("websocket server created")

wss.on("connection", function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  })
  }, 1000)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
});

wss.on("command", function(ws) {
  console.log("websocket command data");
});


