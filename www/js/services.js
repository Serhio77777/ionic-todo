angular.module('starter.services',  ['ngCordova','ngStorage'])

.factory('My_service', function($localStorage, $cordovaCamera, $ionicSideMenuDelegate) {
    var sidebool, max, min;
    function getTodos() {
      return $localStorage.newTodosSave || [];
    };
    return {
            getAll: function() {
                        return getTodos();
            },
            addTodo: function(todo, myImage) {
                        todo.type = 1;
                        if (($localStorage.newTodosSave.length === 0) || ($localStorage.newTodosSave.length === undefined)){
                           max = 0;
                           min = 0;
                        } else {
                          max = $localStorage.newTodosSave.length;
                          min = $localStorage.newTodosSave.length;
                        }
                        todo.id = Math.floor(Math.random() * (max - min)) + min;
                        if (!todo.name ) {
                            alert('Error: Enter name!');
                            return;
                        }
                        if (!todo.date) {
                            alert('Error: Enter date!');
                            return;
                        }
                        todo.image = myImage;
                        if ($localStorage.newTodosSave === undefined) {
                            $localStorage.newTodosSave = [];
                            $localStorage.newTodosSave.push(todo);
                        } else {
                            $localStorage.newTodosSave.push(todo);
                        };
                        return getTodos();
            },
            rewriteTodo: function(todo, myImage) {
                        todo.type = 1;
                        if (($localStorage.newTodosSave.length === 0) || ($localStorage.newTodosSave.length === undefined)){
                           max = 0;
                           min = 0;
                        } else {
                          max = $localStorage.newTodosSave.length;
                          min = $localStorage.newTodosSave.length;
                        }
                        todo.id = Math.floor(Math.random() * (max - min)) + min;
                        if (!todo.name ) {
                            alert('Error: Enter name!');
                            return;
                        }
                        if (!todo.date) {
                            alert('Error: Enter date!');
                            return;
                        }
                        todo.image = myImage;
                        for (var i = 0; i < todos.length; i++) {
                            if (todos[i].id === parseInt(todoId)) {
                              return $localStorage.newTodosSave = getTodos().filter(function(el, ind) {
                                  return index !== ind;
                              });                            }
                        }
                        if ($localStorage.newTodosSave === undefined) {
                            $localStorage.newTodosSave = [];
                            $localStorage.newTodosSave.push(todo);
                        } else {
                            $localStorage.newTodosSave.push(todo);
                        };
                        return getTodos();
            },
            changeTodo: function(todo) {
                        todo.id = Math.floor(Math.random() * (max - min)) + min;
                        $localStorage.newTodosSave.push(todo);
                        return getTodos();
            },
            removeTodo: function(index) {
                            return $localStorage.newTodosSave = getTodos().filter(function(el, ind) {
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
                        return todos[i];
                    }
                }
                return null;
            },
            sideMenu: function(bool) {
                 sidebool = bool;
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
            }

    };
});
