import Elemento from "Elemento";
import Aleatorio from "./Aleatorio.js";
import SVGEmTexto from "./SVGEmTexto.js";

const svg = new SVGEmTexto("imagens/Coelho.svg");

export default function Coelho() {
  const coelho = Elemento.div({ style: { height: "100%" }, className: "Coelho" });
  atribuirCorAoCoelho(coelho)
  return coelho;
}

async function atribuirCorAoCoelho(coelho) {
  coelho.innerHTML = svg.content;
  const cor = `rgb(${Aleatorio.entre(70, 255)},${Aleatorio.entre(70, 255)},${Aleatorio.entre(70, 255)})`;
  coelho.querySelectorAll("path[fill='rgb(255,166,166)']").forEach((parte) => {
    parte.setAttribute("fill", cor);
  });
}