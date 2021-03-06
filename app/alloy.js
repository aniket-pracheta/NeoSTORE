_ = require("alloy/underscore")._;
Alloy.Globals.Map = require('ti.map');

// if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){
     // var alertDialog = Titanium.UI.createAlertDialog({
              // title: 'WARNING!',
              // message: 'Your device is not online.',
              // buttonNames: ['OK']
            // });
            // alertDialog.show();
            // alert("no network");
// }

//############### GLOBAL FUNCTION FOR SENDING AND RECIVING DATA TO API###########
Alloy.Globals.someGlobalFunction = function(options, sucesscall,failurecall) {
	var xhr;
	if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
		
		 alert("Check Internet Connection");
		 require('loder').removeloder();
		// return 0;
	}
	else
	{
	xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			Ti.API.info(JSON.parse(this.responseText));
			sucesscall(JSON.parse(this.responseText));
				},
				
		onerror:function(e){
			Ti.API.info(JSON.stringify(e));
			failurecall(JSON.parse(this.responseText));
		},
	});
	xhr.open(options.method,options.send_url);
	if (options.access_token) {
		//Ti.API.info("header present");
		xhr.setRequestHeader('access_token',options.access_token);
	};
	Ti.API.info("here"+JSON.stringify(options.send_url));
	xhr.send(options.data);
	}
};

//######################### DATA BASE FOR ADDRESS########################
var db = Ti.Database.open('useraddress');
db.execute('CREATE TABLE IF NOT EXISTS ADDRESS(id INTEGER PRIMARY KEY AUTOINCREMENT,fulladdress TEXT,landmark TEXT)');
db.execute('CREATE TABLE IF NOT EXISTS logindeatils(id INTEGER PRIMARY KEY AUTOINCREMENT,logobject TEXT)');
//db.execute('INSERT INTO ADDRESS (fulladdress) VALUES ("thane")');
//db.execute('DELETE FROM ADDRESS');
//db.execute('DROP TABLE ADDRESS;');