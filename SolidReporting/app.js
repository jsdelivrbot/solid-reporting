var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var passport = require('./strategies/user_sql.js');
var session = require('express-session');

var index = require('./routes/index');
var user = require('./routes/user');
var upload = require('./routes/uploadfile');
var demoquery = require('./routes/demoquery');
var outcomequery = require('./routes/outcomequery');
//test route


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/public', express.static(__dirname+ '/public/'));

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000000, secure: false}
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/fileUpload', upload);
app.use('/user', user);
app.use('/demoquery', demoquery);
app.use('/outcomequery', outcomequery);
app.use('/*', index);

// app.use('/index', test);
//test route

app.get('/', function(req,res){
  res.sendFile(__dirname + "/public/views/index.html");
});

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), function(req,res,next){
  console.log("Listening on port:" + app.get("port"));
});
