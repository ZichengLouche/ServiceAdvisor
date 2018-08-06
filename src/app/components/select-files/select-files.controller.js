export default class SelectFilesController {
    // common attrs Andy 2018.3.2 17:17
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state, $q, fileService, authService) {
        [this.$rootScope, this.$scope, this.$state, this.$q, this.fileService, this.authService, this.name] = [$rootScope, $scope, $state, $q, fileService, authService, 'SelectFilesController'];
        this.fileList = [{ 'name': 'Subsystem A' }, { 'name': 'Subsystem B' }];
        $scope.$parent.$parent.$ctrl.routerType = $state.current.routerType;
        this.selectedMeplFiles = [];
        this.selecteAll = false;
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

        // Andy 2018.7.26 19:01
        this.$scope.$watch('$ctrl.selecteAll', (newVal, oldVal) => {
            if (newVal == oldVal) {
                return;
            }

            if(this.selecteAll) {
                this.selectedMeplFiles = this.fileList;
            } else {
                this.selectedMeplFiles = [];
            }
        })
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
        this.selectedMeplFiles = this.selectedMeplFiles.filter(item => item);

        if(!this.selectedMeplFiles || this.selectedMeplFiles.length < 1) {
            this.$rootScope.$broadcast('ALERT', {
                message: 'Please select at least one MEPL file first!',
                isWarning: true,
            });
            return;

        } else if(this.selectedMeplFiles.length > 1) {
            this.$rootScope.$broadcast('ALERT', {
                message: 'Only a single MEPL file report is currently supported!',
                isWarning: true,
            });
            
            this.selectedMeplFiles = [];
            return;
        }

        this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
        this.fileService.generateReport(String(this.selectedMeplFiles[0].MEPLID)).then((data) => {
            this.$state.go('main.reportDetail', {reportDetail:data});

        }).finally(() => {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
        });
    }
}

SelectFilesController.$inject = ['$rootScope', '$scope', '$state', '$q', 'fileService', 'authService'];


