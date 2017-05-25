# Migrando do Javascript puro para o AngularJs

## 1. Inserindo dados na tela
>JS Puro:
```
<p></p>
```

```
var elemento = document.querySelector('p');
elemento.innerHTML = "João"
```

>Angular: Usamos a notação {{  }} para imprimir dados no HTML
```
<div ng-app="meuModulo" ng-controller="MeuController">
    <p>{{nome}}</p>
</div>
```

```
angular.module('meuModulo', []).controller('MeuController', function($scope){
    $scope.nome = 'João';
});
```

## 2. Atribuindo eventos
>JS Puro:
```
<button>Clique Aqui!</button>
```

```
var elemento = document.querySelector('button');
elemento.addEventListener('click', function(){
    alert('O botão foi clicado!');
});
```

>Angular: Devemos atribuir os eventos através das diretivas do Angular
```
<div ng-app="meuModulo" ng-controller="MeuController">
    <button ng-click="exibirAlert()">Clique Aqui!</button>
</div>
```

```
angular.module('meuModulo', []).controller('MeuController', function($scope){
    $scope.exibirAlert = function(){
        alert('O botão foi clicado!');
    };
});
```

## 3. Adicionando elementos no DOM
>JS Puro:
```
<ul></ul>
```

```
var elementoPai = document.querySelector('ul');
var elementoFilho1 = document.createElement('li');
var elementoFilho2 = document.createElement('li');

elementoFilho1.innerHTML = 'Item 1';
elementoFilho2.innerHTML = 'Item 2';

elementoPai.appendChild(elementoFilho1);
elementoPai.appendChild(elementoFilho2);
```

>Angular: Não se deve manipular o DOM diretamente. A manipulação deve sempre ser feita através de diretivas.
```
<ul ng-app="meuModulo" ng-controller="MeuController">
    <li ng-repeat="item in elementos">
        {{item}}
    </li>
</ul>
```

```
angular.module('meuModulo', []).controller('MeuController', function($scope){
    $scope.elementos = ['item1', 'item2'];
});
```

## 4. Usando objetos globais do JS
>JS Puro:
```
setInterval(function(){
    //desloca a janela 100px para baixo
    window.scrollTo(0, 100);
}, 1000);
```

>Angular: Usamos os objetos providenciados pelo Angular, ao invés dos objetos globais nativos do JS.
```
angular.module('meuModulo', []).controller('MeuController', function($interval, $window){
    $interval(function(){
        $window.scrollTo(0, 100);
    }, 1000);
});
```

## 5. Modelo de Dados
>JS Puro: Ainda que seja considerado uma má prática, é possível armazenar os dados da nossa aplicação diretamente nos elementos do DOM
```
<div class="contador">0</div>
<div class="contador">0</div>
```

```
var contadores = document.querySelector('.contador');

function incrementarContador(){
    this.innerHTML++;
}

contadores.forEach(function(contador){
    contador.addEventListener('click', incrementarContador);
});
```

>Angular: Devemos sempre manter variáveis que representam o modelo de dados separadas do DOM. As diretivas se encarregam de vincular essas variáveis ao DOM.
```
<div ng-repeat="contador in contadores" ng-click="incrementarContador(contador)">{{contador}}</div>
```

```
angular.module('meuModulo', []).controller('MeuController', function($scope){
    $scope.contadores = [0, 0];

    $scope.incrementarContador = function(contador){
        contador++;
    }
});
```
