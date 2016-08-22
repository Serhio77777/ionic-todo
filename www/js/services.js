angular.module('starter.services',  ['ngCordova','ngStorage'])

.factory('My_service', function($localStorage, $cordovaCamera, $ionicSideMenuDelegate) {
    var sidebool, max, min;
    return {
            getAll: function() {
                        return $localStorage.newTodosSave;
            },
            addTodo: function(todo, myImage) {
                        if ($localStorage.newTodosSave && $localStorage.newTodosSave.length === 0) {
                           max = 0;
                           min = 0;
                        } else {
                            max = $localStorage.newTodosSave.length;
                            min = $localStorage.newTodosSave.length;
                        }
                        todo.id = Math.floor(Math.random() * (max - min)) + min;
                        todo.image = myImage;
                        if ($localStorage.newTodosSave === undefined) {
                            $localStorage.newTodosSave = [];
                            $localStorage.newTodosSave.push(todo);
                        } else {
                            $localStorage.newTodosSave.push(todo);
                        };
                        return $localStorage.newTodosSave;
            },
            rewriteTodo: function(todo, anotherImage) {
                        todo.image = anotherImage;
                        return $localStorage.newTodosSave;
            },
            removeTodo: function(index) {
                        return $localStorage.newTodosSave = $localStorage.newTodosSave.filter(function(el, ind) {
                            return index !== ind;
                        });
            },
            removeTodoAll: function() {
                        return $localStorage.newTodosSave = [];
            },
            get: function(todoId) {
                        var todos = $localStorage.newTodosSave;
                        for (var i = 0; i < todos.length; i++) {
                            if (todos[i].id === parseInt(todoId)) {
                                todos[i].date = new Date(todos[i].date);
                                return todos[i];
                            }
                        }
                        return null;
            },
            classChange: function(todo) {
                        switch (todo.type) {
                          case 1: todo.type = 2;
                            break;
                          case 2: todo.type = 3;
                            break;
                          case 3: todo.type = 1;
                            break;
                        }
                        return todo;
            }
    };
});
