import angular from 'angular';
import Config from '../config/config.js';

class UserService {
  constructor(httpClient) {
    [this.httpClient] = [httpClient];
  }

  // Andy 2018.6.7 12:04
  getUserInfo(){
    return this.httpClient.ibmGet(Config.WebServiceMapping.node.getUserInfo);
  }
  
}

UserService.$inject = ['httpClient', '$q', '$log', '$rootScope'];

export default angular.module('services.userService', [])
  .service('userService', UserService)
  .name;
