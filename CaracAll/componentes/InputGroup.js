import NReact from "../../NReact.js";
import Div from "./Div.js";

/**
 * @param {HTMLInputElement} props
 * @param {...HTMLElement|string} list 
 */
export default function InputGroup(props = {}, ...list) {
  return Div({ className: "col-md col-6" },
    Div({ className: "input-group" },
      Input({...props, ...{ className: "form-control", type: "text"}}),
      Button({ className: "btn btn-secondary", type: "button", onclick: menos },
        I({className: "bi bi-chevron-down"})
      ),
      Button({ className: "btn btn-secondary", type: "button", onclick: mais},
        I({className: "bi bi-chevron-up"})
      )
    )
  );
}

function mais(){
  inpQuantidade.value = Number.parseInt(inpQuantidade.value) + Number.parseInt(inpIntervalo.value) ;
}

function menos(){
  inpQuantidade.value = Number.parseInt(inpQuantidade.value) - Number.parseInt(inpIntervalo.value);
}

function Input(props = {}, ...list) {
  return NReact("input", props, list);
}

function I(props = {}, ...list) {
  return NReact("i", props, list);
}

function Button(props = {}, ...list) {
  return NReact("button", props, list);
}