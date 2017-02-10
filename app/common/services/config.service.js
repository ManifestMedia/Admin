(function(){
  'use strict'

  angular
  	.module("adminClient")
  	.factory("config", config)

  function config($http, $log) {
    var config
    var service = {
      get:            get,
      host:           null,
      adminInstalled: null
    }
    
    $http
      .get('app/config.json')
      .success(function(response){
        config = response
        service.adminInstalled = config.adminInstalled
        service.host = config.host
        $log.debug("-== Configuration Loaded... ==-")
        $log.debug(response)
      })

    return service 

    function get(vaule) {
      if (value == null) {
        return config[value]  
      }
      else {
        return config
      }
    }
  }
})()