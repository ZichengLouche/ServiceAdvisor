export default class ReportController {
	// common attrs Andy 2018.4.23 17:53
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state, fileService) {
        [this.$rootScope, this.$scope, this.routerType, this.fileService, this.name] = [$rootScope, $scope, $state.current.routerType, fileService, 'ReportController'];
        $scope.$parent.$parent.$ctrl.routerType = $state.current.routerType;
    }
    
    $onInit() {
        // Andy 2018.8.3 16:21
        this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
        this.fileService.getReportList().then((data) => {
            data.result.forEach((v, k) => {
                v.createTime = new Date(v.createTime);
            });

            this.reportList = [];
            let rows = Math.ceil(data.result.length / 3);
            for (let row = 1; row <= rows; row++) {
                this.reportList.push(data.result.slice((row - 1) * 3, row * 3 ));
            }

        }).finally(() => {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
        });
    }

    $onChanges() {
        // console.log('ReportController.$onChanges.this:', this);
    }

    checkRelease(release = '', label = 'a') {
        return release.search(new RegExp(label, 'i'));
    }
}

ReportController.$inject = ['$rootScope', '$scope', '$state', 'fileService'];


