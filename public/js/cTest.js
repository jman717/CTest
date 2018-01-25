
class cTest{
	constructor(){
		var t = this;
		t.rev = new reverse();
		t.db = new dbStuff();
		t.coolcode = new coolCode();
		t.lastname = new lastName();
		t.rolesassigned = new rolesAssigned();
		t.minimum = new minimum();
	}
};

class bar{
	constructor(){
		var t = this;
		t.state = null;
		t.caret = null;
		t.state_open = 'open';
		t.state_close = 'close';
		t.caret_down = 'fa fa-caret-down fa-lg';
		t.caret_right = 'fa fa-caret-right fa-lg';
	}
	
	flip(){
		var t = this;
		if(t.state == null){
			t.state = t.state_close;
		}else{
			if(t.state == t.state_open)
				t.state = t.state_close;
			else
				t.state = t.state_open;
		}
		switch(t.state){
			case t.state_open:
				try{
					$('#'+t.caret).attr('class', t.caret_down);
				}catch(e){
					//do nothing
				}
				t.on_open();
				break;
			case t.state_close:
				$('#'+t.caret).attr('class', t.caret_right);
				break;
		}
	}
};

class reverse extends bar{
	constructor(){
		super();
		var t = this;
		t.name = 'reverse';
		t.caret = t.name+'_caret';
		new Vue({
			el: '#rtitle',
			data: {
				reverse_title: 'reverse letters'
			}
		});		
		
		new Vue({
				el:'#revInput',
				methods: {
					reverseText: function (event){
						document.getElementById('input2').innerHTML = t.flip_string(document.getElementById('thisInput').value);
					}
				}
		});		
	}
	
	flip_string(s) {
		var o = '';
		for (var i = s.length - 1; i >= 0; i--)
			o += s[i];
		return o;
	}	
	
	on_open(){
		//alert(t.caret + ' open');
	}	
};

class dbStuff extends bar{
	constructor(){
		super();
		var t = this;
		t.name = 'db_stuff';
		t.caret = t.name+'_caret';
		new Vue({
			el: '#dbtitle',
			data: {
				db_stuff_title: 'db stuff'
			}
		});		
		
		new Vue({
				el:'#dbInput',
				methods: {
					elf_click: function (event){
						var fName = document.getElementById('fName').value;
						var lName = document.getElementById('lName').value;
						if(fName === ''){
							alert('must have a first name');
							return;
						}
						if(lName === ''){
							alert('must have a last name');
							return;
						}
						var jo = {"first": fName, "last": lName};
						var xURL = '/post/user';
						$.ajax(xURL, {
							type: 'POST',
							data: JSON.stringify(jo),
							datatype: 'json',
							contentType: "application/json; charset=utf-8",
							success: function(data) { 
								document.getElementById('dbJson').innerHTML = 'json output of users table: ' + JSON.stringify(data);
							},
							error  : function()     { alert('data error');}
						});
					}
				}
		});		
	}
	
	on_open(){
		//alert(t.caret + ' open');
	}	
}

class lastName extends bar{
	constructor(){
		super();
		var t = this;
		t.name = 'last_name';
		t.caret = t.name+'_caret';
		new Vue({
			el: '#lntitle',
			data: {
				last_name_title: 'last name "Smith"'
			}
		});		
		
		new Vue({
				el:'#lnInput',
				methods: {
					ln_click: function (event){
						var xURL = '/get/smith';
						$.ajax(xURL, {
							type: 'GET',
							datatype: 'json',
							contentType: "application/json; charset=utf-8",
							success: function(data) { 
								document.getElementById('lnJson').innerHTML = 'json output of user "Smith": ' + JSON.stringify(data);
							},
							error  : function()     { alert('data error');}
						});
					}
				}
		});		
	}
	
	on_open(){
		//alert(t.caret + ' open');
	}	
}

class rolesAssigned extends bar{
	constructor(){
		super();
		var t = this;
		t.name = 'roles_assigned';
		t.caret = t.name+'_caret';
		new Vue({
			el: '#ratitle',
			data: {
				roles_assigned_title: 'roles assigned'
			}
		});		
		
		new Vue({
				el:'#raInput',
				methods: {
					ra_click: function (event){
						var xURL = '/get/roles';
						$.ajax(xURL, {
							type: 'GET',
							datatype: 'json',
							contentType: "application/json; charset=utf-8",
							success: function(data) { 
								document.getElementById('raJson').innerHTML = 'json output of roles assigned: ' + JSON.stringify(data);
							},
							error  : function()     { alert('data error');}
						});
					}
				}
		});		
	}
	
	on_open(){
		//alert(t.caret + ' open');
	}	
}

class minimum extends bar{
	constructor(){
		super();
		var t = this;
		t.name = 'minimum';
		t.caret = t.name+'_caret';
		new Vue({
			el: '#mintitle',
			data: {
				minimum_title: 'minimum of 5 users per role'
			}
		});		
		
		new Vue({
				el:'#minInput',
				methods: {
					min_click: function (event){
						var xURL = '/get/minimum';
						$.ajax(xURL, {
							type: 'GET',
							datatype: 'json',
							contentType: "application/json; charset=utf-8",
							success: function(data) { 
								document.getElementById('minJson').innerHTML = 'json output of roles: ' + JSON.stringify(data);
							},
							error  : function()     { alert('data error');}
						});
					}
				}
		});		
	}
	
	on_open(){
		//alert(t.caret + ' open');
	}	
}

class coolCode extends bar{
	constructor(){
		super();
		var t = this;
		t.name = 'cool_code';
		t.caret = t.name+'_caret';
		new Vue({
			el: '#cctitle',
			data: {
				cool_code_title: 'cool code'
			}
		});		
	}
	
	on_open(){
		var t = this;
		//document.getElementById('ccHere').innerHTML = 'json output of users table: ';
	}	
};

