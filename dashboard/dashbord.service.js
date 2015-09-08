(function(){
  'use strict'

  angular
  	.module("adminClient")
  	.factory("dashboardService", dashboardService)

  function dashboardService() {
  	testData = {
  		articles:  []
  		pages:     []
  		users:     []
  		quickPost: {}
  	}
  	
  	var service = {
  		countArticles: countArticles,
  		countPages: 	 countPages,
  		countUsers:    countUsers,
  		getArticles:   getArticles,
  		getPages:      getPages

  	}

  	return service 

  	function countArticles() {

  	}

  	function countPages() {

  	}

  	function countUsers() {

  	}

  	function getArticles() {

  	}

  	function getPages() {

  	}

  }
})()