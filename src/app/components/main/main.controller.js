
// import url from '../../config/system.js';
// console.log('相对路径配置：'+JSON.stringify(url));

export default class MainController {
	// common attrs Andy 2018.3.2 17:17
    // static $inject = ['http'];
    constructor($rootScope, http, $state) {
        [this.$rootScope, this.http, this.routerType, this.name] = [$rootScope, http, $state.current.routerType, 'login'];
    }
    login() {
        // this.http.get({userName: 'link', userPassword: '23333'}, url.login, (data) => {
        //     console.log(data)
        // });
        this.showlogin=true;
    }

    showUpload() {
        this.$rootScope.$broadcast('backdrop:upload', { isShown: true });
    }
}

MainController.$inject = ['$rootScope', 'http', '$state'];


