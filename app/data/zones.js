define([
		'../../data/level-1-zones',
		'../../data/level-2-zones',
		'../../data/level-3-zones'
	], function module(zones1, zones2, zones3) {
		var zones = [];

		function findZoneChildren(zones, id) {
			var children = [];

			for(var i in zones) {
				if (zones[i][2] === id)
					children.push(zones[i]);
			}

			return children;
		}

		for(var i in zones1) {
			zones.push({
				name: zones1[i][1],
				level: 1
			});

			var filteredZones2 = findZoneChildren(zones2, zones1[i][0]);

			for(var ii in filteredZones2) {
				zones.push({
					name: filteredZones2[ii][1] + ', ' + zones1[i][1],
					level: 2
				});

				var filteredZones3 = findZoneChildren(zones3, filteredZones2[ii][0]);

				for(var iii in filteredZones3) {
					zones.push({
						name: filteredZones3[iii][1] + ', ' + filteredZones2[ii][1] + ', ' + zones1[i][1],
						level: 3
					});
				}
			}
		}

		return zones;
	}
);