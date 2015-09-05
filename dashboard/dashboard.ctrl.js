(function($){  
  angular
    .module('adminClient')
    .controller("DashboardController", DashboardController)

	function DashboardController($scope){
		var vm = this
		vm.quickPostTitle = "Quick post test title."
		vm.quickPostContet = 'Quick post test content'

		vm.quickPostEditorOptions = {
			inlineMode: false,
      height: 450,
      events : {
        align : function(e, editor, alignment){
          console.log(alignment + ' aligned');
        }
      }
    }

	}
})()   