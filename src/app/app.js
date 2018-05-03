import angular from 'angular';
import uiRouter from 'angular-ui-router';

import commonComponents from './commonComponents';
import components from './components';
import directives from './directives';
import services from './service'
import appRouter from './config/app.router';
import interceptor from './config/interceptor.js';

// import '../style/app.css';
import '../style/main.less';
import style from '../style/app.css';
import '../style/common.css';

let appComponent = {
    restrict: 'E',
    template: require('./app.html'),
    controller: function () {
        this.class = style;
    },
    controllerAs: 'app'
};

var app = angular.module('myApp', [uiRouter, commonComponents, components, directives, services,]);

export default app.config(appRouter).config(interceptor)
                  .component('app', appComponent)
                  .name;

                  
app.run(['$rootScope', '$log', '$state', '$window', function ($rootScope, $log, $state, $window) {
    // $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    //     // add one URL to deal with the SSO page
    //     $(window).scrollTop(0);
    //     var url = $state.current.name;
    //     if (null === LoginService.getCurrentUserInfo() && url !== 'callback' && url !== 'login' && url != 'prelogin') {
    //         $state.go('prelogin');
    //     }
    // });

    $rootScope.$on('login:required', function () {
        //LoginService.clearCache();
        $state.go('prelogin');
    });

    $rootScope.$on('server:error', function (event, args) {
        $rootScope.$broadcast('BACKDROP', { isShow: false });
        $rootScope.$broadcast('ALERT', {
            isWarning: true,
            message: `An error occured while requesting api from the api service server. the server responded with a status of ${args.type} (Internal Server Error).
                     Please try again later. If the issue persists, please contact Help.`
        });
    });

    $rootScope.$on('http:timedout', function (event, args) {
        $rootScope.$broadcast('BACKDROP', { isShow: false });
        $rootScope.$broadcast('ALERT', {
            isWarning: true,
            message: `The backend server response time out. the server responded with a status of ${args.type}. Please try again later. If the issue persists, please contact Help.`
        });
    });

}]);