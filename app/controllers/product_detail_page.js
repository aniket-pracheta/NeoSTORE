// Arguments passed into this controller can be accessed via the `$.args` object directly or:
//############################### PRODUCT DETAIL PAGE ##############################
// generate pop up for enter quntity on click of buy button
//enter quntity have and submit button will take you to MY_CART CONTROLLER
//generate pop up for rating of quntity on click of rate button
//var args = $.args;
var args = arguments[0] || {};
Ti.API.info("recive"+JSON.stringify(args));
Ti.API.info((args.product_images));
var pro_id=args.id;
$.product_detail_header.page_name.text = args.name;
$.product_detail_header.BACK.addEventListener('click', function(e) {
	pro_id="null";
	Titanium.API.info("You clicked the button");
	$.product_detail.close();
});

function detail_sucess(jsondata){
	//Ti.API.info("jsondata.data got data");
	//Ti.API.info("len"+JSON.stringify(jsondata.data));
	{
	  //jsondata.data.name
	  $.pro_label1.text=jsondata.data.name;
	  {var title;
	  if (pro_id == 1) {
			title = "Tables";
		}
		if (pro_id == 5) {
			title = "Dinner";
		}
		if (pro_id == 3) {
			title = "Sofa";
		}
		if (pro_id == 2) {
			title = "Chair";
		}
		}
	  $.pro_label2.text="Category-"+title;
	  $.pro_producer.text=jsondata.data.producer;
	  $.pro_cost.text="Rs."+jsondata.data.cost;
	  $.pro_detail.text=jsondata.data.description;
	//  Ti.API.info(jsondata.data.description);
	  $.pro_image_big.image=jsondata.data.product_images[0].image;
	  $.pro_image1.image=jsondata.data.product_images[0].image;
	  $.pro_image2.image=jsondata.data.product_images[1].image;
	  if (jsondata.data.product_images.length>2) {
	  	$.pro_image3.visible="true";
	  	$.pro_image3.image=jsondata.data.product_images[2].image;
	  };
	 			if(jsondata.data.rating==1)
	 			{ $.stars1.color="#ffb003";}
	 			if(jsondata.data.rating==2)
	 			{ 
	 			$.stars1.color="#ffb003";
	 			$.stars2.color="#ffb003";
	 			}
	 			if(jsondata.data.rating==3)
	 			{ 
	 			$.stars1.color="#ffb003";
	 			$.stars2.color="#ffb003";
	 			$.stars3.color="#ffb003";
	 			}
	 			if(jsondata.data.rating==4)
	 			{ 
	 			$.stars1.color="#ffb003";
	 			$.stars2.color="#ffb003";
	 			$.stars3.color="#ffb003";
	 			$.stars4.color="#ffb003";
	 			}
	 			if(jsondata.data.rating==5)
	 			{ 
	 			$.stars1.color="#ffb003";
	 			$.stars2.color="#ffb003";
	 			$.stars3.color="#ffb003";
	 			$.stars4.color="#ffb003";
	 			$.stars5.color="#ffb003";
	 			}	  
	}
}

function detail_failure(e){
	Ti.API.info(e);
}
var option = {
	method : "GET",
	send_url :"http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id="+pro_id
};
Alloy.Globals.someGlobalFunction(option,detail_sucess, detail_failure);
///////////////
function chnage_image(e)
{
	Ti.API.info(JSON.stringify(e.source));
	var id=e.source.id;
	//id.borderColor="red";
	$.pro_image_big.image=e.source.image;
	}
$.pro_image1.addEventListener('click', chnage_image);
$.pro_image2.addEventListener('click', chnage_image);
$.pro_image3.addEventListener('click', chnage_image);

function buy_pop(){
	$.label_buy_1.text=args.name;
	$.image_buy.image=args.product_images;
	$.transperent_view_buy2.visible=true;
 }

function popup_rate(){
	$.label_pop.text=args.name;
	$.image_of_product.image=args.product_images;
 $.transperent_view1.visible=true;
 }


//################################# Rating products  ###################################
var rating_send={product_id:args.id
	,rating:args.rating};
	
$.transperent_view1.addEventListener('click',function(e){
	Ti.API.info(JSON.stringify(e));
	if(e.source.backgroundColor=="rgba(142,142,142,0.5)"){
		$.transperent_view1.visible=false;
	}
	
});	
$.star_raing_view.addEventListener('click',function(e)
{   
		Ti.API.info(e.source.id);
	if(e.source.id=="starschange1")
	 			{ $.starschange1.color="#ffb003";
	 			  $.starschange2.color="#747474";
	 			  $.starschange3.color="#747474";
	 			  $.starschange4.color="#747474";
	 			  $.starschange5.color="#747474";
	 			  rating=1;
	 			}
	 			if(e.source.id=="starschange2")
	 			{ 
	 			$.starschange1.color="#ffb003";
	 			$.starschange2.color="#ffb003";
	 			$.starschange3.color="#747474";
	 		    $.starschange4.color="#747474";
	 			$.starschange5.color="#747474";
	 			rating=2;
	 			}
	 			if(e.source.id=="starschange3")
	 			{ 
	 			$.starschange1.color="#ffb003";
	 			$.starschange2.color="#ffb003";
	 			$.starschange3.color="#ffb003";
	 			$.starschange4.color="#747474";
	 			$.starschange5.color="#747474";
	 			rating=3;
	 			}
	 			if(e.source.id=="starschange4")
	 			{ 
	 			$.starschange1.color="#ffb003";
	 			$.starschange2.color="#ffb003";
	 			$.starschange3.color="#ffb003";
	 			$.starschange4.color="#ffb003";
	 			$.starschange5.color="#747474";
	 			rating=4;
	 			}
	 			if(e.source.id=="starschange5")
	 			{ 
	 			$.starschange1.color="#ffb003";
	 			$.starschange2.color="#ffb003";
	 			$.starschange3.color="#ffb003";
	 			$.starschange4.color="#ffb003";
	 			$.starschange5.color="#ffb003";
	 			rating=5;
	 			}
    });
    
    function rate_sending(){
    	var option = {
	method : "POST",
	send_url :"http://staging.php-dev.in:8844/trainingapp/api/products/setRating",
	data:rating_send
					};
    	Alloy.Globals.someGlobalFunction(option,rate_sucess,rate_fail);
    	$.transperent_view1.visible=false;
    }
    
    function rate_sucess(data_recieved){
    	alert(data_recieved.user_msg);
    }
    
     function rate_fail(data_recieved){
    	alert(data_recieved.user_msg);
    }
    
//################################# Adding products to cart ###################################
   var access_token=Alloy.Globals.user_data_fetch.data.access_token;  
   
   $.transperent_view_buy2.addEventListener('click',function(e){
	Ti.API.info(JSON.stringify(e));
	if(e.source.backgroundColor=="rgba(142,142,142,0.5)"){
		$.transperent_view_buy2.visible=false;
	}
	
});
   
    function addtocart(){
    	Ti.API.info($.quantity.value);
    	Ti.API.info(pro_id);
    	var parameters={product_id:pro_id,quantity:$.quantity.value};
    	var option = {
	method : "POST",
	send_url :"http://staging.php-dev.in:8844/trainingapp/api/addToCart",
	access_token:access_token,
	data:parameters
					};
    	Alloy.Globals.someGlobalFunction(option,cart_sucess,cart_fail);
    	$.transperent_view_buy2.visible=false;
    	
    }
    
    function cart_sucess(data_recieved){
    	alert(data_recieved.user_msg);
    }
    
     function cart_fail(data_recieved){
    	alert(data_recieved.user_msg);
    }
    
