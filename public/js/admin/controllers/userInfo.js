define(function(){
	return ['$scope','$http','$location','$routeParams','userServ',function($scope,$http,$location,$routeParams,userServ){
		$scope.user={
			userName:'',
			password:'',
			gender:'1',
			email:'',
			phone:'',
			temp:'default',
			nickName:'',
			myWord:'',
			blogName:''
		};
		var name=$routeParams.name;
		if(name){
			userServ.getInfo(name).then(function(data){
				$.extend($scope.user,data.user);
			},function(err){
				$scope.err=err;
			});
		}
		$scope.save=function(e){
			e.preventDefault();
			$http.put('/updateUser',$scope.user).success(function(data){
				if(data.isOk){
					$scope.succ='保存成功'
				}else{
					$scope.err='保存失败'
				}
			},function(err){
				$scope.err=err;
			});
		}
	}];
});