import template from './headBar.html';
// import HeadBarController from '../controllers/calendar';
import './headBar.css';

export default class HeadbarDirective {
    constructor() {
        this.template = template;
        this.restrict = 'EA';

        // this.controller = HeadBarController;
        // this.controllerAs = 'calendarCtrl';
        this.bindToController = true;

        this.scope = {
            minDate: '=',
            maxDate: '=',
            selectedDate: '=',
            dateClick: '&'
        };
    }

    link (scope) {
        // 这段代码太别扭了，但问题是如果搬到controller里面去写成setter，会在constructor之前执行，真头疼，先这样吧
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


