(function () {
    'use strict';
 
  var loadAngularModules = [
    "ngRoute",
    'ngSanitize', 
    'froala'
  ]

  angular.module('adminClient', loadAngularModules)
     //Configure url routes
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.
      when('/', {
      	//Admin dashboard
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'dashboard'
      }).
      when('/dashboard', {
        //Admin dashboard
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: "dashboard"
      }).
      when('/profile', {
        //Login page
        templateUrl: 'profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profile'
      }).
      when('/pages', {
        //Login page
        templateUrl: 'pages/pages.html',
        controller: 'PagesController',
        controllerAs: 'pages'
      }).
      when('/articles', {
        //Login page
        templateUrl: 'articles/articles.html',
        controller: 'ArticlesController',
        controllerAs: 'articles'
      }).
      when('/new_article', {
        //Login page
        templateUrl: 'articles/new_article.html',
        controller: 'ArticlesController',
        controllerAs: 'articles'
      }).
      when('/users', {
        //Login page
        templateUrl: 'users/users.html',
        controller: 'UsersController',
        controllerAs: 'users'
      }).
      when('/new_user', {
        //Login page
        templateUrl: 'users/new_user.html',
        controller: 'UsersController',
        controllerAs: 'users'
      }).
      when('/settings', {
        //Login page
        templateUrl: 'settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'settings'
      })
    }])
    
    // .value('froalaConfig', {
    //   inlineMode: false,
    //   height: 450,
    //   events : {
    //     align : function(e, editor, alignment){
    //       console.log(alignment + ' aligned');
    //     }
    //   }
    // })
})()
