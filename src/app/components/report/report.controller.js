export default class ReportController {
	// common attrs Andy 2018.4.23 17:53
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state) {
        [this.$rootScope, this.$scope, this.routerType, this.name] = [$rootScope, $scope, $state.current.routerType, 'ReportController'];
        this.reportList = [
                            [{'name':'DSN',  'missingHipers':661, 'PEs':16, 'inconsistencies':91, 'score':0, 'release':'b.1', 'reportPeriod':'2015-12-1', 'reportStatus':'New'}, 
                             {'name':'DSN2', 'missingHipers':0, 'PEs':6, 'inconsistencies':20, 'score':90, 'release':'b.1', 'reportPeriod':'2015-12-1', 'reportStatus':'New'}, 
                             {'name':'DSN3', 'missingHipers':0, 'PEs':3, 'inconsistencies':6, 'score':95, 'release':'b.1', 'reportPeriod':'2015-12-1', 'reportStatus':'New'}
                            ],
                            [{'name':'DSN4', 'missingHipers':0, 'PEs':0, 'inconsistencies':0, 'score':100, 'release':'b.1', 'reportPeriod':'2015-12-1', 'reportStatus':'New'}, ]
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


