define(function(){
	return ['$scope','$http','userServ',function($scope,$http,userServ){
		$scope.userInfo=null;
		$scope.setInfo=function(){
			userServ.isLogin().then(function(data){
				$scope.userInfo=data;
			});
		};
		$scope.setInfo();
		$scope.$on("login",function(event,user){//接收子制控制器事件login
			$scope.setInfo();
		});
	}];
});