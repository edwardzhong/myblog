define(["angular"
	,"common/main"
	,"admin/controllers/article"
	,"admin/controllers/index"
	,"admin/controllers/upload"
	,"admin/controllers/userInfo"
	,"admin/directives/listActive"
	,"admin/directives/fileInput"
	],function(angular,common,articleCtrl,indexCtrl,uploadCtrl,userInfoCtrl,activeDirc,fileInputDirc){
		return angular.module('admin',['common'])
		.controller('admArticleCtrl',articleCtrl)
		.controller('admIndexCtrl',indexCtrl)
		.controller('admUploadCtrl',uploadCtrl)
		.controller('admUserInfoCtrl',userInfoCtrl)
		.directive('active',activeDirc)
		.directive('fileupload',fileInputDirc);
});