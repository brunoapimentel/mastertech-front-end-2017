/**
* Cria um novo quadrado mágico no container indicado
*
* container: um elemento DOM no qual o quadrado vai ser inserido
* tamanho: um número que define a largura e altura do quadrado a ser criado
*/
function fabricarQuadradoMagico(container, tamanho){
    var quadrado = document.createElement('div');
    var cores = ['#fff', '#fbb', '#f99', '#f66', '#f33', '#f00'];
    //Essa variável vai controlar a cor que está sendo exibida no quadrado
    //Note que cada vez que um quadrado for fabricado, uma nova variável
    //indiceCor será criada para aquele novo quadrado
    var indiceCor = 0;

    quadrado.style.width = tamanho +'px';
    quadrado.style.height = tamanho + 'px';
    quadrado.style.backgroundColor = cores[0];
    quadrado.addEventListener('mouseover', trocarCor);

    function trocarCor(){
        indiceCor++;

        if(indiceCor >= cores.length){
            return;
        }

        this.style.backgroundColor = cores[indiceCor];
    }

    //adiciona o quadrado fabricado no elemento DOM que foi passado como
    //parâmetro na execução da função
    container.appendChild(quadrado);
}
