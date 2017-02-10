(function(){
  'use strict'

  angular
  	.module("adminClient")
  	.factory("settings", settings)

  function settings($resource, staging, config) {
  	if (config.adminInstalled) {
      var service = {
        get:    get,
        save:   save,
        create: create,
        update: update,
        remove: remove
      }
    }
    else {
      var service = {
        get:            staging.setting,
        save:           staging.saveSettings,
        remove:         remove,
        removeLanguage: staging.removeLanguage,
        addLanguage:    staging.addLanguage
      } 
    }

    var url = {
      get:     /*GET*/    '/api/settings/',
      create:  /*POST*/   '/api/setting/',
      update:  /*PUT*/    '/api/setting/:id',
      destroy: /*DELETE*/ '/api/setting/:id',
    }
  	
  	return service

  	function get(id) {

  	}

    function save() {

    }

  	function create() {
  		
  	}

  	function update(id) {

  	}

  	function remove(id) {

  	}


  }
})()