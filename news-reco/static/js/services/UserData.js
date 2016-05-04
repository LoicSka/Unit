app.factory('userData', function($resource, $q, $cookies){
	return {
		login: function(data) {
			var resource = $resource('http://127.0.0.1:8000/api/users/login');
			var deferred = $q.defer();
			resource.save({}, {username: data.username, password: data.password},
				function(user) {
					deferred.resolve(user);
				},
				function(response){
					deferred.reject(response);
				});
			return deferred.promise;
		},

		logout: function () {
			$cookies.remove('auth');
		}, 

		register: function(data) {
					var resource = $resource('http://127.0.0.1:8000/api/users/register');
					var deferred = $q.defer();
					resource.save({}, {username: data.username, email: data.email, password: data.password},
						function(user) {
							deferred.resolve(user);
						},
						function(response){
							deferred.reject(response);
						});
					return deferred.promise;
		},
	
		getAuthStatus: function() {
			var status = $cookies.get('auth');
			if (status) {
				return true;
			} else {
				return false;
			}
		}
	};
});