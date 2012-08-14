
/*

#########################################
#					#
#		Utils			#
#					#
#########################################

*/

Object.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

Array.prototype.max = function() {
  return Math.max.apply(null, this)
}

Array.prototype.min = function() {
  return Math.min.apply(null, this)
}

function loadjs(filename){
	//if filename is a external JavaScript file
	var fileref = document.createElement('script')
	fileref.setAttribute("src", filename)

		document.getElementsByTagName("head")[0].appendChild(fileref)
}

function loadcss(filename){
	//if filename is an external CSS file
	var fileref = document.createElement("link")
	fileref.setAttribute("rel", "stylesheet")
	fileref.setAttribute("href", filename)

	if (typeof fileref != "undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref)
}

function init(){
	startSpinner();
	visualTweaker();
	readData();
	$('#welcome').removeAttr('style');
//	$('#mainwrap').outerHeight($(window).outerHeight() - $('#header').outerHeight() - $('#footer').outerHeight());
//	stopSpinner();
}

