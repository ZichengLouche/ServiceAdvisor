export default class ReportController {
	// common attrs Andy 2018.4.23 17:53
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state) {
        [this.$rootScope, this.$scope, this.routerType, this.name] = [$rootScope, $scope, $state.current.routerType, 'ReportController'];
        this.reportList = [
                            [{'name':'DSN',  'missingHipers':20, 'PEs':13, 'inconsistencies':10, 'score':0, 'release':'a.1', 'reportPeriod':new Date('2017-12-1'), 'reportStatus':'New'}, 
                             {'name':'DSN2', 'missingHipers':33, 'PEs':14, 'inconsistencies':0, 'score':95, 'release':'a.1', 'reportPeriod':new Date('2016-09-12'), 'reportStatus':'New'}, 
                             {'name':'DSN3', 'missingHipers':56, 'PEs':23, 'inconsistencies':0, 'score':90, 'release':'b.1', 'reportPeriod':new Date('2015-08-21'), 'reportStatus':'New'}
                            ],
                            [{'name':'DSN4', 'missingHipers':54, 'PEs':20, 'inconsistencies':0, 'score':90, 'release':'c.1', 'reportPeriod':new Date('2014-11-09'), 'reportStatus':'New'}, ]
                          ];
        $scope.$parent.$parent.$ctrl.routerType = $state.current.routerType;
    }
    
    login() {
        // this.http.get({userName: 'link', userPassword: '23333'}, url.login, (data) => {
        //     console.log(data)
        // });
        this.showlogin=true;
    }

    $onInit() {
        // console.log('ReportController.$onInit.this:', this);
    }
    $onChanges() {
        // console.log('ReportController.$onChanges.this:', this);
    }
}

ReportController.$inject = ['$rootScope', '$scope', '$state'];


