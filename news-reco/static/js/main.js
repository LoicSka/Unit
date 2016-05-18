/*================================================================
							Unshuffled
  ================================================================*/

app.run(['$rootScope', '$cookies', '$location', 'userData', function($rootScope, userData, $cookies, $location){
	$rootScope.triggerNav = function() {
		$('.left-side').toggleClass('show').toggleClass('hide');
	};
}]);
