angular.module('config', ['ionic', 'starter.globalControllers', 'starter.CreationCtrl', 'starter.services', 'ngStorage'])
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
        templateUrl: 'templates/sidemenu.html',
        controller: 'SideMenuCtrl'
    })
    .state('menu.tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs-folder/tabs.html'
    })
    // Each tab has its own nav history stack:
    .state('menu.tab.todos', {
        url: '/todos',
        views: {
            'todos-tab': {
                templateUrl: 'templates/tabs-folder/todos.html'
            }
        },
        cache: false
    })
    .state('menu.tab.todo', {
        url: '/todos/:todoIndex',
        views: {
            'todos-tab':{
                templateUrl: 'templates/tabs-folder/into/todo.html',
                controller: 'SideMenuCtrl'
            }
        },
        cache: false
    })
    .state('menu.tab.todo-editing', {
      url: '/todos/editing/:todoIndex',
        views: {
            'todos-tab':{
                templateUrl: 'templates/tabs-folder/into/editing.html',
                controller: 'CreationCtrl'
            }
        }
    })
    .state('menu.tab.creation', {
        url: '/creation',
        views: {
            'creation-tab': {
                templateUrl: 'templates/tabs-folder/creation.html',
                controller: 'CreationCtrl'
            }
        }
    })
    .state('menu.tab.settings', {
        url: '/settings',
        views: {
            'settings-tab': {
                templateUrl: 'templates/tabs-folder/settings.html',
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/menu/tab/todos');
});
