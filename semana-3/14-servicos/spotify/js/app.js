var app = angular.module('spotify', []);

function BuscaController($scope, $http){
    $scope.entrada = null;
    $scope.artistas = null;
    $scope.erro = false;

    $scope.buscar = buscar;
    $scope.buscarNoEnter = buscarNoEnter;

    var tempoInicio;

    function buscar(){
        $scope.erro = false;

        var parametros = {
            method: 'GET',
            url: 'https://api.spotify.com/v1/search?type=artist&q=' + $scope.entrada
        };

        $http(parametros).then(respostaSucesso, respostaErro);
    };

    function respostaSucesso(resposta){
        $scope.artistas = resposta.data.artists.items;
    }

    function respostaErro(){
        $scope.artistas = null;
        $scope.erro = true;
    }

    function buscarNoEnter(event){
        //verificar o código da tecla pressionada
        //o código 13 é a tecla 'enter' 
        if(event.keyCode == 13){
            buscar();
        }
    }
}

app.controller('BuscaController', BuscaController);
