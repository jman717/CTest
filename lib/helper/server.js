"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2018-1-24
*/


const	url = require('url')
		,db = require('../../lib/mysql_object')
		,ptf = require('promise-toolkit-factory')
		,lg = require('../../lib/logger.js');

var owner = null;
const setOwner = function(v){
	owner = v;
};
const getOwner = function(){
	return owner;
};

class server{
	constructor(jo){
		var t = this;
		t.factory_dir = jo.factory_dir;
		t.log = new lg(function(tx){
			t.logger = tx.log;
			t.dbo = new db({log: tx, logger: tx.log});
		});
		t.routes = {
			getCTest: "/get/ctest"
			,getSmith: "/get/smith"
			,getRoles: "/get/roles"
			,getMinimum: "/get/minimum"
			,postUser: "/post/user"
		};
		setOwner(t);
	}
	
	destroy(){
		var t = this;
		t = null;
	}

	getMainParams(req, res){
		var t = getOwner();
		var app = t.log.tagline.appender('stopwatch');
		var stw = new app().setConfig({"format": "total execution time(@stop - @start = @elapsed/mili)"});
		stw.setStart();
		return {
			stw: stw
			,log: t.log
			,logger: t.logger
			,dbo: t.dbo
			,routes: t.routes
			,req: req
			,res: res
		};
	}
	
	processRoute(req, res){
		var t = getOwner(), mp;
		var route = req.path;
		t.req = req;
		t.res = res;
		t.log.rte.setInput(route);
		t.log.act.setInput('post');
		
		t.log.reqIP.setInput(req.connection.remoteAddress);
		t.logger.debug('route(' + route + ')').tag(t.log.rte).tag(t.log.reqIP).tag(t.log.act).tag(t.log.lne).tagline();
		switch(route){
			case t.routes.getCTest:
				t.log.act.setInput('get');
				mp = t.getMainParams(req, res);
				var f1 = require(t.factory_dir + '/carosh_test');
				var f1o = new f1();
				var toolkit = new ptf().appender('logging', {"type": "log4js-tagline", "log": t.log, "logger": t.logger})
					.appender('vars', {"globals": mp})
					.appender('classes', {"objs": [{"name": "f1o", "obj": f1o}]})
					.appender('functions', {"flow": 1, "map": ["f1o.init", "f1o.render_page"]})
					.appender('promises', {"flows":[1]})
					.run();
				break;
			case t.routes.getSmith:
				t.log.act.setInput('get');
				mp = t.getMainParams(req, res);
				var f1 = require(t.factory_dir + '/carosh_test');
				var f1o = new f1();
				var toolkit = new ptf().appender('logging', {"type": "log4js-tagline", "log": t.log, "logger": t.logger})
					.appender('vars', {"globals": mp})
					.appender('classes', {"objs": [{"name": "f1o", "obj": f1o}]})
					.appender('functions', {"flow": 1, "map": ["f1o.init", "f1o.query_smith"]})
					.appender('promises', {"flows":[1]})
					.run();
				break;
			case t.routes.getRoles:
				t.log.act.setInput('get');
				mp = t.getMainParams(req, res);
				var f1 = require(t.factory_dir + '/carosh_test');
				var f1o = new f1();
				var toolkit = new ptf().appender('logging', {"type": "log4js-tagline", "log": t.log, "logger": t.logger})
					.appender('vars', {"globals": mp})
					.appender('classes', {"objs": [{"name": "f1o", "obj": f1o}]})
					.appender('functions', {"flow": 1, "map": ["f1o.init", "f1o.roles_assigned"]})
					.appender('promises', {"flows":[1]})
					.run();
				break;
			case t.routes.getMinimum:
				t.log.act.setInput('get');
				mp = t.getMainParams(req, res);
				var f1 = require(t.factory_dir + '/carosh_test');
				var f1o = new f1();
				var toolkit = new ptf().appender('logging', {"type": "log4js-tagline", "log": t.log, "logger": t.logger})
					.appender('vars', {"globals": mp})
					.appender('classes', {"objs": [{"name": "f1o", "obj": f1o}]})
					.appender('functions', {"flow": 1, "map": ["f1o.init", "f1o.minimum"]})
					.appender('promises', {"flows":[1]})
					.run();
				break;
			case t.routes.postUser:
				t.log.act.setInput('post');
				mp = t.getMainParams(req, res);
				var f1 = require(t.factory_dir + '/carosh_test');
				var f1o = new f1();
				var toolkit = new ptf().appender('logging', {"type": "log4js-tagline", "log": t.log, "logger": t.logger})
					.appender('vars', {"globals": mp})
					.appender('classes', {"objs": [{"name": "f1o", "obj": f1o}]})
					.appender('functions', {"flow": 1, "map": ["f1o.init", "f1o.insert_user"]})
					.appender('promises', {"flows":[1]})
					.run();
				break;
			default:
				t.logger.error('no route is defined for (' + route + ')').tag(t.log.rte).tag(t.log.cli).tag(t.log.act).tag(t.log.lne).tagline();
		}
	}
}

module.exports = server;
			