(function(){
  'use strict'

  angular
  	.module("adminClient")
  	.factory("adminConfig", adminConfig)

  function adminConfig($resource, $log) {
    var service = {
      get: get    
    }
    
    return service 

    function get() {
      $log.info("Requesting configuration... ")
      $resource('/app/config.json').get(function(response){
        $log.info("Configuration loaded... " + JSON.stringify(response.config, null, 2))
        return response.config
      })
    }
  }
})()