import _ from "../../Reactive.js";
import Aleatorio from "../Classes/Aleatorio.js";
import Botao from "../componentes/Botao.js";
import Placar from "./Placar.js";

export class Jogo {
  /** @type {number} */ #numeroDeCasas;
  /** @type {number} */ #tempoDeCaptura;
  /** @type {number} */ #numeroDeCapturas = 0;
  /** @type {Placar} */ #placar;

  constructor(numeroDeCasas, tempoDeCaptura, placar) {
    this.#numeroDeCasas = numeroDeCasas;
    this.#tempoDeCaptura = tempoDeCaptura;
    this.#placar = placar;
  }
  Botoes() {
    this.start();
    return Array.from({ length: this.#numeroDeCasas }, (v, k) => (Botao({ dataset: { id: k, objt: this } }, this)));
  }
  start() {
    setInterval(() => {
      const coelhoAnterior = document.querySelectorAll(`[data-id].coelhoPula`)[0];
      for (const botao of document.querySelectorAll(`[data-id].coelhoPula`)) {
        botao.classList.remove("coelhoPula");
        botao.classList.remove("capturado");
      }
      const btn = document.querySelector(`[data-id="${this.proximoCoelho(coelhoAnterior)}"]`);
      btn.classList.add("coelhoPula");
    }, 2000);
  }
  capture() {
    this.#placar.valor = ++this.#numeroDeCapturas;
  }
  proximoCoelho(coelhoAnterior = { dataset: { id: 0 } }) {
    let proximoCoelho = Aleatorio.entre(0, this.#numeroDeCasas - 1);
    if (proximoCoelho == coelhoAnterior.dataset.id) {
      return this.proximoCoelho(coelhoAnterior);
    }
    return proximoCoelho;
  }
  continue() {
  }
  pause() {
  }
}

export default function Painel() {
  const placar = new Placar();
  const jogo = new Jogo(6, 1, placar);
  return _.div({ className: "container h-100" },
    placar.div,
    _.div({ className: "h-100 row align-items-center justify-content-around jogo" },
      ...jogo.Botoes()
    )
  );
}

