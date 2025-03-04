export default class SVGEmTexto extends EventTarget {

  /** @type {string} */ #svg;

  constructor(caminho) {
    super();

    this.loading(caminho);
  }

  async loading(caminho){
    this.#svg = await fetch(caminho).then((c) => c.text()).then((svgText) => svgText);
    this.dispatchEvent(new CustomEvent('load'));
  }

  get content() {
    return this.#svg;
  }
}