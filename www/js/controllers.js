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
.controller('CreationCtrl', function($scope, $localStorage, My_service, $cordovaCamera, $rootScope,  $cordovaFile, $cordovaImagePicker, $cordovaFile, $stateParams) {
    $scope.newTodo = {};
    $scope.todos = My_service.getAll();
    $scope.todo = My_service.get($stateParams.todoId);
    $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            $scope.picture = $scope.imgURI;
        }, function(err) {
            console.error('err')
        });
    };
    $scope.choosePhoto = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            $scope.picture = $scope.imgURI;
        }, function (err) {
            console.error(err);
        });
    }
    if(!$scope.newTodo.type){
        $scope.newTodo.type = 1;
    };
    $scope.classCreationChange = function () {
        if ($scope.newTodo.type === 1) {
            $scope.newTodo.type = 2;
        } else if ($scope.newTodo.type === 2) {
            $scope.newTodo.type = 3;
        } else if ($scope.newTodo.type === 3) {
            $scope.newTodo.type = 1;
        }
    }
    $scope.addTodo = function (todo) {
        if (!todo) {
            return;
        };
        $scope.newTodo.image = $scope.picture;
        $scope.todos = My_service.addTodo(todo, $scope.picture);
        $rootScope.$emit('delete');
        $rootScope.$broadcast('delete');
        $scope.newTodo = {};
    };
    $scope.changeTodo = function (todo) {
        $scope.todos = My_service.changeTodo(todo);
        $rootScope.$emit('delete');
    };
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
.controller('SideMenuCtrl', function($scope, $localStorage, My_service, $ionicSideMenuDelegate, $rootScope) {
    $scope.variable = '';
    $rootScope.$on('false', function(){
        $scope.variable = 'right';
        $scope.styleChange = {"justify-content":"flex-start"};
        $scope.shouldLeftSideMenuBeEnabled = true;
        $scope.shouldRightSideMenuBeEnabled = false;
    });
    $rootScope.$on('true', function(){
        $scope.variable = 'left';
        $scope.styleChange = {"justify-content":"flex-end"};
        $scope.shouldRightSideMenuBeEnabled = true;
        $scope.shouldLeftSideMenuBeEnabled = false;
      });
    $scope.openSideMenu = function() {
        if ($scope.variable === 'left') {
            $scope.shouldRightSideMenuBeEnabled = true;
            $scope.shouldLeftSideMenuBeEnabled = false;
            $ionicSideMenuDelegate.toggleRight();
        } else {
            $scope.shouldLeftSideMenuBeEnabled = true;
            $scope.shouldRightSideMenuBeEnabled = false;
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
