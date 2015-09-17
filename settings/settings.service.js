(function(){
  'use strict'

  angular
  	.module("adminClient")
  	.factory("settings", settings)

  function settings($resource, dummyData, config) {
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
        get:            dummyData.setting,
        all:            dummyData.settings,
        save:           dummyData.saveSettings,
        remove:         remove,
        removeLanguage: dummyData.removeLanguage,
        addLanguage:    dummyData.addLanguage
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