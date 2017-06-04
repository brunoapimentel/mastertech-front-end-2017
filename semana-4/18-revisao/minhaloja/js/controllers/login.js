angular.module('minhaloja').controller('LoginController', LoginController);

function LoginController($scope, $firebaseAuth, $state){
    var auth = $firebaseAuth();
    $scope.dados = {};
    $scope.login = login;

    function login(){
        auth.$signInWithEmailAndPassword($scope.dados.email, $scope.dados.senha)
        .then(loginSucesso);
    }

    function loginSucesso(usuario) {
        $state.go('admin-lista');
    }
}
