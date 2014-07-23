define(function () {
    var regCtr = ["$scope", "$rootScope", "$http", "$location", 
        function ($scope, $rootScope, $http, $location) {
            $rootScope.title = "reg";
            $scope.user = {
                userName:'',
                password:'',
                password2:'',
                email:'',
                phone:'',
                gender:'1'
            };

            $scope.reg = function (e) {
                e.preventDefault();
                if($scope.regForm.$invalid){
                    $scope.regForm.submitted=true;
                    return;
                }
                $http.post('/reg', $scope.user)
                .success(function (data) {
                    if (data.err) {
                        return $scope.err = data.err;
                    }
                    $location.path("/");
                });
            };
        }];
    return regCtr;
});