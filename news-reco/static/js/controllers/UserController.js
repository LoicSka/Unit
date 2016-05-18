app.controller('UserController', ['$scope','$location', '$http', '$cookies', 'userData', function($scope, $location, $http, $cookies, userData){
	
	angular.extend($scope, {
		Login: function(loginForm){
			var data = {
					username: $scope.login.username,
					password: $scope.login.password
				};
			userData.login(data).then(
				function(user){
					$cookies.putObject('auth', user);
					$location.path('/');
					location.reload();
				},
				function(response) {
					if(response.status == 403) {
						console.log('four 0 three');
					}
				}
			);
		},

		Logout: function () {
			userData.logout();
			$location.path('/login');
		},

		Register: function(registerForm){
			var data = {
					username: $scope.register.username,
					email: $scope.register.email,
					password: $scope.register.password
				};
			userData.register(data).then(function(user){
				console.log(user);
			});
		},
	});

}]);
