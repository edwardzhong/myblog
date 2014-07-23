define(function(){
	return function(){
		return {
			restrict:'A',
			link:function($scope,$elem,$attrs,$ctrl){
				$elem.children('a').bind('click',function(){
					$(this).addClass('active').siblings('.active').removeClass('active');
				});
			}
		};
	};
});