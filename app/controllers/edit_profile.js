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
	height :Ti.UI.SIZE,
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
		Ti.API.log("imagecodeo64==="+image_pro);
		var formdata={
			first_name:$.first_name.value,
			last_name:$.last_name.value,
			email:$.email.value,
			dob:$.dob.text,
			profile_pic:image_pro.text,
			phone_no:$.phone_number.value,
		};
		Ti.API.log(JSON.stringify(formdata));
		
	function sucesss(){
		alert("updated");
		// try
		// {
			 // Ti.API.info(data_recieved);
			 // }
			 // catch(e){alert(e.message);}
			 // alert(data_recieved.message);
			  //Ti.API.info(data_recieved.user_msg);
			  
	}

	function failure(data_recieved){
		Ti.API.info(data_recieved.message);
			  alert(data_recieved.message);
			  Ti.API.info(data_recieved.user_msg);
			//  alert("error");
	}		

	var option_edit={
				method:"POST",
				send_url:"http://staging.php-dev.in:8844/trainingapp/api/users/update",
				access_token:access_token,
				data:formdata
				};
	specialforedit(option_edit,sucesss,failure);
}
//######################### camera event ########################################
var image_pro;


$.user_image.addEventListener('click', function() {
	
    var hasCameraPermissions = Ti.Media.hasCameraPermissions();
     Ti.API.info("haspermi"+hasCameraPermissions);
    if (hasCameraPermissions) {
    	Ti.Media.showCamera({
		mediaTypes:[Titanium.Media.MEDIA_TYPE_PHOTO],
		// allowEditing:true,
		saveToPhotoGallery:true,
				success:function(e){
				
					Ti.API.info("datahere"+JSON.stringify(e));

				Ti.API.info("inside datahere"+JSON.stringify(e));
				Ti.API.info("picher"+e.media.file.nativePath);
				//$.user_image.image=e.media.file.nativePath;
				image_pro=Ti.Utils.base64encode(e.media.file.nativePath.toString());
				
				Ti.API.info("encodeimage="+image_pro);
				$.user_image.setImage( e.media.file.nativePath);
		},
		error:function(e){
			alert("There was Some Error");
		},
		cancel:function(e){
			alert("camera cancelled");
		},

	});
    }
	
});
		// success:function(e){
			// if(e.mediaTypes === Titanium.Media.MEDIA_TYPE_PHOTO){
				// // $.user_image.image=e.media;
			// }
		// },
		// error:function(e){
			// alert("There was Some Error");
		// },
		// cancel:function(e){
			// alert("camera cancelled");
		// },
		// allowEditing:true,
		// saveToPhotoGallery:true,
		// mediaTypes:Titanium.Media.MEDIA_TYPE_PHOTO,
	// });
// });

function specialforedit(options, sucesscall,failurecall) {
	Ti.API.info("in specila function");
	var xhr;
	xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			Ti.API.info(JSON.stringify(this.responseText));
			sucesscall();
				},
				
		onerror:function(e){
			Ti.API.info(JSON.stringify(e));
			failurecall(JSON.parse(this.responseText));
		},
	});
	xhr.open(options.method,options.send_url);
	if (options.access_token) {
		//Ti.API.info("header present");
		xhr.setRequestHeader('access_token',options.access_token);
	};
	Ti.API.info("here"+JSON.stringify(options.send_url));
	xhr.send(options.data);
};

$.edit_profile_window.open;