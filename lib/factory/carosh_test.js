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
				var q2 = 'SELECT MAX(id) AS mx FROM ctest.users';
				g.dbo.query(q2, function(err, rows){
					var q3 = 'INSERT INTO ctest.user_to_role(user_id, role_id) values("' + rows[0].mx + '","1")';
					g.dbo.query(q3, function(err, rows){
						var q1 = 'SELECT * FROM ctest.users';
						g.dbo.query(q1, function(err, rows){
							g.res.json(rows);				
						});
					});
				});
			});
			return results;
		}catch(e){
			results.parent.log({"type":"error", "text": "error: " + e.message, "classO":"carosh_test.insert_user", "file":"carosh_test.js"});
			throw e;
		}
	}
	
	select_max_users(results){
		var t = owner;
		var g = results.parent.getVars({"vars":"globals"});
		results.parent.log({"type":"debug", "text": "debug 20.00 dump=" + JSON.stringify(g.req.body), "classO":"carosh_test.insert_user", "file":"carosh_test.js"});
		try{
			var q = 'INSERT INTO ctest.users(first, last) values("' + g.req.body.first + '","' + g.req.body.last + '")';
			g.dbo.query(q, function(err, rows){
				var q2 = 'SELECT MAX(id) AS mx FROM ctest.users';
				g.dbo.query(q2, function(err, rows){
					var q3 = 'INSERT INTO ctest.user_to_role(user_id, role_id) values("' + rows[0].mx + '","1")';
					g.dbo.query(q3, function(err, rows){
						var q1 = 'SELECT * FROM ctest.users';
						g.dbo.query(q1, function(err, rows){
							g.res.json(rows);				
						});
					});
				});
			});
			return results;
		}catch(e){
			results.parent.log({"type":"error", "text": "error: " + e.message, "classO":"carosh_test.insert_user", "file":"carosh_test.js"});
			throw e;
		}
	}
	
	query_smith(results){
		var t = owner;
		var g = results.parent.getVars({"vars":"globals"});
		results.parent.log({"type":"debug", "text": "debug 20.00 dump=" + JSON.stringify(g.req.body), "classO":"carosh_test.getSmith", "file":"carosh_test.js"});
		try{
			var q1 = 'SELECT * FROM ctest.users WHERE lower(last) = "smith"';
			g.dbo.query(q1, function(err, rows){
				g.res.json(rows);				
			});
			return results;
		}catch(e){
			results.parent.log({"type":"error", "text": "error: " + e.message, "classO":"carosh_test.getSmith", "file":"carosh_test.js"});
			throw e;
		}
	}		
	
	roles_assigned(results){
		var t = owner;
		var g = results.parent.getVars({"vars":"globals"});
		results.parent.log({"type":"debug", "text": "debug 30.00 dump", "classO":"carosh_test.roles_assigned", "file":"carosh_test.js"});
		try{
			var q1 = 'SELECT ur.id, ur.first, ur.last, rl.role_name ' +
									'FROM ctest.users AS ur ' +
									'LEFT JOIN (ctest.user_to_role AS ru, ctest.roles AS rl) ' +
									'ON (ru.user_id = ur.id AND ru.role_id = rl.id) ' +
									'WHERE ru.role_id > 0 ';
			g.dbo.query(q1, function(err, rows){
				g.res.json(rows);				
			});
			return results;
		}catch(e){
			results.parent.log({"type":"error", "text": "error: " + e.message, "classO":"carosh_test.roles_assigned", "file":"carosh_test.js"});
			throw e;
		}
	}		
	
	minimum(results){
		var t = owner;
		var g = results.parent.getVars({"vars":"globals"});
		results.parent.log({"type":"debug", "text": "debug 40.00", "classO":"carosh_test.minimum", "file":"carosh_test.js"});
		try{
			var q1 = 'SELECT sb.count, sb.role_name FROM ( ' +
									'SELECT COUNT(DISTINCT(ru.user_id)) AS count, (SELECT rl.role_name FROM ctest.roles AS rl WHERE rl.id = ru.role_id) AS role_name ' +
									'FROM ctest.user_to_role AS ru ' +
									'WHERE ru.role_id > 0 ' +
									'GROUP BY ru.role_id ' +
									') AS sb ' +
									'WHERE sb.count >= 5 ';
			g.dbo.query(q1, function(err, rows){
				g.res.json(rows);				
			});
			return results;
		}catch(e){
			results.parent.log({"type":"error", "text": "error: " + e.message, "classO":"carosh_test.minimum", "file":"carosh_test.js"});
			throw e;
		}
	}		
}