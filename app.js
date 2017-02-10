(function () {
  'use strict';
  
  var loadAngularModules = [
    "ngRoute",
    'ngSanitize', 
    'froala',
    'ngResource',
    'ui-notification',
    'uiSwitch',
    'ui.tree',
    'ngStorage',
    'ngCookies',
    'ng-backstretch'
  ]

  angular
    .module('adminClient', loadAngularModules)
    .run(authenticate)
    .config(setDebug)
    .config(injectInterceptor)
    .config(setNotifications)
    .config(setRoutes)

  authenticate.$inject = [
    '$rootScope', 
    '$location', 
    '$log',
    '$cookies'
  ];

  function authenticate($rootScope, $location, $log, $cookies) {
    $log.debug("-== Authenticate Path ==-")
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['/login', '/install']) === -1;
      
      if ($location.path() == '/login') {
        $rootScope.loggedIn = false
      };
      
      if ($cookies.get('user')) {
        $rootScope.loggedIn = true
      };
        
      if (restrictedPage && !$cookies.get('user')) {
       $location.path('/login')
      }
    });
  } 

  function setNotifications(NotificationProvider){
    NotificationProvider.setOptions({
      delay: 5000,
      startTop: 65,
      startRight: 30,
      verticalSpacing: 15,
      horizontalSpacing: 20,
      positionX: 'right',
      positionY: 'top'
    });
  }

  function setDebug($logProvider) {
    $logProvider.debugEnabled(true);
  }

  function injectInterceptor($httpProvider){
    $httpProvider.interceptors.push('authInterceptor')
  }
  
  setRoutes.$inject = ['$routeProvider'] 
  function setRoutes($routeProvider, $logProvider, $httpProvider){   
    // Configure url routes
    $routeProvider.
      when('/login', {
      	//Login user
        templateUrl:  'login/login.html',
        controller:   'LoginController',
        controllerAs: 'login',
        // resolve: {
        //   config: function(config){
        //     return config
        //   }
        // }
      }).
      when('/logout', {
        //Logout user
        controller:   'LogoutController',
        controllerAs: 'logout',
        template: ''
      }).
      when('/install', {
        //Admin dashboard
        templateUrl:  'install/install.html',
        controller:   'InstallController',
        controllerAs: 'install',
      }).
      when('/dashboard', {
        //Admin dashboard
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: "dashboard",
        // resove: {
        //   dashboard: function(dashboard){
        //     return dashboard
        //   }
        // }
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
      }).
      otherwise({
        redirectTo: '/dashboard'
      });
  }
})()
