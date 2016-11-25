// Arguments passed into this controller can be accessed via the `$.args` object directly or:
//#################### register controller ###############################
var args = $.args;

function toggle(e) {
	//Ti.API.info(JSON.stringify(e));
	if (e.source.text == "Male" || e.source.id == "male") {
		//Ti.API.info("In Male");
		$.male.text = "\uf111";
		//Fill
		$.female.text = "\uf1db";
		//Unfill
	} else {
		//Ti.API.info("In Female");
		$.male.text = "\uf1db";
		//Unfill
		$.female.text = "\uf111";
		//Fill
	}
}

var viewpicker = Titanium.UI.createView({
	borderRadius : 10,
	backgroundColor : '#283747',
	width : "80%",
	height : 450,
});

var picker = Ti.UI.createPicker({
	type : Ti.UI.PICKER_TYPE_DATE,
	dateTimeColor : "black",
	//useSpinner for Android Only
	//useSpinner : true,
	minDate : new Date(2009, 0, 1),
	maxDate : new Date(2030, 11, 31),
	value : new Date(2014, 3, 12),
	top : 0,
});

///date-picker
function getpicker() {
	var set = Ti.UI.createButton({
		title : 'Set',
		top : "90%",
		backgroundColor : "#283747",
		color : "#2980B9",
		borderRadius : 10
	});

	viewpicker.removeAllChildren();
	viewpicker.add(picker);
	viewpicker.add(set);
	$.window2.add(viewpicker);

	set.addEventListener('click', function(e) {
		var date = picker.value;
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		var newdate = day + "-" + month + "-" + year;
		$.dob.setText(newdate);
		$.window2.remove(viewpicker);
	});
}

//COUNTRY POPULATED
function popcountry() {
	var country = [];
	country[0] = Ti.UI.createPickerRow({
		title : "Country",
		val : "usa"
	});
	country[1] = Ti.UI.createPickerRow({
		title : "usa",
		val : "usa"
	});
	country[2] = Ti.UI.createPickerRow({
		title : "africa",
		val : "afrca"
	});
	country[3] = Ti.UI.createPickerRow({
		title : "india",
		val : "india"
	});

	var picker = Ti.UI.createPicker({
		top : 5,
		selectionIndicator : true,
	});

	var set = Ti.UI.createButton({
		title : 'Set',
		top : 230,
		backgroundColor : "#283747",
		color : "#2980B9",
		borderRadius : 10
	});
	viewpicker.removeAllChildren();
	picker.add(country);
	viewpicker.add(picker);
	viewpicker.add(set);
	$.window2.add(viewpicker);
	var temp;
	picker.addEventListener('change', function(e) {
		temp = e.row.title;
		Ti.API.info(JSON.stringify(e.row.title));
		var date = picker.value;

	});

	set.addEventListener('click', function(e) {
		$.country.setText(temp);
		$.window2.remove(viewpicker);
		$.state.setText("State");
		$.city.setText("City");
		// popstate();
	});
}

//state populate
function popstate() {
	if($.country.text == "Country")
	{alert("Select Country First");}
	else{
	var pickerstate = Ti.UI.createPicker({
		top : 5,
		selectionIndicator : true,
	});

	var data = [];
	//alert($.country.text);
	Ti.API.info($.country.text);

	if ($.country.text == "india") {
		data[0] = Ti.UI.createPickerRow({
			title : 'State'
		});
		data[1] = Ti.UI.createPickerRow({
			title : 'Maharashtra'
		});
		data[2] = Ti.UI.createPickerRow({
			title : 'Gujarat'
		});
		data[3] = Ti.UI.createPickerRow({
			title : 'Jammu'
		});
	}

	if ($.country.text == "africa") {
		data[0] = Ti.UI.createPickerRow({
			title : 'State'
		});
		data[1] = Ti.UI.createPickerRow({
			title : 'Egypt'
		});
		data[2] = Ti.UI.createPickerRow({
			title : 'Ethiopia'
		});
		data[3] = Ti.UI.createPickerRow({
			title : 'Angola'
		});
	}

	if ($.country.text == "usa") {
		data[0] = Ti.UI.createPickerRow({
			title : 'State'
		});
		data[1] = Ti.UI.createPickerRow({
			title : 'Seattle'
		});
		data[2] = Ti.UI.createPickerRow({
			title : 'Columbia'
		});
		data[3] = Ti.UI.createPickerRow({
			title : 'Austin'
		});
	}
	var set = Ti.UI.createButton({
		title : 'Set',
		top : 230,
		backgroundColor : "#283747",
		color : "#2980B9",
		borderRadius : 10
	});

	viewpicker.removeAllChildren();
	pickerstate.add(data);
	viewpicker.add(pickerstate);
	viewpicker.add(set);
	$.window2.add(viewpicker);
	
	var temp;
	pickerstate.addEventListener('change', function(e) {
		temp = e.row.title;
		// alert(e.row.title);
		Ti.API.info(JSON.stringify(e.row.title));
		var date = picker.value;

	});

	set.addEventListener('click', function(e) {
		$.state.setText(temp);
		$.city.setText("City");
		$.window2.remove(viewpicker);
	});
	}
}

