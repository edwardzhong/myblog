define(function(){
	return ['$http','$q',function($http,$q){
		function getArticle(id){
			var deferred =$q.defer();
			$http.get('/article/'+id)
			.success(function(data){
				if(data.isOk){
					deferred.resolve(data);
				}else{
					deferred.reject(data);
				}
			})
			.error(function(data){
				deferred.reject(data);
			});
			return deferred.promise;
		}
		function getArticles(page,query){
			var deferred =$q.defer();
			query=JSON.stringify(query||'');
			page=JSON.stringify(page||'');
			$http.get('/articles?q='+query+'&p='+page)
			.success(function(data){
				if(data.isOk){
					deferred.resolve(data);
				}else{
					deferred.reject(data);
				}
			})
			.error(function(data){
				deferred.reject(data);
			});
			return deferred.promise;
		}
		function saveArticle (article){
			var deferred=$q.defer();
			$http.post('/saveArticle',article)
			.success(function(data){
				console.log(data);
				if(data.isOk){
					deferred.resolve(data);
				}else{
					deferred.reject(data);
				}
			})
			.error(function(err){
				deferred.reject(err);
			});
			return deferred.promise;
		}
		return {
			getById:getArticle,
			getPage:getArticles,
			save:saveArticle
		};
	}];
});