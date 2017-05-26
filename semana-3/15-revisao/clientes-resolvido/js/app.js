// criar um módulo (1)
var app = angular.module('clientes', []);

//definir uma função para o controller (1)
function ClientesController($scope){
    //criar um objeto vazio que irá armazenar todos os dados do formulário (5)
    $scope.dados = {};
    //vamos utilizar a variável pagina para controlar a página ativa (1)
    $scope.pagina = 'consultar';

    //mover o vetor de clientes para dentro do controller, e colocá-lo dentro da variável $scope, para que ele seja acessível no DOM (2)
    $scope.clientes = [
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

    //criar uma variável que representa o cliente selecionado, que será por padrão o primeiro da lista (3)
    $scope.clienteAtivo = $scope.clientes[0];

    //adicionar a funções que criamos no $scope, para que sejam acessíveis no DOM (4 e 5)
    $scope.setClienteAtivo = setClienteAtivo;
    $scope.cadastrar = cadastrar;

    //essa função irá atribuir o cliente clicado na variável clienteAtivo, que é a variável que é usada para imprimir os dados
    //na coluna da direita da página (4)
    function setClienteAtivo(cliente){
        $scope.clienteAtivo = cliente;
    }

    function cadastrar(){
        //pegar os dados do formulário e inserir no vetor de clientes (4)
        $scope.clientes.push($scope.dados);

        //precisamos atribuir um novo objeto à variável dado (o que fará com que o formulário seja zerado)
        //se não fizermos isso, as alterações no formulário irão afetar o último cliente cadastrado
        $scope.dados = {};
    }
}

//registrar a função como controller no angular (1)
app.controller('ClientesController', ClientesController);
