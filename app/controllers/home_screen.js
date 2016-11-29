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
	var leftmenu=Ti.UI.createWindow({
			backgroundColor: 'red',
	        top:   0,
			left:  0,
			width: 150,
			zIndex: 1,		
	});
	
	var animateRight = Ti.UI.createAnimation({
	left : 0,
	curve : Ti.UI.ANIMATION_CURVE_EASE_IN,
	duration : 150
    });
    leftmenu.animate(animateRight);
	//$.home_screen.add(win);
   leftmenu.open();
  Titanium.API.info("You clicked the button");
  // $.window2.close();
});



function createProductList(e) {
	Ti.API.info(JSON.stringify("send"+e.source.productid));
	var product_clicked=e.source.productid;
	var win=Alloy.createController('product_page',product_clicked).getView();
	win.open();
}