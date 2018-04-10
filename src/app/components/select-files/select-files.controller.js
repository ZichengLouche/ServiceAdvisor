export default class SelectFilesController {
	// common attrs Andy 2018.3.2 17:17
    // static $inject = ['http'];
    constructor($rootScope, fileService) {
        [this.$rootScope, this.fileService, this.name] = [$rootScope, fileService, 'login'];
        this.fileList = [{'name':'Subsystem A'}, {'name':'Subsystem B'}];
    }

    $onInit() {
        this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
        this.fileService.getFileList().then((res) => {
            this.fileList = res.data.datas;

        }).finally(() => {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
        });
    }

    edit($index) {
        this['editable'+$index] = true;
    }

    save($index) {
    //     var result = false,
    //         errorMessage = '';
    //     var profileJson={'givenName':$scope.profile.userName,
    //             'deliverTo':$scope.profile.shippingAddress,
    //             'sapPurchaseOrg' : $scope.profile.businessUnitId,
    //             'sapCostCenter' :$scope.profile.costCenterId,
    //             'sapCompanyCode' : $scope.profile.companyCode,
    //             'sapPlant' : $scope.profile.worklocationId,
    //             'sapEmployeeSupId' : $scope.profile.sapEmployeeSupId,
    //             'sapGeneralLedger' : $scope.profile.sapGeneralLedger,
    //             'sapPurchaseGroup' : $scope.profile.sapPurchaseGroup,
    //             'purchaseUnit' : $scope.profile.purchaseUnit,						
    //             'phone': $scope.profile.phone,
    //             'fax' : $scope.profile.fax,
    //             'cardNo' : $scope.profile.cardNo,
    //             'nationality' : $scope.profile.nationality
    //             };

    //     LoginService.updateUserProfile($scope.profile.userId,profileJson).then(function (data) {
    // //					if (data.resultCode && data.resultCode == '1' && data.result == 'success') {
    //         if (data!=null && data['@metaData']!=null) {
    //             $scope.editable = false;
    //             result = true;
    //             $rootScope.updatedUserProfile = $scope.primitiveProfile = angular.extend({}, $scope.profile);
    //         } else {
    //             $log.error(data);
    //             errorMessage = data.resultCode + ', ' + data.result;
    //         }
            
    //     }, function (err) {
    //         $log.error(err);
    //         errorMessage = err;

    //     }).finally(function () {
    //         $rootScope.$broadcast('ALERT', {
    //             isWarning: true,
    //             success: result,
    //             message: result ? 'Update profile successfully.' : 'Failed to update profile. detail:' + errorMessage
    //         });
    //     });

        this['editable'+$index] = false;
    }
}

SelectFilesController.$inject = ['$rootScope', 'fileService'];


