(function(){
  'use strict'

  angular
  	.module("adminClient")
  	.factory("page", page)

  function page($resource, $filter, staging, config) {
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
        get:     staging.page,
        all:     staging.pages,
        save:    staging.savePage,
        destroy: staging.deletePage
      }
    }

    var url = {
      all:     /*GET*/    '/api/pages/',
      create:  /*POST*/   '/api/page/',
      get:     /*GET*/    '/api/page/:id',
      update:  /*PUT*/    '/api/page/:id',
      destroy: /*DELETE*/ '/api/page/:id',
    }

  	return service

  	function get(id) {
      var Page = $resource(url.getPage)
      var page = Page.get({id: id})
      return page
  	}

  	function getAll() {
      var pages = resource(url.pages).get()
      return pages
  	}

    function create() {

    }

    function update() {

    }

  	function save(data, id, saved, error) {
      if(data.title == null){
        error({msg: "Please enter page title, before saving"})
        return
      }
      
      Page.save(pageData, function(response){
        saved(response)
      }, function(errResponse){
        error(errResponse)
      })
  	}

  	function destroy(id, deleted, error) {
      var Page = $resource(url.deletePage)

      Page.delete({id: id}, function(response){
        deleted(response)
      }, function(errResponse){
        error(errResponse)
      })
  	}
  }
})()