export default class SelectFilesController {
    // common attrs Andy 2018.3.2 17:17
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state, $q, fileService) {
        [this.$rootScope, this.$scope, this.$state, this.$q, this.fileService, this.name] = [$rootScope, $scope, $state, $q, fileService, 'SelectFilesController'];
        this.fileList = [{ 'name': 'Subsystem A' }, { 'name': 'Subsystem B' }];
        $scope.$parent.$parent.$ctrl.routerType = $state.current.routerType;
    }

    $onInit() {
        this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
        this.fileService.getFileList().then((data) => {
            this.fileList = data.mepls;

        }).finally(() => {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
        });
    }

    edit($index) {
        this['editable' + $index] = true;
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

    save($index, meplId) {
        // Andy 2018.6.19 16:26
        this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
        this.fileService.updateMeplComment(String(meplId), this['meplComment'+$index]).then((data) => {
            console.log(data);
            this.$rootScope.$broadcast('ALERT', {
                message: 'update comment successfully',
                success: true
            });

            this['editable' + $index] = false;

        }).finally(() => {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
        });
    }

    generate() {
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


