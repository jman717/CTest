"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2018-01-24
*/
const base = require('./base');

var owner;
module.exports = class carosh_test extends base{
	constructor() {
		super();
		var t = this;
		owner = t;
		t.page = 'pages/index';
	}
	
	init(results){
		var t = owner;
		results.parent.log({"type":"debug", "text": "debug 10.00", "classO":"carosh_test.init", "file":"carosh_test.js"});
		try{
			return results;
		}catch(e){
			results.parent.log({"type":"error", "text": "error: " + e.message, "classO":"carosh_test.init", "file":"carosh_test.js"});
			throw e;
		}
	}
	
	render_page(results){
		var t = owner;
		var g = results.parent.getVars({"vars":"globals"});
		results.parent.log({"type":"debug", "text": "debug 10.00", "classO":"carosh_test.render_page", "file":"carosh_test.js"});
		try{
			g.res.render(t.page, {"something": "here"});
			return results;
		}catch(e){
			results.parent.log({"type":"error", "text": "error: " + e.message, "classO":"carosh_test.render_page", "file":"carosh_test.js"});
			throw e;
		}
	}
	
	insert_user(results){
		var t = owner;
		var g = results.parent.getVars({"vars":"globals"});
		results.parent.log({"type":"debug", "text": "debug 20.00 dump=" + JSON.stringify(g.req.body), "classO":"carosh_test.insert_user", "file":"carosh_test.js"});
		try{
			var q = 'INSERT INTO ctest.users(first, last) values("' + g.req.body.first + '","' + g.req.body.last + '")';
			g.dbo.query(q, function(err, rows){
				var q1 = 'SELECT * FROM ctest.users';
				g.dbo.query(q1, function(err, rows){
					g.res.json(rows);				
				});
			});
			return results;
		}catch(e){
			results.parent.log({"type":"error", "text": "error: " + e.message, "classO":"carosh_test.insert_user", "file":"carosh_test.js"});
			throw e;
		}
	}
	
	
}