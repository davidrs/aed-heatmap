
var baseLayer = L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'examples.map-i86knfo3'
});

var heatLayer = L.heatLayer([], {radius: 40});

var map = L.map('aed-heatmap', {
	layers: [baseLayer, heatLayer]
}).setView([38.902631, -77.036570], 13);

var app = {
	heatmapPoints: [],

	init: function(){
		var self = this;
		app.getLocation();

	},

	_updateHeatMap: function(data){
			var latlngs = this.formatData(data);
			heatLayer.setLatLngs(latlngs);
	},

  getLocation: function () {
  	var options = {
		  enableHighAccuracy: true,
		  timeout: 5000,
		  maximumAge: 0
		};
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(app.success, app.error, options);
    } else {
          alert("Your browser doesn't support geolocation.") // because alerts are annoying
    }

  },

  error: function (positionError) {
  	console.log('error', positionError);

		// fallback to D.C position.
		var userPosition = {lat: 38.902631, lng:-77.036570};
		this.getData(userPosition).then(function(data){
			app._updateHeatMap(data);
		});
  },

  success: function(position) {
  	console.log(position);
    var userPosition = { lat: position.coords.latitude, lng:  position.coords.longitude };
    map.setView([position.coords.latitude, position.coords.longitude],12);
    app.getData(userPosition).then(function(data) {
        console.log('data', data);
        app._updateHeatMap(data);
    });
  },

	// userPosition can either be an obj with lat lng, or an obj with 
	// bounds as minLat, maxLat, etc... 
	getData: function(userPosition){
		var params = userPosition;
		params.format = 'json';
		
		return $.ajax('http://heartsparkapp.org/server/getaeds.php',{
			data: params
		});
	},

	formatData: function(aedArray){
		this.heatmapPoints = [];
		for(var  i =0; i< aedArray.length; i++){

			// If we want we could create Leaflet 
			// new L.LatLng(aedArray[i].lat, aedArray[i].lng);
			var aed = aedArray[i];
			var point = [parseFloat(aed.lat), parseFloat(aed.lng)]; 
			this.heatmapPoints.push(point);
		}
		return this.heatmapPoints;
	},
	
	setRadius: function(radius) {
		heatLayer.setOptions({radius: radius});
	},
};

app.init();
