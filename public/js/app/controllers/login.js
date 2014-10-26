define(function () {
    var loginCtr = ["$scope", "$rootScope", "$http", "$location",
        function ($scope, $rootScope, $http, $location) {
            $rootScope.title = "login";
            $scope.user = {
                userName:'',
                password:''
            };

            $scope.login = function (e) {
                e.preventDefault();
                if($scope.loginForm.$invalid){
                    $scope.loginForm.submitted=true;
                    return;
                }

                $http.post('/login', $scope.user)
                .success(function (data) {
                    if (data.err) {
                        return $scope.err = data.err;
                    }
                    // $scope.$parent.setInfo();
                    $scope.$emit("login", $scope.user);//向父控制器传递login事件
                    $location.path("/");
                });
            };
        }];
    return loginCtr;
});