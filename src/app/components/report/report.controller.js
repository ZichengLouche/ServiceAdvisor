export default class ReportController {
	// common attrs Andy 2018.4.23 17:53
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state) {
        [this.$rootScope, this.$scope, this.routerType, this.name] = [$rootScope, $scope, $state.current.routerType, 'ReportController'];
        this.reportList = [[{'name':'Subsystem A'}, {'name':'Subsystem B'}, {'name':'Subsystem B'}],[{'name':'Subsystem A'}, {'name':'Subsystem B'}, {'name':'Subsystem B'}]];
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


