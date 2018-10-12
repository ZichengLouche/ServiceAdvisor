import angular from 'angular';
import controller from './wish-list.controller.js'
import template from './wish-list.html';
import './wish-list.css';

export default angular.module('myApp.wishList', [])
    .component('wishList', {
        template: template,
        controller: controller,
        bindings: {
            // currentPage: '<',
            wishListNumber: '<'
        }
    })
    .name;