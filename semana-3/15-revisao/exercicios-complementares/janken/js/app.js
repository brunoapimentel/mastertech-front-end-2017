var app = angular.module('janken', []);

function JogoController($scope, $http, $interval){
    // Essa variável vai agrupar as informações que não serão salvas na API.
    $scope.dados = {
        nome: null, // valor do input de nome
        sala: null, // valor do input de sala
        jogador: null // controle do quem é o jogador atual (1 ou 2)
    };

    // Vamos usar essa variável local para centralizar as informações do jogo.
    // Essas informações serão salvas na API.
    $scope.jogo = {
        jogador1: {},
        jogador2: {}
    };

    // Atribuimos ao $scope apenas as funções que serão acessíveis do DOM.
    $scope.criarSala = criarSala;
    $scope.entrarSala = entrarSala;
    $scope.fazerJogada = fazerJogada;

    // Função usada para iniciar o jogo para o jogador 1.
    function criarSala(){
        // Vamos registrar que o jogador atual é o 1, já que ele criou a sala.
        $scope.dados.jogador = 'jogador1';

        // Atualizar os dados do jogo com o nome do jogador.
        $scope.jogo.jogador1 = {
            nome: $scope.dados.nome
        }

        // Agora vamos salvar esses dados na API, fazendo uma requisição do
        // tipo POST.
        var parametros = {
            method: 'POST',
            url: 'https://api.myjson.com/bins/',
            data: $scope.jogo
        }

        // O serviço $http faz a chamada na API, e chama as funções informadas
        // em caso de sucesso e de erro, respectivamente.
        $http(parametros).then(criarSalaSucesso, respostaErro);
    }

    // Função usada para iniciar o jogo para o jogador 2.
    function entrarSala(){
        // Sabemos que o jogador atual é o 2, já que ele entrou numa sala já
        // existente.
        $scope.dados.jogador = 'jogador2';

        // Vamos buscar as informações da sala informada na API através do
        // serviço $http.
        var parametros = {
            method: 'GET',
            url: 'https://api.myjson.com/bins/' + $scope.dados.sala,
        }

        $http(parametros).then(entrarSalaSucesso, respostaErro);
    }

    // Essa função é chamada caso a sala seja criada com sucesso.
    function criarSalaSucesso(resposta){
        // A resposta vai trazer o código do json armazenada como último
        // parâmetro da url. A função split divide a string em diversas
        // partes e as coloca em um vetor. A divisão será feita em toda
        // ocorrência do caractere '/'.
        var partes = resposta.data.uri.split('/');

        // A função pop retorna o último item do vetor, que é o id do JSON
        // armazenado na api do MyJson, e será usadao como id da sala.
        $scope.dados.sala = partes.pop();

        // O jogo foi iniciado, precisamos manter nossa aplicação atualizada
        // com os dados da API.
        iniciarSincronizacao();
    }

    // Essa função será chamada caso a consulta dos dados do jogo na API seja
    // feita com sucesso.
    function entrarSalaSucesso(resposta){
        // Vamos disponibilizar os dados do jogo no DOM.
        $scope.jogo = resposta.data;

        // Atualizar os dados do jogo com o nome informado pelo usuário.
        $scope.jogo.jogador2.nome = $scope.dados.nome;

        // Agora precisamos atualizar a API com os dados do jogador 2.
        var parametros = {
            method: 'PUT',
            url: 'https://api.myjson.com/bins/' + $scope.dados.sala,
            data: $scope.jogo
        }

        $http(parametros);

        // O jogo foi iniciado, precisamos manter nossa aplicação atualizada
        // com os dados da API.
        iniciarSincronizacao();
    }

    // Essa função vai buscar a cada 2 segundos os dados na API para verificar
    // se houve alguma mudança.
    function sincronizar(){
        var parametros = {
            method: 'GET',
            url: 'https://api.myjson.com/bins/' + $scope.dados.sala,
        }

        $http(parametros).then(sincronizarSucesso, respostaErro);
    }

    // Função chamada quando a requisição para sincronizar os dados seja
    // respondida com sucesso.
    function sincronizarSucesso(resposta){
        $scope.jogo = resposta.data;
    }

    // Essa função vai colocar a função sincronizar para ser repetida a cada
    // 2 segundos (2000 está em milisegundos, 2000ms == 2s)
    function iniciarSincronizacao(){
        $interval(sincronizar, 2000);
    }

    // Essa função vai fazer a jogada com o valor informado pelo usuário.
    function fazerJogada(valor){
        // O jogador atual (jogador1 ou jogador2) está registrado na variável
        // $scope.dados.jogador. Essa linha foi usada apenas para deixar o nome
        // mais legível.
        var numeroJogador = $scope.dados.jogador;

        // Vamos acessar o objeto jogador no índice que representa o jogador
        // atual (jogador1 ou jogador2). Então, vamos inserir o valor da jogada.
        $scope.jogo[numeroJogador].jogada = valor;

        // Por fim, vamos atualizar os dados na API.
        var parametros = {
            method: 'PUT',
            url: 'https://api.myjson.com/bins/' + $scope.dados.sala,
            data: $scope.jogo
        }

        $http(parametros);
    }

    // Essa funçao será executada sempre que houver erro em alguma requisição
    // para a API
    function respostaErro(){
        alert("Um erro ocorreu!");
    }
}

app.controller('JogoController', JogoController);
