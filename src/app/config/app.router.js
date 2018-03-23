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
            template: '<home show-upload="$ctrl.showUpload()"></home>'
        })
        .state('main.selectFiles', {
            url: '/selectFiles',
            template: '<select-files show-upload="$ctrl.showUpload()"></select-files>'
        })
}