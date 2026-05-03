import Elemento from "Elemento";
import { Jogo } from "../painel/Jogo.js";

export default function DialogStart() {
  const div = Elemento.div({ className: "telaIniciar" },
    Elemento.div(
      {
        className: "imagemInicio", onclick: () => {
          div.classList.add("ok");
          const jogo = new Jogo(6, 2000);
          document.querySelector(".container-jogo").append(
            jogo.container()
          )
          jogo.start();
        }
      }
    )
  );
  return div;
}