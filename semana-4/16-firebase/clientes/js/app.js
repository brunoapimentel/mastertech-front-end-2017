// Como vamos usar duas bibliotecas externas, preciamos informá-las como
// dependências do nosso módulo. Isso é feito através do segundo parâmetro da
// função angular.module. O nome exato a ser informado para cada biblioteca é
// definido pelo autor e deve ser buscado na documentação.
var app = angular.module('clientes', ['firebase', 'ngMask']);
app.controller('ClientesController', ClientesController);

function ClientesController($scope, $firebaseArray){
    // Buscar a referência do objeto do banco de dados do Firebase que
    // vamos trabalhar. Nesse caso, o objeto se chama 'clientes' e está na
    // raiz do banco.
    var ref = firebase.database().ref('clientes');
    $scope.modoEdicao = false;

    $scope.dados = {};
    $scope.pagina = 'consultar';

    // Com a referência do Firebase, vamos usar o serviço $firebaseArray para
    // gerar um array do Firebase nessa variável. Esse array é especial pois
    // ele é sincronizado automaticamente com o Firebase, e também porque ele
    // usa funções diferentes de um array de JS puro.
    $scope.clientes = $firebaseArray(ref);
    $scope.clienteAtivo = null;

    $scope.setClienteAtivo = setClienteAtivo;
    $scope.cadastrar = cadastrar;
    $scope.editar = editar;
    $scope.atualizar = atualizar;

    // O método $loaded é um dos métodos especiais do array do Firebase. Ele
    // executa a função informada assim que os dados são carregados. Lembre-se
    // que essa operação é assíncrona, ou seja, ela demora um tempo para ter
    // seu retorno e as próximas linhas de código serão executadas antes disso.
    $scope.clientes.$loaded(inicializar);

    function inicializar(){
        $scope.clienteAtivo = $scope.clientes.$keyAt(0);
    }

    function setClienteAtivo(cliente){
        $scope.clienteAtivo = cliente;
    }

    function cadastrar(){
        // Para adicionar um item ao array do Firebase, precisamos usar o método
        // $add. O método push existe, porém se o utilizamos, os dados não são
        // sincronizados com o Firebase.
        $scope.clientes.$add($scope.dados);

        $scope.dados = {};
    }

    function atualizar(){
        // Essa função salva alterações em um objeto do array no Firebase. Note
        // que o array do Firebase é sincronizado automaticamente, o que quer
        // dizer que todo item adicionado ou removido do vetor é automaticamente
        // adicionado ou removido do Firebase. Porém, o vetor não consegue
        // identificar mudanças dentro de um objeto já existente, e por isso,
        // precisamos informá-lo através do método $save.
        $scope.clientes.$save($scope.dados);
    }

    function editar(){
        $scope.modoEdicao = true;
        $scope.pagina = 'adicionar';
        $scope.dados = $scope.clienteAtivo;
    }
}
