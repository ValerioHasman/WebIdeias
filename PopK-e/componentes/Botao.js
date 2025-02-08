import _ from "../../Reactive.js";

export default function Botao(prop) {
  return _.button({
    className: "botao btn btn-primary border-0 col-auto shadow",
    style: { backgroundColor: rgb() },
    onmousedown: RandSom
  });
}

function rgb() {
  return `rgb(${RandNum()
    },${RandNum()
    },${RandNum()
    })`;
}

function RandNum(inicio = 100, fim = 200) {
  let numrand = Number.parseInt(Math.random() * (fim + 1));
  if(numrand < inicio){
    numrand = RandNum(inicio, fim);
  }
  return numrand;
}

function RandSom() {
  const audio = new Audio(`./midias/pop-${RandNum(1, 5)}.mp3`);
  audio.play();
}