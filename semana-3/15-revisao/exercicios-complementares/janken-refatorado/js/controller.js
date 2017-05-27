function JogoController($scope, jogo){
    $scope.dados = {
        nome: null,
        sala: null
    };

    $scope.criarSala = criarSala;
    $scope.entrarSala = entrarSala;
    $scope.fazerJogada = jogo.fazerJogada;

    $scope.jogo = null;

    function criarSala() {
        $scope.jogo = jogo.iniciarJogo($scope.dados.nome);
    }

    function entrarSala() {
        $scope.jogo = jogo.iniciarJogo($scope.dados.nome, $scope.dados.sala);
    }
}
