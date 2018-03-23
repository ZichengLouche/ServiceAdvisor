
(function () {
  angular.module('App').factory('HttpClient', function ($http, $q, $log, Config, $rootScope) {

  	function commonRequest(source, method, url, data) {
  		var params = { method: method, url: url, timeout: Config.httpTimedout }, defer = $q.defer();
  		if (method == 'GET' || method == "DELETE") {
  			params.params = data;
  		} else if (method == 'POST' || method == "PUT" || method == "PATCH") {
  			params.data = data;
  		}
  		var startTime = new Date().getTime();
    	$http(params).then(function(resp) {
    		if (source == 'IBA') {
    			if (resp.status == 200) {
    				if (resp.data.success) {
    					defer.resolve(resp.data);
    				} else {
    					defer.reject(resp.data.errorMessage);
    				}
    			} else {
    				$log.error(resp);
    				defer.reject('Request Failed. status=' + resp.status);
    			}
    		} else {
    			defer.resolve(resp.data);
    		}
    	}, function(err) {
    		var endTime = new Date().getTime();
    		if (endTime - startTime >= Config.httpTimedout) {
    			$rootScope.$broadcast('http:timedout');
    		}
    		$log.error("$http response rejected and error:", err);
    		defer.reject(err);
    	});
    	
    	return defer.promise;
  	}
  	
    function ibaGet(url) {
      return commonRequest('IBA', 'GET', 'api/' + url, {});
    }
    function ibaPost (url, params) {
      return commonRequest('IBA', 'POST', 'api/' + url, params);
    }
    
    function csGet(url) {
      return commonRequest('CS', 'GET', 'cs/rest/apiget?cspath=/amplify/v1/' + url, {});
    }
    function csPost(url, params) {
      return commonRequest('CS', 'POST', 'cs/rest/apipost', {
	      'cspath': '/amplify/v1/' + url,
	      'csdata': JSON.stringify(params)
	    });
    }
    function csPatch(url, params) {
        return commonRequest('CS', 'POST', 'cs/rest/apipatch', {
  	      'cspath': '/amplify/v1/' + url,
  	      'csdata': JSON.stringify(params)
  	    });
      }
//    function csDelete(url, params) {
//      return commonRequest('CS', 'DELETE', 'cs/rest/apidelete?cspath=/amplify/v1/' + url, {});
//    }
//    function csPut(url, params) {
//    	return commonRequest('CS', 'PUT', 'cs/rest/apiput', {
//    		'cspath': '/amplify/v1/' + url,
//	      'csdata': JSON.stringify(params)
//    	});
//    }
    function csDelete(url, params) {
      return commonRequest('CS', 'GET', 'cs/rest/apiget?isApiDetele=true&cspath=/amplify/v1/' + url, {});
    }
    function csPut(url, params) {
    	return commonRequest('CS', 'POST', 'cs/rest/apipost', {
    	  'cspath': '/amplify/v1/' + url + "?isApiPut=true",
	      'csdata': JSON.stringify(params)
    	});
    }

    return {
    	ibaPost: ibaPost,
    	ibaGet: ibaGet,
    	csPost: csPost,
    	csGet: csGet,
    	csDelete: csDelete,
    	csPut: csPut,
    	csPatch:csPatch
    };
    
  });
})();