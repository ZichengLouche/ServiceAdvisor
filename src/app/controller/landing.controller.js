import angular from 'angular';

class LandingController {
    // Andy 2018.7.23 12:09
    constructor($rootScope, $scope, $state, fileService, authService) {
        [this.$rootScope, this.$scope, this.$state, this.fileService, this.authService, this.name] = [$rootScope, $scope, $state, fileService, authService, 'LandingController'];
    }

    $onInit() {
        this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
        this.fileService.getFileList(String(this.authService.getCurrentUser().id)).then((data) => {
            this.fileList = data.mepls;
            if(data.mepls && data.mepls.length > 0) {
                this.$state.go('main.selectFiles');
                this.$rootScope.fileList = data.mepls;

            } else {
                this.$state.go('main.home');
            }

        }).finally(() => {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
        });
    }

    $onChanges() {
        console.log('LandingController.$onChanges.this:', this); 
    }
}

LandingController.$inject = ['$rootScope', '$scope', '$state', 'fileService', 'authService'];

export default angular.module('controllers.landingController', [])
  .controller('landingController', LandingController)
  .name;

// console.log(angular.module('myApp'));
// export default angular.module('myApp')
//   .controller('landingController', LandingController)
//   .name;

