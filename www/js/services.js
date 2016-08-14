angular.module('starter.services',  ['ngCordova','ngStorage'])

.factory('My_service', function($localStorage, $cordovaCamera, $ionicSideMenuDelegate) {
    var sidebool, max, min;
    function getTodos() {
      return $localStorage.newTodosSave || [];
    };
    return {
            getAll: function() {
              console.log($localStorage.newTodosSave, $localStorage.newTodosSave.length);
                        return getTodos();
            },
            addTodo: function(todo) {
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
            // remove: function(someplace) {
            // },
            //     return $localStorage.newTodosSave.name = $localStorage.newTodosSave.name.slice(0, -1);
            savePicture: function(image, todo) {
                $localStorage.newTodosSave.picture = image;
            },
            get: function(todoId) {
                console.log(todoId);
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
})
.factory('Cam', function($q) {
  return {
    getPic: function(opt) {
      var q = $q.defer(), res;
      console.log(res, opt);
    navigator.camera.getPicture(function(res) {
        q.resolve(res);
      }, function(err) {
        q.reject(err);
      }, opt);
      return q.promise;
    }
  };
})
.factory('LS', function($localStorage, $cordovaCamera) {
  return {
    getIt: function(item) {
      var it = false;
      try {
        it = JSON.parse(localStorage.getItem(item));
        return it;
      } catch(e) {
        console.log(e);
        return it;
      }
    },
    setIt: function(item, obj) {
      try {
        localStorage.setItem(item, JSON.stringify(obj));
        return true;
      } catch(e) {
      }
        console.err(e);
        return false;
      }
  };
});
