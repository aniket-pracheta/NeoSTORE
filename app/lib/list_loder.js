var viewsmall = null;

exports.addloder = function(parentview) {

	if (viewsmall === null) {

		var activeind = Ti.UI.createActivityIndicator({
			height : "auto",
			width : "auto",
			message : "List is loding....",
			color : "black",
			style : Ti.UI.ActivityIndicatorStyle.DARK,
		});

		 viewsmall = Ti.UI.createView({
			bottom:"0",
			height : "70dp",
			width : Ti.UI.FILL,
			backgroundColor : "white"
		});

		activeind.show();
		viewsmall.add(activeind);
		//loaderview.add(viewsmall);
		parentview.add(viewsmall);

	}
};

exports.removeloder = function() {
	if (viewsmall) {
		Ti.API.info("removeing");
		//activeind.hide();
		viewsmall.parent.remove(viewsmall);
		viewsmall = null;
	}
};