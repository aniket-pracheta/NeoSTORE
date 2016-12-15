// Arguments passed into this controller can be accessed via the `$.args` object directly or:
//########################## ADDRESS LIST CONTROLLER ###############################
// from here go to my_order controller also add argument of address selected
var args = $.args;

//var win=Alloy.createController('my_order').getView();
//win.open();

$.address_list_header.search.text = "\uf067";
$.address_list_header.page_name.text = "Address List";

$.address_list_header.BACK.addEventListener('click', function(e) {
	Titanium.API.info("You clicked the button");
	$.address_list_window.close();
});

//############# going to add new address to adress list ##############
$.address_list_header.search.addEventListener('click', function(e) {
	$.address_list_window.close();
	var win = Alloy.createController('add_address').getView();
	win.open();
});

//################ fetching users adress list from local data base #################
var data = [];
var load_list = function() {
	var rows = db.execute('SELECT * FROM ADDRESS');
	Ti.API.info('Row count: ' + rows.rowCount);
	while (rows.isValidRow()) {
		var id = rows.fieldByName('id');
		var add = rows.fieldByName('fulladdress');
		Ti.API.info(id + ' ' + add);
		data.push({
			label1 : {
				address_id : id
			},
			icon : {
				text:"\uf10c",
				address_full : add,
			},
			label2 : {
				text : add,
			},
			template : "first",
			properties : {
				height : (Titanium.Platform.osname == 'ipad')? "230dp":"100dp"
			},
		});
		rows.next();
	}
	$.sect.setItems(data);
	$.listview2.sections = [$.sect];
	$.address_list_window.add($.listview2);
	$.address_list_window.open();

};
load_list();

//########### delete address #################3
function deleterow(e) {
	Ti.API.info("todelete" + (e.section.items[e.itemIndex].label1.address_id));
	Ti.API.info(JSON.stringify(e));
	var delete_row;
	if (Ti.Platform.osname == "android") {
		delete_row = e.section.items[e.itemIndex].label1.address_id;
	} else {
		var delete_row = e.source.address_id;
	}
	db.execute('DELETE FROM ADDRESS WHERE id= ?', delete_row);
	//win.remove(view);
	$.address_list_window.close();
	//load_list();
	var win = Alloy.createController('address_list').getView();
	win.open();
	//$.address_list_window.open();
}

//####################### select address ########################
var past;
var address;

$.listview2.addEventListener('itemclick', function(e) {
	var user = e.section.getItemAt(e.itemIndex);
	Ti.API.info(JSON.stringify(e));
	Ti.API.info('A' + e.section.items[e.itemIndex].icon.text);
	var latest=e.section.items[e.itemIndex];
	latest.icon.text="\uf192";
	address=latest.icon.address_full;
	//update the list
	e.section.updateItemAt(e.itemIndex, latest);
	if ( typeof past != "undefined") {
	var change_past=past.section.items[past.itemIndex];
	change_past.icon.text="\uf10c";
	//update the list
	past.section.updateItemAt(past.itemIndex,change_past);
		Ti.API.info("pastdfhfghjson" + typeof past);
		Ti.API.info("pastdfhfghjson123456" +JSON.stringify(past));
	}
	 past=e;
});

//######################## sending final address for order#######################
var access_token=Alloy.Globals.user_data_fetch.data.access_token;

function order_sucess(data_recieved) {
	//alert("sucess bhai");
	alert(data_recieved.user_msg);
}

function fail_failure(data_recieved) {
	Ti.API.info("error" + data_recieved);
}

function order_now() {
	Ti.API.info("send address" + address);

	var formdata = {
		address : address,
	};
	var option1 = {
		method : "POST",
		send_url : "http://staging.php-dev.in:8844/trainingapp/api/order",
		access_token : access_token,
		data : formdata
	};
	Alloy.Globals.someGlobalFunction(option1, order_sucess, fail_failure);

	var win = Alloy.createController('home_screen').getView();
	win.open();
}

