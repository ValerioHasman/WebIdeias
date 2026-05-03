import Elemento from "Elemento";

export default class Placar {
  /** @type {HTMLDivElement} */ #div;
  /** @type {HTMLSpanElement} */ #valor;
  constructor() {
    this.#valor = Elemento.span({}, 0);
    this.#div = Elemento.div({ className: "placar" },
      this.#valor
    );
  }

  barrar() {
    return Elemento.div({ className: "progress", role: "progressbar" },
      Elemento.div({ className: "progress-bar", style: "width: 0%" })
    )
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

export function ProgressBar() {

  const progressBar = Elemento.div({ className: "progress-bar", style: { width: "0%" } });

  return {
    container: Elemento.div({ className: "progress", role: "progressbar" },
      progressBar
    ),
    set valor(valor) {
      progressBar.style.setProperty("width", valor + "%");
    }
  }
}