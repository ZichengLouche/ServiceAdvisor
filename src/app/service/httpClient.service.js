import angular from 'angular';
import Config from '../config/config.js';

class HttpClient {
  // Andy 2018.3.26 17:29
  constructor($http, $q, $log, $rootScope) {
    [this.$http, this.$q, this.$log, this.$rootScope, this.Config,] = [$http, $q, $log, $rootScope, Config];
  }

  commonRequest(source, method, url, data, type) {
    var option = { method: method, url: url, timeout: Config.httpTimedout },
      defer = this.$q.defer();

    if (method == 'GET' || method == 'DELETE') {
      option.params = data;
    } else if (method == 'POST' || method == 'PUT' || method == 'PATCH') {
      option.data = data;
    }

    // Andy 2018.4.4 15:20
    if(type === 'multipart/form-data') {
      option.headers = { 'Content-Type': undefined };
      option.transformRequest = angular.identity;
    }

    var startTime = new Date().getTime();
    this.$http(option).then(function (resp) {
      if (source == 'IBM') {
        if (resp.status == 200) {
          if (resp.data) {
            defer.resolve(resp.data);
          } else {
            defer.reject(resp.data.errorMessage);
          }
        } else {
          this.$log.error(resp);
          defer.reject('Request Failed. status=' + resp.status);
        }
      } else {
        defer.resolve(resp.data);
      }
    }, function (err) {
      var endTime = new Date().getTime();
      if (endTime - startTime >= Config.httpTimedout) {
        this.$rootScope.$broadcast('http:timedout');
      }
      this.$log.error('$http response rejected and error:', err);
      defer.reject(err);
    });

    return defer.promise;
  }

  ibmGet(url, params) {
    return this.commonRequest('IBM', 'GET', url, params);
  }
  ibmPost(url, params) {
    return this.commonRequest('IBM', 'POST', 'api/' + url, params);
  }
  ibmPostFormData(url, params) {
    return this.commonRequest('IBM', 'POST', url, params, 'multipart/form-data');
  }

  csGet(url) {
    return this.commonRequest('CS', 'GET', 'cs/rest/apiget?cspath=/amplify/v1/' + url, {});
  }
  csPost(url, params) {
    return this.commonRequest('CS', 'POST', 'cs/rest/apipost', {
      'cspath': '/amplify/v1/' + url,
      'csdata': JSON.stringify(params)
    });
  }
  csPatch(url, params) {
    return this.commonRequest('CS', 'POST', 'cs/rest/apipatch', {
      'cspath': '/amplify/v1/' + url,
      'csdata': JSON.stringify(params)
    });
  }

  csDelete(url) {
    return this.commonRequest('CS', 'GET', 'cs/rest/apiget?isApiDetele=true&cspath=/amplify/v1/' + url, {});
  }
  csPut(url, params) {
    return this.commonRequest('CS', 'POST', 'cs/rest/apipost', {
      'cspath': '/amplify/v1/' + url + '?isApiPut=true',
      'csdata': JSON.stringify(params)
    });
  }
}
HttpClient.$inject = ['$http', '$q', '$log', '$rootScope'];

export default angular.module('services.httpClient', [])
  .service('httpClient', HttpClient)
  .name;
