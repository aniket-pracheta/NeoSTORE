// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function products (argument) {
	var win=Alloy.createController('product_page').getView();
	win.open();
}