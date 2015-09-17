(function($){  
  angular
    .module('adminClient')
    .controller("UsersController", UsersController)

	function UsersController($scope, $routeParams, $log, Notification, user){
		var vm = this

		// Methods bindables
		vm.deleteUser = deleteUser
		vm.saveUser  	= saveUser

		// Properties
		vm.users
		vm.user
		vm.userId = null
		vm.firstName
		vm.lastName
		vm.email
		vm.secondaryEmail		
		vm.password
		vm.passwordConfirm
		vm.submitButtonTitle

		init()

		function init() {
			$log.debug("-==== Users Controller ====-")
			vm.users = user.all()
			vm.submitButtonTitle = "Add User"

			if ($routeParams.id != null) {
				vm.submitButtonTitle = "Save User"
				vm.user = user.get($routeParams.id)
				vm.userId = vm.user.id
				vm.firstName = vm.user.firstName
				vm.lastName = vm.user.lastName
				vm.email = vm.user.email
				vm.secondaryEmail	= vm.user.secondaryEmail
			};
		}

		// Binded methods 
		function saveUser(id) {
			$log.debug("-== Save User ==-")
			data = {
				firstName: vm.firstName,
				lastName:  vm.lastName,
				email: 		 vm.email,
				secondaryEmail: vm.secondaryEmail,
				password: vm.password,
				passwordConfirm: vm.passwordConfirm
			}


			user.save(data, id, function(response){
				vm.users = response
				Notification.success('User Saved successfully.')
			}, function(errResponse){
				Notification.error(errResponse)
			})
		}

		function deleteUser(id) {
			user.destroy(id, function(response){
				vm.users = response
				Notification.success("User deleted.")
			}, function(errResponse){
				Notification.error(errResponse)
			})
		}
	}
})()