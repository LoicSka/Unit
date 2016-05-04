var app = angular.module('NewsApp', ['ngResource', 'ngRoute', 'ngCookies']);

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
    		// $locationProvider.html5Mode(true);
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
			.otherwise({
				redirectTo: '/404'});
		}
	]);
app.run(['$rootScope', '$location', 'userData', function($rootScope, $location, userData){
	$rootScope.$on("$routeChangeStart",
		function (event, next, current) {
			if (next.$$route.authenticated) {
				if (!userData.getAuthStatus()) {
					$location.path('/login');
				}
			}

			if (next.$$route.originalPath == '/login') {
				console.log('loginPage');
				if (userData.getAuthStatus()) {
					$location.path(current.$$route.originalPath);
				}
			}
		});
}]);