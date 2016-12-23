// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.myaccount_header.page_name.text = "My Account";
$.myaccount_header.BACK.addEventListener('click', function(e) {
	Titanium.API.info("You clicked the button");
	$.myaccount_window.close();
	var win=Alloy.createController('home_screen').getView();
	win.open();
});

var user_data=Alloy.Globals.user_data_fetch;
// Ti.API.info(user_data.data.first_name);
// Ti.API.info(JSON.stringify(user_data));
// $.first_name.hintText=user_data.data.first_name;
// $.last_name.hintText=user_data.data.last_name;
// $.email.hintText=user_data.data.email;
 // $.phone_number.hintText=user_data.data.phone_no;
 //if (user_data.data.dob=!"<null>") {
 	// $.dob.hintText=user_data.data.dob;
 //	};
$.user_image.setImage( user_data.data.profile_pic);

var pass_data;
function editprofile(){
	var w=Alloy.createController('edit_profile',pass_data).getView();
    w.open(); 
}

function resetpassword(){
	var w=Alloy.createController('reset_password').getView();
    w.open(); 
}
//////
var access_token=Alloy.Globals.user_data_fetch.data.access_token;

function fetch_sucess(data_recieved){
	//require('loder').removeloder();
	pass_data=data_recieved;
	Ti.API.info("firstnameaccount="+JSON.stringify(data_recieved));
	Ti.API.info("firstnameaccount="+data_recieved.data.first_name);
$.first_name.hintText=data_recieved.data.user_data.first_name;
$.last_name.hintText=data_recieved.data.user_data.last_name;
$.email.hintText=data_recieved.data.user_data.email;
$.phone_number.hintText=data_recieved.data.user_data.phone_no;
$.dob.hintText=data_recieved.data.user_data.dob;
 
$.user_image.setImage( data_recieved.data.profile_pic);   
	//$.home_screen.open();
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

