define(function(){
	return ['$scope','$http','userServ',function($scope,$http,userServ){
		$scope.userInfo=null;
		$scope.setInfo=function(){
			userServ.isLogin().then(function(data){
				$scope.userInfo=data;
			});
		};
		$scope.setInfo();
	}];
});