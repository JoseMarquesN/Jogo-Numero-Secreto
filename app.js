let listaNumeroSorteados = [];
let numerolimite = 100;
let numeroAleatorio = gerarNumeroAleatorio();
tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número Secreto');
    exibirTextoNaTela('p', 'Chute um número de 1 a 100');
}

mensagemInicial()

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroAleatorio) {
        let palavratentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemtentativa = `Você descobriu o número secreto com ${tentativas} ${palavratentativa}`;
        exibirTextoNaTela('h1', 'Você acertou');
        exibirTextoNaTela('p', `${mensagemtentativa}`);
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        if (chute > numeroAleatorio) {
        exibirTextoNaTela('h1', 'tente novamente');
        exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
        exibirTextoNaTela('h1', 'tente novamente');
        exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampodoUsuario()
    }
}

function gerarNumeroAleatorio() {
   let numeroGeradoAleatoriamente =  parseInt(Math.random() * numerolimite + 1);
   let quantidadeDeElementos = listaNumeroSorteados.length 
    if (quantidadeDeElementos == numerolimite) {
        listaNumeroSorteados = [];
    }

   if (listaNumeroSorteados.includes(numeroGeradoAleatoriamente)) {
    return gerarNumeroAleatorio();
   } else {
    listaNumeroSorteados.push(numeroGeradoAleatoriamente);
    console.log(listaNumeroSorteados)
    return numeroGeradoAleatoriamente
   }
}

function limparCampodoUsuario() {
    chute = document.querySelector('input')
    chute.value = '';
}

function reiniciar() {
    numeroAleatorio = gerarNumeroAleatorio();
    limparCampodoUsuario();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}