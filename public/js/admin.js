define(["angular","angularRoute","admin/main","common/controllers/layout"]
	,function(angular,ngRoute,admin,layoutCtrl){
		return angular.module("myadmin", ['ngRoute','admin'])
		.controller('layoutCtrl',layoutCtrl)
		.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
			$routeProvider.when('/',{templateUrl:'views/partials/admin/index.html', controller:'admIndexCtrl'})
			.when('/edit/:id',{templateUrl:'views/partials/admin/article.html', controller:'admArticleCtrl'})
			.when('/post',{templateUrl:'views/partials/admin/article.html', controller:'admArticleCtrl'})
			.when('/upload',{templateUrl:'views/partials/admin/upload.html', controller:'admUploadCtrl'})
			.when('/user/:name',{templateUrl:'views/partials/admin/userInfo.html', controller:'admUserInfoCtrl'})
			.otherwise({redirectTo:'/'});
	}]);
});