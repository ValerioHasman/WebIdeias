import Elemento from "Elemento";
import Aleatorio from "./Aleatorio.js";

const audios = [
  new Audio(`./midias/quebra1.mp3`),
  new Audio(`./midias/quebra2.mp3`),
  new Audio(`./midias/quebra3.mp3`),
  new Audio(`./midias/quebra4.mp3`),
  new Audio(`./midias/quebra5.mp3`),
  new Audio(`./midias/quebra6.mp3`),
  new Audio(`./midias/quebra7.mp3`)
];

const audiosErro = new Audio(`./midias/quebra-err.mp3`);

const listaDeTrincas = [
  "trincada-2",
  "trincada-7",
  "trincada-6",
  "trincada-4",
  "trincada-3",
];

function pegarTrinca() {
  return listaDeTrincas[
    Aleatorio.entre(
      0,
      listaDeTrincas.length - 1
    )
  ];
}

export function trincarTela() {

  removerTrincas();

  const tela = Elemento.div(
    { className: "tela-trincada " + pegarTrinca() },
  );
  audios[Aleatorio.entre(0, audios.length - 1)].play();
  document.body.append(tela);

}

export function trincarTelaErro() {

  removerTrincas();

  const tela = Elemento.div(
    { className: "tela-trincada trincada-err" },
  );
  audiosErro.play();
  document.body.append(tela);

}

export function removerTrincas() {
  document.querySelectorAll(".tela-trincada").forEach((tela) => tela.remove());
}