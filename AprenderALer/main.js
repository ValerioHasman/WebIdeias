import { formulario, alfabeto } from "./componentes.js";
import Elemento from "./Elemento.js";

document.body.append(
  Elemento.div({ className: "user-select-none d-flex flex-column vh-100 bg-body-tertiary p-1"},
    formulario(),
    alfabeto()
  )
);

