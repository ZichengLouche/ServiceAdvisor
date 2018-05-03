
export default function interceptor($httpProvider) {
  $httpProvider.interceptors.push(['$q', '$rootScope',
    function ($q, $rootScope) {
      return {
        'request': function (req) {
          //                req.timeout = 10;
          return req;
        },
        'response': function (resp) {
          return resp;
        },
        'responseError': function (err) {
          console.log('interceptor response error :', err);
          switch (err.status) {
            case 401:
              $rootScope.$broadcast('login:required', { type: err.status });// forbidden
              break;
            case 403:
              $rootScope.$broadcast('login:required', { type: err.status });// forbidden
              break;
            case 400:
              $rootScope.$broadcast('server:error', { type: err.status });
              break;
            case 404:
              $rootScope.$broadcast('server:error', { type: err.status });
              break;
            case 500:
              $rootScope.$broadcast('server:error', { type: err.status });
              break;
            case 502:
              $rootScope.$broadcast('server:error', { type: err.status });
              break;
            case 504:
              $rootScope.$broadcast('server:error', { type: err.status });
              break;
            case -1:
              $rootScope.$broadcast('server:error', { type: err.status });
              break;
          }
          return $q.reject(err);
        }
      };
    }]);
}