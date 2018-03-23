
import url from '../../config/system.js';
console.log('相对路径配置：'+JSON.stringify(url));

export default class loginCtrl {
    // static $inject = ['http'];
    constructor(http) {
        [this.http, this.name] = [http, 'login'];
    }
    login() {
        // this.http.get({userName: 'link', userPassword: '23333'}, url.login, (data) => {
        //     console.log(data)
        // });
        this.showlogin=true;
    }
}

loginCtrl.$inject = ['http'];