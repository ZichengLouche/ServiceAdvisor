
// import url from '../../config/system.js';
// console.log('相对路径配置：'+JSON.stringify(url));

export default class HomeController {
	// common attrs Andy 2018.3.2 17:17
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state) {
        [this.$rootScope, this.$scope, this.$state, this.name] = [$rootScope, $scope, $state, 'HomeController'];
        $scope.$parent.$parent.$ctrl.routerType = $state.current.routerType;
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

HomeController.$inject = ['$rootScope', '$scope', '$state'];


