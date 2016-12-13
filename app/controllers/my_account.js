// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.myaccount_header.page_name.text = "My Account";
$.myaccount_header.BACK.addEventListener('click', function(e) {
	Titanium.API.info("You clicked the button");
	$.myaccount_window.close();
});

var user_data=Alloy.Globals.user_data_fetch;
Ti.API.info(user_data.data.first_name);
Ti.API.info(user_data);
$.first_name.hintText=user_data.data.first_name;
$.last_name.hintText=user_data.data.last_name;
$.email.hintText=user_data.data.email;
 $.phone_number.hintText=user_data.data.phone_no;
 if (user_data.data.dob=!"<null>") {
 	$.dob.hintText=user_data.data.dob;
 	};


function editprofile(){
	var w=Alloy.createController('edit_profile').getView();
    w.open(); 
}

function resetpassword(){
	var w=Alloy.createController('reset_password').getView();
    w.open(); 
}

