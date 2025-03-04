import _ from "../../Reactive.js";
import Aleatorio from "../Classes/Aleatorio.js";
import Coelho from "../Classes/Coelho.js";

const audiosErro = new Audio(`./midias/pop-err.mp3`);

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
    ...onTocado()
  },
    Coelho()
  );
  button.style.setProperty('--bs-btn-bg', Aleatorio.rgb());
  button.atribuirProps(prop);
  return button;
}

function RandSom() {
  audios[Aleatorio.entre(0, 4)].play();
}

/** @returns {Partial<HTMLButtonElement>} */
function onTocado() {
  function capturar() {
    this.classList.add("capture");
    if(this.className.includes("coelhoPula")){
      RandSom();
    } else {
      audiosErro.play();
    }
  }

  function soltar() {
    this.classList.remove("capture");
  }

  if ('ontouchstart' in window) {
    return { ontouchstart: capturar, ontouchend: soltar, ontouchcancel: soltar }
  }
  return { onmousedown: capturar, onmouseup: soltar, onmouseleave: soltar }
}