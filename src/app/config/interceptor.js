
export default function interceptor($httpProvider) {
  $httpProvider.interceptors.push(['$q', '$rootScope',
    function ($q, $rootScope) {
      return {
        'request': function (req) {
          // req.timeout = 10;

          // Andy 2018.7.19 15:43
          if(localStorage.getItem('user') && localStorage.getItem('user').accessToken) {  
            req.headers.access_token = localStorage.getItem('user').accessToken;  
          }  
          return req;
        },
        'response': function (resp) {
          return resp;
        },
        'responseError': function (err) {
          console.log('interceptor response error :', err);
          switch (err.status) {
            case 401:
              $rootScope.$broadcast('login:required', { status: err.status, message: 'Unauthorized: The request requires user authentication.' });// forbidden
              break;
            case 403:
              $rootScope.$broadcast('login:required', { status: err.status, message: 'Your have no permission to access the specific resource.' });// forbidden
              break;

            case 400:
              $rootScope.$broadcast('server:error', { status: err.status, message: 'Bad Request: The request could not be understood by the server due to malformed syntax.' });
              break;
            case 404:
              $rootScope.$broadcast('server:error', { status: err.status, message: 'Could not find anything matching the specific request.' });
              break;

            case 500:
              $rootScope.$broadcast('server:error', { status: err.status, message: 'Internal Server Error.' });
              break;
            case 502:
              $rootScope.$broadcast('server:error', { status: err.status, message: 'The backend server, while acting as a gateway or proxy, received an invalid response from the upstream server.'  });
              break;
            case 504:
              $rootScope.$broadcast('server:error', { status: err.status, message: 'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream serve.'  });
              break;

            case -1:
              $rootScope.$broadcast('server:error', { status: err.status, message : 'Unable to connect to the backend server!' });
              break;
          }
          return $q.reject(err);
        }
      };
    }]);
}