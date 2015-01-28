'use strict';

/**
 * @ngdoc overview
 * @name ivideontaskApp
 * @description
 * # ivideontaskApp
 *
 * Main module of the application.
 */
angular
  .module('ivideonTaskApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
