import angular from 'angular';
import controller from './pager.controller.js';
import template from './pager.html';
import './pager.less';

export default angular.module('myApp.pager', [])
    .component('pager', {
        template    : template,
        controller  : controller,
        bindings: {
            totalDataNum: '<',
            pageSize: '=',
            // currentPage: '=',
            queryResult: '&',
        }
    })
    .name;