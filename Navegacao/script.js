const inicio = history.length;
let ultimoNivel = inicio;

function verificaRetorno(event) {
  console.log(event);
  agora();
  if (ultimoNivel == history.length) {
    //history.go(-(history.length - (inicio)));
  } else {
    ultimoNivel = history.length;
  }
}

window.addEventListener("popstate", verificaRetorno);
agora();

function agora() {
  console.log(inicio, ultimoNivel, history.length);
}