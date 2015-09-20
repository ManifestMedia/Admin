(function(){
  'use strict'

  angular
  	.module("adminClient")
  	.factory("article", article)

  function article($resource, staging, config) {
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
      all:     /*GET*/    '/api/articles/',
      create:  /*POST*/   '/api/article/',
      get:     /*GET*/    '/api/article/:id',
      update:  /*PUT*/    '/api/article/:id',
      destroy: /*DELETE*/ '/api/article/:id',
    }
    
  	return service

  	function get(id, filter) {
  	
    }

  	function getAll() {
  	
    }

    function create() {

    }

    function update() {

    }

  	function save(data, id, saved, error) {
  	
    }

  	function destroy(id, deleted, error) {

  	}

    function getContentByLang(lang) {

    }
  }



})()