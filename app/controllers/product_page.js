// Arguments passed into this controller can be accessed via the `$.args` object directly or:
//############################# PRODUCT PAGE controller ##############################
//take agrument from home page and display list of that product
var args = arguments[0] || {};
var product_category_id = args;
var tosend = {
	product_category_id : args
};
var title;
if (product_category_id == 1) {
	title = "Tables";
}
if (product_category_id == 5) {
	title = "Dinner";
}
if (product_category_id == 3) {
	title = "Sofa";
}
if (product_category_id == 2) {
	title = "Chair";
}
//elseif()
$.product_list_header.page_name.text = title;
$.product_list_header.BACK.addEventListener('click', function(e) {
	Titanium.API.info("You clicked the button");
	$.product_list_window.close();
});


//////////////////////
var data = [];
var product_list;
function make_list_sucess(jsondata) {
	//Ti.API.info(jsondata.data);
	 product_list = jsondata.data;
	_.each(jsondata.data, function(products, index, products_list) {
		Ti.API.info(products);
		 if (products.rating=="1") {
				 stars1:{
				 color:"cyan";
			 }}
		
			data.push({
			label2 : {
				text : products.name
			},
			label : {
				text : products.producer
			},
			cost : {
				text : "Rs." + products.cost
			},
			image : {
				image : products.product_images
			},	
			// if (products.rating=="1") {
				// stars1:{
				// color:"cyan"
			// },
		 	stars1:{},			
			template : "first",
			properties : {
				height : "97dp"
			},
		});
	});
	$.sect.setItems(data);
	$.listview2.sections = [$.sect];
	$.product_list_window.add($.listview2);
	$.product_list_window.open();
}

function make_list_failure(data_recieved) {
	Ti.API.info("error" + data_recieved);
}

var option = {
	method : "GET",
	send_url :"http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id="+product_category_id+"&limit=4"
};
Alloy.Globals.someGlobalFunction(option, make_list_sucess, make_list_failure);
//"http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=" + product_category_id+"&limit=5"
function go_to_detail(e){
	//alert(e.itemIndex);
 var itemindex=e.itemIndex;
 var full_product=product_list[e.itemIndex];
 Ti.API.info(JSON.stringify("send"+product_list[e.itemIndex]));
 var win=Alloy.createController('product_detail_page',full_product).getView();
 win.open();
}
