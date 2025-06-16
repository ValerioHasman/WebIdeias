"use strict";

const texto = document.getElementById("divTexto").querySelector(".ql-editor");

function removerAtributos() {
  texto.querySelectorAll("*:not(svg)").forEach(e => {
    e.getAttributeNames().forEach((i) => {
      e.setAttribute(i, "");
    })
  });
  texto.querySelectorAll(":is(script, button, svg, iframe)").forEach(e => {
    e.remove();
  });
}

/** @param {HTMLButtonElement} botao */
function compartilhar(botao) {
  botao.disabled = true;
  const blob = new Blob([aSuaPaginaEmString()], { type: "text/html" });
  const file = new File([blob], "index.html", { type: "text/html" });
  if (navigator.share) {
    navigator.share({
      files: [file]
    })
      .catch((err) => {
        alert("Houve um erro ao tentar compartilhar.");
      })
      .finally(() => {
        botao.disabled = false;
      });
  } else {
    alert("Sem suporte para compartilhamento.");
  }
}

function baixar() {
  const a = document.createElement("a");
  a.target = "_blank";
  a.download = "index.html";
  a.href = `data:text/html,${encodeURIComponent(aSuaPaginaEmString())}`;
  a.click();
}

function aSuaPaginaEmString() {
  const copia = document.querySelector(":scope").cloneNode(true);
  copia.querySelectorAll("[remova]").forEach(e => {
    e.remove();
  });
  copia.querySelector("body>div.container").innerHTML = texto.innerHTML;
  return "<!doctype html>\n" + copia.outerHTML;
}