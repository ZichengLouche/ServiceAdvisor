
import template from './main.html';
import MainController from './main.controller';
import './main.css';


export default angular.module('myApp.main', [])
    .component('main', {
        template: template,
        controller: MainController,
    })
    .name;