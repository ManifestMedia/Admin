(function($){  
  'user strict'
  
  angular
    .module('adminClient')
    .factory('authInterceptor', authInterceptor) 

  function authInterceptor ($rootScope, $q, $sessionStorage, $window) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($sessionStorage.user) {
          config.headers.Authorization = 'Bearer ' + $sessionStorage.user["token"];
        }
        return config;
      },

      response: function (response) {
        if (response.status === 401) {
          // handle the case where the user is not authenticated
        }
        return response || $q.when(response);
      }
    };
  }
  
})()