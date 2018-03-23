import HeadbarDirective from './headBar.directive';

export default angular.module('directives.headBar', [])
    .directive('headBar', () => new HeadbarDirective())
    .name;