(function () {
    'use strict';
 
  angular
    .module("adminClient")
    .config(['$routeProvider', function($routeProvider) {   
      // Configure url routes
      $routeProvider.
      when('/', {
      	//Admin dashboard
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'dashboard',
      }).
      when('/dashboard', {
        //Admin dashboard
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: "dashboard"
      }).
      when('/profile', {
        //Profile page
        templateUrl: 'profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profile'
      }).
      when('/pages/:id?', {
        //List pages, add page
        templateUrl: 'pages/pages.html',
        controller: 'PagesController',
        controllerAs: 'pages'
      }).
      when('/articles', {
        //List articles
        templateUrl: 'articles/articles.html',
        controller: 'ArticlesController',
        controllerAs: 'articles'
      }).
      when('/article/:id?', {
        //Create article
        templateUrl: 'articles/article.html',
        controller: 'ArticlesController',
        controllerAs: 'articles'
      }).
      when('/users', {
        //List users
        templateUrl: 'users/users.html',
        controller: 'UsersController',
        controllerAs: 'users'
      }).
      when('/user/:id?', {
        //Create new user
        templateUrl: 'users/user.html',
        controller: 'UsersController',
        controllerAs: 'users'
      }).
      when('/settings', {
        //Settings page
        templateUrl: 'settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'settings'
      })
    }])    
})()
