app.controller('ArticleListController', ['$scope', 'articleData', '$routeParams', function($scope, articleData, $routeParams){
	
	if (typeof($routeParams.category) == "undefined") {
		var category = 'all';
	} else {
		var category = $routeParams.category;
	}

	articleData.getCategoryArticles(category).then(
		function (articles) {
			$scope.articles = articles;
			console.log (articles);
		},
		function (response) {
			console.log (response);
		}
	);
}]);