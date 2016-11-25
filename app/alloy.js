_ = require("alloy/underscore")._;

//############### GLOBAL FUNCTION FOR SENDING AND RECIVING DATA TO API###########
Alloy.Globals.someGlobalFunction = function(options, sucesscall,failurecall) {
	var xhr;
	xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			//Ti.API.info("hello"+JSON.stringify(this.responseText));
			sucesscall(JSON.parse(this.responseText));
			//alert(JSON.parse(this.responseText));
		},
		onerror:function(e){
			failurecall(JSON.parse(this.responseText));
		},
	});
	xhr.open(options.method,options.send_url);
	xhr.send(options.data);
};

