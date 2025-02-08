import _ from "../../Reactive.js";

export default function Botao(prop) {
  const button = _.button({
    className: "botao btn btn-primary border-0 col-auto shadow",
    ontouchstart: RandSom
  });
  button.style.setProperty('--bs-btn-bg', rgb());
  button.style.setProperty('--bs-btn-bg', rgb());
  button.style.setProperty('--bs-btn-bg', rgb());
  return button;
}

function rgb() {
  return `#${RandNum().toString(16)
    }${RandNum().toString(16)
    }${RandNum().toString(16)
    }`;
}

function RandNum(inicio = 100, fim = 200) {
  let numrand = Number.parseInt(Math.random() * (fim + 1));
  if(numrand < inicio){
    numrand = RandNum(inicio, fim);
  }
  return numrand;
}

const audios = [
  new Audio(`./midias/pop-1.mp3`),
  new Audio(`./midias/pop-2.mp3`),
  new Audio(`./midias/pop-3.mp3`),
  new Audio(`./midias/pop-4.mp3`),
  new Audio(`./midias/pop-5.mp3`)
]

function RandSom() {
  audios[RandNum(0,4)].play();
}