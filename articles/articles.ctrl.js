(function($){  
  angular
    .module('adminClient')
    .controller("ArticlesController", ArticlesController)

	function ArticlesController($scope, $log, $filter, $routeParams, Notification, article, page, settings){
		var vm = this

    // Methods bindables
    vm.save = saveArticle
    vm.delete = deleteArticle
    vm.addLanguage = addLanguage
    vm.removeLanguage = removeLanguage

    // Properties
    vm.pages
    vm.articles
    vm.article
    vm.articleId
    vm.currentLang = "en"
    vm.title
		vm.frontMatterContent
		vm.mainMatterContent 
    vm.selectPage
    vm.selectLanguage

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
      vm.pages = page.all()
      
      if ($routeParams.id != null) {

        vm.languages = []
        vm.articleId = $routeParams.id
        vm.article = article.get(vm.articleId)

        angular.forEach(settings.get('languages'), function(lang) {
          if (!$filter('filter')(vm.article.languages, {code: lang.code})[0]) {
            vm.languages.push(lang)
          };
        });
        vm.selectLanguage = vm.languages[0].code
        vm.selectPage = vm.article.page
        vm.title = vm.article.content[vm.currentLang].title
        vm.frontMatterContent = vm.article.content[vm.currentLang].frontMatter
        vm.mainMatterContent = vm.article.content[vm.currentLang].mainMatter        
      }
      else {
        vm.languages = settings.get('languages')
        vm.selectLanguage = vm.languages[0].code
        vm.articles = article.all()
        vm.selectPage = vm.pages[0].title
      }
    }

    function deleteArticle(id) {
      $log.debug("delete")
      article.destroy(id, function(response){
        //display success
        vm.articles = response
        Notification.success('Article deleted.');

      }, function(errResponse){
        //display error mesage
        Notification.error(errResponse.msg)
      })      
    }

    function saveArticle(){
      data = {
        title: vm.title,
        frontMatter: vm.frontMatterContent,
        mainMatter: vm.mainMatterContent,
        page: vm.selectPage       
      }
      article.save(data, vm.articleId, vm.currentLang, function(response){
        vm.article = response
        Notification.success("Article saved")
      }, function(errResponse){
        Notification.error(errResponse.msg)
      })
    }

    function addLanguage() {
      article.addLanguage(vm.articleId, vm.selectLanguage, function(response){
        vm.article = response

        vm.languages = []
        angular.forEach(settings.get('languages'), function(lang) {
          if (!$filter('filter')(vm.article.languages, {code: lang.code})[0]) {
            vm.languages.push(lang)
          };
        });

        vm.selectLanguage = vm.languages[0].code

        Notification.success("Translation added to article.")
      }, function(errResponse){
        Notification.error(errResponse.msg)
      })
    }

    function removeLanguage(lang) {
      article.removeLanguage(vm.articleId, lang, function(response){
        vm.article = response

        vm.languages = []
        angular.forEach(settings.get('languages'), function(lang) {
          if (!$filter('filter')(vm.article.languages, {code: lang.code})[0]) {
            vm.languages.push(lang)
          };
        });

        vm.selectLanguage = vm.languages[0].code

        Notification.success("Translation removed from article.")
      },function(errResponse){
        Notification.error(errResponse)
      })
    }
	}
})()