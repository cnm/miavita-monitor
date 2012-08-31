
/*		Data
*
*	    Duarte Barbosa
*	duarte.barbosa@ist.utl.pt
*/

var rawdata = null;
var node = new Array(13);

function info() {
	$.get("http://smart-ip.net/geoip-json", function(data){
	    			rawdata = jQuery.parseJSON(data);
				alert(rawdata);
	  		});
}

function readData() {
	$.get("miavita.json", function(data){
	    			rawdata = jQuery.parseJSON(data);
				fillContents();
				retrieveDates();
	  		});
}

function fillContents() {
	var size = Object.size(rawdata);

	for(var i = 0; i < 13; i++)
		node[i] = new Array();
				
	for(var k in rawdata) {
		var index = rawdata[k].node_id;
		var packet = rawdata[k].sequence;

		node[index][packet] = new Array(9);

		node[index][packet][1] = rawdata[k].timestamp;
		node[index][packet][2] = rawdata[k].air_time;
		node[index][packet][3] = rawdata[k].sequence;
		node[index][packet][4] = rawdata[k].fails;
		node[index][packet][5] = rawdata[k].retries;
		node[index][packet][6] = rawdata[k].sample_1 * 0.0003; //0.000298023
		node[index][packet][7] = rawdata[k].sample_2 * 0.0003;
		node[index][packet][8] = rawdata[k].sample_3 * 0.0003;
		node[index][packet][9] = rawdata[k].sample_4;
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


