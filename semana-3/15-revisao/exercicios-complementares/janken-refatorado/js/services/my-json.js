/**
    Serviço myJson

    Este serviço é responsável por obter, salvar e atualizar dados na API do
    MyJson. Note que o serviço pode ser usado para salvar qualquer tipo de
    dados; ele não tem nenhuma relação direta com o jogo de Jan Ken Po. Dessa
    forma, podemos reutilizá-lo em outras aplicações.
*/
function myJson($http){
    // Essa variável registra o caminho da API. Se esse caminho for alterado
    // algum dia, é só alterar essa variável que todos os métodos do serviço
    // serão atualizados.
    var endpoint = 'https://api.myjson.com/bins/';

    // Essa função cria um novo JSON na API. Note que ela recebe como segundo
    // parâmetro uma função de callback, que será executada caso a criação
    // seja feita com sucesso.
    function criar(dados, callback){
        var parametros = {
            method: 'POST',
            url: endpoint,
            data: dados
        };

        $http(parametros).then(callback, respostaErro);
    }

    // Essa função busca um JSON na API.
    function obter(id, callback){
        var parametros = {
            method: 'GET',
            url: endpoint + id,
        };

        $http(parametros).then(callback, respostaErro);
    }

    // Essa função busca um JSON na API. É necessário informar o endereço (id)
    // do JSON a ser atualizado.
    function atualizar(id, dados, callback){
        var parametros = {
            method: 'PUT',
            url: endpoint + id,
            data: dados
        };

        $http(parametros).then(callback, respostaErro);
    }

    // Note que internalizamos o tratamento de erros dentro do serviço. Isso
    // simplifica as funções desse serviço, mas vai impedir que façamos um
    // tratamento mais customizado de eventuais erros da API.
    function respostaErro(){
        alert('Um erro ocorreu!');
    }

    // Esse objeto traz as funções que serão acessíveis quando
    // o serviço jogo.
    return {
        criar: criar,
        obter: obter,
        atualizar: atualizar
    }
}
