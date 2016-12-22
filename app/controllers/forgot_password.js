// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.forget_header.page_name.text ="Forget Password";
$.forget_header.BACK.addEventListener('click', function(e) {

	Titanium.API.info("You clicked the button");
	$.forgot_window.close();
});


function sendmail(){
	var formdata={
			email:$.email.value,
		};
	function sucesss(data_recieved){
			 Ti.API.info(data_recieved.message);
			  //alert(data_recieved.message);
			  Ti.API.info(data_recieved.user_msg);
			//alert(data_recieved.user_msg);
			  
			  
			  	alert(data_recieved.user_msg);
			  	var win=Alloy.createController('login_page').getView();
						win.open();
			 	//$.forgot_window.close(); 
	}

	function failure(data_recieved){
		Ti.API.info(data_recieved.message);
			  alert(data_recieved.user_msg);
			  Ti.API.info(data_recieved.user_msg);
			//  alert("error");
	}		

	var option={
				method:"POST",
				send_url:"http://staging.php-dev.in:8844/trainingapp/api/users/forgot",
				data:formdata
				};
				
		if($.email.value!=""){		
	Alloy.Globals.someGlobalFunction(option,sucesss,failure);
	
	}
	else{
		alert("not valid email id");
	}
	
}
