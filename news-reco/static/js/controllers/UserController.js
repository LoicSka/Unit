app.controller('UserController', ['$scope','$location', '$http', '$cookies', 'userData', function($scope, $location, $http, $cookies, userData){
	angular.extend($scope, {
		Login: function(loginForm){
			var data = {
					username: $scope.login.username,
					password: $scope.login.password
				};	
			userData.login(data).then(function(user){
				$cookies.put('auth', user);
				var currentUser = $cookies.get('auth');
				$location.path('/');
			});
		},

		Logout: function () {
			userData.logout();
			$location.path('/');
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