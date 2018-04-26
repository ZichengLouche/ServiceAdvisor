routing.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

export default function routing($stateProvider, $locationProvider, $urlRouterProvider) {
    // $locationProvider.html5Mode(true);
    $locationProvider.html5Mode({enabled:true,requireBase:false});
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            template: '<login></login>'
        })
        .state('main', {
            url: '/main',
            template: '<main></main>'
        })
        .state('main.home', {
            url: '/home',
            routerType: 'meplFiles',
            template: '<home show-upload="$ctrl.showUpload()"></home>'
        })
        .state('main.selectFiles', {
            url: '/selectFiles',
            routerType: 'meplFiles',
            template: '<select-files show-upload="$ctrl.showUpload()"></select-files>'
        })
        .state('main.report', {
            url: '/report',
            routerType: 'report',
            template: '<report></report>'
        })
        .state('main.reportDetail', {
            url: '/reportDetail',
            routerType: 'report',
            template: '<report-detail></report-detail>'
        })
}