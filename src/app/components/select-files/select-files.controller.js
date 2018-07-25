export default class SelectFilesController {
    // common attrs Andy 2018.3.2 17:17
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state, $q, fileService, authService) {
        [this.$rootScope, this.$scope, this.$state, this.$q, this.fileService, this.authService, this.name] = [$rootScope, $scope, $state, $q, fileService, authService, 'SelectFilesController'];
        this.fileList = [{ 'name': 'Subsystem A' }, { 'name': 'Subsystem B' }];
        this.selectedMeplFiles = [];
        $scope.$parent.$parent.$ctrl.routerType = $state.current.routerType;
    }

    $onChanges() {
        console.log('SelectFilesController.$onChanges.this:', this);
    }

    $onInit() {
        this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
        this.fileService.getFileList(String(this.authService.getCurrentUser().id)).then((data) => {
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
        this.fileService.updateMeplComment(String(this.authService.getCurrentUser().id), String(meplId), this['meplComment'+$index]).then((data) => {
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
        // Andy 2018.7.25 15:57
        if(!this.selectedMeplFiles || this.selectedMeplFiles.length < 1) {
            this.$rootScope.$broadcast('ALERT', {
                message: 'Please select at least one MEPL file first!',
                isWarning: true,
            });
            return;
        }

        this.$rootScope.$broadcast('backdrop:loading', { isShow: true });

        setTimeout(() => {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
            this.$state.go('main.report');
        }, 2000);

        // this.fileService.upload(this.formData).then((data) => {
        //     console.log(data);
        //     this.onCloseDropdown();
        //     this.$state.go('main.selectFiles');

        // }).catch((err) => {
        //     console.log(err);

        // }).finally(() => {
        //     this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
        //     this.$state.go('main.report');
        // });
    }
}

SelectFilesController.$inject = ['$rootScope', '$scope', '$state', '$q', 'fileService', 'authService'];


