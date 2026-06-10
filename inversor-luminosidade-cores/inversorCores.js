import Elemento from "./Elemento.js";
import inputCores from "./inputCores.js";
import ModoTema from "./ModoTema.js";
import { RGBCores } from "./obterMatrizCores.js";

const resulta = document.querySelector("#resulta")
const resultacor = document.querySelector("#resultacor")

const resultb = document.querySelector("#resultb")
const resultbcor = document.querySelector("#resultbcor")

function rgbParaHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h;
  if (max === r) {
    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  } else if (max === g) {
    h = ((b - r) / d + 2) / 6;
  } else {
    h = ((r - g) / d + 4) / 6;
  }

  return { h, s, l };
}

function hslParaRgb(h, s, l) {
  if (s === 0) {
    const val = Math.round(l * 255);
    return { r: val, g: val, b: val };
  }

  const hueParaRgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: Math.round(hueParaRgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hueParaRgb(p, q, h) * 255),
    b: Math.round(hueParaRgb(p, q, h - 1 / 3) * 255)
  };
}

function modoDarkRBG(vermelho, verde, azul) {
  vermelho = Number.parseInt(vermelho);
  verde = Number.parseInt(verde);
  azul = Number.parseInt(azul);

  const hsl = rgbParaHsl(vermelho, verde, azul);
  const luminosidadeInvertida = 1 - hsl.l;
  const rgb = hslParaRgb(hsl.h, hsl.s, luminosidadeInvertida);

  return {
    vermelho: rgb.r,
    verde: rgb.g,
    azul: rgb.b
  };
}

/**
 * @param {number} vermelho 
 * @param {number} verde 
 * @param {number} azul 
 * @returns {{vermelho: number, verde: number, azul: number}}
 */
function modoDarkRBGOLD(vermelho, verde, azul) {
  console.log(vermelho, verde, azul)
  const lista = [
    {
      valor: vermelho,
      cor: "vermelho"
    },
    {
      valor: verde,
      cor: "verde"
    },
    {
      valor: azul,
      cor: "azul"
    },
  ]
  // pegar a ordem e expelhar
  lista.sort(
    (a, b) => {
      if (a.valor > b.valor) return 1;
      if (a.valor < b.valor) return -1;
      return 0;
    }
  );

  const invertidos = lista.map(
    (item) => {
      return negativo(item.valor);
    }
  );

  invertidos.sort(
    (a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    }
  )

  const modoDark = {};

  for (let indice = 0; indice < lista.length; indice++) {

    modoDark[lista[indice].cor] = invertidos[indice];

  }

  return modoDark;
}

/** @param {number} cor */
function negativo(cor) {
  if (cor < 0 || cor > 255) {
    throw new Error("A cor deve ser de 0 até 255");
  }

  const metade = 127.5;

  if (cor < metade)
    return Math.ceil(metade + (metade - cor));
  return Math.floor(255 - cor);
}

const form = document.body.querySelector("form");

const inputA = inputCores();
const inputB = inputCores();

form.append(
  Elemento.label({},
    Elemento.div({ className: "form-label" }, "Cor fundo"),
    inputA
  ),
  Elemento.label({},
    Elemento.div({ className: "form-label" }, "Cor texto"),
    inputB
  )
);

inputA.addEventListener(
  "colorchange",
  (ev) => {

    const cor = new RGBCores(ev.detail.r, ev.detail.g, ev.detail.b);

    document.documentElement.style.setProperty(
      '--cartao-cor',
      `rgb(${cor})`
    );

    const cores = modoDarkRBG(
      cor.r,
      cor.g,
      cor.b
    );

    document.documentElement.style.setProperty(
      '--cartao-cor-dark',
      `rgb(${cores.vermelho}, ${cores.verde}, ${cores.azul})`
    );

    resulta.textContent = `rgb(${cor})`;
    resultb.textContent = `rgb(${cores.vermelho}, ${cores.verde}, ${cores.azul})`;

  }
);

inputB.addEventListener(
  "colorchange",
  (ev) => {

    const cor = new RGBCores(ev.detail.r, ev.detail.g, ev.detail.b);

    document.documentElement.style.setProperty(
      '--cartao-color',
      `rgb(${cor})`
    );

    const cores = modoDarkRBG(
      cor.r,
      cor.g,
      cor.b
    );

    document.documentElement.style.setProperty(
      '--cartao-color-dark',
      `rgb(${cores.vermelho}, ${cores.verde}, ${cores.azul})`
    );


    resultacor.textContent = `rgb(${cor})`;
    resultbcor.textContent = `rgb(${cores.vermelho}, ${cores.verde}, ${cores.azul})`;

  }
);

document.body.querySelector("section").insertAdjacentElement("afterbegin", ModoTema())

