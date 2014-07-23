define(function(){
	return ['$http','$q',function($http,$q){
		function getUserInfo(userName){
			var deferred=$q.defer();
			$http.get('/user/'+userName).success(function(data){
				if(data.isOk){
					deferred.resolve(data);
				}else{
					deferred.reject(data);
				}
			},function(err){
				deferred.reject(err);
			});
			return deferred.promise;
		}
		function isLogin(){
			var deferred=$q.defer();
			$http.get('/islogin').success(function(data){
				if(data.isOk){
					deferred.resolve(data.user);
				}else{
					deferred.reject(data.user);
				}
			})
			.error(function(err){
				deferred.reject(err);
			});
			return deferred.promise;
		}
		return {
			getInfo:getUserInfo,
			isLogin:isLogin
		};
	}];
});