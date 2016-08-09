angular.module('starter.controllers',['ngCordova', 'ngStorage'])
.controller('AllTodos', function($scope) {
    /*$scope.classChange = creation.classChange;*/
})
.controller('CreationCtrl', function($scope, My_service) {
    $scope.newTodo = {};
    $scope.todos = My_service.getAll();
    $scope.addTodo = function (todos) {
        if (!todo) {
            return;
        };
        $scope.todos = My_service.addTodo(todo);
        $scope.newTodo = {};
    };
    $scope.removeTodo = function(index) {
        $scope.todos = My_service.removeTodo(index);
    };
    /*$scope.My_service = My_service.all();
    $scope.remove = function(My_service) {
        creation.remove(My_service);
    };
    $scope.classChange = My_service.classChange;*/
})
.controller('SettingsCtrl', function($scope, My_service) {
/*
    $scope.settings = {
        radio: true
    };
    $scope.$watch('settings.radio', function(newValue, oldValue) {
        if (newValue === true) {
            My_service.openMenu('1');
        } else {
            My_service.openMenu('2');
        }
    });
    $scope.classChange = creation.classChange;*/
});
