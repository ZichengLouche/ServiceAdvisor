import angular from 'angular';

import controller from './upload.controller.js'
import template from './upload.html';
import './upload.css';


export default angular.module('myApp.upload', [])
    .component('upload', {
        restrict: 'EA',
        template: template,
        controller: controller,
    })
    .name;