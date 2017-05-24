var app = angular.module('clientes', []);

function ListaController($scope, clientes){
    $scope.clientes = clientes.listar();
    $scope.clienteAtivo = $scope.clientes[0];
    $scope.setClienteAtivo = setClienteAtivo;

    function setClienteAtivo(cliente){
        $scope.clienteAtivo = cliente;
    }
}

function FormController($scope, clientes){
    $scope.dados = {};
    $scope.cadastrar = cadastrar;

    function cadastrar(){
        clientes.adicionar($scope.dados);

        $scope.dados = {};
    }
}

function PaginaController($scope){
    $scope.pagina = 'consultar';
}

function clientes(){
    var lista = [
        {nome: "Pedro Xablau", avatar: 'imagens/avatar1.jpg', email: 'pedroxablau@gmail.com', telefone: '11 1234-5678', idade: 18},
        {nome: "Joana da Silva", avatar: 'imagens/avatar2.jpg', email: 'jojosilva@gmail.com', telefone: '11 3344-5678', idade: 21},
        {nome: "Petúnia Tedesco", avatar: 'imagens/avatar3.jpg', email: 'ptedesco@hotmail.com', telefone: '12 1234-5578', idade: 23},
        {nome: "Mateus Andrade", avatar: 'imagens/avatar4.jpg', email: 'mandrade_1@gmail.com', telefone: '11 2222-5578', idade: 31},
        {nome: "Ambrosina Rocha", avatar: 'imagens/avatar5.jpg', email: 'amb_rocha@gmail.com', telefone: '13 1234-5672', idade: 45},
        {nome: "Natália Castro", avatar: 'imagens/avatar6.jpg', email: 'natxdecastro@yahoo.com', telefone: '11 1433-3678', idade: 18},
        {nome: "Javier Pires", avatar: 'imagens/avatar7.jpg', email: 'jaja_19@gmail.com', telefone: '11 3334-5678', idade: 18},
        {nome: "Antônio Nunes", avatar: 'imagens/avatar8.jpg', email: 'tonhao_pirata@gmail.com', telefone: '21 3124-5668', idade: 18},
        {nome: "Einstein", avatar: 'imagens/avatar9.jpg', email: 'the_einstein@gmail.com', telefone: '31 1233-3364', idade: 98}
    ];

    function listar(){
        return lista;
    }

    function adicionar(cliente){
        lista.push(cliente);
    }

    return {
        listar: listar,
        adicionar: adicionar
    }
}

app.controller('ListaController', ListaController);
app.controller('FormController', FormController);
app.controller('PaginaController', PaginaController);
app.factory('clientes', clientes);
