(function($){  
  angular
    .module('adminClient')
    .controller("DashboardController", DashboardController)

	function DashboardController($scope, $log, Notification, dashboard){
		var vm = this

    // Methods bindables
    vm.saveQuickPost = saveQuickPost
    vm.deleteArticle = deleteArticle
    vm.deletePage    = deletePage

    // Properties  
		vm.articles      
    vm.articlesCount 
    vm.pages         
    vm.pagesCount  
    vm.usersCount
    vm.quickPostTitle         
		vm.quickPostContent
    vm.addToPage

    // Froala editor options for dashboard
		vm.quickPostEditorOptions = {
			inlineMode: false,
      height: 450
    }

    init()

    function init() {
      $log.debug("-==== DashboardController ====-")       
      vm.articles      = dashboard.articles()
      vm.articlesCount = dashboard.countArticles
      vm.pages         = dashboard.pages()
      vm.pagesCount    = dashboard.countPages 
      vm.usersCount    = dashboard.countUsers
      vm.addToPage     = vm.pages[0].title
    }

    // Binded methods 
    function saveQuickPost() {
      data = {
        title: vm.quickPostTitle,
        content: vm.quickPostContent,
        page: vm.addToPage
      }

      dashboard.saveQuickPost(data, function(response){
        //display success
        vm.articles = response
        vm.quickPostTitle = null         
        vm.quickPostContent = null
        vm.addToPage = vm.pages[0].title
        Notification.success('Quick post saved successfully.');
      
      }, function(errResponse){
        //display error mesage
        Notification.error(errResponse.msg)
      })
    }

    function deleteArticle(id) {
      dashboard.deleteArticle(id, function(response){
        //display success
        vm.articles = response
        Notification.success('Article deleted.');
      }, function(errResponse){
        //display error mesage
        Notification.error(errResponse.msg)
      })      
    }

    function deletePage(id) {
      dashboard.deletePage(id, function(response){
        //display success
        vm.pages = response
        Notification.success('Page deleted.');
      }, function(errResponse){
        //display error mesage
        Notification.error(errResponse.msg)
      })
    }
	}
})()   