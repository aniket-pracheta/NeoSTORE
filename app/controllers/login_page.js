// Arguments passed into this controller can be accessed via the `$.args` object directly or:

//#################### login controller ###############################

var args = $.args;

function goto_homepage(){
	var flag = [];
	var i = 0;
	$.first.backgroundColor = "none";
	$.second.backgroundColor = "none";
	if ($.first_name.value == "") {
		flag[i] = 1;
		Ti.API.info("first");
		$.first_name.focus();
		$.first.backgroundColor= "orange";		
		alert("First name required");
	}
	else if (!($.password.value.match(/^\w{8,12}$/))) {
		flag[i++] = 1;
		alert("Enter 8-12 digit password");
		$.second.backgroundColor = "orange";
		$.password.focus();
	}
	else if (flag.length == 0) {
		
		var formdata={
			email:$.first_name.value,
			password:$.password.value,
			};
		Ti.API.log(formdata);
		
	function sucesss(data_recieved){
			 Ti.API.info(data_recieved.message);
			  //alert(data_recieved.message);
			  Ti.API.info(data_recieved.user_msg);
			 // alert("sucess");
			  if(data_recieved.user_msg=="Logged In successfully")
			  { 
			  	var win=Alloy.createController('home_screen',data_recieved).getView();
						win.open();
			  	}
	}

	function failure(data_recieved){
		Ti.API.info(data_recieved.message);
			  alert(data_recieved.message);
			  Ti.API.info(data_recieved.user_msg);
			  alert("error");
	}		

	var option={
				method:"POST",
				send_url:"http://staging.php-dev.in:8844/trainingapp/api/users/login",
				data:formdata
				};
	Alloy.Globals.someGlobalFunction(option,sucesss,failure);
	} 	
}

function register () {
	var win=Alloy.createController('register_page').getView();
	win.open();
  
}
