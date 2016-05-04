app.factory('articleData', function($resource, $q){
	var resource = $resource('http://127.0.0.1:8000/api/news/:slug' + '.json', {slug: '@slug'});
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
			 
		}
	};
});