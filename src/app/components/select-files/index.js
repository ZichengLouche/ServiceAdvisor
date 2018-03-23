import angular from 'angular';
import controller from './select-files.controller.js'
import template from './select-files.html';
import './select-files.css';

export default angular.module('myApp.selectFiles', [])
    .component('selectFiles', {
        template: template,
        controller: controller,
        bindings: {
            showUpload: '&'
        }
    })
    .name;