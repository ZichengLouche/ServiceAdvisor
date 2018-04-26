import angular from 'angular';
import controller from './report.controller.js'
import template from './report.html';
import './report.css';

export default angular.module('myApp.report', [])
    .component('report', {
        template: template,
        controller: controller,
        bindings: {
            showUpload: '&'
        }
    })
    .name;