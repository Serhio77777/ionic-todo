angular.module('starter.services',  ['ngCordova','ngStorage'])

.factory('My_service', function($localStorage, $cordovaCamera, $ionicSideMenuDelegate) {
    var sidebool;
    function getTodos() {
      return $localStorage.newTodosSave || [];
    };
    return {
            getAll: function() {
                        return getTodos();
            },
            addTodo: function(todo) {
                        todo.type = 1;
                        if (!todo.name ) {
                            alert('Error: Enter name!');
                            return;
                        }
                        if ((!todo.date) || (todo.date.search(/[1-2][0-9][0-9][0-9].[0-1][0-9].[0-3][0-9]/) === -1)) {
                            alert('Error: Enter date in form: yyyy.mm.dd!');
                            return;
                        }
                        if ($localStorage.newTodosSave === undefined) {
                            $localStorage.newTodosSave = [];
                            $localStorage.newTodosSave.push(todo);
                        } else {
                            $localStorage.newTodosSave.push(todo);
                        };
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
            remove: function(someplace) {
                return $localStorage.newTodosSave.name = $localStorage.newTodosSave.name.slice(0, -1);
            },
            savePicture: function(image, todo) {
                $localStorage.newTodosSave.picture = image;
            },
            /*
            get: function(todoId) {
                for (var i = 0; i < todos.length; i++) {
                    if ($localStorage.newTodosSave[i].id === parseInt(todoId)) {
                        return $localStorage.newTodosSave[i];
                    }
                }
                return null;
            },*/
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
