function adicionar(valor){
  //vai buscar o elemento display e adicionar o valor do botão clicado
    let display= document.getElementById("display");

  //pega o último caractere do display, para saber oque foi escrito por ultimo
    let last = display.value.slice(-1);

  //lista de simbolos de operacão para evitar que sejam escritos dois simbolos seguidos
    let operadores = ["+", "-", "*", "/", "×", "÷"];

  //impedir que sejam escritos dois simbolos de operação seguidos
    if (operadores.includes(valor) && operadores.includes(last)) {
    return;
  }
    display.value += valor;
}

//função para limpar o display
function limpar(){
    document.getElementById("display").value = "";
}

//função para apagar o último caractere do display
function apagarUltimo(){
    let display = document.getElementById("display");

    //apagar o último caractere do display
    display.value = display.value.slice(0, -1);
}

//função para mostrar ou esconder o histórico
function toggleHistorico() {
    let popup = document.getElementById("historico-popup");

    //alternar entre mostrar e esconder o histórico
    if (popup.style.display === "block") {
        popup.style.display = "none";
    } else {
        popup.style.display = "block";
    }
}

//fechar o histórico ao clicar fora dele
document.addEventListener("click", function(event) {

    let popup = document.getElementById("historico-popup");
    let button = document.getElementById("historico-button");

    //verificar se o clique foi fora do histórico e do botão de histórico
    if (
      !popup.contains(event.target) && 
      !button.contains(event.target)
    ) {
        popup.style.display = "none";
    }
});


//função para calcular a expressão escrita no display
function calcular(){
    let display = document.getElementById("display");

    try {
      let expressaoOriginal = display.value;
      
      let expressao = display.value;

        // limpar espaços
        expressao = expressao.replaceAll(" ", "");

        // substituir símbolos visuais
        expressao = expressao.replaceAll("×", "*");
        expressao = expressao.replaceAll("÷", "/");
        expressao = expressao.replaceAll("^", "**");

        //calcular percentagem
        expressao = expressao.replaceAll(/(\d+)%/g, "($1/100)");

        //calcular raiz quadrada
        expressao = expressao.replaceAll(/√(\d+)/g, "Math.sqrt($1)");

        // calcular a expressão usando eval (cuidado com eval em produção)
        let resultado = eval(expressao);

        display.value = resultado;

        //adicionar a expressão e o resultado ao histórico
        let item = document.createElement("li");
        //exibir a expressão original e o resultado no histórico
        item.textContent = `${expressaoOriginal} = ${resultado}`;
        //adicionar o item ao histórico
        historico.appendChild(item);

  } catch (error) {
        console.log(error);
        display.value = "Erro";
  }
}
