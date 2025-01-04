import NReact from "../NReact.js";
import Input from "./componentes/Input.js";
import Header from "./painel/Header.js";
import Section from "./painel/Section.js";

let intervalo = 3000;

const menu = Header({},
  Input({
    inputMode: "numeric",
    type: "number",
    onchange: function () {
      exibir(this.value);
    }
  }),
  Input({
    inputMode: "numeric",
    type: "number",
    onchange: function () {
      intervalo = Number.parseInt(this.value);
    }
  }),
  NReact("button", { onclick: remover }, "Limpar!")
);

const container = Section({ style: { tabSize: 12, whiteSpace: "pre-wrap" } });

exibir();

function exibir(next = 0) {
  next = Number.parseInt(next);
  remover();
  for (let i = next; i <= (next + intervalo); i++) {
    container.append(
      `${i}: ${String.fromCodePoint(i)}\t`
    )
  }
}

function remover() {
  for (const text of container.childNodes) {
    text.remove();
  }
  if (container.childNodes.length > 0) {
    remover();
  }
}

document.body.append(menu);
document.body.append(container);