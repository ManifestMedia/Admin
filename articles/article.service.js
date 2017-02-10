(function(){
  'use strict'

  angular
  	.module("adminClient")
  	.factory("article", article)

  function article($resource, $log, staging, config) {
    $log.debug("-=== Article Service ===-")
  	if (config.adminInstalled) {
      var service = {
        get:     get,
        all:     getAll,
        create:  create,
        update:  update,
        save:    save,
        destroy: destroy
      }  
    } 
    else {
      var service = {
        get:     staging.article,
        all:     staging.articles,
        save:    staging.saveArticle,
        destroy: staging.deleteArticle,
        addLanguage: staging.addLanguageToArticle,
        removeLanguage: staging.removeLanguageFromArticle
      }
    }
     var url = {
      article:  config.host + '/api/articles/:id',
    }
    
    var Article = $resource(url.article)

  	return service

    function get(id, success, error) {
      Article.get({id: id}, function(response){
        $log.debug("-== Get ==-")
        $log.debug(response)
        success(resource)
      }, function(errResponse){
        error(errResponse)
      })
    }

    function getAll(success, error) {
      Article.query(function(response){
        $log.debug("-== Get All ==-")
        $log.debug(response[0])
        success(response)
      }, function(errResponse){
        error(errResponse)
      })
    }

    function create(data, created, error) {
      $log.debug("-== Create ==-")
      Article.save(data, function(response){
        $log.debug("-== Saved ==-")
        $log.debug(response)
        create(response)
      }, function(errResponse){
        error(errResponse)
      })
    }

    function update(data, id, updated, error) {
      var Article = Article.get({id: id}, function(response){
        $log.debug("-== Update ==-")
        $log.debug(response)
        Article.title = data.title
        Article.$save(function(response){
          $log.debug("-== Saved ==-")
          $log.debug(response)
          updated(response)
        }, function(error){
          error(errResponse)
        })
      })
    }

    function save(data, id, saved, error) {
      if (id != null) {
        update(data, id, function(response){
          saved(response)
        }, function(errResponse){
          error(errResponse)
        })
      }
      else {
        create(data, function(response){
          saved(response)
        }, function(errResponse){
          error(errResponse)
        })
      }
    }

    function destroy(id, destroyed, error) {
      $log.debug("-== Delete ==-")
      Article.delete({id: id}, function(response){
        $log.debug("-== Deleted ==-")
        $log.debug(response)
        destroyed(response)
      }, function(errResponse){
        error(errResponse)
      })
    }
  }
})()