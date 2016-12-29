// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[0] || {};
 var recived=args;
// alert(args);

$.order_detail_header.page_name.text =args;
$.order_detail_header.BACK.addEventListener('click', function(e) {

	Titanium.API.info("You clicked the button");
	$.order_detail_window.close();
});
//###################### fetching order ###############################
var access_token=Alloy.Globals.user_data_fetch.data.access_token;
var data = [];
function order_sucess(jsondata) {
	Ti.API.info("rec"+JSON.stringify(jsondata.data));
	$.grand_total.text="Rs."+jsondata.data.cost;
	 	_.each(jsondata.data.order_details, function(products, index, products_list) {
		 Ti.API.info("_each"+JSON.stringify(products));

			data.push({
			label2 : {
				text : "("+products.prod_cat_name+")"
			},
			label : {
				text : products.prod_name
			},
			cost : {
				text : "Rs."+products.total
			},
			image : {
				image : products.prod_image
			 },
			qty : {
				 text : "QTY:" + products.quantity
			 },	
					
			 template : "first",
			 properties : {
			  height : (Titanium.Platform.osname == 'ipad')? "190dp":"100dp",
		 },
		 });
	});
	$.sect.setItems(data);
	$.listview2.sections = [$.sect];
	$.order_detail_window.add($.listview2);
	$.order_detail_window.open();
}

function order_failure(data_recieved) {
	Ti.API.info("error" + data_recieved);
}

var option = {
	method : "GET",
	send_url :"http://staging.php-dev.in:8844/trainingapp/api/orderDetail?order_id="+recived,
	access_token:access_token,
};
Alloy.Globals.someGlobalFunction(option, order_sucess, order_failure);