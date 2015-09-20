(function(){
  'use strict'

  angular
  	.module("adminClient")
  	.factory("auth", auth)

  function auth($rootScope, $scope, $log, user) {
  	var service = {
      islogged: false,
  		login: login,
  		setCredentials: setCredentials,
  		clearCredentials: clearCredentials
  	}

  	return service

    function login(credentials, success, error) {
      islogged = true
      $rootScope.loggedIn = true
    }

  }
})()