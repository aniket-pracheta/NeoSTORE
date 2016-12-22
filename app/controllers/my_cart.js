// Arguments passed into this controller can be accessed via the `$.args` object directly or:
//########################### MY CART ######################################
//on click of SUBMIT buttion go to ADDRESS_LIST/ADD_ADDRESS
var args = $.args;

//var win=Alloy.createController('address_list').getView();
//win.open();
							//or
//var win=Alloy.createController('add_address').getView();
//win.open();


$.mycart_header.page_name.text ="My Cart";
$.mycart_header.search.text ="";
$.mycart_header.BACK.addEventListener('click', function(e) {

	Titanium.API.info("You clicked the button");
	$.mycart_window.close();
	var win=Alloy.createController('home_screen').getView();
		win.open();
});

//########################## Getting list in my cart ##################################
var access_token=Alloy.Globals.user_data_fetch.data.access_token;
 var data = [];
 var product_list;
function mycart_sucess(jsondata) {
	require('loder').removeloder();
	Ti.API.info("cart is here"+JSON.stringify(jsondata));
	$.grand_total.text="Rs."+jsondata.total;
	_.each(jsondata.data, function(products, index, products_list) {
		Ti.API.info("cart"+(products));
		//Ti.API.info("mycart"+products.product.product_images);
				 
			data.push({
			label : {
				text : products.product.name
			},
			label2 : {
				text : "("+products.product.product_category+")"
			},
			cost : {
				text : "Rs." + products.product.cost
			},
			qty : {
				text : products.quantity,
				product_id:products.product_id,
			},
			image : {
				image : products.product.product_images
			},
			todelete : {
				visible:false,
			},	
		
			template : "first",
			properties : {
				height : (Titanium.Platform.osname == 'ipad')? "200dp":"97dp",
				left:"0dp",
			},
		});
	});
	 $.sect.setItems(data);
	 $.listview2.sections = [$.sect];
	 $.mycart_window.add($.listview2);
	 $.mycart_window.open();
	 
	 if(jsondata.data==null)
	 {
	 	$.orderbutton.visible =false;
	 	alert(jsondata.user_msg);
	 }
}

function mycart_failure(data_recieved) {
	Ti.API.info("error" + data_recieved);
}

var option = {
	method : "GET",
	send_url :"http://staging.php-dev.in:8844/trainingapp/api/cart",
	access_token:access_token
};

{
require('loder').addloder($.mycart_window);
Alloy.Globals.someGlobalFunction(option, mycart_sucess, mycart_failure);
}
//######################### Editing the quntity ###############################3
var get_qty_view;
var pro_id;

 $.transperent_view_buy2.addEventListener('click',function(e){
	Ti.API.info(JSON.stringify(e));
	if(e.source.backgroundColor=="rgba(142,142,142,0.5)"){
		$.transperent_view_buy2.visible=false;
	}
	
});
function change_qty(e){
	Ti.API.info(JSON.stringify(e));
	 //Ti.API.info((e.source.text));
	     var itemindex=e.itemIndex;
	 	 if(Ti.Platform.osname == "android")
	 	 {pro_id=e.section.items[itemindex].qty.product_id;}
	 	 else
	 	 {pro_id=e.source.product_id;}
	 $.transperent_view_buy2.visible=true;

}
$.picker.addEventListener('change', function(e) {
	 	Ti.API.info("clicked_picker"+(e.row.title));
	 	get_qty_view=e.row.title;
           
});

function edit_qty_update(){
	Ti.API.info("qty="+get_qty_view);
	Ti.API.info("pro_id="+pro_id);
	var formdata={
			product_id:pro_id,
			quantity:get_qty_view,
			};
	var option1 = {
	method : "POST",
	send_url :"http://staging.php-dev.in:8844/trainingapp/api/editCart",
	access_token:access_token,
	data:formdata
				};
		Alloy.Globals.someGlobalFunction(option1, update_sucess, update_failure);
		$.transperent_view_buy2.visible=false;	
		$.mycart_window.close();	
	var win=Alloy.createController('my_cart').getView();
	win.open();
}
function update_sucess(data_recieved){
	//alert("sucess bhai");
	alert(data_recieved.user_msg);
}

function update_failure(data_recieved) {
	Ti.API.info("error" + data_recieved);
}

//################################## to delete product ############################
var past;
var latest;
$.listview2.addEventListener('itemclick', function(e) {
	 Ti.API.info('delete'+JSON.stringify(e));
	 var latest=e.section.items[e.itemIndex];
	 latest.properties.left="-70dp";
	 latest.todelete.visible=true;
	//update the list
	 e.section.updateItemAt(e.itemIndex, latest);
	 if ( typeof past != "undefined") {
	 var change_past=past.section.items[past.itemIndex];
	 change_past.properties.left="0";
	 change_past.todelete.visible=false;
	 
	//update the list
	 past.section.updateItemAt(past.itemIndex,change_past);
	 past=undefined;
	 }
	 else{
	  past=e;
	 }
});

function delete_sucess(data_recieved){
	//alert("sucess bhai");
	alert(data_recieved.user_msg);
}

function delete_failure(data_recieved) {
	Ti.API.info("error" + data_recieved);
}

function todelete(e){
	//alert(e);
	Ti.API.info("error" +JSON.stringify(e));
	var latest_pro=e.section.items[e.itemIndex].qty.product_id;
	Ti.API.info("product_id"+latest_pro);
	
	var formdata={
			product_id:latest_pro,
				};
	var option2 = {
	method : "POST",
	send_url :"http://staging.php-dev.in:8844/trainingapp/api/deleteCart",
	access_token:access_token,
	data:formdata
				};
		Alloy.Globals.someGlobalFunction(option2, delete_sucess, delete_failure);
		$.mycart_window.close();	
	var win=Alloy.createController('my_cart').getView();
	win.open();
}

//####################3 palcing the order ##############################3
function placeorder(){
	var rows = db.execute('SELECT * FROM ADDRESS');
    Ti.API.info('Row count: ' + rows.rowCount);
    if(rows.rowCount>0)
    {
    		var win=Alloy.createController('address_list').getView();
			win.open();
    }
    else{
    	var win=Alloy.createController('add_address').getView();
		win.open();

    }
}