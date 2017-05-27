var app = angular.module('janken', []);

app.controller('JogoController', JogoController);

// Os serviços são registrados através da função factory do angular.
app.factory('myJson', myJson);
app.factory('jogo', jogo);
