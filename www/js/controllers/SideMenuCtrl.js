angular.module('starter.globalControllers',['ngCordova', 'ngStorage'])
.controller('SideMenuCtrl', function($scope, $localStorage, My_service, $ionicSideMenuDelegate, $stateParams) {
    $scope.selectedIndex = $stateParams.todoIndex;
    $scope.todo = My_service.get($stateParams.todoIndex);
    $scope.openTodo = function () {
        $scope.todo = My_service.get($stateParams.todoIndex);
    }
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
        My_service.removeTodo(index);
        $scope.todos = My_service.getAll();
    };
});
