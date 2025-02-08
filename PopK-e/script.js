import _ from "../Reactive.js";
import Jogo from "./painel/Jogo.js";

document.body.append(
  _.div({ className: "h100vh tela" },
    _.div({ className: "flex-grow" },
      Jogo()
    )
  )
);
