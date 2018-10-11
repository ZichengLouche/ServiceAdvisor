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

  addWishItem(aparId) {
    return this.httpClient.ibmPost(Config.WebServiceMapping.node.addWishItem.replace(/\{aparId\}/, aparId));
  }
  deleteWishItem(aparId) {
    return this.httpClient.ibmDelete(Config.WebServiceMapping.node.deleteWishItem.replace(/\{aparId\}/, aparId));
  }
  getWishList(limit, skip) {
    return this.httpClient.ibmGet(Config.WebServiceMapping.node.getWishList, { 'limit': limit, 'skip': skip });
  }

}

AparService.$inject = ['httpClient'];

export default angular.module('services.aparService', [])
  .service('aparService', AparService)
  .name;
