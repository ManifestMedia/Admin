(function(){
  'use strict'

  angular
  	.module("adminClient")
  	.factory("profile", profile)

  function profile($resource, staging, config) {
  	if (config.adminInstalled) {
      var service = {
        get:            get,
        save:           save,
        changePassword: changePassword  
      }
    }
    else {
      var service = {
        get:            staging.user,
        save:           staging.saveUser,
        changePassword: staging.changePassword
      }
    }

  	return service

  	function get(id) {

  	}

  	function getAll() {

  	}

  	function create() {
  		
  	}

  	function update(id) {

  	}

    function save() {

    }

  	function changePassword(id) {

  	}


  }
})()