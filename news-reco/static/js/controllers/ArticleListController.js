app.controller('ArticleListController', ['$scope', 'articleData', function($scope, articleData){
	$scope.articles = articleData.getAllArticles();
}]);