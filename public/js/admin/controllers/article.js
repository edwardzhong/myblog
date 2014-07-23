define(function(){
	return ['$scope','$rootScope','$location','$routeParams',"articleServ"
	,function($scope,$rootScope,$location,$routeParams,articleServ){
		$scope.id = $routeParams.id;
		$scope.user=$routeParams.user;
		$scope.article={
			_id:'',
			title:'',
			content:'',
			createDate:new Date(),
			tags:'',
			author:'',
			viewCounts:0,
			comments:[]
		};
		if($scope.id){
			articleServ.getById($scope.id).then(function(data){
				$.extend($scope.article,data.article);
				$scope.article.tags=$scope.article.tags.join(',');
			});
		}

		$scope.save=function(e){
			e.preventDefault();//阻止默认行为
			if($scope.articleForm.$invalid){
				$scope.articleForm.submitted=true;
				return;
			}
			articleServ.save($scope.article).then(function(data){
				if(!data.isOk){
					$scope.err=data.err;
				}else{
					$('.list-group-item').first().click();
				}
			},function (data) {
				$scope.err=data.err;
			});
		};
	}];
});