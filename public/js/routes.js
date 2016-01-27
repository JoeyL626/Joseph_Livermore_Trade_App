angular.module('myapp')
.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
	//$locationProvider.html5Mode(true)
	$routeProvider
	.when('/', {
		templateUrl: '/views/home.html', 
		controller: 'HomeCtrl'
	})
	.when('/posts', {
		templateUrl: 'views/posts.html',
		controller: 'HomeCtrl'
	})
	.when('/addPosts', {
		templateUrl: 'views/makeTrade.html',
		controller: 'HomeCtrl'
	})
	.when('/addWtb', {
		templateUrl: 'views/makeWTB.html',
		controller: 'HomeCtrl'
	})
	.otherwise({redirectTo:'/'});
}])