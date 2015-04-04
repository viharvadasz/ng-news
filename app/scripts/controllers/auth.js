'use strict';

app.controller('AuthCtrl', function ($scope, $location, Auth, user) {
  if (Auth.signedIn()) {
    $location.path('/');
  }

 	$scope.login = function () {
 		Auth.login($scope.user).then(function () {
 			$location.path('/');
 		}, function (error) {
	      $scope.error = error.toString();
	    });
 	};

	$scope.register = function () {
		Auth.register($scope.user).then(function() {
			return Auth.login($scope.user).then(function() {
				$location.path('/');
			}, function(error) {
		      $scope.error = error.toString();
		    });
		}, function(error) {
	      $scope.error = error.toString();
	    });
	};
 	$scope.signedIn = Auth.signedIn;
	$scope.logout = Auth.logout;
});