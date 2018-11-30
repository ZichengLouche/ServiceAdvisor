import angular from 'angular';
import uiRouter from 'angular-ui-router';

import commonComponents from './commonComponents';
import components from './components';
import directives from './directives';
import services from './service';
import controllers from './controller';
import filters from './config/filters.js';

import appRouter from './config/app.router';
import interceptor from './config/interceptor.js';
import Config from './config/config.js';

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


var app = angular.module('myApp', [uiRouter, commonComponents, components, directives, services, filters, controllers]);
export default app.config(appRouter).config(interceptor)
    .component('app', appComponent)
    .name;


app.run(['$rootScope', '$log', '$state', '$window', 'authService', function ($rootScope, $log, $state, $window, authService) {
    console.log($window);

    // Andy 2018.7.19 15:43
    authService.handleSSOAuth();

    authService.getAuthenticatedUser().then((data) => {
        authService.saveUserInfo(data);
        $rootScope.user = data;
        $rootScope.$broadcast('GET_USER', $rootScope.user);

    }).then(() => {

        $rootScope.$on('$stateChangeSuccess', function () {
            // $(window).scrollTop(0);
            var url = $state.current.name;
            if (!authService.getCurrentUser() && url !== 'callback' && url !== 'login' && url != 'prelogin') {
                window.location.href = Config.WebServiceMapping.node.ssoLogin;
            }
        });

        $rootScope.$on('login:required', function () {
            // $state.go('login');
            window.location.href = Config.WebServiceMapping.node.ssoLogin;
        });

        $rootScope.$on('server:error', function (event, args) {
            $rootScope.$broadcast('BACKDROP', { isShow: false });
            $rootScope.$broadcast('ALERT', {
                error: true,
                message: `An error occured while requesting from the backend server. status : ${args.status}. detailed message : ${args.message}
                         <br>Please try again later. If the issue persists, please contact Help.`
            });
        });
    
        $rootScope.$on('http:timedout', function (event, args) {
            $rootScope.$broadcast('BACKDROP', { isShow: false });
            $rootScope.$broadcast('ALERT', {
                error: true,
                message: `The backend server response time out. the server responded with a status of ${args.status}. Please try again later. If the issue persists, please contact Help.`
            });
        });

    }).catch((err) => {
        console.log('authService.getAuthenticatedUser() occuered error:', err);
        window.location.href = Config.WebServiceMapping.node.ssoLogin;
    });

}]);