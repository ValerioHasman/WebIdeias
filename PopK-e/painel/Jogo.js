import _ from "../../Reactive.js";
import Botao from "../componentes/Botao.js";

export default function Jogo() {
  return _.div({ className: "container h-100" },
    _.div({ className: "h-100 row align-items-center justify-content-around jogo" },
      ...startGame()
    )
  );
}

function startGame(numero = 6) {
  return Array.from({ length: numero }, () => (Botao({ontouchstart: ()=>{alert("ok")}})));
}
