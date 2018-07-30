import angular from 'angular';
import controller from './table.controller.js';
import template from './table.html';
import './table.less';

export default angular.module('myApp.commonTable', [])
    .component('commonTable', {
        template    : template,
        controller  : controller,
        bindings: {
            title: '@',
            tableColumns: '<',
            data: '<',
            isShowCheckbox: '<',
            btns: '<'
        }
    })
    .name;