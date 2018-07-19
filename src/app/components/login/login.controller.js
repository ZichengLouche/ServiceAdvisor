
export default class LoginController {
    // static $inject = ['http'];
    constructor($state) {
        [this.$state, this.name] = [$state, 'LoginController'];
    }
    login() {
        // this.http.get({userName: 'link', userPassword: '23333'}, url.login, (data) => {
        //     console.log(data)
        // });

        // Andy 2018.7.18 18:16
        if(!this.userName || !this.userPassword) {
            this.validationMessage = '*please fill user name and password!';

        } else {
            this.validationMessage = '';
            this.$state.go('main.home');
        }
    }
}

LoginController.$inject = ['$state'];