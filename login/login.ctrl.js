(function($){  
	'user strict'

  angular
    .module('adminClient')
    .controller("LoginController", LoginController)

	function LoginController($scope, $rootScope, $log, $location, $sessionStorage, $cookies, config, user){
		var vm = this

		vm.go = go

		// Properties
		vm.$session
		vm.adminInstalled
		vm.username = ''
		vm.password = ''

		init()

		function init() {
			vm.adminInstalled = config.adminInstalled
			vm.$session = $sessionStorage
			vm.$session.user = {}
			username = "test"
			password = "pass"
					
			user.login(username, password, function(response){

			}, function(errResponse){
				$log.debug(errResponse)
			})
		}

		function go() {
			user.login(vm.username, vm.password, function(response){
				$log.debug("-== Go Login ==-")
				vm.$session.user["valid"] = true
				vm.$session.user["token"] = "response.token"
				$cookies.put('user', vm.$session.user["valid"])
				$location.path('/dashboard')	
			}, function(errResponse){
				$rootScope.loggedIn = true
				vm.$session.user["valid"] = false
				vm.$session.user["token"] = null
			})
			
		}

		$scope.logout = function(){
			$cookies.remove('user')
			$location.path('/login')
		}
	}
})()