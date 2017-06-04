angular.module('minhaloja').controller('ListaController', ListaController);

function ListaController($scope, $firebaseArray){
    var ref = firebase.database().ref('produtos');
    $scope.produtos = $firebaseArray(ref);
    $scope.excluir = excluir;

    function excluir(produto){
        $scope.produtos.$remove(produto);
    }
}
