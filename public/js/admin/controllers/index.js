define(function(){
	return ['$scope','$http','$location',"articleServ",function($scope,$http,$location,articleServ){
		$scope.articles=[];
		$scope.page=1;
		$scope.size=2;
		$scope.total=[];

		$scope.getPage=function(target){
			var page=target?$(target).attr('page'):$scope.page;
			var query={author:$scope.$parent.userInfo._id};
			if($scope.total.length>0&&(page<1||page>$scope.total.length)){return;}
			$scope.page=parseInt(page,10);
			target&&$('.pagination>li').eq($scope.page).addClass('active').siblings().removeClass('active');
			articleServ.getPage({page:page,size:$scope.size},query).then(function(data){
				$scope.articles=data.articles;
				var l=data.total;
				$scope.total=[];
				for(var i=0;i<l;i++){
					$scope.total.push(i+1);
				}
			});
		};
		$scope.del=function(target){
			var id=$(target).attr('aId');
			$http.delete('/delArticle/'+id).success(function(data){
				if(data.isOk){
					$scope.getPage();
					// $location.path('/');
				}
			},function(err){
				$scope.err=err;
			});
		};
		$scope.getPage();
	}];
});