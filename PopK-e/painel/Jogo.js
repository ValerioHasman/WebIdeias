import _ from "../../Reactive.js";
import Aleatorio from "../Classes/Aleatorio.js";
import Botao from "../componentes/Botao.js";

class Jogo {
  /** @type {number} */ #numeroDeCasas;
  /** @type {number} */ #tempoDeCaptura;

  constructor(numeroDeCasas, tempoDeCaptura) {
    this.#numeroDeCasas = numeroDeCasas;
    this.#tempoDeCaptura = tempoDeCaptura;
  }
  Botoes() {
    this.start();
    return Array.from({ length: this.#numeroDeCasas }, (v, k) => (Botao({ dataset: { id: k, objt: this } })));
  }
  start() {
    setInterval(() => { 
      for(const botao of document.querySelectorAll(`[data-id].coelhoPula`)){
        botao.classList.remove("coelhoPula");
      }
      const btn = document.querySelector(`[data-id="${Aleatorio.entre(0, this.#numeroDeCasas - 1)}"]`);
      btn.classList.add("coelhoPula");
    }, 2000);
  }
  capture() {

  }
  continue() {

  }
  pause() {

  }
}

export default function Painel() {
  const jogo = new Jogo(6, 1);
  return _.div({ className: "container h-100" },
    _.div({ className: "h-100 row align-items-center justify-content-around jogo" },
      ...jogo.Botoes()
    )
  );
}

