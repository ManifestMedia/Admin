(function(){
  'use strict'

  angular
  	.module("adminClient")
  	.factory("user", user)

  function user($resource, $log, config, staging) {
    $log.debug("-=== User Service ===-")
    
  	if (config.adminInstalled) {
      var service = {
        get:     get,
        all:     getAll,
        create:  create,
        update:  update,
        save:    save,
        destroy: destroy,
        login:   login
      }
    }
    else {
      var service = {
        get:     staging.user,
        all:     staging.users,
        save:    staging.saveUser,
        destroy: staging.deleteUser,
        login:   staging.login
      } 
    }

    var url = {
      login: config.host + '/api/users/login',
      user:  config.host + '/api/users/:id',
    }

    var User = $resource(url.user)
    var Login = $resource(url.login)
  	
  	return service

    function login(username, password, success, error) {
      Login.save({},{username: username, password: password}, function(response){
        $log.debug("-== Login ==-")
        $log.debug(response)
        success(response)
      }, function(errResponse){
        error(errResponse)
      })
    }

  	function get(id, success, error) {
      User.get({id: id}, function(response){
        $log.debug("-== Get ==-")
        $log.debug(response)
        success(resource)
      }, function(errResponse){
        error(errResponse)
      })
  	}

  	function getAll(success, error) {
      User.query(function(response){
        $log.debug("-== Get All ==-")
        $log.debug(response[0])
        success(response)
      }, function(errResponse){
        error(errResponse)
      })
  	}

  	function create(data, created, error) {
      $log.debug("-== Create ==-")
      User.save(data, function(response){
        $log.debug("-== Saved ==-")
        $log.debug(response)
        create(response)
      }, function(errResponse){
        error(errResponse)
      })
  	}

  	function update(data, id, updated, error) {
      var user = User.get({id: id}, function(response){
        $log.debug("-== Update ==-")
        $log.debug(response)
        user.title = data.title
        user.$save(function(response){
          $log.debug("-== Saved ==-")
          $log.debug(response)
          updated(response)
        }, function(error){
          error(errResponse)
        })
      })
  	}

    function save(data, id, saved, error) {
      if (id != null) {
        update(data, id, function(response){
          saved(response)
        }, function(errResponse){
          error(errResponse)
        })
      }
      else {
        create(data, function(response){
          saved(response)
        }, function(errResponse){
          error(errResponse)
        })
      }
    }

  	function destroy(id, destroyed, error) {
      $log.debug("-== Delete ==-")
      User.delete({id: id}, function(response){
        $log.debug("-== Deleted ==-")
        $log.debug(response)
        destroyed(response)
      }, function(errResponse){
        error(errResponse)
      })
  	}
  }
})()