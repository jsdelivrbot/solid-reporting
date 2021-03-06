myApp.controller('uploadController', ['$scope', 'DataFactory', '$http', '$location', 'toaster', function($scope, DataFactory, $http, $location , toaster){

  $scope.dataFactory = DataFactory;
    $scope.isDisabled = false;

    $scope.isReplyFormOpen = true;
  $scope.dataFactory.currentSess();
    // $scope.showTooltip = true;
  $scope.userName = $scope.dataFactory.varUsername();

    $scope.demo = {
        showTooltip : false,
        tipDirection : ''
    };

    $scope.loading = false;

    $scope.demo.delayTooltip = undefined;

    $scope.$watch('demo.delayTooltip',function(val) {
        $scope.demo.delayTooltip = parseInt(val, 10) || 0;
    });

    $scope.$watch('demo.tipDirection',function(val) {
        if (val && val.length ) {
            $scope.demo.showTooltip = true;
        }
    });

    $scope.onSubmit = function(){
        var file = $scope.file[0];
        console.log(file);
        if (file) {
            var textFile = file.lfFileName.substr(file.lfFileName.length - 4);
            if (textFile == '.sql') {
                $scope.loading = true;
                var formData = new FormData();
                angular.forEach($scope.file, function (obj) {
                    formData.append('file', obj.lfFile);
                    console.log('obj file ---', obj.lfFile);
                });

                $http.post('./fileUpload', formData, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(function (result) {
                    // do something
                        console.log(result);
                    if(result.status === 200) {
                        $scope.isDisabled = true;
                        toaster.success('You have successfully uploaded!');
                        setTimeout(function(){
                            $location.path("/landing");
                        }, 500);
                    } else {
                        toaster.error('Upload has failed');
                    }
                });
            } else {
                toaster.error('Please insert sql file');
            }
        } else {
            toaster.error('Please insert file');
        }


    };

}]);
