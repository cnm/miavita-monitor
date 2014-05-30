
/*		Data
*
*	    Duarte Barbosa
*	duarte.barbosa@ist.utl.pt
*/

var node = new Array(13);

function info() {
	$.get("http://smart-ip.net/geoip-json", function(data){
	    			rawdata = jQuery.parseJSON(data);
				alert(rawdata);
	  		});
}

function readData(id) {
	var node = 'node' + id + '.json';
	$.get(node, function(data){
	    			fillContents(jQuery.parseJSON(data));
				//retrieveDates();
	  		});
}

function readAllData() {
	$.get("miavita.json", function(data){
	    			for(var i = 0; i < 13; i++)
					node[i] = new Array();

	    			fillContents(jQuery.parseJSON(data));
				//retrieveDates();
	  		});
}

function setup() {
	for(var i = 0; i < 13; i++)
		node[i] = new Array();

	readData(1);
	readData(2);
	readData(3);
}

var battery = new Array(13);

function batteryWriter(){

	var txt = '';
		
	for(var i = 1; i <= 13; i++){
		txt += 'Node ' + i + ': ' + battery[i] + '%<br>';
	}

//	$("#nodeStatus").text(txt);
	document.getElementById('nodeBattery').innerHTML = txt;
}

var gpsLat = new Array(13);
var gpsLng = new Array(13);

function gpsWriter(){

	var txt = '';
		
	for(var i = 1; i <= 13; i++){
		txt += 'Node ' + i + ': ' + gpsLat[i] + ',' + gpsLng[i] + '<br>';
	}

//	$("#nodeStatus").text(txt);
	document.getElementById('nodeGPS').innerHTML = txt;
}

var status = new Array(13);

function statusWriter(){

	var txt = '';
		
	for(var i = 1; i <= 13; i++){
		txt += 'Node ' + i + ': ' + status[i] + '<br>';
	}

//	$("#nodeStatus").text(txt);
	document.getElementById('nodeStatus').innerHTML = txt;
}


function fillContents(rawdata) {

	for(var i = 1; i <= 13; i++){
		gpsLat[i] = 'N/A';
		gpsLng[i] = 'N/A';
		status[i] = 'N/A';
		battery[i] = 'N/A';
	}

	for(var k in rawdata) {
		var index = rawdata[k].node_id;
		var packet = rawdata[k].sequence;

		status[index] = 'OK';

		node[index][packet] = new Array(9);

		node[index][packet][1] = rawdata[k].timestamp;
		node[index][packet][2] = rawdata[k].air_time;
		node[index][packet][3] = rawdata[k].sequence;
		node[index][packet][4] = rawdata[k].fails;
		node[index][packet][5] = rawdata[k].retries;
		node[index][packet][6] = rawdata[k].sample_1 * 0.0003; //0.000298023
		node[index][packet][7] = rawdata[k].sample_2 * 0.0003;
		node[index][packet][8] = rawdata[k].sample_3 * 0.0003;
		node[index][packet][9] = rawdata[k].sample_4 * 0.000011//0.000010582;
		
		if(!(packet % 1000))
			gpsLat[index] = rawdata[k].sample_4;
		else if (!(packet % 1001))
			gpsLng[index] = rawdata[k].sample_4;
		else
			battery[index] = node[index][packet][9];
	}
}

var Parameter = {"timestamp" : 1, "air_time" : 2, "sequence" : 3, "fails" : 4, "retries" : 5, "sample1" : 6, "sample2" : 7, "sample3" : 8, "sample4" : 9}

function retrieveData(nodeID, parameter){
				
	var result = new Array();
								
	for(var k in node[nodeID])
		if(node[nodeID][k][parameter] != undefined)
			result.push(node[nodeID][k][parameter]);

	return result;
}


