'use strict';

/**
 * @ngdoc function
 * @name ivideontaskApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ivideontaskApp
 */

angular.module('ivideonTaskApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.ind = 0;
    $scope.getData  = function (limit, seed) {
      var url;

      if (seed) {
        url = 'http://api.ivideon.com/tv/cameras?jsonp=JSON_CALLBACK&limit=' + limit + '&seed=' + seed;
      } else {
        url = 'http://api.ivideon.com/tv/cameras?jsonp=JSON_CALLBACK&limit=' + limit;
      }
      return $http.jsonp(url);
    };
    $scope.getCamImage = function (serverId, cameraId) {
      var url = 'https://streaming.ivideon.com/preview/live?server=' + serverId + '&camera=' + cameraId;
      return url;
    };
    $scope.buildCameraList = function (data) {
      var  key;
      for (key = 0; key < data.length; key++) {
        $scope.getCamImage(data[key].server, data[key].camera);
        data[key].image = $scope.getCamImage(data[key].server, data[key].camera);
        data[key].show = true;
        if (key % 7 === 0) {
          data[key].isFavorite = true;
        }
      }
    };
    $scope.getData(10).success(function (data) {
      $scope.nextSeed = data.response.seeds.next;
      $scope.camerasList = data.response.cameras;
      $scope.buildCameraList($scope.camerasList);
    });
    $scope.loadCam = function () {
      $scope.getData(10).success(function (data) {
        $scope.camerasList = data.response.cameras;
        $scope.buildCameraList($scope.camerasList);
      });
    };
    $scope.loadMore = function () {
      $scope.getData(10, $scope.nextSeed).success(function (data) {
        console.log($scope.camerasList);
        console.log(typeof $scope.camerasList);
        $scope.camerasListTemp = data.response.cameras;
        $scope.camerasList = $scope.camerasList.concat($scope.camerasListTemp);
        $scope.buildCameraList($scope.camerasList);
      });
    };
    $scope.showFavorite = function () {
      console.log($scope.camerasList);
      var key;
      for (key = 0; key < $scope.camerasList.length; key++) {
        if (!$scope.camerasList[key].isFavorite) {
          console.log(!$scope.camerasList[key].isFavorite);
          $scope.camerasList[key].show = false;
        }
      }
    };
    $scope.sayHello = function () {
      console.log('hello!');
    };
  }]);
