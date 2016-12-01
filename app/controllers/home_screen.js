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
// Alloy.Globals.someGlobalFunction(option,fetch_sucess,fetch_failure);

$.home_screen_header.page_name.text="NeoSTORE";
$.home_screen_header.BACK.text="\uf0c9";

$.home_screen_header.BACK.addEventListener('click', function(e) 
{	
  Titanium.API.info("You clicked the button");
  var animateRight = Ti.UI.createAnimation({
	left : 0,
	curve :Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT,
	duration : 200
    });
    
    var viewtrans=Ti.UI.create2DMatrix();
    viewtrans=viewtrans.scale(0.8);
    
    var animateheight = Ti.UI.createAnimation({
 	transform:viewtrans,
 	height:"100%",
 	width:"100%",
	left:"200",
	right: '-200',
	curve : Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT,
	duration : 200
    });   
    $.view_main.animate(animateheight);
    $.menu.animate(animateRight);
  //	$.home_screen.open();
  
});

$.view_main.addEventListener('swipe',function(e)
{
	var viewtrans=Ti.UI.create2DMatrix();
    viewtrans=viewtrans.scale(1);
	 var animateheight = Ti.UI.createAnimation({
	height:"100%",
	transform:viewtrans,
	left:"0",
	curve : Ti.UI.ANIMATION_CURVE_EASE_IN,
	duration : 200
    });  
        

    var animateRight = Ti.UI.createAnimation({
	left : "-200",
	curve : Ti.UI.ANIMATION_CURVE_EASE_IN,
	duration : 200
    }); 
    $.menu.animate(animateRight);
    $.view_main.animate(animateheight);
	//alert("swipe");
});

function createProductList(e) {
	Ti.API.info(JSON.stringify("send"+e.source.productid));
	var product_clicked=e.source.productid;
	var win=Alloy.createController('product_page',product_clicked).getView();
	win.open();
}