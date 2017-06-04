angular.module('minhaloja').config(rotas);

function rotas($stateProvider, $urlRouterProvider) {
    var login = {
        name: 'login',
        url: '/login',
        templateUrl: 'templates/admin-login.html',
        controller: 'LoginController'
    };

    var adminLista = {
        name: 'admin-lista',
        url: '/admin-lista',
        templateUrl: 'templates/admin-lista-produtos.html',
        controller: 'ListaController'
    };

    var adminCadastro= {
        name: 'admin-cadastro',
        url: '/admin-cadastro',
        templateUrl: 'templates/admin-cadastro-produto.html',
        controller: 'CadastroController'
    };

    $stateProvider.state(login);
    $stateProvider.state(adminLista);
    $stateProvider.state(adminCadastro);

    $urlRouterProvider.otherwise('/login');
}
