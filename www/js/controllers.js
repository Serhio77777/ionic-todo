angular.module('starter.controllers',['ngCordova', 'ngStorage'])
.controller('AllTodos', function($scope, $localStorage, My_service, $rootScope) {
    $scope.todos = My_service.getAll();
    $scope.removeTodo = function(index) {
        $scope.items = My_service.removeTodo(index);
        $scope.todos = My_service.getAll();
        $rootScope.$broadcast('delete');
    };
    $scope.classChange = function(todo) {
        $scope.todos = My_service.classChange(todo);
        $scope.todos = My_service.getAll();
    };
    $rootScope.$on('delete', function(){
        $scope.todos = My_service.getAll();
    });
})
.controller('CreationCtrl', function($scope, $localStorage, My_service, $cordovaCamera, $rootScope,  $cordovaFile, $cordovaImagePicker, Cam, LS) {
    $scope.newTodo = {};
    $scope.todos = My_service.getAll();
    $scope.picture = 'http://placehold.it/300x300';
    $scope.addTodo = function (todo) {
        if (!todo) {
            return;
        };
        $scope.todos = My_service.addTodo(todo);
        $rootScope.$emit('delete');
        $rootScope.$broadcast('delete');
        $scope.newTodo = {};
    };
    $scope.changeTodo = function (todo) {
        $scope.todos = My_service.changeTodo(todo);
        $rootScope.$emit('delete');
    };
    // $scope.picture = "http://placehold.it/300x300";

    $scope.user = LS.getIt('user') || {};
    $scope.showAlert = function(title, text) {
      $ionicPopup.alert({
        title: title,
        template: text
      });
    };
    $scope.setUser = function() {
      LS.setIt('user', $scope.user);
    };
    $scope.getPic = function(source) {
      var opt = {
        sourceType: source
      };
      console.log(opt, source);
      $scope.user.ava = res;
      Cam.getPic(opt).then(function(res) {
        $scope.setUser();
      }, function(err) {
        $scope.showAlert("Ошибка", err);
      });
    }
})
.controller('SettingsCtrl', function($scope, $localStorage, $ionicSideMenuDelegate, My_service, $rootScope) {
    $scope.removeTodoAll = function() {
        $scope.todos = My_service.removeTodoAll();
        $rootScope.$emit('delete');
        $rootScope.$broadcast('delete');
    };
    $scope.settings = {
      side: false
    };
    $scope.$watch('settings.side', function(newValue, oldValue, $ionicSideMenuDelegate) {
        if (newValue == true) {
          $rootScope.$broadcast('true');
          return;
        } else {
          $rootScope.$broadcast('false');
          return;
        }
    });
  })
.controller('TodoDetailsCtrl', function($scope, $localStorage, My_service, $stateParams) {
  $scope.todo = My_service.get($stateParams.todoId);
})
.controller('SideMenuCtrl', function($scope, $localStorage, My_service, $ionicSideMenuDelegate, $rootScope) {
      $scope.variable = '';
      $rootScope.$on('false', function(){
        $scope.variable = 'right';
        $scope.styleChange = {"justify-content":"flex-start"};
        // $scope.otherSide = 'right';
        // $ionicSideMenuDelegate.toggleRight();
      });
      $rootScope.$on('true', function(){
          $scope.variable = 'left';
          $scope.styleChange = {"justify-content":"flex-end"};
          // $scope.otherSide = 'left';
          // $ionicSideMenuDelegate.toggleLeft();
      });
      $scope.openSideMenu = function() {
          if ($scope.variable === 'left') {
              $ionicSideMenuDelegate.toggleRight();
          } else {
              $ionicSideMenuDelegate.toggleLeft();
          }
      };

      $scope.todos = My_service.getAll();
      $scope.classChange = function(todo) {
          $scope.todos = My_service.classChange(todo);
          $scope.todos = My_service.getAll();
      };
      $rootScope.$on('delete', function(){
          $scope.todos = My_service.getAll();
      });
  });
