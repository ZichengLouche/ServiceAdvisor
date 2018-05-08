import angular from 'angular';
import controller from './report-detail.controller.js'
import template from './report-detail.html';
import './report-detail.css';

export default angular.module('myApp.reportDetail', [])
    .component('reportDetail', {
        template: template,
        controller: controller,
        bindings: {
            showUpload: '&'
        }
    })
    .name;