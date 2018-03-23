import angular from 'angular';
import uiRouter from 'angular-ui-router';

import commonComponents from './commonComponents';
import components from './components';
import directives from './directives';
import services from './service'
import appRouter from './config/app.router';

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

export default angular.module('myApp', [uiRouter, commonComponents, components, directives, services, ])

    .config(appRouter)
    .component('app', appComponent)
    .name;
