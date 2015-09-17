(function(){
  'use strict'

  angular
  	.module("adminClient")
  	.factory("dashboard", dashboard)

  function dashboard($resource, $log, config, dummyData, article, page, user) {
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
        pages:         dummyData.pages,
        deletePage:    dummyData.deletePage,
        articles:      dummyData.articles,
        saveQuickPost: saveQuickPost,
        deleteArticle: dummyData.deleteArticle,
        countArticles: dummyData.articles().length,
        countPages:    dummyData.pages().length,
        countUsers:    dummyData.users().length,
      }
    }

  	return service 

    function saveQuickPost(data, saved, error) {
      dummyData.saveArticle(data, null, function(response){
        saved(response)
      }, function(errRsponse){
        error(errRsponse)
      })
    }
  }
})()