/*================================================================
							Unshuffled
  ================================================================*/

app.run(['$rootScope', function($rootScope){
	$rootScope.triggerNav = function () {
		$('.left-side').toggleClass('show').toggleClass('hide');
	};
}]);