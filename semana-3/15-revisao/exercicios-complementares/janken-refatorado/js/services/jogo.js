/**
    Serviço jogo

    Este serviço é responsável por controlar toda a mecânica do jogo.
*/
function jogo($interval, myJson){
    // Como só existirá um jogo na página, vamos usar essa variável local do
    // serviço para centralizar as informações do jogo.
    // Essa variável será vinculada ao $scope do controller e atualizada
    // conforme o jogo se desenrola.
    // Note que como só existe uma única instância do serviço jogo em toda a
    // aplicação, essa variável será única toda vez que usarmos o serviço,
    // mesmo que em controllers diferentes.
    var jogo = {
        jogador1: {},
        jogador2: {},
        sala: null
    };

    // Essa variável também é local para o serviço e única na aplicação. A
    // diferença é que ela não será vinculada ao $scope, já que ela é uma
    // variável interna de controle e não tem relevância para o usuário.
    var numeroJogador;

    // Essa variável vai controlar com qual frequência nosso jogo será
    // atualizado com dados da API. 2000 representa 2 segundos.
    var intervaloSincronização = 2000;

    // Essa função é usada para iniciar o jogo tanto para o jogador 1 como para
    // o jogador 2.
    function iniciarJogo(nome, sala){
        if(sala){
            // Se a sala for informada, indica que o jogador atual é o 2 e devemos
            // entrar na sala.
            numeroJogador = 2;
            entrarSala(nome, sala);
        }else{
            // Se a sala não for informada, indica que o jogador atual é o 1 e
            //devemos criar um nova sala.
            numeroJogador = 1;
            criarSala(nome);
        }

        return jogo;
    }

    // Função usada para iniciar o jogo para o jogador 1.
    function criarSala(nome){
        jogo.jogador1.nome = nome;

        // Chamamos o serviço myJson, que é responsável por gerenciar os dados da
        // aplicação.
        myJson.criar(jogo, function(resposta){
            // A resposta vai trazer o código do json armazenada como último
            // parâmetro da url. A função split divide a string em diversas
            // partes e as coloca em um vetor. A divisão será feita em toda
            // ocorrência do caractere '/'.
            var partes = resposta.data.uri.split('/');

            // A função pop retorna o último item do vetor, que é o id do JSON
            // armazenado na api do MyJson, e será usadao como id da sala.
            jogo.sala = partes.pop();

            // O jogo foi iniciado, precisamos manter nossa aplicação atualizada
            // com os dados da API.
            iniciarSincronizacao();
        });
    }

    // Função usada para iniciar o jogo para o jogador 2.
    function entrarSala(nome, sala){
        // Vamos inserir os dados do jogador 2 e o número da sala dentro da
        // variável jogo, para que elas sejam acessadas em toda a aplicação.
        jogo.jogador2.nome = nome;
        jogo.sala = sala;

        // Vamos buscar as informações da sala informada na API.
        myJson.obter(sala, function(resposta){
            // A resposta vai nos trazer os dados do jogador 1, que serão
            // armazenados na objeto jogo.
            jogo.jogador1 = resposta.data.jogador1;

            // Precisamos atualizar as informações do jogo na API com os dados
            // do jogador 2, que foram informados pelo usuário.
            myJson.atualizar(jogo.sala, jogo);

            // O jogo foi iniciado, precisamos manter nossa aplicação atualizada
            // com os dados da API.
            iniciarSincronizacao();
        });
    }

    // Essa função vai buscar a cada 2 segundos os dados na API para verificar
    // se houve alguma mudança.
    function sincronizar(){
        myJson.obter(jogo.sala, function(resposta){
            // Vamos atualizar os dados de ambos os jogadores com o que foi
            // informado.
            jogo.jogador1 = resposta.data.jogador1;
            jogo.jogador2 = resposta.data.jogador2;
        });
    }

    // Essa função vai fazer a jogada com o valor informado pelo usuário.
    function fazerJogada(valor){
        // Vamos acessar a chave referente ao jogador que está 'logado' no
        // nosso sistema. Para isso, vamos concatenar a string 'jogador' com
        // o número do jogador.
        // Depois obter o objeto que representa o jogador, vamos inserir a
        // jogada realizada por ele.
        jogo["jogador"+numeroJogador].jogada = valor;

        // Precisamos atualizar os dados na API com a jogada feita.
        myJson.atualizar(jogo.sala, jogo);
    }

    // Essa função inicializa um intervalo de repetição da função sincronizar.
    function iniciarSincronizacao(){
        $interval(sincronizar, intervaloSincronização);
    }

    // Esse objeto será acessado no controller quando utilzarmos o serviço jogo.
    // Note que as únicas funções acessíveis para o controller são iniciarJogo e
    // fazerJogada. Todas as outras funções são internas do serviço, e não
    // há necessidade de acessá-las.
    return{
        iniciarJogo: iniciarJogo,
        fazerJogada: fazerJogada
    }
}
