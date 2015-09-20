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
    'ngCookies',
    'ng-backstretch'
  ]

  angular
  	.module('adminClient', loadAngularModules)   	
  	.value("config", {
  		"debug": 					true,
  		"host": 					"",
  		"adminInstalled": false
  	})
    
    .config(['$logProvider', 'NotificationProvider', function($logProvider, NotificationProvider, config){
    	// Set debug msgs on/off
      $logProvider.debugEnabled(true);
      NotificationProvider.setOptions({
          delay: 5000,
          startTop: 65,
          startRight: 30,
          verticalSpacing: 15,
          horizontalSpacing: 20,
          positionX: 'right',
          positionY: 'top'
      });
    }])
 })()
