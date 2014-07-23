define(function(){
	return function(){
	    return {
	    	restrict:'A',
	        require:'ngModel',
	        link:function (scope, elm, attrs, ctrl) {//$parsers formatters
	            ctrl.$parsers.unshift(function (viewValue) {
	                console.log("viewValue:%s", viewValue);
	                // var compareValue=scope.regForm[attrs.compare].$viewValue;
	                var compareValue=$('input[name='+attrs.compare+']').val();
	                if (viewValue == "" || attrs.compare == "" || viewValue == compareValue) {
	                    ctrl.$setValidity('compare', true);
	                } else {
	                    ctrl.$setValidity('compare', false);
	                }
	                return viewValue;
	            });
	        }
	    };
	};
});