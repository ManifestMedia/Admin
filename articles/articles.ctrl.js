(function($){  
  angular
    .module('adminClient')
    .controller("ArticlesController", ArticlesController)

	function ArticlesController($scope){
		var vm = this
		vm.title = "Test Article Title"
		vm.frontMatterContent = "Test Front Matter Content"
		vm.mainMatterContent = "Test Main Matter Content"

    vm.frontMatterEditorOptions = {
			inlineMode: false,
      height: 150,
      events : {
        align : function(e, editor, alignment){
          console.log(alignment + ' aligned');
        }
      }
    }

    vm.mainMatterEditorOptions = {
			inlineMode: false,
      height: 450,
      events : {
        align : function(e, editor, alignment){
          console.log(alignment + ' aligned');
        }
      }
    }

    vm.languages = [
    	{
    		id: 'en',
    		name: 'English'
    	},
    	{
    		id: 'ger',
    		name: 'German'
    	},
    	{
    		id: 'cro',
    		name: 'Croatian'
    	},
    	{
    		id: 'spa',
    		name: 'Spanish'
    	}
    ]

    vm.language = vm.languages[0].id
	}
})()