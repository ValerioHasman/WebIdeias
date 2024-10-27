const inicio = history.length;
let avancos = 0;

/** @param {PopStateEvent} event */
function verificaRetorno(event) {
  console.info('');
  agora();
  /** @type {{nivel;hash}} */
  const pagina = history.state;
  avancos++;
  if (pagina?.nivel && pagina?.nivel !== null) {
    history.go(-pagina.nivel);
  } else {
    history.replaceState({ nivel: avancos }, null, null);
  }
  avancos = history.state.nivel;
  agora();
}

window.history.replaceState({ nivel: avancos }, null, null);
window.addEventListener("popstate", verificaRetorno);
agora();

function agora() {
  console.log(avancos, history.length, history.state);
}