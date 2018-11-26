import template from './headBar.html';
// import HeadBarController from '../controllers/calendar';
import './headBar.css';
import Config from '../../config/config.js';
import { setTimeout } from 'timers';

export default class HeadbarDirective {
    constructor() {
        this.template = template;
        this.restrict = 'EA';

        // this.controller = HeadBarController;
        this.controllerAs = '$ctrl';
        this.bindToController = true;

        this.scope = {
            routerType: '@',
            switchTabState: '&'
        };
    }

    link (scope) {
        scope.$watch('calendarCtrl.selectedDate', newDate => {
            if (newDate) {
                scope.calendarCtrl.calendar.year = newDate.getFullYear();
                scope.calendarCtrl.calendar.month = newDate.getMonth();
                scope.calendarCtrl.calendar.date = newDate.getDate();
            }
        });
	}
	
	controller ($rootScope, $scope, aparService, authService, $http) {
        // Andy 2018.10.8 16:05 update wishListNumber
        $scope.$on('wishList:number', (event, args) => {
            if(args.wishListNumber) {
                this.wishListNumber = args.wishListNumber;
                
            } else if (args.wishListNumberOffset) {
                this.wishListNumber = this.wishListNumber + args.wishListNumberOffset;

            } else {
                this.wishListNumber = 0;
            }

            this.wishListNumberLabel = `(${ this.wishListNumber })`;
        });

        // init wishListNumber
        $rootScope.$broadcast('backdrop:loading', { isShow: true });
        aparService.getWishList(0, 0).then((data) => {
            this.wishListNumber = data.length;
            this.wishListNumberLabel = `(${ data.length })`;

        }).finally(() => {
            $rootScope.$broadcast('backdrop:loading', { isShow: false });
        });

        this.logout = () => {
            authService.appLogout().then((data) => {
                var iframe = document.createElement("iframe"); 
                iframe.src = Config.WebServiceMapping.node.ssoLogout; 
                iframe.width = 0;
                iframe.height = 0;
                document.querySelector('body').append(iframe);
                setTimeout(() => window.location.href = Config.WebServiceMapping.node.ssoLogin, 1000);
            })
        }

	}
}


