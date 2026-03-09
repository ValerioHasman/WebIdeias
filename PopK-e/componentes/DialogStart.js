import Elemento from "Elemento";
import { Jogo } from "../painel/Jogo.js";
import Placar from "../painel/Placar.js";

export default function DialogStart() {
  const div = Elemento.div({ className: "telaIniciar" },
    Elemento.div(
      {
        className: "imagemInicio", onclick: () => {
          div.classList.add("ok");
          const placar = new Placar();
          const jogo = new Jogo(6, 2000, placar);
          document.querySelector(".container-jogo").append(
            Elemento.div({ className: "container h-100" },
              placar.div,
              Elemento.div({ className: "h-100 row align-items-center justify-content-around jogo" },
                ...jogo.Botoes()
              )
            )
          )
          jogo.start();
        }
      }
    )
  );
  return div;
}