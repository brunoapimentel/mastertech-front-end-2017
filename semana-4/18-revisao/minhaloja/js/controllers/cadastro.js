angular.module('minhaloja').controller('CadastroController', CadastroController);

function CadastroController($scope, $firebaseArray){
    var ref = firebase.database().ref('produtos');
    var produtos = $firebaseArray(ref);

    $scope.dados = {};
    $scope.cadastrar = cadastrar;

    function cadastrar(){
        produtos.$add($scope.dados);
    }
}
