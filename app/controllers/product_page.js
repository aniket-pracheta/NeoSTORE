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
if (product_category_id == 4) {
	title = "Bed";
}
if (product_category_id == 3) {
	title = "Sofa";
}
if (product_category_id == 2) {
	title = "Chair";
}
//elseif()
$.product_list_header.page_name.text = title;
$.product_list_header.change_search.text="";
$.product_list_header.BACK.addEventListener('click', function(e) {
	Titanium.API.info("You clicked the button");
	$.product_list_window.close();
   var win=Alloy.createController('home_screen').getView();
   win.open();
	
});


//////////////////////
var data = [];
var page=1;
var product_list;
var i=10;
function make_list_sucess(jsondata) {
	//Ti.API.info(jsondata.data);
	require('loder').removeloder();
	if (page>1) {
		//require('list_loder').removeloder();
	}
	//require('list_loder').removeloder();
	 product_list = jsondata.data;
	_.each(jsondata.data, function(products, index, products_list) {
		Ti.API.info(products.rating);
		var rating=products.rating;
		switch (rating) {
			case 1:
			data.push({
				stars1 : {
				color : "#ffb003"
			},
				
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
				template : "first",
					properties : {
				
					height :(Titanium.Platform.osname == 'ipad')? "200dp":"97dp",
			       	},
			
		    		});
		break;
		
		case 2:
			data.push({
				stars1 : {
				color : "#ffb003"
			},
			stars2 : {
				color : "#ffb003"
			},
				
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
				template : "first",
					properties : {
				
					height :(Titanium.Platform.osname == 'ipad')? "200dp":"97dp",
			       	},
			
		    		});
		break;
		
		case 3:
			data.push({
				stars1 : {
				color : "#ffb003"
			},
			stars2 : {
				color : "#ffb003"
			},
			stars3 : {
				color : "#ffb003"
			},
				
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
				template : "first",
					properties : {
				
					height :(Titanium.Platform.osname == 'ipad')? "200dp":"97dp",
			       	},
			
		    		});
		break;
		
		case 4:
			data.push({
				stars1 : {
				color : "#ffb003"
			},
			stars2 : {
				color : "#ffb003"
			},
			stars3 : {
				color : "#ffb003"
			},
			stars4 : {
				color : "#ffb003"
			},
				
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
				template : "first",
					properties : {
				
					height :(Titanium.Platform.osname == 'ipad')? "200dp":"97dp",
			       	},
			
		    		});
		break;
		
		case 5:
			data.push({
				stars1 : {
				color : "#ffb003"
			},
			stars2 : {
				color : "#ffb003"
			},
			stars3 : {
				color : "#ffb003"
			},
			stars4 : {
				color : "#ffb003"
			},
			stars5 : {
				color : "#ffb003"
			},
				
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
				template : "first",
					properties : {
				
					height :(Titanium.Platform.osname == 'ipad')? "200dp":"97dp",
			       	},
			
		    		});
		break;
		
		}
	});
	page++;
	$.sect.setItems(data);
	$.listview2.sections = [$.sect];
	$.product_list_window.add($.listview2);
	$.product_list_window.open();
	if (page>1) {
		//$.sect.appendItems(data);
    i = i + 25;
	};
	$.listview2.setMarker({sectionIndex:0, itemIndex: (i - 1) });

}

function make_list_failure(data_recieved) {
	require('loder').removeloder();
	if(page>1){
		//require('list_loder').removeloder();
	}
	//require('list_loder').removeloder();
	Ti.API.info("error" + data_recieved);
	page=-1;
}

var option = {
	method : "GET",
	send_url :"http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id="+product_category_id+"&limit=7"+"&page="+page
};
{
require('loder').addloder($.product_list_window);
Alloy.Globals.someGlobalFunction(option, make_list_sucess, make_list_failure);
}

//############ on scroll events for lazy loding##########################
$.listview2.addEventListener('scrollend',function(e)
{
	if(page>1){
	var option = {
	method : "GET",
	send_url :"http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id="+product_category_id+"&limit=6"+"&page="+page
};
	
	//require('list_loder').addloder($.product_list_window);
Alloy.Globals.someGlobalFunction(option, make_list_sucess, make_list_failure);
	}
});

//"http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=" + product_category_id+"&limit=4"
function go_to_detail(e){
	//alert(e.itemIndex);
 var itemindex=e.itemIndex;
 var full_product=product_list[e.itemIndex];
 Ti.API.info(JSON.stringify("send"+product_list[e.itemIndex]));
 var win=Alloy.createController('product_detail_page',full_product).getView();
 win.open();
}
