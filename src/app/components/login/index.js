
import template from './login.html';
import loginCtrl from './login';
import './login.less';


export default angular.module('myApp.login', [])
    .component('login', {
        template: template,
        controller: loginCtrl,
        controllerAs: 'ctrl'
    })
    .name;