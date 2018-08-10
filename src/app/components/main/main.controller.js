
// import url from '../../config/system.js';
// console.log('相对路径配置：'+JSON.stringify(url));

export default class MainController {
    // common attrs Andy 2018.3.2 17:17
    // static $inject = ['http'];
    constructor($rootScope, $scope, http, $state, authService) {
        [this.$rootScope, this.$scope, this.http, this.$state, this.authService, this.name] = [$rootScope, $scope, http, $state, authService, 'MainController'];
    }

    showUpload() {
        this.$rootScope.$broadcast('backdrop:upload', { isShown: true });
    }

    $onInit() {
        // console.log('MainController.$onInit.this:', this);
        this.routerType = this.$state.current.routerType;
        // select menu action Andy 2018.5.16 15:23
        this.switchTabState = (routeState) => {
            if (this.$state.current.name == 'main.home' && (!this.$rootScope.fileList || this.$rootScope.fileList.length < 1)) {
                this.$rootScope.$broadcast('ALERT', {
                    message: 'Please upload MEPL files first!',
                    isWarning: true,
                });
                return;
            }
            this.$state.go(routeState);
        }

        // this.authService.getAuthenticatedUser().then((data) => {
        //     this.authService.saveUserInfo(data);
        //     this.$rootScope.user = data;
    
        // })
    }

    $onChanges() {
        console.log('MainController.$onChanges.this:', this);
    }
}

MainController.$inject = ['$rootScope', '$scope', 'http', '$state', 'authService'];


