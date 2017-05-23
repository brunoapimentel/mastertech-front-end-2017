var app = angular.module('clientes', []);

app.controller('ListaController', function($scope){
    $scope.clientes = [
        {nome: "Pedro Xablau", avatar: 'avatar1.jpg', email: 'pedroxablau@gmail.com', telefone: '11 1234-5678', idade: 18},
        {nome: "Joana da Silva", avatar: 'avatar2.jpg', email: 'jojosilva@gmail.com', telefone: '11 3344-5678', idade: 21},
        {nome: "Petúnia Tedesco", avatar: 'avatar3.jpg', email: 'ptedesco@hotmail.com', telefone: '12 1234-5578', idade: 23},
        {nome: "Mateus Andrade", avatar: 'avatar4.jpg', email: 'mandrade_1@gmail.com', telefone: '11 2222-5578', idade: 31},
        {nome: "Ambrosina Rocha", avatar: 'avatar5.jpg', email: 'amb_rocha@gmail.com', telefone: '13 1234-5672', idade: 45},
        {nome: "Natália Castro", avatar: 'avatar6.jpg', email: 'natxdecastro@yahoo.com', telefone: '11 1433-3678', idade: 18},
        {nome: "Javier Pires", avatar: 'avatar7.jpg', email: 'jaja_19@gmail.com', telefone: '11 3334-5678', idade: 18},
        {nome: "Antônio Nunes", avatar: 'avatar8.jpg', email: 'tonhao_pirata@gmail.com', telefone: '21 3124-5668', idade: 18},
        {nome: "Einstein", avatar: 'avatar9.jpg', email: 'the_einstein@gmail.com', telefone: '31 1233-3364', idade: 98}
    ];

    $scope.clienteAtivo = $scope.clientes[0];

    $scope.setClienteAtivo = setClienteAtivo;

    function setClienteAtivo(cliente){
        $scope.clienteAtivo = cliente;
    }
});
