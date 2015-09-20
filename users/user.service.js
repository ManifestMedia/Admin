(function(){
  'use strict'

  angular
  	.module("adminClient")
  	.factory("user", user)

  function user($resource, config, dummyData) {
  	if (config.adminInstalled) {
      var service = {
        get:     get,
        all:     getAll,
        create:  create,
        update:  update,
        save:    save,
        destroy: destroy
      }
    }
    else {
      var service = {
        get:     dummyData.user,
        all:     dummyData.users,
        save:    dummyData.saveUser,
        destroy: dummyData.deleteUser,
        login:   login
      } 
    }

    var url = {
      all:     /*GET*/    '/api/users/',
      create:  /*POST*/   '/api/user/',
      get:     /*GET*/    '/api/user/:id',
      update:  /*PUT*/    '/api/user/:id',
      destroy: /*DELETE*/ '/api/user/:id',
    }
  	
  	return service

    function login(username, password, success, error) {
      success()
    }

  	function get(id) {

  	}

  	function getAll() {

  	}

  	function create() {
  		
  	}

  	function update(id) {

  	}

    function save(data, id, saved, error) {

    }

  	function destroy(id) {

  	}

  }

})()