var app = angular.module('NewsApp', ['ngResource', 'ngRoute', 'ngCookies']);
// var SOURCE = 'http://7dc36e61.ngrok.io';
var SOURCE = 'http://127.0.0.1:8000';

app.config(
	[
		'$resourceProvider',
        '$routeProvider',
        '$interpolateProvider',
        '$httpProvider',
        '$cookiesProvider',
        '$locationProvider',
		function($resourceProvider, $routeProvider, $interpolateProvider, $httpProvider, $cookiesProvider, $locationProvider) {

			$resourceProvider.defaults.stripTrailingSlashes = false;
			$interpolateProvider.startSymbol('[[');
    		$interpolateProvider.endSymbol(']]');
    		$httpProvider.defaults.withCredentials = true;
    		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
			$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
			$httpProvider.interceptors.push(function($cookies) {
			    return {
			      'request': function(config) {
			        config.headers['X-CSRFToken'] = $cookies.get('csrftoken');
			        return config;
			      }
			    };
			});

			$routeProvider
			.when('/', {
				controller: 'ArticleListController',
				templateUrl: 'static/views/articles.html',
				authenticated: true})
			.when('/stories/:slug',{
				controller: 'ArticleDetailController',
				authenticated: true,
				templateUrl: 'static/views/article.html'})
			.when('/404', {
				templateUrl: 'static/views/404.html'})
			.when('/login', {
				controller: 'UserController',
				templateUrl: 'static/views/login.html'})
			.when('/logout', {
				controller: 'UserController',
				authenticated: true})
			.when('/welcome', {
				controller: 'UserController',
				templateUrl: 'static/views/register.html'})
			.when('/categories/:category',{
				controller: 'ArticleListController',
				templateUrl: 'static/views/articles.html',
				authenticated: true})
			
			.otherwise({
				redirectTo: '/404'});
		}
	]);
app.run(['$rootScope', '$location', 'userData', 'articleData', '$cookies', function($rootScope, $location, userData, articleData, $cookies){
	$rootScope.loggedIn = userData.getAuthStatus();
	$rootScope.logging = $location.url() == "/login";
	$rootScope.registering = $location.url() == "/welcome";
	$rootScope.$on("$routeChangeStart",
		function (event, next, current) {
			if (next.$$route.authenticated) {
				if (!userData.getAuthStatus()) {
					$location.path('/login');
				}
			}
			if (next.$$route.originalPath == '/login') {
				if (userData.getAuthStatus()) {
					$location.path(current.$$route.originalPath);
				}
			}
		});
	$rootScope.signOut = function() {
		userData.logout();
		$location.path('/login');
		location.reload();
	};

	$rootScope.like = function(a,b,c) {
		articleData.likeArticle(a,b,c).then(
			function(article) {
				$('#' + article.id.toString()).html(article.likes);
			}
		);
	};

	if (userData.getAuthStatus()) {
		$rootScope.currentUser = $cookies.getObject('auth');
	} else {
		$rootScope.currentUser = false;
	}

}]);
