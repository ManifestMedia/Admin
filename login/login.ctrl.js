(function($){  
  angular
    .module('adminClient')
    .controller("LoginController", LoginController)

	function LoginController($scope, $rootScope, $log, config, $location, user){
		var vm = this

		vm.go = go

		vm.adminInstalled
		vm.username = ''
		vm.password = ''

		init()

		function init() {
			vm.adminInstalled = config.adminInstalled
		}

		function go() {
			user.login(vm.username, vm.password, function(){
				$rootScope.loggedIn = true
				$location.path('/dashboard')	
			})
			
		}
	}
})()