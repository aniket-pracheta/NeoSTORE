// Arguments passed into this controller can be accessed via the `$.args` object directly or:
//######################### MY ORDER ##########################################
// from here go to order in details controller which is left to craete

var args = $.args;

//var win=Alloy.createController('').getView();
//win.open();

$.myorder_header.page_name.text ="My Order";
$.myorder_header.BACK.addEventListener('click', function(e) {

	Titanium.API.info("You clicked the button");
	$.my_order_window.close();
});

//########################## Getting list of order ##################################
var access_token=Alloy.Globals.user_data_fetch.data.access_token;
 var data = [];
 function orderlist_sucess(jsondata) {
	Ti.API.info("cart is here"+JSON.stringify(jsondata));
	Ti.API.info("cart"+(jsondata.data.id));
	_.each(jsondata.data, function(products, index, products_list) {
		Ti.API.info("cart"+(products.id));
			data.push({
			 id : {
				text :products.id,
			},
			orderdate : {
				text : products.created,
			},
			cost : {
				text : "Rs."+ products.cost,
			},
			orderid : {
				orderid :products.id,
			},
			template : "first",
			properties : {
				height : "97dp"
			},
		 });
	});
	 $.sect.setItems(data);
	 $.listview2.sections = [$.sect];
	 $.my_order_window.add($.listview2);
	 $.my_order_window.open();
}

function orderlist_failure(data_recieved) {
	Ti.API.info("error" + data_recieved);
}

var option = {
	method : "GET",
	send_url :"http://staging.php-dev.in:8844/trainingapp/api/orderList",
	access_token:access_token
};
Alloy.Globals.someGlobalFunction(option, orderlist_sucess, orderlist_failure);
//######################
$.listview2.addEventListener('click', function(e) {

	Titanium.API.info("cliked the order"+JSON.stringify(e));
	
});

function order_unique(e){
	Titanium.API.info("cliked the order"+JSON.stringify(e));
}
