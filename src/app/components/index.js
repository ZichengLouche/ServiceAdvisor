import login from './login';
import main from './main';
import home from './home';
import selectFiles from './select-files';

export default angular.module('components', [login, main, home, selectFiles])
    .name;
