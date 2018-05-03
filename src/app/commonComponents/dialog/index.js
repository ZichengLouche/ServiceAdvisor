import angular from 'angular';
import controller from './dialog.controller.js';
import template from './dialog.html';
import './dialog.css';

export default angular.module('myApp.dialog', [])
    .component('commonDialog', {
        template    : template,
        controller  : controller,
        bindings: {
            title: '@',
            content: '<',
            hasTextarea: '<',
            leftBtnName: '<',
            rightBtnName: '<'
        }
    })
    .name;