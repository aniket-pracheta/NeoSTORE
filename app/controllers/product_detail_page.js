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
	var view=Ti.UI.createView({
		top:"10%",
		height:"80%",
		width:"90%",
		backgroundColor:"white",
		borderRadius:"10",
		layout:"vertical",
		opacity:100000,
		backgroundSelectedColor:"black",
		//backgroundFocusedColor:"cyan",
	});
	var view_big=Ti.UI.createView({
		height:"90%",
		width:"100%",
		backgroundColor:"cyan",
		borderRadius:"10",
		layout:"vertical",
		backgroundDisabledColor:"#2C2B2B",
		//backgroundFocusedColor:"cyan",
		opacity:"0.8",
	});
	var label1=Ti.UI.createLabel({
		text:args.name,
		top:"5%",
		color:"#2C2B2B",
		font:{
			fontSize:"25dp"
		},
			});
	var imge=Ti.UI.createImageView({
		width:"240dp",
		height:"178dp",
		top:"34dp",
		image:args.product_images,
		borderColor:"#2C2B2B"
	});	
	var label2=Ti.UI.createLabel({
		text:"Enter Qty",
		top:"5%",
		color:"#2C2B2B",
		font:{
			fontSize:"20dp"
		}
		});
	var field=Ti.UI.createTextField({
			id:"qty",
			height:"30dp",
			width:"45dp",
			borderColor:"#2C2B2B",
			top:"22dp"
		});
	
	var btn=Ti.UI.createButton({
		title:"SUBMIT",
		color:"white",
		width:"80dp",
		backgroundColor:"red",
		textAlign:"center",
		borderRadius:10,
		top:"22dp",
	});
		
	view.add(label1);
	view.add(imge);
	view.add(label2);
	view.add(field);
	view.add(btn);
	//view_big.add(view);
	$.product_detail.add(view);
}
