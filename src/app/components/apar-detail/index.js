import angular from 'angular';
import controller from './apar-detail.controller.js'
import template from './apar-detail.html';
import './apar-detail.css';

export default angular.module('myApp.aparDetail', [])
    .component('aparDetail', {
        template: template,
        controller: controller,
        bindings: {
            showUpload: '&'
        }
    })
    .name;