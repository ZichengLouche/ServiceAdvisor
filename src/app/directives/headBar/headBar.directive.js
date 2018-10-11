import template from './headBar.html';
// import HeadBarController from '../controllers/calendar';
import './headBar.css';

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
	
	controller ($rootScope, $scope, aparService) {
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
	}
}


