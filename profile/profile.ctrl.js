(function($){  
  angular
    .module('adminClient')
    .controller("ProfileController", ProfileController)

	function ProfileController($routeParams, $log, Notification, profile){
		var vm = this

		vm.save = save
		vm.changePassword = changePassword
		
		vm.profileId = 1 //hardcoded for now, should be derived from loged in user session
		vm.firstName
		vm.lastName
		vm.email
		vm.secondaryEmail
		vm.password
		vm.newPasword
		vm.confirmPassword

		init()

		function init() {
			var profileData = profile.get(vm.profileId)
			vm.firstName = profileData.firstName
			vm.lastName = profileData.lastName
			vm.email = profileData.email
			vm.secondaryEmail = profileData.secondaryEmail
		}

		function save() {
			data = {
				firstName: 			vm.firstName,
				lastName:  			vm.lastName,
				email: 		 			vm.email,
				secondaryEmail: vm.secondaryEmail
			}

			profile.save(data, vm.profileId, function(response){
				vm.firstName = response.firstName
				vm.lastName = response.lastName
				vm.email = response.email
				vm.secondaryEmail = response.secondaryEmail

				$log.debug(response)

				Notification.success("Profile data saved.")
			}, function(errReponse){
				Notification.error(errReponse)
			})

		}

		function changePassword() {
			data = {
				password: 			 vm.password,
				newPasword: 		 vm.newPasword,
				confirmPassword: vm.confirmPassword
			}

			profileId.changePassword(data, vm.profileId, function(response){
				vm.password = ''
				vm.newPasword = ''
				vm.confirmPassword = ''

				Notification.success("Password changed.")
			}, function(errReponse){
				Notification.error(errReponse)
			})
		}

	}
})()