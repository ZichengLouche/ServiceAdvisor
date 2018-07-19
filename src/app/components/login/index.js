
import template from './login.html';
import controller from './login.controller.js';
import './login.less';


export default angular.module('myApp.login', [])
    .component('login', {
        template: template,
        controller: controller,
    })
    .name;