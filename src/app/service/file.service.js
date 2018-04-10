import angular from 'angular';
import Config from '../config/config.js';

class FileService {
  constructor(httpClient) {
    [this.httpClient] = [httpClient];
  }

  getFileList(userId){
    return this.httpClient.ibmGet(Config.WebServiceMapping.node.fileList);
  }
  
  upload(params){
    // var formData = new FormData();
    // formData.append('meplFiles', params);
    return this.httpClient.ibmPostFormData(Config.WebServiceMapping.node.upload, params);
  }
}

FileService.$inject = ['httpClient', '$q', '$log', '$rootScope'];

export default angular.module('services.fileService', [])
  .service('fileService', FileService)
  .name;
