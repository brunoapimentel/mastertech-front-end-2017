/*
    Vamos criar o um módulo através dessa função do angular.
    Note que o segundo parâmetro é um vetor vazio, porém ele é indispensável.
    O segundo parâmetro indica que estamos criando um módulo.
*/
var app = angular.module('todo', []);

/*
    Estamos criando um controller através dessa função do angular.
    O primeiro parâmetro é o nome do controller, o segundo é uma função
    que será executada na criação do controller.

    Note que a função recebe um parâmetro chamado $scope. O angular
    preenche o valor dessa variável de acordo com o seu nome (é o que
    chamamos de injeção de dependências).
*/
app.controller('TodoController', function($scope){
    //declaração de variáveis
    $scope.dados = {};
    $scope.tarefas = [];

    //atribuição de funções ao $scope
    $scope.inserirTarefa = inserirTarefa;
    $scope.fazerTarefa = fazerTarefa;
    $scope.limparTarefas = limparTarefas;

    //declaração de funções
    function inserirTarefa(){
        var tarefa = {
            nome: $scope.dados.nome,
            feita: false
        }

        $scope.tarefas.push(tarefa);
    }

    function fazerTarefa(tarefa){
        tarefa.feita = true;
    }

    function limparTarefas(){
        $scope.tarefas = [];
    }
});
