function doClick(e) {
    var w=Alloy.createController('login_page').getView();
    w.open();
}
 //var w=Alloy.createController('login_page').getView();
    // w.open();
    
//var w=Alloy.createController('home_screen').getView();
    // w.open();
   // var w=Alloy.createController('product_page').getView();
  // var w=Alloy.createController('product_detail_page').getView();
 //var w=Alloy.createController('my_cart').getView();
//var w=Alloy.createController('add_address').getView();
//var w=Alloy.createController('address_list').getView();
//var w=Alloy.createController('my_order').getView();
//var w=Alloy.createController('order_detail').getView();
   // w.open();    
//$.index.open();
var rows = db.execute('SELECT * FROM logindeatils');
Ti.API.info("happy"+rows.rowCount);

if(rows.rowCount>0){
	var add = rows.fieldByName('logobject');
	var send=JSON.parse(add);
	 Ti.API.info("happy1"+rows.rowCount);
	 Ti.API.info("happy2"+send);
	 var w=Alloy.createController('home_screen',send).getView();
	 w.open();
	   
          
}
 else{
	 var w=Alloy.createController('login_page').getView();
	 w.open(); 
}
