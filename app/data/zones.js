define([
		'../../data/level-1-zones',
		'../../data/level-2-zones',
		'../../data/level-3-zones'
	], function module(zones1, zones2, zones3) {
		var zones = [];

		zonesToList(1, '', zones, [zones1, zones2, zones3]);

		function zonesToList(level, append, zonesList, zonesArray) {
			var zones = zonesArray.shift();

			if (typeof zones === 'undefined')
				return

			for (var i in zones) {
				var name = zones[i][1] + append;

				zonesList.push({
					name: name,
					level: level
				});

				var nextZones = pluckOutZones(zonesArray[0], zones[i][0]);
				zonesArray[0] = nextZones[0];
				nextZones = nextZones[1];

				var nextArray = [nextZones].concat(zonesArray.slice(1));

				zonesToList(level + 1, ', ' + name, zonesList, nextArray);
			}
		}

		function pluckOutZones(zones, id) {
			var pluckedOut = [];
			var keptIn = [];

			for(var i in zones) {
				if (zones[i][2] === id)
					pluckedOut.push(zones[i]);
				else
					keptIn.push(zones[i]);
			}

			return [keptIn, pluckedOut];
		}

		return zones;
	}
);