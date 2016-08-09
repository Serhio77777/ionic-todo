angular.module('starter.services',  ['ngCordova','ngStorage'])

.factory('My_service', function($localStorage) {
    function getTodos() {
        return $localStorage.newTodosSave || [];
    };
    return {
            getAll: function() {
                return getTodos();
            },
            addTodo: function(todo) {
              $localStorage.newTodosSave.push(todo);
              return getTodos();
            },
            removeTodo: function(index, todo) {
                return $localStorage.newTodosSave = getItems().filter(function(el, ind) {
                    return index !== ind;
                });
            },
            openMenu: function(value) {
                      if (value == 1) {
                          return  ionicSideMenuDelegate.toggleLeft();
                      } else {
                          return  ionicSideMenuDelegate.toggleRight();
                      }
            },
            /*remove: function(todo) {
              todos.splice(todos.indexOf(todo), 1);
            },
            get: function(todoId) {
                for (var i = 0; i < todos.length; i++) {
                    if ($localStorage.newTodosSave[i].id === parseInt(todoId)) {
                        return $localStorage.newTodosSave[i];
                    }
                }
                return null;
            },
            classChange: function(todo) {
                var i=0;
                switch (i) {
                  case 0: todo.checked = 'new';
                    break;
                  case 0: todo.checked = 'in_progress';
                    break;
                  case 0: todo.checked = 'done';
                    break;
                }
            }
    */};
});
