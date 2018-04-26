export default class ReportDetailController {
	// common attrs Andy 2018.4.23 17:53
    // static $inject = ['http'];
    constructor($rootScope, $state) {
        [this.$rootScope, this.menu, this.name] = [$rootScope, $state.current.menu, 'home'];
        this.reportList = [[{'name':'Subsystem A'}, {'name':'Subsystem B'}, {'name':'Subsystem B'}],[{'name':'Subsystem A'}, {'name':'Subsystem B'}, {'name':'Subsystem B'}]];
    }
    login() {
        // this.http.get({userName: 'link', userPassword: '23333'}, url.login, (data) => {
        //     console.log(data)
        // });
        this.showlogin=true;
    }

    // showUpload() {
    //     this.$rootScope.$broadcast('backdrop:upload', { isShown: true });
    // }
}

ReportDetailController.$inject = ['$rootScope', '$state'];


