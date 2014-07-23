define(["angular"
	,"common/directives/popover"
	,"common/services/user"
	,"common/services/article"
	,"common/services/fileUpload",
	],function(angular,
		popoverDirc,
		userServ,
		articleServ,
		fileUploadServ){
	return angular.module('common',[])
		.directive('popover',popoverDirc)
		.factory('userServ',userServ)
		.factory('articleServ',articleServ)
		.factory('fileUploadServ',fileUploadServ);
});