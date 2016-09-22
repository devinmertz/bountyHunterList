var app = angular.module("MainApp");
app.service("MainService", function ($http) {

	this.getter = function () {
		return $http.get("http://localhost:3000/bounty")
			.then(function (response) {
				this.bountyObj = response.data;
				return bountyObj;
			})
	};

	this.poster = function (bountyName) {
		console.log("hi");
		return $http.post("http://localhost:3000/bounty/" + bountyName)
			.then(function (response) {
				var newBounty = response.data;
				console.log(newBounty);
				return newBounty;
			});
	};

	this.pusher = function (name) {
		return $http.post("http://localhost:3000/capturedList/" + name)
			.then(function (response) {
				var capturedBounty = response.data;
				return capturedBounty;
				console.log("service", capturedBounty)
			})
	}

	this.deleter = function (name) {
		return $http.delete("http://localhost:3000/capturedList/" + name)
			.then(function (response) {
				var deletedCapture = response.data;
				console.log(response);
				return deletedCapture;

			})
	};

});



//DO I NEED TO BE USING VARIABLES I CREATED IN THE SERVER?