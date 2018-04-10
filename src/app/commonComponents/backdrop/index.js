import angular from 'angular';

import controller from './backdrop.controller.js'
import template from './backdrop.html';
import './backdrop.css';


export default angular.module('myApp.backdrop', [])
    .component('backdrop', {
        restrict: 'EA',
        template: template,
        controller: controller,
    })
    .name;