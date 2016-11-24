// Arguments passed into this controller can be accessed via the `$.args` object directly or:

//#################### login controller ###############################

var args = $.args;

function register () {
	var win=Alloy.createController('register_page').getView();
	win.open();
  
}
