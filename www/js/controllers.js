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
.controller('CreationCtrl', function($scope, $localStorage, My_service, $cordovaCamera, $rootScope, $cordovaImagePicker) {
    $scope.newTodo = {};
    $scope.todos = My_service.getAll();
    $scope.picture = 'http://placehold.it/300x300';
    $scope.addTodo = function (todo) {
        if (!todo) {
            return;
        };
        $scope.todos = My_service.addTodo(todo);
        $scope.newTodo = {};
    };
    $scope.takePicture = function (todo) {
      var options = {
          destinationType: Camera.DestinationType.DATA_URL,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          saveToPhotoAlbum: true,
          correctOrientation:true
          };
          $cordovaCamera.getPicture(options).then(function(imageData){
              image.src = "data:image/jpeg;base64," + imageData;
              My_service.savePicture(image.src, todo);
          }, function(err) {
              console.error('Something wrong!')
          });
    };
    $scope.back = function (someplace) {
        My_service.remove(someplace);
    };
    $scope.getPicture = function(todo) {
      var options = {
           maximumImagesCount: 10,
           width: 800,
           height: 800,
           quality: 80
          };

          $cordovaImagePicker.getPictures(options)
            .then(function (results) {
              for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
                image.src = "data:image/jpeg;base64," + results[i];
                My_service.savePicture(image.src, todo);
              }
            }, function(error) {
                console.error('Something wrong!')
            });
    }
    // $rootScope.$broadcast('CreationCtrl', getall())

    /*$scope.My_service = My_service.all();
    $scope.remove = function(My_service) {
        creation.remove(My_service);
    };*/
})
.controller('SettingsCtrl', function($scope, $localStorage, $ionicSideMenuDelegate, My_service, $rootScope) {
    $scope.removeTodoAll = function() {
        $scope.todos = My_service.removeTodoAll();
        $rootScope.$emit('delete');
        $rootScope.$broadcast('delete');
        //$rootScope.$broadcast('CreationCtrl');
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
.controller('SideMenuCtrl', function($scope, $localStorage, My_service, $ionicSideMenuDelegate, $rootScope) {
      $scope.variable = '';
      $rootScope.$on('false', function(){
        $scope.variable = 'right';
      });
      $rootScope.$on('true', function(){
          $scope.variable = 'left';
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
