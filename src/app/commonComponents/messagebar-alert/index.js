import angular from 'angular';

import template from './messagebar-alert.html';
import controller from './messagebar-alert.controller.js';
import './messagebar-alert.css';

export default angular.module('myApp.messagebarAlert', [])
    .component('messagebarAlert', {
        restrict: 'E',
        template: template,
        controller: controller,
        // link: function (scope, ele, attrs) {
        //   scope.$on('ALERT', function(event, args) {
        //     scope.info = {};
        //     scope.info.isShow = true;
        //     scope.info.isWarning = args.isWarning;
        //     scope.info.success = args.success;
        //     scope.info.message = args.message || '';
                    
        //     // remove the alert after 3 seconds
        //     $timeout(function() {
        //       scope.info.isShow = false;
        //     }, 3000);
        //   });
        // }
    })
    .name;

// export default angular.module('myApp.messagebarAlert', [])
//     .component('messagebarAlert', function($timeout) {
//       return {
//         restrict: 'E',
//         template: template,
//         controller: controller,
//         link: function (scope, ele, attrs) {
//           scope.$on('ALERT', function(event, args) {
//             scope.info = {};
//             scope.info.isShow = true;
//             scope.info.isWarning = args.isWarning;
//             scope.info.success = args.success;
//             scope.info.message = args.message || '';
                    
//             // remove the alert after 3 seconds
//             $timeout(function() {
//               scope.info.isShow = false;
//             }, 3000);
//           });
//         }
//       }
//     })
//     .name;


