Locations = new Mongo.Collection("locations");
Comments = new Mongo.Collection("comments");

if (Meteor.isClient) {
	angular.module('locator', ['angular-meteor', 'ui.router']);

	angular.module('locator').config(function($urlRouterProvider, $stateProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		$stateProvider
			.state('locations', {
				url: '/',
				template: '<location-list></location-list><comment-list></comment-list>'
			})
			.state('update', {
				url: '/update',
				template: '<edit-location></edit-location>'
			});

		$urlRouterProvider.otherwise("/");
	})

	angular.module('locator').directive('locationList', function() {
		return {
			restrict: 'E',
			templateUrl: 'location-list.html',
			controllerAs: 'locationList',
			controller: function($scope, $reactive) {
				$reactive(this).attach($scope);

				this.helpers({
					locations: () => {
						return Locations.find({});
					}
				});

				this.removeLocation = (location) => {
					Locations.remove({_id: location._id});
				}
			}
		}
	});

	angular.module('locator').directive('editLocation', function() {
		return {
			restrict: 'E',
			templateUrl: 'edit-location.html',
			controllerAs: 'editLocation',
			controller: function($scope, $reactive) {
				$reactive(this).attach($scope);

				this.newLocation = {};

				this.helpers({
					locations: () => {
						return Locations.find({});
					},
					comments: () => {
						return Comments.find({});
					}
				});

				this.removeLocation = (location) => {
					Locations.remove({_id: location._id});
				};

				this.addLocation = () => {
						Locations.insert(this.newLocation);
						this.newLocation = {};
				};

				this.removeComment = (comment) => {
					Comments.remove({_id: comment._id});
				};
			}
		}
	});

	angular.module('locator').directive('commentList', function() {
		return {
			restrict: 'E',
			templateUrl: 'comment-list.html',
			controllerAs: 'commentList',
			controller: function($scope, $reactive) {
				var counter = 1;

				$reactive(this).attach($scope);

				this.newComment = {};
				if (counter % 3 === 1) {
					this.newComment.color = "#DA0600";
				} else {
					if (counter % 3 === 2) {
						this.newComment.color = "#2EACB2";
					} else {
						this.newComment.color = "#85CB00";
					}
				}
				counter++;


				this.helpers({
					comments: () => {
						return Comments.find({});
					}
				});

				this.addComment = () => {
					Comments.insert(this.newComment);
					this.newComment = {};
					// Change color
					if (counter % 3 === 1) {
						this.newComment.color = "#DA0600";
					} else {
						if (counter % 3 === 2) {
							this.newComment.color = "#2EACB2";
						} else {
							this.newComment.color = "#85CB00";
						}
					}
					counter++;
				};
			}
		}
	});
}