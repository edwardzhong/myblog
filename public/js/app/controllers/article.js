define(function(){
	return ['$scope','$http','$routeParams',"articleServ"
	,function($scope,$http,$routeParams,articleServ){
		$scope.comment = {
			id:$routeParams.id,
			msg:''
		};
		$scope.user=$routeParams.user;
		$scope.article={
			_id:'',
			title:'',
			content:'',
			createDate:new Date(),
			tags:[],author:'',
			viewCounts:0,
			comments:[]
		};
		$scope.getArticle=function(){
			articleServ.getById($scope.comment.id).then(function(data){
				$scope.article=data.article;
			});
		};

		$scope.postCom=function(e){
			e.preventDefault();
		    if($scope.commentForm.$invalid){
                $scope.commentForm.submitted=true;
                return;
            }
			$http.post('/addComment',$scope.comment).success(function(data){
				if(data.isOk){
					$scope.comment.msg='';
					$scope.getArticle();
				}
			},function(err){
				console.log(err);
			})
		};
		$scope.getArticle();
	}];
});