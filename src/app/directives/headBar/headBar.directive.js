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
	
	controller () {

	}
}


