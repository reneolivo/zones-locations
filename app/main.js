require([
		'knockout',
		'./data/zones'
	], function module(ko, zones) {
		var ui = {
			zones: zones
		};

		ko.applyBindings(ui);
	}
);