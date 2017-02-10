(function($){  
  angular
    .module('adminClient')
    .controller("SettingsController", SettingsController)

	function SettingsController($scope, $http, $log, Notification, settings){
		var vm = this

		vm.removeLanguage = removeLanguage
		vm.addLanguage 		= addLanguage

		vm.websiteTitle
		vm.availableLanguages
		vm.settings
		vm.languages
		vm.language

		init()

		function init() {
			$http
			.get('app/common/languages/languages.json')
			.success(function(response){
				vm.availableLanguages = response
				vm.language = vm.availableLanguages[0].code
			})
			vm.settings = settings.get()
			vm.languages = vm.settings.languages
			vm.websiteTitle = vm.settings.title
		}

		function addLanguage() {
			settings.addLanguage(vm.language, function(response){
				vm.languages = response
				vm.language = vm.languages[0].code
				Notification.success("Language added to website.")
			}, function(errReponse){
				Notification.error(errReponse)
			})
		}

		function removeLanguage(language) {
			settings.removeLanguage(language, function(response){
				vm.languages = response
				Notification.success("Language removed from website.")
			}, function(errReponse){
				Notification.error(errReponse)
			})
		}
	}
})()