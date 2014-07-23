define(["angular"
	,"common/main"
	,"app/controllers/index"
	,"app/controllers/login"
	,"app/controllers/reg"
	,"app/controllers/article"
	,"app/directives/compare"
	,"app/directives/nameValid"
	],function(angular,common,indexCtrl,loginCtrl,regCtrl,articleCtrl,compareDirc,nameValidDirc){
		return angular.module('app',['common'])
		.controller('appIndexCtrl',indexCtrl)
		.controller('appLoginCtrl',loginCtrl)
		.controller('appRegCtrl',regCtrl)
		.controller('appArticleCtrl',articleCtrl)
		.directive('compare',compareDirc)
		.directive('namevalid',nameValidDirc);
});