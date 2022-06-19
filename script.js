const listaTarefas = document.querySelector("#listaTarefas");
const caixaTexto = document.querySelector('#caixaDeTexto');
const botaoAdicionar = document.querySelector('#botaoAdicionar');
const listaSuspensa = document.querySelector('#listaSuspensa')

// LISTENER - SEMPRE QUE O BOTÃO ADICIONAR FOR CLICADO
// ADICIONA UM ITEM OU UMA TAREFA NA LISTA
botaoAdicionar.addEventListener('click', function(){
    const textoDaTarefa = caixaTexto.value;
    caixaTexto.value = " ";

    listaTarefas.appendChild(adicionaTarefa(textoDaTarefa))
    exibeOcultaListaSuspensa();
    caixaTexto.focus();  /// deixa a caixa de texto em edição
})

function adicionaTarefa(textoDaTarefa) {
    const elementoLi = document.createElement('li');
    const elementoSPAN = document.createElement('span');

    elementoSPAN.setAttribute('id','tarefa');
    elementoSPAN.textContent = textoDaTarefa;

    elementoLi.className = 'naorealizada'
    elementoLi.appendChild(elementoSPAN);
    elementoLi.appendChild(adicionaBotaoRemover())

    // LISTENER - SEMPRE QUE UM ITEM DA LISTA FOR CLICADO PELO MOUSE
    // ALTERA O MARCADOR, A COR DA FONTE E RISCA O TEXTO
    elementoSPAN.addEventListener('click', function(){
        if(this.id === 'tarefa'){
            if(this.parentNode.className === 'naorealizada') {
                this.parentNode.className = 'realizada'

            } else {
                this.parentNode.className = 'naorealizada'
            }
        }
    })
    

    return elementoLi;

}

function adicionaBotaoRemover(){
    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = '✘';
    botaoRemover.className = 'remover'   /// criando uma classe para o nosso elemento, com o nome remover
    
    
    //LISTENER - SEMPRE O BOTAO REMOVER FOR CLICADO PELO MOUSE
    // REMOVE UM ITEM DA LISTA
    botaoRemover.addEventListener('click', function(){
        listaTarefas.removeChild(this.parentNode)   //////// parentnode, seleciona o pai, já o this ele significa o objeti atual da ação e como o evento ocorre no button, o this é o button.
        exibeOcultaListaSuspensa();
        
    })    
    return botaoRemover;

}

function exibeOcultaListaSuspensa(){
    const elementoSPAN = document.querySelector('#tarefa');
    if(elementoSPAN === null){
        listaSuspensa.setAttribute('hidden', 'hidden');

    }else{
        listaSuspensa.removeAttribute('hidden')
    }
}

listaSuspensa.addEventListener('change', function(){
    if(listaSuspensa.selectedIndex === 1 || listaSuspensa.selectedIndex === 2){
        const vetorTarefas = document.querySelectorAll('#tarefa');
        for(tarefa of vetorTarefas ){
            tarefa.dispatchEvent(new Event('click'))
        }
    }else if(listaSuspensa.selectedIndex === 3) {
        const vetorbotoes = document.querySelectorAll('.remover');
    for(botoes of vetorbotoes ){
        botoes.dispatchEvent(new Event('click'))
    }

    }
} )