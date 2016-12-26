// Arguments passed into this controller can be accessed via the `$.args` object directly or:

//#################### login controller ###############################

var args = $.args;

if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
	alert("on kar le bhai..!");
};

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
	else if ($.password.value=="") {
		flag[i++] = 1;
		alert("Can not be empty");
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
			  Ti.API.info("aceesinto"+data_recieved.data.access_token);
			  db.execute('INSERT INTO logindeatils (logobject) VALUES (?)',data_recieved);
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

function forgot_pass(){
	var win=Alloy.createController('forgot_password').getView();
	win.open();
}

