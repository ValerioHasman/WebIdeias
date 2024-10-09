const form = document.querySelector("form");
const conteudo = document.querySelector("#conteudo");
const textArea = document.querySelector("[name=mensagem]");

form.addEventListener("submit", enviarMensagem);

textArea.addEventListener("input", (event) => { redimensionarTextArea(event.target) })


/** @param {SubmitEvent} event */
function enviarMensagem(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const mensagem = formData.get("mensagem").trim();
  if (mensagem) {
    adicionaAoConteudo(mensagem);
    form.reset();
    redimensionarTextArea(textArea);
  }
}

function adicionaAoConteudo(texto) {
  const paragrafo = document.createElement("p");
  paragrafo.innerText = texto;
  conteudo.append(paragrafo);
  descer();
}

/** @param {HTMLTextAreaElement} areaDeTexto */
function redimensionarTextArea(areaDeTexto) {
  areaDeTexto.rows = 1;
  const lineHeight = Number.parseInt(window.getComputedStyle(areaDeTexto).lineHeight, 10);
  const newRows = Math.trunc(areaDeTexto.scrollHeight / lineHeight);
  areaDeTexto.rows = newRows > 6 ? 6 : newRows;
}

function descer(){
  conteudo.scroll({
    top: conteudo.scrollHeight,
    behavior: "smooth",
  })
}