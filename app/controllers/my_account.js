// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
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


