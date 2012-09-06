
/*		Maps
*
*	    Duarte Barbosa
*	duarte.barbosa@ist.utl.pt
*/

var googleInit = false;
var googleMarker = new Array(13);
var map, infoWindow;

var onMarkerClick = function() {
				var marker = this;
				var latLng = marker.getPosition();

				infoWindow.setContent('<h3>Marker position is:</h3>' + latLng.lat() + ', ' + latLng.lng()+'<br>');
				infoWindow.open(map, marker);
};

function addMarker(node, lat, lng){
	googleMarker[node] = new google.maps.Marker({
					      map: map,
					      position: new google.maps.LatLng(lat,lng)
	});
	google.maps.event.addListener(googleMarker[node], 'click', onMarkerClick);
}

function removeMarker(node) {
	googleMarker[node].setMap(null);
}

function googleInitialize() {
  	if(googleInit == false){
		googleInit = true;

		var latlng = new google.maps.LatLng(gpsLat[1],gpsLng[1]); //center of the map - node 1
		var myOptions = {
				      zoom: 18,
				      center: latlng,
				      mapTypeId: google.maps.MapTypeId.HYBRID
		};
		
		map = new google.maps.Map(document.getElementById("googleMaps"), myOptions);
		infoWindow = new google.maps.InfoWindow;

		google.maps.event.addListener(map, 'click', function() {
							      infoWindow.close();
		});

		//addMarker(1, 38.736691,-9.302105); //tagus
		//addMarker(2, 38.736642,-9.138671);
	}
	
	for(var i = 1; i <= 13; i++){
		if(gpsLat[i] != 'N/A')
			addMarker(i, gpsLat[i], gpsLng[i]);
		else
			removeMarker(i);
	}
}

