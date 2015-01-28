'use strict';
var app = angular.module('ivideonTaskApp');
app.directive('camImg', ['$interval', function ($interval) {
  return {
    // не очень надежно, scope не изолирован =(
    restrict: 'A',
    link: function (scope, element) {
      element.on('click', function () {
        element.toggleClass('active');
        element.parents('.box').toggleClass('active');
        var interval = function () {
            $interval(function () {
              if (element.context.className.indexOf('active') > 0) {
                scope.item.image = scope.getCamImage(scope.item.server, scope.item.camera) + '&' + Date();
              } else {
                $interval.cancel(interval);
              }
            }, 5000);
          };
        interval();
      });
    }
  };
}]);

app.directive('morebtn', [ function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.on('click', function () {
        scope.loadMore();
      });
    }
  };
}]);

app.directive('favorite', [ function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.on('mouseup', function () {
        if (scope.item.isFavorite === 'undefined') {
          scope.item.isFavorite = false;
        }
        scope.item.isFavorite = !scope.item.isFavorite;
        scope.$apply();
      });
    }
  };
}]);

app.directive('showfav', [function () {
  return {
    restrict: 'A',
    scope: {
      items: '=',
    },
    link: function (scope, element) {
      element.on('click', function () {
        var i;
        for (i in scope.items) {
          if (!scope.items[i].isFavorite) {
            scope.items[i].show = false;
          }
          console.log(scope.items[i]);
          scope.$apply();
        }
      });
    }
  };
}]);

app.directive('totop', [function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.on('click', function () {
        console.log('to top');
        window.scrollTo(0, 0);
      });
    }
  };
}]);

