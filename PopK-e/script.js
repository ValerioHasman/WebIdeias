import Elemento from "Elemento";
import DialogInstalar from "./componentes/DialogInstalar.js";
import DialogStart from "./componentes/DialogStart.js";

document.body.append(
  Elemento.div({ className: "h100vh tela" },
    Elemento.div({ className: "flex-grow container-jogo" })
  ),
  DialogStart(),
  DialogInstalar(),
);