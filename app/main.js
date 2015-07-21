require([
		'knockout',
		'async!http://maps.google.com/maps/api/js',
		'./data/zones'
	], function module(ko, GoogleMaps, zones) {
		var map = new google.maps.Map(document.getElementById("zones-location-map"), {
			center:new google.maps.LatLng(51.508742,-0.120850),
			zoom: 8,
			mapTypeId:google.maps.MapTypeId.ROADMAP
		});

		var geo = new google.maps.Geocoder();

		var ui = {
			zones: zones,
			selectedZone: ko.observable(),


			selectZone: function selectZone() {
				var zone = this;

				ui.selectedZone(zone);

				geo.geocode({
						address: zone.name
					}, function response(result, status) {
						if (status !== google.maps.GeocoderStatus.OK)
							return alert('No address found');

						console.log(result);
					}
				);
			}
		};

		ko.applyBindings(ui);
	}
);