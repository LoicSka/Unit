app.factory('articleData', function($resource, $q){
	// var resource = $resource('http://127.0.0.1:8000/api/news/:slug' + '.json', {slug: '@slug'});
	var resource = $resource( SOURCE + '/api/news/:slug' + '.json', {slug: '@slug'});
	return {
		getArticle: function (slug) {
			var deferred = $q.defer();
			resource.get({slug: slug},
				function (article) {
					deferred.resolve(article);
				},
				function (response) {
					deferred.reject(response);
				});
			return deferred.promise;
		}, 

		getAllArticles: function () {
			 return resource.query();
		},

		getCategoryArticles: function (category) {
			var deferred = $q.defer();
			var resource = $resource( SOURCE + '/api/news/category/:category' + '.json', {category: '@category'});
			resource.query({category: category},
				function (articles) {
					deferred.resolve(articles);
				},
				function (response) {
					deferred.reject(response);
				});
			return deferred.promise;
		},

		likeArticle: function (slug, userId, rating) {
			var resource = $resource( SOURCE + '/api/news/rate/:id' + '.json', {id: '@id'});
			 var deferred = $q.defer();
			 resource.save({id: userId}, {slug: slug, likes: rating},
			 	function(article) {
					deferred.resolve(article);
				},
				function(response){
					deferred.reject(response);
				});
			return deferred.promise;
		}
	};
});