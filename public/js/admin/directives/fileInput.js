define(['bootstrapFileInput'],function(){
	return function(){
		return {
			restrict: 'E',
			transclude: true,
			template: '<div><input name="file" type="file" class="btn btn-primary" data-filename-placement="inside" title="选择文件" multiple />'
			+'<p></p><input type="button" class="btn btn-success" value="开始上传" ng-click="upload($event)"></div>'
			+'<ul><li ng-repeat="file in files">{{file.name}}</li></ul>',
			controller: function($scope, fileUploadServ) {
				$scope.notReady = true;
				$scope.upload = function(e) {
					e.preventDefault();
					fileUploadServ($scope.files).then(function(data){
						$scope.succ="上传成功!";
					},function(data){
						$scope.err="上传失败!";
					});
				};
			},
			link: function($scope, $element) {
				var fileInput = $element.find('input[type="file"]');
				fileInput.bootstrapFileInput();
				fileInput.bind('change', function(e) {
					$scope.notReady = e.target.files.length == 0;
					$scope.files = [];
					for(var i in e.target.files) {
						if(typeof e.target.files[i] == 'object') {
							$scope.files.push(e.target.files[i]);
						}
					}
				});
			}
		};
	};
});
