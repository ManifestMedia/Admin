(function($){  
  angular
    .module('adminClient')
    .controller("ArticlesController", ArticlesController)

	function ArticlesController($scope, article, Notification){
		var vm = this

    vm.deleteArticle = deleteArticle


    vm.articles
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



    init()

    function init() {
      vm.articles = article.all()
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

    function deleteArticle(id) {
      article.destroy(id, function(response){
        //display success
        vm.articles = response
        Notification.success('Article deleted.');

      }, function(errResponse){
        //display error mesage
        Notification.error(errResponse.msg)
      })      
    }
	}
})()