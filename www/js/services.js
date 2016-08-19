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
            },
            getSide: function() {
                        console.log($localStorage.side);
                        return $localStorage.side;
            },
            sideMenu: function(value) {
                        $localStorage.side = value;
            }
            // ,
            // getSide: function() {
            //             return $localStorage.new;
            // },
            // sidemenuSide: function(side) {
            //             $localStorage.newSide = side;
            //             if ($localStorage.newSide.mySide == true) {
            //                 $localStorage.new = 'left';
            //                 $localStorage.new = 'right';
            //             } else if ($localStorage.newSide == false) {
            //                 $localStorage.new = 'right';
            //                 $localStorage.new = 'left';
            //             }
            // }
    };
})
.factory('My_factory', function(){
    return {
        side: false
    };
});
