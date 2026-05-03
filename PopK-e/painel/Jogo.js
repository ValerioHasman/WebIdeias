import Elemento from "Elemento";
import Aleatorio from "../Classes/Aleatorio.js";
import Botao from "../componentes/Botao.js";
import Placar, { ProgressBar } from "./Placar.js";
import { removerTrincas, trincarTela } from "../Classes/TelaTrincada.js";
import { Dialog } from "../componentes/Dialog.js";

export class Jogo extends EventTarget {
  /** @type {number} */ #numeroDeCasas;
  /** @type {number} */ #tempoDeCaptura = 2000;
  /** @type {number} */ #numeroDeCapturas = 0;
  /** @type {number} */ #errados = 0;
  /** @type {number} */ #acertosConsecutivos = 0;
  /** @type {number} */ #aceleracao = 1;
  /** @type {number} */ #nivel = 0;
  #execucaoAberta = true;
  #placar = new Placar();

  constructor(numeroDeCasas, tempoDeCaptura) {
    super();
    this.#numeroDeCasas = numeroDeCasas;
    this.#tempoDeCaptura = tempoDeCaptura;
  }

  get nivel() {
    return this.#nivel;
  }

  Botoes() {
    return Array.from({ length: this.#numeroDeCasas }, (v, k) => (Botao({ dataset: { id: k } }, this)));
  }

  start() {
    this.acionarProximoCoelho();
    setTimeout(
      () => {
        if (this.#execucaoAberta)
          this.start();
      },
      this.#aceleracao * this.#tempoDeCaptura
    );
  }

  passardorNivel = ProgressBar();
  passardorNivels = ProgressBar();

  divAceleracao = Elemento.div({ className: "acell" });

  container() {
    return Elemento.div(
      { className: "container h-100" },
      Elemento.div(
        { className: "row align-items-center justify-content-around" },
        ...[
          this.#placar.div,
          this.passardorNivel.container,
          this.passardorNivels.container,
          this.divAceleracao,
        ].map((e) => Elemento.div({ className: "col" }, e))
      ),
      Elemento.div(
        { className: "h-100 row align-items-center justify-content-around jogo" },
        ...this.Botoes()
      )
    );
  };

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

  subirNivel() {
    this.#aceleracao *= 0.9;
    console.log(this.#aceleracao);
    this.#acertosConsecutivos++;
    this.passardorNivels.valor = (1 - this.#aceleracao) * 100;
    this.#nivel++;
    console.log(this.#nivel)
    if (this.#nivel >= 13) {
      Dialog(
        {
          title: "Parabéns, você venceu o jogo!",
          message: "Você conseguiu capturar 70 coelhos e subir para o nível 14. Continue jogando para melhorar seu tempo de captura e alcançar níveis ainda mais altos!",
        }
      );
      this.#execucaoAberta = false;
    }
  }

  capture() {
    this.#placar.valor = ++this.#numeroDeCapturas;
    this.#acertosConsecutivos++;
    if (this.#acertosConsecutivos > 5) {
      removerTrincas();
      this.subirNivel();
      this.#acertosConsecutivos = 0;
    }
    this.passardorNivel.valor = (this.#acertosConsecutivos / 5) * 100;
    this.divAceleracao.innerText = "Aceleração: " + Math.round((1 - this.#aceleracao) * 100) + "%";
  }

  setErrar() {
    this.#acertosConsecutivos = 0;
    this.passardorNivel.valor = (this.#acertosConsecutivos / 5) * 100;
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

}
