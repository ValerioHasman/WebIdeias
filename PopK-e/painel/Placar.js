import R from "../../Reactive.js";

export default class Placar {
  /** @type {HTMLDivElement} */ #div;
  /** @type {HTMLSpanElement} */ #valor;
  constructor() {
    this.#valor = R.span();
    this.#div = R.div({ className: "placar" },
      this.#valor
    );
  }

  get div() {
    return this.#div;
  }
  set valor(valor) {
    this.#valor.innerText = Number.parseInt(valor) || 0;
  }
  get valor() {
    return Number.parseInt(this.#valor.innerText) || 0;
  }
}