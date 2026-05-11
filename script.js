function adicionar(valor){
    document.getElementById("display").value += valor;
}

function limpar(){
    document.getElementById("display").value = "";
}

function calcular(){
    let display = document.getElementById("display");

    try {
    let resultado = eval(display.value);
    display.value = resultado;
  } catch {
    display.value = "Erro";
  }
}
