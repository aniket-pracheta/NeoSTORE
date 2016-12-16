// Arguments passed into this controller can be accessed via the `$.args` object directly or:
// ############################STORE LOCATOR ##################################
var args = $.args;
var Map = require('ti.map');

$.store_location_header.page_name.text ="Store Locator";
$.store_location_header.BACK.addEventListener('click', function(e) {

	Titanium.API.info("You clicked the button");
	$.store_location_window.close();
});

var mountainView = Map.createAnnotation({	
    latitude:37.390749,
    longitude:-122.081651,
    title:"Appcelerator Headquarters",
    subtitle:'Mountain View, CA',
    pincolor:Map.ANNOTATION_RED,
    myid:1 // Custom property to uniquely identify this annotation.
});

var station = Map.createAnnotation({	
    latitude:19.018044,
    longitude:72.843617,
    latitudeDelta:0.01,
     longitudeDelta:0.01,
    title:"Dadar station",
    subtitle:'Dadar station,mumbai',
    pincolor:Map.ANNOTATION_RED,
    myid:4 // Custom property to uniquely identify this annotation.
});
var pallavi = Map.createAnnotation({	
    latitude:19.018569,
    longitude:72.827715,
    latitudeDelta:0.01,
     longitudeDelta:0.01,
    title:"AGAR BAZAR",
    subtitle:'AGAR BAZAR,mumbai',
    pincolor:Map.ANNOTATION_RED,
    myid:2 // Custom property to uniquely identify this annotation.
});

var HARIDAS = Map.createAnnotation({	
    latitude:19.047555,
    longitude:72.838025,
    latitudeDelta:0.01,
     longitudeDelta:0.01,
    title:"HARIDAS",
    subtitle:'HARIDAS,Bandra',
    pincolor:Map.ANNOTATION_RED,
    myid:2 // Custom property to uniquely identify this annotation.
});
var ruby = Map.createAnnotation({	
    latitude:19.024168,
    longitude:72.844988,
    latitudeDelta:0.01,
     longitudeDelta:0.01,
    title:"RUBY TOWERS",
    subtitle:'RUBY TOWERS,DADAR',
    pincolor:Map.ANNOTATION_RED,
    myid:3 // Custom property to uniquely identify this annotation.
});

var parel = Map.createAnnotation({	
    latitude:19.000046,
    longitude:72.830043,
    latitudeDelta:0.01,
     longitudeDelta:0.01,
    title:"LOWER PAREL",
    subtitle:'CAFE,PAREL',
    pincolor:Map.ANNOTATION_RED,
    myid:10 // Custom property to uniquely identify this annotation.
});
var mapview = Map.createView({
	
    mapType: Map.NORMAL_TYPE,
    region: {latitude:19.017701, longitude:72.843379,
            latitudeDelta:0.08, longitudeDelta:0.08},
    animate:true,
    regionFit:true,
    userLocation:true,
   });
var anno=[station,ruby,pallavi,HARIDAS,parel];
//mapview.annotations=[station];
mapview.annotations=anno;
$.map.add(mapview);
$.store_location_window.add($.map);
// Handle click events on any annotations on this map.
//mapview.addEventListener('click', function(evt) {
 //   Ti.API.info("Clicked " + evt.clicksource + " on " + evt.latitude + "," + evt.longitude);
///});
function ruby(){
	//alert("ruby");
	mapview.region = {latitude:19.024168,longitude:72.844988,
            latitudeDelta:0.01, longitudeDelta:0.01};
}
function station(){
	//alert("ruby");
	mapview.region = {latitude:19.018044,longitude:72.843617,
            latitudeDelta:0.01, longitudeDelta:0.01};
}
function agar(){
	//alert("ruby");
	mapview.region = {latitude:19.018569,longitude:72.827715,
            latitudeDelta:0.01, longitudeDelta:0.01};
}
function parel(){
	//alert("ruby");
	mapview.region = {latitude:19.000046,longitude:72.830043,
            latitudeDelta:0.01, longitudeDelta:0.01};
}
$.store_location_window.open();