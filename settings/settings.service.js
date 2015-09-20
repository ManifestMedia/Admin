(function(){
  'use strict'

  angular
  	.module("adminClient")
  	.factory("settings", settings)

  function settings($resource, staging, config) {
  	if (config.adminInstalled) {
      var service = {
        get:    get,
        all:    getAll,
        save:   save,
        create: create,
        update: update,
        remove: remove
      }
    }
    else {
      var service = {
        get:            staging.setting,
        all:            staging.settings,
        save:           staging.saveSettings,
        remove:         remove,
        removeLanguage: staging.removeLanguage,
        addLanguage:    staging.addLanguage
      } 
    }
  	
  	return service

  	function get(id) {

  	}

  	function getAll() {

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