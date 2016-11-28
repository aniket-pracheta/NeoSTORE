// Arguments passed into this controller can be accessed via the `$.args` object directly or:
//var args = $.args;
var args = arguments[0] || {};
// Alloy.Globals.user_data_fetch=args;
// var access_token=Alloy.Globals.user_data_fetch.data.access_token;
// Ti.API.info(access_token);
function fetch_sucess(data_recieved){
	for (var i=0; i < data_recieved.data.product_categories.length; i++) {
	  						
	 var  view=Ti.UI.createImageView({image:data_recieved.data.product_categories[i].icon_image,
	 								width:Titanium.UI.FILL,
	 								height:Titanium.UI.FILL});
			$.scrolling_images.addView(view);	
	};

   
	$.home_screen.open();
	Ti.API.info(data_recieved.data.product_categories.length);
	alert("sucess");
}
function fetch_failure(data_recieved){
		Ti.API.info(data_recieved);
	}
var option={
				method:"GET",
				send_url:"http://staging.php-dev.in:8844/trainingapp/api/users/getUserData",
				access_token:access_token,			
				};	
//Alloy.Globals.someGlobalFunction(option,fetch_sucess,fetch_failure);	
$.home_screen_header.page_name.text="NeoSTORE";
$.home_screen_header.BACK.text="\uf0c9";
$.home_screen_header.BACK.addEventListener('click',function(e)
{
	var win=Ti.UI.createScrollableView({
		height:"100%",
		width:"70%",
		backgroundColor:"green",
	});
	$.home_screen.add(win);
   $.home_screen.open();
  Titanium.API.info("You clicked the button");
  // $.window2.close();
});



function createProductList() {
	var win=Alloy.createController('product_page').getView();
	win.open();
}