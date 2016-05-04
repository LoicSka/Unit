app.controller('ArticleDetailController', ['$scope', 'articleData', '$routeParams', function($scope, articleDetail, $routeParams){
	
	articleDetail.getArticle($routeParams.slug).then(
		function (article) {
			 $scope.article = article;
		},
		function (response) {
			console.log (response);
		}
	);
}]);