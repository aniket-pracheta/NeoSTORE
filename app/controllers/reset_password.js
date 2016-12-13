// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.change_password_header.page_name.text = "Reset Password";
$.change_password_header.BACK.addEventListener('click', function(e) {
	Titanium.API.info("You clicked the button");
	$.change_password_window.close();
});

var access_token=Alloy.Globals.user_data_fetch.data.access_token;
function reset(){
		
		var formdata={
			old_password:$.curr_password.value,
			password:$.new_password.value,
			confirm_password:$.conf_password.value,
			
		};
		Ti.API.log(formdata);
		
	function sucesss(data_recieved){
			 Ti.API.info(data_recieved.message);
			  alert(data_recieved.message);
			  Ti.API.info(data_recieved.user_msg);
			 
	}

	function failure(data_recieved){
		
			  alert(data_recieved.message);
			
	}		

	var option={
				method:"POST",
				send_url:"http://staging.php-dev.in:8844/trainingapp/api/users/change",
				access_token:access_token,
				data:formdata
				};
	Alloy.Globals.someGlobalFunction(option,sucesss,failure);
	var w=Alloy.createController('my_account').getView();
    w.open(); 
}