//CITY POPULATED
function popcity() {
		if($.state.text == "State")
	{alert("Select State First");}
	else{
	var pickercity = Ti.UI.createPicker({
		top : 5,
		selectionIndicator : true,
	});
	var data = [];
	if ($.state.text == "Maharashtra") {
		data[0] = Ti.UI.createPickerRow({
			title : 'City'
		});
		data[1] = Ti.UI.createPickerRow({
			title : 'Mumbai'
		});
		data[2] = Ti.UI.createPickerRow({
			title : 'kolapur'
		});
		data[3] = Ti.UI.createPickerRow({
			title : 'Nagpur'
		});
		data[4] = Ti.UI.createPickerRow({
			title : 'Aurangabad'
		});
	}

	if ($.state.text == "Gujarat") {
		data[0] = Ti.UI.createPickerRow({
			title : 'City'
		});
		data[1] = Ti.UI.createPickerRow({
			title : 'Surat'
		});
		data[2] = Ti.UI.createPickerRow({
			title : 'Jamnagar'
		});
		data[3] = Ti.UI.createPickerRow({
			title : 'Ahmedabad'
		});
	}

	if ($.state.text == "Jammu") {
		data[0] = Ti.UI.createPickerRow({
			title : 'City'
		});
		data[1] = Ti.UI.createPickerRow({
			title : 'Srinagar'
		});
		data[2] = Ti.UI.createPickerRow({
			title : 'Anantnag'
		});
		data[3] = Ti.UI.createPickerRow({
			title : 'Kupwara'
		});
	}

	if ($.state.text == "Egypt") {
		data[0] = Ti.UI.createPickerRow({
			title : 'City'
		});
		data[1] = Ti.UI.createPickerRow({
			title : 'Juhayna'
		});
		data[2] = Ti.UI.createPickerRow({
			title : 'Girga'
		});
		data[3] = Ti.UI.createPickerRow({
			title : 'El Dabaa'
		});
	}

	if ($.state.text == "Ethiopia") {
		data[0] = Ti.UI.createPickerRow({
			title : 'City'
		});
		data[1] = Ti.UI.createPickerRow({
			title : 'Aykel'
		});
		data[2] = Ti.UI.createPickerRow({
			title : 'Dabat'
		});
		data[3] = Ti.UI.createPickerRow({
			title : 'Dolo Odo'
		});
	}

	if ($.state.text == "Angola") {
		data[0] = Ti.UI.createPickerRow({
			title : 'City'
		});
		data[1] = Ti.UI.createPickerRow({
			title : 'Luanda'
		});
		data[2] = Ti.UI.createPickerRow({
			title : 'Lobito'
		});
		data[3] = Ti.UI.createPickerRow({
			title : 'Huambo'
		});
	}
	var set = Ti.UI.createButton({
		title : 'Set',
		top : 230,
		backgroundColor : "#283747",
		color : "#2980B9",
		borderRadius : 10
	});

	viewpicker.removeAllChildren();
	pickercity.add(data);
	viewpicker.add(pickercity);
	viewpicker.add(set);
	$.window2.add(viewpicker);
	var temp;

	pickercity.addEventListener('change', function(e) {
		temp = e.row.title;
		Ti.API.info(JSON.stringify(e.row.title));
	});

	set.addEventListener('click', function(e) {
		$.city.setText(temp);
		$.window2.remove(viewpicker);
	});
	}
}

