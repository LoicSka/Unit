app.controller('ArticleDetailController', ['$scope', 'articleData', '$routeParams', function($scope, articleData, $routeParams){
	$scope.recommendations = articleData.getAllArticles();
	articleData.getArticle($routeParams.slug).then(
		function (article) {
			$scope.article = article;
		},
		function (response) {
			console.log (response);
		}
	);
}]);
