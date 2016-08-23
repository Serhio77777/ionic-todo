angular.module('starter.controllers',['ngCordova', 'ngStorage'])
.controller('SideMenuCtrl', function($scope, $localStorage, My_service, $ionicSideMenuDelegate) {
    $scope.settings = {
        side: false
    }
    $scope.openSideMenu = function(side) {
        $ionicSideMenuDelegate['toggle' + (side ? 'Right' : 'Left')]();
    };
    $scope.todos = My_service.getAll();
    $scope.classChange = function(todo) {
        My_service.classChange(todo);
        $scope.todos = My_service.getAll();
    };
    $scope.removeTodoAll = function() {
      $scope.todos = My_service.removeTodoAll();
    };
    $scope.removeTodo = function(index) {
        $scope.todos = My_service.removeTodo(index);
    };
})
.controller('CreationCtrl', function($scope, $state, $localStorage, My_service, $cordovaCamera, $rootScope,  $cordovaFile, $cordovaImagePicker, $cordovaFile, $stateParams) {
    $scope.newTodo = {};
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
            $scope.imgURI = undefined;
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
        if (!todo.name) {
            alert('Error: Enter name!');
            return;
        }
        if (!todo.date) {
            alert('Error: Enter date!');
            return;
        }
        $state.go('menu.tab.todos');
        $scope.newTodo.image = $scope.picture;
        My_service.addTodo(todo, $scope.picture);
    };
    $scope.rewriteTodo = function (todo) {
        $scope.todos = My_service.rewriteTodo(todo, $scope.picture);
    };
});
