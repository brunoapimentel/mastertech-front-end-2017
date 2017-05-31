// A função config é executada nos primeiros estágios de inicialização do app,
// antes da criação dos controllers. É apenas nessa fase que podemos acessar
// serviços especiais de configuração, que são chamados de 'Providers'.
angular.module('mastertrello').config(rotas);

function rotas($stateProvider, $urlRouterProvider){
    // O $stateProvider registra informações de estado, que representam 'páginas'
    // em nossa aplicação. O primeiro parâmetro é o nome do estado, e o segundo
    // é um objeto de configurações.
    $stateProvider.state('login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController',
        url: '/login'
    });

    $stateProvider.state('cadastro', {
        templateUrl: 'templates/cadastro.html',
        controller: 'CadastroController',
        url: '/cadastro'
    });

    $stateProvider.state('quadro', {
        templateUrl: 'templates/quadro.html',
        controller: 'QuadroController',
        url: '/quadro'
    });

    // O $urlRouterProvider permite, entre outras coisas, que seja definida
    // uma rota padrão que usada como padrão caso nenhuma outra rota esteja
    // em efeito.
    $urlRouterProvider.otherwise('/login');
}
