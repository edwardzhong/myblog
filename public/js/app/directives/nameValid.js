
define(function(){
	return function($http){
		return{
			restrict:'A',
			require:'ngModel',
			link:function(scope,elem,attrs,ctrl){
				elem.bind('blur',function(){
					// $http({method: 'GET', url: '/nameValid/'+elem.val()})
					$http.get('/nameValid/'+elem.val())
					.success(function(data){
						if(data.isValid){
							ctrl.$setValidity('namevalid',true);
						}else{
							ctrl.$setValidity('namevalid',false);
						}
					})
					.error(function(){
						ctrl.$setValidity('namevalid',false);
					});
				});
			}
		};
	};
});