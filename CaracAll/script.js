import NReact from "../NReact.js";
import Button from "./componentes/Button.js";
import Div from "./componentes/Div.js";
import Form from "./componentes/Form.js";
import Input from "./componentes/Input.js";
import InputGroup from "./componentes/InputGroup.js";
import Titulo from "./componentes/Titulo.js";
import Header from "./painel/Header.js";
import Section from "./painel/Section.js";

document.body.append(Div({},
  Titulo({}, "CaracAll"),
  Header({},
    Form({ className: "was-validated", firstChild: { className: "row g-2" }, onsubmit: recalcular },
      InputGroup({
        id: "inpQuantidade",
        name: "inicio",
        inputMode: "numeric",
        type: "number",
        value: "120000",
        placeholder: "Iníciar em…",
        max: 1114111,
        min: 0,
        required: true,
      }),
      Input({
        id: "inpIntervalo",
        name: "intervalo",
        inputMode: "numeric",
        type: "number",
        value: "3000",
        placeholder: "Intervalo de…",
        max: 1114111,
        min: 0,
        required: true,
      }),
      Button({
        className: "btn-secondary",
        type: "submit",
        id: "enviar"
      }, "Exibir"),
      Button({
        onclick: remover,
        className: "btn-secondary",
        type: "button"
      }, "Limpar")
    ),
  ),
  Section({ style: { tabSize: 12, whiteSpace: "pre-wrap" }, id: "container" })
));


/** @param {PointerEvent} event */
function recalcular(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  event.target.firstChild.disabled = true;
  setTimeout(() => {
    exibir(formData.get("inicio"), formData.get("intervalo"));
    event.target.firstChild.disabled = false;  
  }, 100);
}

FormData

function exibir(next = 0, intervalo = 0) {
  next = Number.parseInt(next);
  intervalo = Number.parseInt(intervalo);
  remover();
  for (let i = next; i <= (next + intervalo) && i < 1114112; i++) {
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

enviar.click();