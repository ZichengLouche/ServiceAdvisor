export default class SelectFilesController {
	// common attrs Andy 2018.3.2 17:17
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state, $q, fileService) {
        [this.$rootScope, this.$scope, this.$state, this.$q, this.fileService, this.name] = [$rootScope, $scope, $state, $q, fileService, 'SelectFilesController'];
        this.fileList = [{'name':'Subsystem A'}, {'name':'Subsystem B'}];
        $scope.$parent.$parent.$ctrl.routerType = $state.current.routerType;
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

    delete(item) {
        console.log(item);
        this.$rootScope.$broadcast('DIALOG', {
            title: 'Are you sure to delete the fille?',
            content: '',
            leftBtnName: 'Cancel',
            rightBtnName: 'Delete',
            submitAction: () => {
                var defer = this.$q.defer();
                // WishlistService.addWishItem(LoginService.getCurrentProfileId(), productId).then(function (data) {
                //     $log.debug(data.status);
                //     if (data.status === "Success") {
                //         $rootScope.$broadcast('ALERT', {
                //             message: 'Add to wish list successfully',
                //             success: true
                //         });
                //         defer.resolve();
                //     } else {
                //         defer.reject();
                //     }
                // }, function (err) {
                //     $log.error(err);
                //     defer.reject();
                // });
                return defer.promise;
            }
        });
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

    generate() {
        // if(!this.formData) {
        //     alert('please select MEPL file or input PMR number!');
        //     return ;
        // }

        this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
        this.fileService.upload(this.formData).then((data) => {
            console.log(data);
            this.onCloseDropdown();
            this.$state.go('main.selectFiles');

        }).finally(() => {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
            this.$state.go('main.report');
        });
    }
}

SelectFilesController.$inject = ['$rootScope', '$scope', '$state', '$q', 'fileService'];


