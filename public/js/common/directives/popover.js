define(function(){
	return function () {
		return {
			restrict:'EA',
			replace:true,
			transclude : true,
			template:'<div class="popover fade right in">'+
				'<div class="arrow"></div>'+
				'<h3 class="popover-title" style="display: none;"></h3>'+
				'<div class="popover-content"><span ng-transclude></span></div></div>',
			// compile: function(tElem,attrs,link){
	         	link: function(scope,elem,attrs){//link 函数
	         		// var node = link(scope);//得到编译之前的节点
	         		var prev=elem.siblings('input,textarea').first();
	         		
					var	width=prev[0].offsetWidth,
	         			height=prev[0].offsetHeight;

	         		elem.attr('ngShow',attrs.ngShow)
	         			.css({
	         			'display':'block',
	         			'position':'absolute',
	         			'left':(width+15)+'px',
	         			'top':(-4)+'px'
	         		});
	         	}
	         // }
		};
	}
});