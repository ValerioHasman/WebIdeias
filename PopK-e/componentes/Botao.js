import _ from "../../Reactive.js";
import Aleatorio from "../Classes/Aleatorio.js";
import Coelho from "../Classes/Coelho.js";

const audios = [
  new Audio(`./midias/pop-1.mp3`),
  new Audio(`./midias/pop-2.mp3`),
  new Audio(`./midias/pop-3.mp3`),
  new Audio(`./midias/pop-4.mp3`),
  new Audio(`./midias/pop-5.mp3`)
];

export default function Botao(prop) {
  const button = _.button({
    className: "botao overflow-hidden btn btn-primary border-0 col-auto shadow",
    ...onTocado(RandSom)
  },
    Coelho()
  );
  button.style.setProperty('--bs-btn-bg', rgb());
  button.atribuirProps(prop);
  return button;
}

function rgb() {
  return `#${Aleatorio.entre(50,200).toString(16)
    }${Aleatorio.entre(50,200).toString(16)
    }${Aleatorio.entre(50,200).toString(16)
    }`;
}

function RandSom() {
  audios[Aleatorio.entre(0, 4)].play();
}

/** @param {function} func */
function onTocado(func) {
  if ('ontouchstart' in window) {
    return { ontouchstart: func }
  }
  return { onmousedown: func }
}
