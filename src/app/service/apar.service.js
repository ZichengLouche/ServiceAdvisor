import angular from 'angular';
import Config from '../config/config.js';

// Andy 2018.8.23 10:26
class AparService {
  constructor(httpClient) {
    [this.httpClient] = [httpClient];
  }

  
  getAparByAparId(aparId) {
    return this.httpClient.ibmGet(Config.WebServiceMapping.node.getAparByAparId + '/' + aparId);
  }
  
  getAparByPtfId(ptfId) {
    return this.httpClient.ibmGet(Config.WebServiceMapping.node.getAparByPtfId, { 'ptfId': ptfId });
  }

}

AparService.$inject = ['httpClient'];

export default angular.module('services.aparService', [])
  .service('aparService', AparService)
  .name;
