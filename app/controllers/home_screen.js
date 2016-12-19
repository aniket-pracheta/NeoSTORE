// Arguments passed into this controller can be accessed via the `$.args` object directly or:
//var args = $.args;
var args = arguments[0] || {};
Alloy.Globals.user_data_fetch;
//typeof past != "undefined"
if (typeof Alloy.Globals.user_data_fetch=="undefined") {
	Alloy.Globals.user_data_fetch=args;
}
 
 //Alloy.Globals.user_data_fetch=args;
 //Ti.App.Properties.setString(Alloy.Globals.user_data_fetch, args);
 Ti.API.info(Alloy.Globals.user_data_fetch);
  var access_token=Alloy.Globals.user_data_fetch.data.access_token;
 {
 	$.user_name.text=Alloy.Globals.user_data_fetch.data.first_name+" "+Alloy.Globals.user_data_fetch.data.last_name;
 	$.user_email.text=Alloy.Globals.user_data_fetch.data.email;
 	$.user_image.image=Alloy.Globals.user_data_fetch.data.profile_pic;
 }
 Ti.API.info(access_token);
//######################## FETCHING USERS DATA ON LODE OF HOME SCREEN #########################################
function fetch_sucess(data_recieved){
	require('loder').removeloder($.home_screen);
	for (var i=0; i < data_recieved.data.product_categories.length; i++) {
	  						
	 var  view=Ti.UI.createImageView({image:data_recieved.data.product_categories[i].icon_image,
	 								width:Titanium.UI.FILL,
	 								height:Titanium.UI.FILL});
						//##### auto scrolling of image view ###########3	 								
									var ar = $.scrolling_images.getViews();
									var t = 0;
									setInterval(function(e) {
   											 if(t >= ar.length) {
  												      t = 0;
   																 }
   										$.scrolling_images.scrollToView(t);
  													  t++;
	
													}, 4000);
						////
									$.scrolling_images.addView(view);	
	};
   
	$.home_screen.open();
	Ti.API.info(data_recieved.data.product_categories.length);
	//alert("sucess");
}
function fetch_failure(data_recieved){
		Ti.API.info(data_recieved);
	}
var option={
				method:"GET",
				send_url:"http://staging.php-dev.in:8844/trainingapp/api/users/getUserData",
				access_token:access_token,				
			};	
			{
		//require('loder').addloder($.home_screen);		
Alloy.Globals.someGlobalFunction(option,fetch_sucess,fetch_failure);
}
$.home_screen_header.page_name.text="NeoSTORE";
$.home_screen_header.BACK.text="\uf0c9";

$.home_screen_header.BACK.addEventListener('touchstart', move);


//###################### SLIDING MENU FOR HOME SCREEN ##############################
function move() 
{
	 
  Titanium.API.info("You clicked the button");
  var animateRight = Ti.UI.createAnimation({
	left : 0,
	curve :Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT,
	duration : 200
    });
    
    var viewtrans=Ti.UI.create2DMatrix();
    viewtrans=viewtrans.scale(0.9);
    
    var animateheight = Ti.UI.createAnimation({
 	transform:viewtrans,
 	height:"100%",
 	width:"100%",
	left:"250dp",
	right: '-250dp',
	backgroundColor:"rgba(142,142,142,0.5)",
	zIndex:200000,
	curve : Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT,
	duration : 200
    });  
     var animatecover = Ti.UI.createAnimation({
     	//backgroundColor:"transparent",
     	zIndex:10000,
     });
   // $.transparent.animate(animatecover);
    $.view_main.animate(animateheight);
    $.menu.animate(animateRight);
  
}

$.view_main.addEventListener('swipe',function(e)
{   
	Ti.API.info(JSON.stringify(e.direction));
	Ti.API.info("direction"+(e.direction));
	var viewtrans=Ti.UI.create2DMatrix();
    viewtrans=viewtrans.scale(1);
	 var animateheight = Ti.UI.createAnimation({
	height:"100%",
	transform:viewtrans,
	left:"0",
	right:0,
	curve : Ti.UI.ANIMATION_CURVE_EASE_IN,
	duration : 200
    });  
        
    var animateRight = Ti.UI.createAnimation({
	left : "-300",
	curve : Ti.UI.ANIMATION_CURVE_EASE_IN,
	duration : 200
    }); 
    if (e.direction=="left") {
    	$.menu.animate(animateRight);
    $.view_main.animate(animateheight); 
    }
    if (e.direction=="right") {
    	move();
    }
    
	});
	
//######################3 GOING TO PRODUCT LIST ##############################
function createProductList(e) {
	Ti.API.info(JSON.stringify("send"+e.source.productid));
	var product_clicked=e.source.productid;
	var win=Alloy.createController('product_page',product_clicked).getView();
	win.open();
}

//######################3 GOING TO MY ACCOUNT ##############################
function goto_myaccount(){
	var win=Alloy.createController('my_account').getView();
	win.open();
}

//################ going to my cart ##############################
function gotocart(){
	var win=Alloy.createController('my_cart').getView();
	//var win=Alloy.createController('my_cart',access_token).getView();
	win.open();
}


//#################3 go to my order ##########################
function my_order(){
	var win=Alloy.createController('my_order').getView();
		win.open();
}

//#################3 go to store location ##########################
function store(){
	var win=Alloy.createController('store_locator').getView();
		win.open();
}


//########################## Getting count in my cart ##################################
var access_token=Alloy.Globals.user_data_fetch.data.access_token;
function mycart_sucess(jsondata) {
	Ti.API.info("cart is here"+JSON.stringify(jsondata));
	$.mycar_no.text=jsondata.count;
	if(jsondata.data == null){
		$.mycar_no.text=0;
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
Alloy.Globals.someGlobalFunction(option, mycart_sucess, mycart_failure);