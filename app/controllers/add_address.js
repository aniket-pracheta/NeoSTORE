// Arguments passed into this controller can be accessed via the `$.args` object directly or:
//################################## ADD ADDRESS ###############################
//on click of button go to ADDRESS_list and add that  address so also pass argument
var args = $.args;

//var win=Alloy.createController('address_list').getView();
//win.open();

$.add_address_header.page_name.text ="Add Address";
$.add_address_header.BACK.addEventListener('click', function(e) {

	Titanium.API.info("You clicked the button");
	$.add_address.close();
});

function push(){
	var input_address=$.address.value+","+$.city.value+","+$.landmark.value+","+$.state.value+","+$.zipcode.value+","+$.country.value;
	db.execute('INSERT INTO ADDRESS (fulladdress) VALUES (?)',input_address);
	Ti.API.info(input_address);
	var rows=db.execute('SELECT * FROM ADDRESS');
	while (rows.isValidRow()) {
 var id=rows.fieldByName('id');
 var add=rows.fieldByName('fulladdress');
  Ti.API.info(id + ' ' + add );
  rows.next();
 }
 Ti.API.info('Row count: ' + rows.rowCount);
 alert("Address List Updated");
 $.add_address.close();
 var w=Alloy.createController('address_list').getView();
 w.open();
 
}
// var rows=db.execute('SELECT * FROM ADDRESS');
// Ti.API.info('Row count: ' + rows.rowCount);
	// while (rows.isValidRow()) {
 // var id=rows.fieldByName('id');
 // var add=rows.fieldByName('fulladdress');
  // Ti.API.info(id + ' ' + add );
  // rows.next();
 // }
