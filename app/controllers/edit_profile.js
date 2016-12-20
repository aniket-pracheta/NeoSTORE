// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.edit_profile_header.page_name.text = "Edit Profile";
$.edit_profile_header.BACK.addEventListener('click', function(e) {
	Titanium.API.info("You clicked the button");
	$.edit_profile_window.close();
});

var viewpicker = Titanium.UI.createView({
	borderRadius : 10,
	backgroundColor : '#283747',
	width : "80%",
	height :"80%",
});

var picker = Ti.UI.createPicker({
	type : Ti.UI.PICKER_TYPE_DATE,
	dateTimeColor : "black",
	//useSpinner for Android Only
	//useSpinner : true,
	minDate : new Date(1880, 0, 1),
	maxDate : new Date(2030, 11, 31),
	value : new Date(2014, 3, 12),
	top : 0,
});

var set = Ti.UI.createButton({
		title : 'Set',
		top : "90%",
		backgroundColor : "#283747",
		color : "#2980B9",
		borderRadius : 10
	});

//date-picker
$.fourth.addEventListener('click', function() {
	//alert("picker");
	viewpicker.removeAllChildren();
	viewpicker.add(picker);
	viewpicker.add(set);
	$.edit_profile_window.add(viewpicker);

	
});
set.addEventListener('click', function(e) {
		var date = picker.value;
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		var newdate = day + "-" + month + "-" + year;
		//alert(newdate);
		$.dob.setText(newdate);
		//$.dob.value=newdate; 
		$.dob.hintText=newdate;
		$.edit_profile_window.remove(viewpicker);
	});
	
var access_token=Alloy.Globals.user_data_fetch.data.access_token;
function submit(){
		Ti.API.log(videoURL);
		var formdata={
			first_name:$.first_name.value,
			last_name:$.last_name.value,
			email:$.email.value,
			dob:$.dob.text,
			profile_pic:"noimage",
			phone_no:$.phone_number.value,
		};
		Ti.API.log(formdata);
		
	function sucesss(data_recieved){
		try
		{
			 Ti.API.info(data_recieved);
			 }
			 catch(e){alert(e.message);}
			 // alert(data_recieved.message);
			  //Ti.API.info(data_recieved.user_msg);
			  
	}

	function failure(data_recieved){
		Ti.API.info(data_recieved.message);
			  alert(data_recieved.message);
			  Ti.API.info(data_recieved.user_msg);
			  alert("error");
	}		

	var option_edit={
				method:"POST",
				send_url:"http://staging.php-dev.in:8844/trainingapp/api/users/update",
				access_token:access_token,
				data:formdata
				};
	Alloy.Globals.someGlobalFunction(option_edit,sucesss,failure);
}
//######################### camera event ########################################
var videoURL = null;
$.user_image.addEventListener('click', function() {
    // Start an activity with an intent to capture video
    // http://developer.android.com/reference/android/provider/MediaStore.html#ACTION_VIDEO_CAPTURE
    var intent = Titanium.Android.createIntent({ action: 'android.media.action.IMAGE_CAPTURE' });
    $.edit_profile_window.activity.startActivityForResult(intent, function(e) {
        if (e.resultCode == Ti.Android.RESULT_OK) {
            if (e.intent.data != null) {
                // If everything went OK, save a reference to the video URI
                videoURL = e.intent.data;
               // playButton.visible = true;
    	    }
            else {
                Ti.API.error('Could not retrieve media URL!');
            }
        }
        else if (e.resultCode == Ti.Android.RESULT_CANCELED) {
            Ti.API.trace('User cancelled video capture session.');
        }
        else {
            Ti.API.error('Could not record video!');
        }
    });
});