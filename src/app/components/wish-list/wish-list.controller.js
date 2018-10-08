export default class WishListController {
    // common attrs Andy 2018.3.2 17:17
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state, $q, fileService, authService) {
        [this.$rootScope, this.$scope, this.$state, this.$q, this.fileService, this.authService, this.name] = [$rootScope, $scope, $state, $q, fileService, authService, 'WishListController'];
        $scope.$parent.$parent.$ctrl.routerType = $state.current.routerType;
        this.selectedMeplFiles = [];
        this.selecteAll = false;
        this.pageSize = 10;
    }

    $onChanges() {
        console.log('WishListController.$onChanges.this:', this);
    }

    $onInit() {
        this.wishList = [{'id':'PI90729', 'abstract':'Global read-lsn tracking in data sharing requires the use of a lock to serialize updates to a structure maintained in the SCA. There are situations where a large number of agents try to update the SCA at the same time, resulting in a long waiter chain for this lock (the BMC_MBAO lock). Although the lock will only be held for a very short duration, the long wait chain can adversely affect IRLM deadlock detection processing.'},
                         {'id':'PI90729', 'abstract':'Global read-lsn tracking in data sharing requires the use of a lock to serialize updates to a structure maintained in the SCA. There are situations where a large number of agents try to update the SCA at the same time, resulting in a long waiter chain for this lock (the BMC_MBAO lock). Although the lock will only be held for a very short duration, the long wait chain can adversely affect IRLM deadlock detection processing.'},
                        ];
        this.queryResultByPagination(1, this.pageSize);
        // this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
        // this.fileService.getFileList(String(this.authService.getCurrentUser().id)).then((data) => {
        //     this.$rootScope.fileList = this.fileList = data.mepls;
        //     data.mepls.forEach((v, k) => {
        //         v.DATE = new Date(v.DATE);
        //     });

        // }).finally(() => {
        //     this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
        // });

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

    queryResultByPagination(currentPage, pageSize) {
        this.paginationItems = this.wishList.slice(pageSize * (currentPage - 1), (currentPage * pageSize));
    }

    delete(item) {
        this.$rootScope.$broadcast('DIALOG', {
            title: 'Are you sure to delete the fille?',
            content: '',
            leftBtnName: 'Cancel',
            rightBtnName: 'Delete',
            submitAction: () => {
                return this.fileService.removeMepl(item.MEPLID).then((data) => {
                    this.$rootScope.$broadcast('ALERT', {
                        message: data.result == 'success' ? 'Delete file successfully!' : `Delete file failed: ${data.result}`,
                        success: data.result == 'success'
                    });
                    
                    this.$state.reload();
                })
            }
        });
    }

    save($index, meplId) {
        // Andy 2018.6.19 16:26
        this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
        this.fileService.updateMeplComment(String(this.authService.getCurrentUser().id), String(meplId), this['meplComment'+$index]).then((data) => {
            console.log(data);
            this.$rootScope.$broadcast('ALERT', {
                message: 'update comment successfully!',
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
            // this.$state.go('main.reportDetail', {reportDetail:data});
            this.$state.go('main.reportDetail', {reportId: data.result});

        }).finally(() => {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
        });
    }
}

WishListController.$inject = ['$rootScope', '$scope', '$state', '$q', 'fileService', 'authService'];


