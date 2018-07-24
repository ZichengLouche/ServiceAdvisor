import angular from 'angular';
import Config from '../config/config.js';

class UserService {
  constructor(httpClient) {
    [this.httpClient] = [httpClient];
  }

  // Andy 2018.6.7 12:04
  sendVerifyCode(customerId, companyEmail){
    return this.httpClient.ibmPost(Config.WebServiceMapping.node.sendVerifyCode, {'customerId': customerId, 'toEmail':companyEmail});
  }
  updateUserInfo(customerId, companyEmail, codes){
    return this.httpClient.ibmPost(Config.WebServiceMapping.node.updateUserInfo, {'customerId': customerId, 'companyEmail':companyEmail, 'codes': codes});
  }
  
}

UserService.$inject = ['httpClient', '$q', '$log', '$rootScope'];

export default angular.module('services.userService', [])
  .service('userService', UserService)
  .name;
