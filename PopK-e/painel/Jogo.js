import Elemento from "Elemento";
import Aleatorio from "../Classes/Aleatorio.js";
import Botao from "../componentes/Botao.js";
import Placar from "./Placar.js";
import { removerTrincas, trincarTela } from "../Classes/TelaTrincada.js";

export class Jogo {
  /** @type {number} */ #numeroDeCasas;
  /** @type {number} */ #tempoDeCaptura = 2000;
  /** @type {number} */ #numeroDeCapturas = 0;
  /** @type {Placar} */ #placar;
  /** @type {number} */ #errados = 0;
  /** @type {number} */ #acertosConsecutivos = 0;
  /** @type {number} */ #aceleracao = 1;

  constructor(numeroDeCasas, tempoDeCaptura, placar) {
    this.#numeroDeCasas = numeroDeCasas;
    this.#tempoDeCaptura = tempoDeCaptura;
    this.#placar = placar;
  }

  Botoes() {
    return Array.from({ length: this.#numeroDeCasas }, (v, k) => (Botao({ dataset: { id: k, objt: this } }, this)));
  }

  start() {
    this.acionarProximoCoelho();
    setTimeout(
      () => {
        this.start();
      },
      this.#aceleracao * this.#tempoDeCaptura
    );
  }

  acionarProximoCoelho() {
    const coelhoAnterior = document.querySelectorAll(`[data-id].coelhoPula`)[0];
    for (const botao of document.querySelectorAll(`[data-id].coelhoPula`)) {
      botao.classList.remove("coelhoPula");
      botao.classList.remove("capturado");
    }
    const btn = document.querySelector(`[data-id="${this.proximoCoelho(coelhoAnterior)}"]`);
    btn.style.setProperty('--aceleracao', this.#aceleracao + "s");
    btn.classList.add("coelhoPula");
  }

  capture() {
    this.#placar.valor = ++this.#numeroDeCapturas;
    this.#acertosConsecutivos++;
    if (this.#acertosConsecutivos > 5) {
      removerTrincas();
      this.#aceleracao *= 0.9;
      this.#acertosConsecutivos = 0;
    }
  }

  setErrar() {
    this.#acertosConsecutivos = 0;
    if (this.#errados > 5) {
      trincarTela();
      this.#errados = 0;
    }
    ++this.#errados;
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
  const jogo = new Jogo(6, 2000, placar);
  return Elemento.div({ className: "container h-100" },
    placar.div,
    Elemento.div({ className: "h-100 row align-items-center justify-content-around jogo" },
      ...jogo.Botoes()
    )
  );
}

