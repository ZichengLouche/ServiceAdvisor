import angular from 'angular';
import Config from '../config/config.js';

class FileService {
  constructor(httpClient, authService) {
    [this.httpClient, this.authService] = [httpClient, authService];
    // this.userId = this.authService.getCurrentUser().id;
  }

  // Andy 2018.6.7 14:55
  checkMeplByPmr(pmr) {
    return this.httpClient.ibmPost(Config.WebServiceMapping.node.checkMeplByPmr, { 'pmr': pmr });
  }

  getFileList(userId) {
    return this.httpClient.ibmGet(Config.WebServiceMapping.node.getMepls, { 'userId': userId });
  }
  removeMepl(meplId) {
    return this.httpClient.ibmPost(Config.WebServiceMapping.node.removeMepl, { 'meplId': meplId });
  }

  updateMeplComment(userId, meplId, comment) {
    return this.httpClient.ibmPost(Config.WebServiceMapping.node.updateMeplComment, { 'userId': userId, 'meplId': meplId, 'comment': comment });
  }

  uploadMeplByPmr(userId, pmr) {
    return this.httpClient.ibmPost(Config.WebServiceMapping.node.uploadMeplByPmr, { 'userId': userId, 'pmr': pmr });
  }
  uploadMeplByLocalFile(params) {
    // var formData = new FormData();
    // formData.append('meplFiles', params);
    return this.httpClient.ibmPostFormData(Config.WebServiceMapping.node.uploadMeplByLocalFile, params);
  }


  // Andy 2018.8.1 18:15
  generateReport(meplId) {
    return this.httpClient.ibmPost(Config.WebServiceMapping.node.generateReport, { 'meplId': meplId });
  }
  getReportList() {
    return this.httpClient.ibmGet(Config.WebServiceMapping.node.getReportList);
  }
  getReport(reportId) {
    return this.httpClient.ibmGet(Config.WebServiceMapping.node.getReport, { 'reportId': reportId });
  }
  removeReport(reportId) {
    return this.httpClient.ibmPost(Config.WebServiceMapping.node.removeReport, { 'reportId': reportId });
  }
  sendReport(meplId, sendto) {
    return this.httpClient.ibmPost(Config.WebServiceMapping.node.sendReport, { 'meplId': meplId, 'sendto': sendto });
  }

}

FileService.$inject = ['httpClient', 'authService'];

export default angular.module('services.fileService', [])
  .service('fileService', FileService)
  .name;
