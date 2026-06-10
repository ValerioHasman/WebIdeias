export class RGBCores {

  /**
   * @param {number} r
   * @param {number} g
   * @param {number} b
   */
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  toString() {
    return `${this.r},${this.g},${this.b}`;
  }
}

export function tratarRGBParaHexa(r, g, b) {
  return `${tratarParaHexa(r)}${tratarParaHexa(g)}${tratarParaHexa(b)}`;
}

function tratarParaHexa(decimal) {
  return decimal.toString(16).toUpperCase().padStart(2, '0');
}

export default function obterMatrizCores() {
  const rgb = [];

  for (let indice = 0; indice < 255; indice++) {

    rgb.push(new RGBCores(255, indice, 0));

  }

  for (let indice = 255; indice > 0; indice--) {

    rgb.push(new RGBCores(indice, 255, 0));

  }

  for (let indice = 0; indice < 255; indice++) {

    rgb.push(new RGBCores(0, 255, indice));

  }

  for (let indice = 255; indice > 0; indice--) {

    rgb.push(new RGBCores(0, indice, 255));

  }

  for (let indice = 0; indice < 255; indice++) {

    rgb.push(new RGBCores(indice, 0, 255));

  }

  for (let indice = 255; indice > 0; indice--) {

    rgb.push(new RGBCores(255, 0, indice));

  }

  Object.freeze(rgb);

  return rgb;
}