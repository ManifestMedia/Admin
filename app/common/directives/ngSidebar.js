(function(){
  'use strict'
  angular
    .module('adminClient')
    .directive('ngSidebar', ngSidebar);

  function ngSidebar($location) {
    var open = true
    var directive = {
      link: link
    }
    return directive 

    function link ( scope, element, attrs ) {
      $("#toggle-sidebar").bind( 'click', function () {
        if(open){
          element.find("span").fadeOut(100)
          element.find("h5").fadeOut(100, function(){
            element.find("img").animate({"width" : 40})  
            element.animate({"width" : "60px"})
            $("#main-content").animate({"margin-left" : "60px"})  
          })
        }
        else {
          element.animate({"width" : "210px"}, function(){
            element.find("span").fadeIn(100)
            element.find("h5").fadeIn(100)
            element.find("img").animate({"width" : 60})  
          })
          $("#main-content").animate({"margin-left" : "210px"})   
        }
        open = !open
      });
    };
  }
})()