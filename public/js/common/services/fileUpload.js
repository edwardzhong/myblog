define(["angular"],function(angular){
	return ['$http','$q',function($http,$q){
		return function (files){
			var deferred =$q.defer();
			if(!files){
				deferred.reject({isOk:false,err:'上传文件为空'});
			}
	        var formData = new FormData(),i;
			for(i in files) {
				formData.append('file_'+i, files[i]);
			}

			$http({//必须有headers和transformRequest才能上传文件成功
				method: 'POST', 
				url: '/upload', 
				data: formData,
				headers: {'content-type':undefined},
				transformRequest: angular.identity
			})
			.success(function(data, status, headers, config){
				deferred.resolve(data);
			})
			.error(function(data){
				deferred.reject(data);
			});
			return deferred.promise;
		};
	}];
});