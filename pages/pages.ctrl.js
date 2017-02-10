(function($){  
  angular
    .module('adminClient')
    .controller("PagesController", PagesController)

	function PagesController($scope, $routeParams, $log, Notification, settings, page){
		var vm = this

		//methods bindables
		vm.deletePage = deletePage
		vm.submitPageData = savePageData

		//properties  
    vm.languages
    vm.currentLanguage = "en"
		vm.pages		
		vm.page
		vm.pageId
		vm.title 
		vm.saveButtonTitle

		init()

		function init() {
			$log.debug("-==== PagesController ====-")       
			vm.saveButtonTitle = "Add new page"
			vm.pages = page.all()
      vm.languages = settings.get("languages")
			
			if ($routeParams.id != null) {
				vm.saveButtonTitle = "Save page"
				vm.pageId = parseInt($routeParams.id)
				vm.page = page.get(vm.pageId)
				vm.title = vm.page.title[vm.currentLanguage]
			}
		}

		function deletePage(id) {
      if (vm.pageId == id){
      	vm.title = ""
      	vm.pageId = null
      	vm.saveButtonTitle = "Add new page"
      }
      page.destroy(id, function(response){
      	//display success
      	vm.pages = response
      	Notification.success("Page Deleted.")
      }, function(errResponse){
      	//display error message
      	Notification.error(errResponse.msg)
      })
    }

    function savePageData(id) {
      var data = {}
      data["title"] = {} 
      data["title"][vm.currentLanguage] = vm.title

      $log.debug(data)

    	page.save(data, id, function(response){
    		vm.pages = response
    		Notification.success('Page data saved successfully.');
    	}, function(errResponse){
    		Notification.error(errResponse.msg)
    	})
    }
	}
})()