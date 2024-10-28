/** @type {{nivel;hash}} */
const pagina = { nivel: 0 };
let avancos = 0;
let ultimaHash = "";

/** @param {PopStateEvent} event */
function verificaRetorno(event) {
  pagina.nivel = history.state?.nivel;
  if (pagina?.nivel != null) {
    if (pagina.nivel > 0 && ultimaHash != location.hash) {
      history.go(-pagina.nivel);
      avancos = 0;
    }
  } else {
    avancos++;
    history.replaceState({ nivel: avancos }, null, null);
  }
  ultimaHash = location.hash;
}

window.history.replaceState(pagina, null, null);
window.addEventListener("popstate", verificaRetorno);