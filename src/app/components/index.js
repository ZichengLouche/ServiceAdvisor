import login from './login';
import main from './main';
import home from './home';
import selectFiles from './select-files';
import report from './report';
import reportDetail from './report-detail';

export default angular.module('components', [login, main, home, selectFiles, report, reportDetail])
    .name;
