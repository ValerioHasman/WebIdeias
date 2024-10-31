export default class Cores {
  #cores = "#000000";

  constructor(cores = this.cores) {
    this.cores = cores;
  }

  set cores(valor) {
    const teste = /^#([0-9A-Fa-f]{6})$/.test(valor);
    this.#cores = teste ? valor : "#000000";
  }
  get cores() {
    return this.#cores;
  }

  emRGB(cor = this.corHexaEmInt()) {
    return `rgb(${cor.r}, ${cor.g}, ${cor.b})`;
  }

  emHexadecimal(cor = this.corHexaEmInt()) {
    return `#${(cor.r).toString(16).padStart(2, "0")
      }${(cor.g).toString(16).padStart(2, "0")
      }${(cor.b).toString(16).padStart(2, "0")}`;
  }

  negativo(cor = this.corHexaEmInt()) {
    return {
      r: 255 - cor.r,
      g: 255 - cor.g,
      b: 255 - cor.b
    };
  }

  /** @param {string} corh */
  corHexaEmInt(corh = this.cores) {
    return {
      r: Number.parseInt(corh.slice(1, 3), 16),
      g: Number.parseInt(corh.slice(3, 5), 16),
      b: Number.parseInt(corh.slice(5, 7), 16)
    };
  }
}