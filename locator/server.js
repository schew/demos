if (Meteor.isServer) {
	Meteor.startup(function() {
		if (Locations.find().count() === 0) {
			var locations = [
				{'place': 'Home'},
				{'place': 'Back in 5'},
				{'place': 'Trying to figure out where the gym is'},
				{'place': 'Library'},
				{'place': 'Malone'}
			];

			for (var i = 0; i < locations.length; i++) {
				Locations.insert(locations[i]);
			}
		}

		if (Comments.find().count() === 0) {
			var comments = [
				{'message': 'dummy'}
			];

			Comments.insert(comments[0]);
		}
	});
}