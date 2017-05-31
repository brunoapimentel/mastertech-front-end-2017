angular.module('mastertrello').controller("QuadroController", QuadroController);

function QuadroController($scope, $firebaseAuth, $state, $firebaseArray){
    var auth = $firebaseAuth();
    var ref;
    var listaAtiva;

    $scope.novaLista = null;

    $scope.logout = logout;
    $scope.criarLista = criarLista;
    $scope.criarCard = criarCard;
    $scope.definirListaAtiva = definirListaAtiva;

    // Esse método executa a função passada como parâmetro toda vez que o status
    // de autenticação é alterado. Isso também ocorre na primeira vez que o
    // Firebase informa o status do usuário. Note que essa operação é assíncrona,
    // de forma que precisamos esperar a resposta do Firebase para trabalhar
    // com os dados do usuário.
    auth.$onAuthStateChanged(buscarStatus);

    function buscarStatus(firebaseUser){
        // Caso o usuário não esteja autenticado, a variável firebaseUser será
        // nula. Usamos esse if para evitar erros no console ao fazer o logout,
        // já que isso causa uma mudança no status e faz com que essa função
        // seja executada novamente.
        if(! firebaseUser){
            return;
        }

        // Os dados do usuário devem ficar disponíveis no DOM, para que possamos
        // exibir o seu email na tela.
        $scope.usuario = firebaseUser;

        // Já que os dados do usuário já estão carregados, podemos acessar
        // o objeto que armazena as listas do usuário através do seu id.
        ref = firebase.database().ref('usuarios').child($scope.usuario.uid);

        // Essa função cria um array do Firebase na variável $scope.listas.
        $scope.listas = $firebaseArray(ref);
    }

    function logout(){
        // Essa função encerra a sessão do usuário no Firebase. Note que nem
        // o refresh de página encerra a sessão automaticamente.
        auth.$signOut();

        // Além de encerrar a sessão, queremos redirecionar o usuário para a
        // página de login.
        $state.go('login');
    }

    function criarLista($event, novaLista){
        if(!checarEnter($event)){
            return;
        }

        // Como a variável $scope.listas é um array do Firebase, precisamos
        // usar a função especial $add para adicionar items no seu interior.
        // Isso garante que os dados fiquem sincronizados com o Firebase.
        $scope.listas.$add({nome: novaLista});
        novaLista = null;
    }

    function criarCard($event, novoCard){
        if(!checarEnter($event)){
            return;
        }

        if(!listaAtiva.cards){
            listaAtiva.cards = [];
        }

        listaAtiva.cards.push(novoCard);
        $scope.listas.$save(listaAtiva);
        novoCard = null;
    }

    function checarEnter($event){
        return $event.keyCode == 13;
    }

    function definirListaAtiva(lista){
        listaAtiva = lista;
        $scope.listas.$save(listaAtiva);
    }
}
