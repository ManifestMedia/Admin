(function () {
    'use strict';
 
  angular
    .module("adminClient")
    .run(authenticate)
    .config(['$routeProvider', function($routeProvider) {   
      // Configure url routes
      $routeProvider.
      when('/login', {
      	//Admin dashboard
        templateUrl:  'login/login.html',
        controller:   'LoginController',
        controllerAs: 'login',
      }).
      when('/install', {
        //Admin dashboard
        templateUrl:  'install/install.html',
        controller:   'InstallController',
        controllerAs: 'login',
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
      }).
      otherwise({
        redirectTo: '/dashboard'
      });
    }])
  
  authenticate.$inject = ['$rootScope', '$location', '$log'];
  function authenticate($rootScope, $location, $log) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['/login', '/install']) === -1;

      if (!restrictedPage) {
        $rootScope.loggedIn = false
      };


      if (restrictedPage && !$rootScope.loggedIn) {
        $location.path('/login')
      }
    });
  }
  //   //run.$inject = ['$rootScope', '$location', '$http'];
  // function run($rootScope, $location, $cookies, $http) {
  //     // keep user logged in after page refresh
  //     $rootScope.globals = $cookies.get('globals') || {};
  //     if ($rootScope.globals.currentUser) {
  //         $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
  //     }

  //     $rootScope.$on('$routeChangeStart', function (event, next, current) {
  //         // redirect to login page if not logged in and trying to access a restricted page
  //         var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
  //         var loggedIn = $rootScope.globals.currentUser;

  //         //loggedIn = 1

  //         if (restrictedPage && !loggedIn) {
  //              window.location.href = '/login'
  //         }
  //     });
  //   }    
})()
