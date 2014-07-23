define(["angular","angularRoute","app/main","common/controllers/layout"]
	,function(angular,ngRoute,app,layoutCtrl){
		return angular.module("myapp", ['ngRoute','app'])
		.controller('layoutCtrl',layoutCtrl)
		.config(['$routeProvider','$locationProvider'
			,function($routeProvider, $locationProvider) {
			$routeProvider.when('/', {templateUrl:'views/partials/app/index.html', controller:'appIndexCtrl'})
			.when('/login', {templateUrl:'views/partials/app/login.html', controller:'appLoginCtrl'})
			.when('/article/:id', {templateUrl:'views/partials/app/article.html', controller:'appArticleCtrl'})
			.when('/reg', {templateUrl:'views/partials/app/reg.html', controller:'appRegCtrl'})
			.otherwise({redirectTo:'/'});
	}]);
});