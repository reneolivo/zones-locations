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

		var marker = null;

		var ui = {
			zones: zones,
			selectedZone: ko.observable({}),


			selectZone: function selectZone() {
				var zone = this;

				ui.selectedZone(zone);

				geo.geocode({
						address: zone.name
					}, function response(results, status) {
						if (status !== google.maps.GeocoderStatus.OK)
							return alert('Error: ' + status);

						if (results.length === 0)
							return alert('address not found.')

						if (marker !== null)
							marker.setMap(null);

						marker = new google.maps.Marker({
							map: map,
							draggable: false,
							animation: google.maps.Animation.DROP,
							position: new google.maps.LatLng(
								results[0].geometry.location.A,
								results[0].geometry.location.F
							)
						});

						map.setCenter(marker.getPosition());
						map.setZoom(14);
					}
				);
			}
		};

		ko.applyBindings(ui);
	}
);