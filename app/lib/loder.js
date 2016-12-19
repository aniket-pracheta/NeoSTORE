// making of loder

var loaderview=null;


exports.addloder=function(parentview){

	if(loaderview===null){

		var activeind=Ti.UI.createActivityIndicator({
			height:"auto",
			width:"auto",
			message:"Loading Please Wait...",
			color:"black",
			style: Ti.UI.ActivityIndicatorStyle.DARK,
		});

		 loaderview=Ti.UI.createView({
			height:Ti.UI.FILL,
			width:Ti.UI.FILL,
			backgroundColor:"transparent",
		});

		var viewsmall=Ti.UI.createView({
			height:"70dp",
			width:Ti.UI.FILL,
			backgroundColor:"white"
		});

		activeind.show();
		viewsmall.add(activeind);
		loaderview.add(viewsmall);
		parentview.add(loaderview);


	}
};

exports.removeloder=function(parentview){
	if(loaderview!=undefined||loaderview!=null){
		Ti.API.info("removeing");
		Ti.API.info("removeing");
	 	//activeind.hide();
	parentview.remove(loaderview);
	}
};