//TERMS AND CONDITIOIN SELECT
function termselect(e) {
	if ($.terms.text == "\uf096") {
		$.terms.text = "\uf14a";
	} else {
		$.terms.text = "\uf096";
	}
	
}

//###############VALIDATIONS OF FORMS#####################

function validate() {
	var flag = [];
	var i = 0;
	//alert("hi");
	$.first.backgroundColor = "none";
	$.second.backgroundColor = "none";
	$.third.backgroundColor = "none";
	$.fourth.backgroundColor = "none";
	$.fifth.backgroundColor = "none";
	$.sixth.backgroundColor = "none";
	$.seventh.backgroundColor = "none";
	$.eight.backgroundColor = "none";

	if ($.first_name.value == "") {
		flag[i] = 1;
		Ti.API.info("first");
		$.first_name.focus();
		$.first.backgroundColor= "orange";		
		alert("First name required");
	} else if ($.last_name.value == "") {
		Ti.API.info("Last");
		flag[i++] = 1;
		alert("Last name required");
		$.second.backgroundColor = "orange";
		$.last_name.focus();
	} else if (!($.password.value.match(/^\w{8,12}$/))) {
		flag[i++] = 1;
		alert("Enter 8-12 digit password");
		$.third.backgroundColor = "orange";
		$.password.focus();
	} else if (!($.re_password.value == $.password.value)) {
		flag[i++] = 1;
		alert("Confirm password not matched");
		$.fourth.backgroundColor = "orange";
		$.re_password.focus();
	} else if (!($.email.value.match(/\w*\.?\w+@[a-zA-Z]+\.[a-z]{2,4}/))) {
		flag[i++] = 1;
		alert("Enter valid email");
		$.fifth.backgroundColor = "orange";
		$.email.focus();
	} else if (!($.phone_number.value.match(/^\d{10}$/))) {
		flag[i++] = 1;
		alert("10 digit phone number required");
		$.sixth.backgroundColor = "orange";
		$.phone_number.focus();
		Ti.API.info("phone");
	} else if (!($.male.text == "\uf111" || $.female.text == "\uf111")) {
		flag[i++] = 1;
		alert("Select gender");
		$.seventh.backgroundColor = "orange";
		//$.seventh.focus();
	}  else if (!($.terms.text == "\uf14a")) {
		flag[i++] = 1;
		alert("Select terms and condition");
		//$.eight.backgroundColor = "orange";
		//$.terms.focus();
	} else if (flag.length == 0) {
		
		var formdata={
			first_name:$.first_name.value,
			last_name:$.last_name.value,
			email:$.email.value,
			password:$.password.value,
			confirm_password:$.re_password.value,
			gender:"M",
			phone_no:$.phone_number.value,
		};
		Ti.API.log(formdata);
		
	function sucesss(data_recieved){
			 Ti.API.info(data_recieved.message);
			  alert(data_recieved.message);
			  Ti.API.info(data_recieved.user_msg);
			  alert("sucess");
	}
		// var xhr = Ti.Network.createHTTPClient({
			// onload:function(e) {
				 // Ti.API.info(e.message);
			  // alert(e.message);
			  // Ti.API.info(e.user_msg);
			  // alert("sucess");
			// },
	function failure(data_recieved){
		Ti.API.info(data_recieved.message);
			  alert(data_recieved.message);
			  Ti.API.info(data_recieved.user_msg);
			  alert("error");
	}		
			// onerror:function(e){
		 // Ti.API.info(JSON.parse(this.responseText));
		// var err=(JSON.parse(this.responseText));
        // alert("fail");
        // alert(err.message);
			// }
			// });
		// xhr.open('POST',"http://staging.php-dev.in:8844/trainingapp/api/users/register");
	// xhr.send(formdata);
	// Ti.API.log("done");
	var option={
				method:"POST",
				send_url:"http://staging.php-dev.in:8844/trainingapp/api/users/register",
				data:formdata
				};
	Alloy.Globals.someGlobalFunction(option,sucesss,failure);
}
}
$.window2.open();
