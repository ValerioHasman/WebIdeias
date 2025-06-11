import { formulario, alfabeto } from "./componentes.js";
import Elemento from "./Elemento.js";

document.body.append(
  Elemento.div({ className: "user-select-none"},
    formulario(),
    alfabeto()
  )
);