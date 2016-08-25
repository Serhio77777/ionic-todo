angular.module('starter.CreationCtrl',['ngCordova', 'ngStorage'])
.controller('CreationCtrl', function($scope, $state, $localStorage, My_service, $cordovaCamera,  $cordovaFile, $cordovaImagePicker, $cordovaFile, $stateParams) {
    $scope.newTodo = {};
    $scope.todo = My_service.get($stateParams.todoIndex);
    $scope.selectedIndex = $stateParams.todoIndex;
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
        $scope.newTodo = My_service.classChange($scope.newTodo);
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
        My_service.addTodo(todo, $scope.picture);
        $scope.picture = undefined;
        $scope.newTodo = {
            type:1
        };
    };
    $scope.rewriteTodo = function (todo) {
        $scope.todos = My_service.rewriteTodo(todo, $scope.picture);
        $scope.picture = undefined;
    };
});
