angular
  .module('adminClient')
  .directive('ngLink', ngLink);

function ngLink($location) {
  return function ( scope, element, attrs ) {
    var path;

    attrs.$observe( 'ngLink', function (val) {
      path = val;
    });

    element.bind( 'click', function () {
      scope.$apply( function () {
        $location.path( path );
      });
    });
  };
}