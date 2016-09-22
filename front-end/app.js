var app = angular.module("MainApp", []);

app.controller("MainController", ["$scope", "MainService", function ($scope, MainService) {


	$scope.newName = "";
	$scope.bountyList = [];
	$scope.captures = [];


	$scope.getter = function () {
		MainService.getter()
			.then(function (bountyObj) {
				$scope.bountyList = bountyObj.bounties;
				$scope.capturedList = bountyObj.capturedList;
			})
	};

	$scope.poster = function () {
		MainService.poster($scope.newName)
			.then(function (newBounty) {
				$scope.bountyList.push(newBounty);
				$scope.newName = "";
			})
	};

	$scope.pusher = function (name, index) {
		MainService.pusher(name)
			.then(function (capturedBounty) {
				$scope.capturedList.push(capturedBounty);
				$scope.bountyList.splice(index, 1);
				// remove the object from the bounties array
				// add the object to the captures array
			})
	};

	$scope.deleter = function (name, index) {
		MainService.deleter(name)
			.then(function (deleter) {
				if (deleter) {
					$scope.capturedList.splice(index, 1);
				}
			})
	};

	$scope.getter();
}]);

