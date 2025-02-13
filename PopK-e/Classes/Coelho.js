import _ from "../../Reactive.js";
import { RandNum } from "../componentes/Botao.js";

const svg = await fetch("imagens/Coelho.svg").then((c) => c.text()).then((c) => c);

export default function Coelho() {
  const coelho = _.div({ style: { height: "100%" }, className: "Coelho" });
  coelho.innerHTML = svg;
  const cor = `rgb(${RandNum(70, 255)},${RandNum(60, 255)},${RandNum(60, 100)})`;
  coelho.querySelectorAll("path[fill='rgb(255,166,166)']").forEach((parte) => {
    parte.setAttribute("fill", cor);
  });
  return coelho;
}

