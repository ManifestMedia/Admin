(function($){  
	'user strict'

  angular
    .module('adminClient')
    .controller("LogoutController", LogoutController)

	function LogoutController($scope, $rootScope, $log, $location, $sessionStorage, $cookies){
		var vm = this

		init()

		function init() {
			$cookies.remove('user')	
			$sessionStorage.user["token"] = null
			$sessionStorage.user["valid"] = false
			$location.path('/login')
		}

	}
})()