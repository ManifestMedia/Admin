(function(){
  'use strict'

  angular
  	.module("adminClient")
  	.factory("dashboard", dashboard)

  function dashboard($resource, $log, config, staging, article, page, user) {
  	$log.debug(config)

    if (config.adminInstalled) {
      var service = {
        pages:         page.all,
        page:          page.get,
        deletePage:    page.destroy, 
        articles:      article.all,
        article:       article.get,
        saveQuickPost: article.save,
        deleteArticle: article.destroy, 
        countArticles: article.all().length,
        countPages:    page.all().length,
        countUsers:    user.all().length
      }
    }
    else {
      var service = {
        pages:         staging.pages,
        deletePage:    staging.deletePage,
        articles:      staging.articles,
        saveQuickPost: saveQuickPost,
        deleteArticle: staging.deleteArticle,
        countArticles: staging.articles().length,
        countPages:    staging.pages().length,
        countUsers:    staging.users().length,
      }
    }

  	return service 

    function saveQuickPost(data, saved, error) {
      staging.saveArticle(data, null, function(response){
        saved(response)
      }, function(errRsponse){
        error(errRsponse)
      })
    }
  }
})()