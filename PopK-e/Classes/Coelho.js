import _ from "../../Reactive.js";
import Aleatorio from "./Aleatorio.js";

const svg = await fetch("imagens/Coelho.svg").then((c) => c.text()).then((c) => c);

export default function Coelho() {
  const coelho = _.div({ style: { height: "100%" }, className: "Coelho" });
  coelho.innerHTML = svg;
  const cor = `rgb(${Aleatorio.entre(70, 255)},${Aleatorio.entre(70, 255)},${Aleatorio.entre(70, 255)})`;
  coelho.querySelectorAll("path[fill='rgb(255,166,166)']").forEach((parte) => {
    parte.setAttribute("fill", cor);
  });
  return coelho;
}

