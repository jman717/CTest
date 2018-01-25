var express = require("express")
	,ejs = require('ejs')
	,hs = require('./lib/helper/server.js')
	,fs = require('fs')
	,conf = require('./configs/server.js')
	,app = express();

var path = require('path');
var lib = path.join(path.dirname(fs.realpathSync(__filename)), './lib');
var router = express.Router();
var vpath = __dirname + '/views/';
var factory = path.join(path.dirname(fs.realpathSync(__filename)), './lib/factory');

var hso = new hs({"factory_dir": factory});

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get(hso.routes.getCTest, hso.processRoute);
app.post(hso.routes.postUser, hso.processRoute);

app.use("/",router);

app.listen(conf.vars.port,function(){
	console.log("Live at Port " + conf.vars.port);
});
