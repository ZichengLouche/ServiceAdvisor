import angular from 'angular';
import controller from './home.controller.js'
import template from './home.html';
import './home.css';

export default angular.module('myApp.home', [])
    .component('home', {
        template: template,
        controller: controller,
        bindings: {
            showUpload: '&'
        }
    })
    .name;