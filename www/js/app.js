// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngStorage'])

.run(function($ionicPlatform, $cordovaSplashscreen, $cordovaNetwork) {
  document.addEventListener("deviceready", function () {
      var type = $cordovaNetwork.getNetwork()
      var isOnline = $cordovaNetwork.isOnline()
      var isOffline = $cordovaNetwork.isOffline()
      $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
          var onlineState = networkState;
      })
      $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
          var offlineState = networkState;
      })
  }, false);
  $ionicPlatform.ready(function() {
      setTimeout(function() {
          $cordovaSplashscreen.hide()
          }, 5000)

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
$ionicConfigProvider.tabs.position('top');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('menu', {
    url: '/menu',
    abstract: true,
    templateUrl: 'sidemenu.html',
    controller: 'SideMenuCtrl'
  })
    .state('menu.tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  // Each tab has its own nav history stack:
  .state('menu.tab.todos', {
      url: '/todos',
      views: {
        'todos-tab': {
          templateUrl: 'templates/todos.html',
          controller: 'AllTodos'
        }
      }
    })
    .state('menu.tab.todos.todo', {
        url: '/todo',
        templateUrl: 'templates/templates/todo.html',
        controller: 'AllTodos'
    })
    .state('menu.tab.todos.todo.edit', {
        url: '/edit',
        templateUrl: 'templates/templates/edit.html',
        controller: 'AllTodos'
    })
    .state('menu.tab.creation', {
      url: '/creation',
      views: {
        'creation-tab': {
          templateUrl: 'templates/creation.html',
          controller: 'CreationCtrl'
        }
      }
    })
  .state('menu.tab.settings', {
    url: '/settings',
    views: {
      'settings-tab': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/menu/tab/todos');

});
