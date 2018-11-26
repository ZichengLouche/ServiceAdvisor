import angular from 'angular';
import Config from '../config/config.js';

// Andy 2018.7.4 10:35
class AuthService {
  constructor(httpClient) {
    [this.httpClient] = [httpClient];
  }

  // login service
  login(username, password) {
    return this.httpClient.ibmPost(Config.WebServiceMapping.iba.postLogin, { loginId: username, password: password });
  }
  // login SSO service
  ssoLogin() {
    return this.httpClient.ibmGet(Config.WebServiceMapping.node.ssoLogin);
  }

  // Andy 2018.7.20 16:23
  handleSSOAuth() {
    location.search.slice(1).split('=')[1];
    if(location.search) {
        let queryParams = location.search.slice(1).split('&');
        for (const param of queryParams) {
            var aParam = param.split('=');
            if(aParam[0] == 'access_token') {
                localStorage.setItem('access_token', aParam[1]);
                location.search = '';
            }
        }
    }
  }  
  // Andy 2018.6.7 12:04
  getAuthenticatedUser() {
    return this.httpClient.ibmGet(Config.WebServiceMapping.node.getAuthenticatedUser);
  }

  // save login user info
  saveUserInfo(userInfo) {
    localStorage.setItem('user', JSON.stringify(userInfo));
  }

  // get current user info
  getCurrentUser() {
    var user = localStorage.getItem('user')
    return user ? JSON.parse(user) : {};
  }

  loggedIn() {
    // return tokenNotExpired();
  }

  // logout service
  appLogout() {
    return this.httpClient.ibmPost(Config.WebServiceMapping.node.appLogout.replace(/\{deviceId\}/, 1));
  }

  logout() {
    localStorage.removeItem('id_token');
  }
}

AuthService.$inject = ['httpClient', '$q', '$log', '$rootScope'];

export default angular.module('services.authService', [])
  .service('authService', AuthService)
  .name;
