define(function () {
	return ['articleServ','$scope','$q',function(articleServ,$scope,$q){
		$scope.articles=[];
		$scope.page=1;
		$scope.size=2;
		$scope.total=[];

		$scope.getPage=function(target){
			var page=target?$(target).attr('page'):$scope.page;
			if($scope.total.length>0&&(page==$scope.page||page<1||page>$scope.total.length)){return;}
			$scope.page=parseInt(page,10);
			target&&$('.pagination>li').eq($scope.page).addClass('active').siblings().removeClass('active');
			articleServ.getPage({page:page,size:$scope.size}).then(function(data){
				$scope.articles=data.articles;
				var l=data.total;
				$scope.total=[];
				for(var i=0;i<l;i++){
					$scope.total.push(i+1);
				}
			});
		};
		$scope.getPage();
	}];
});