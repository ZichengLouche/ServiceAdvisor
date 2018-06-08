import angular from 'angular';
import Config from '../config/config.js';

class FileService {
  constructor(httpClient) {
    [this.httpClient, this.userId] = [httpClient, 'xmtxu@cn.ibm.com'];
    // this.userId = 'temp';
  }

  // Andy 2018.6.7 14:55
  checkMeplByPmr(pmr) {
    return this.httpClient.ibmPost(Config.WebServiceMapping.node.checkMeplByPmr, {'pmr':pmr});
  }

  getFileList() {
    return this.httpClient.ibmGet(Config.WebServiceMapping.node.getMepls, {'userId': this.userId});
  }

  uploadMeplByPmr(pmr) {
    return this.httpClient.ibmPost(Config.WebServiceMapping.node.uploadMeplByPmr, {'userId': this.userId, 'pmr':pmr});
  }
  
  uploadLocalFile(params) {
    // var formData = new FormData();
    // formData.append('meplFiles', params);
    return this.httpClient.ibmPostFormData(Config.WebServiceMapping.node.uploadLocalFile, params);
  }
}

FileService.$inject = ['httpClient', '$q', '$log', '$rootScope'];

export default angular.module('services.fileService', [])
  .service('fileService', FileService)
  .name;
