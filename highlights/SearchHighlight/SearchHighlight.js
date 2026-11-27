export default class SearchHighlight extends EventTarget {

  className = "fw-bold";
  vazioValido = false;
  #limite = 20;
  #container = document.createElement("div");
  #agendador = new Agendador(500);
  #catalogo = new Map();
  #thread = 0;
  #respiro = 10000;

  callbackDestacar = (item, termos) => {
    return this.destacar(item, termos);
  }

  callbackTexto = (item) => item;

  /**
   * @param {HTMLDivElement} container
   */
  constructor(container) {
    super();
    this.container = container;
  }

  /**
   * @param {"carregado"|"buscando"} type
   * @param {EventListener} callback
   * @param {boolean|AddEventListenerOptions} [options]
   */
  addEventListener(type, callback, options) {
    super.addEventListener(type, callback, options);
  }

  get thread() { return this.#thread; }
  set respiro(v) { this.#respiro = numeroInteiroPositivo(v); }
  get respiro() { return this.#respiro; }

  set atraso(v) { this.#agendador = new Agendador(numeroInteiroPositivo(v)); }

  set limite(v) { this.#limite = numeroInteiroPositivo(v); }

  set container(v) {
    if (!(v instanceof HTMLElement)) {
      throw new Error("Precisa ser um HTMLElement");
    }
    this.#container = v;
  }

  set dados(lista) {
    if (!(lista instanceof Array)) {
      throw new Error("Precisa ser um Array");
    }

    this.#catalogo.clear();

    for (const item of lista) {
      this.#catalogo.set(item, limparString(this.callbackTexto(item)));
    }
  }

  /** @readonly */
  buscar(texto) {
    this.#agendador.execute(
      () => this.buscarAgora(texto)
    )
  }

  /** @readonly */
  async buscarAgora(texto) {
    const thread = ++this.#thread;
    this.#container.replaceChildren();
    this.dispatchEvent(new Event("buscando"));

    if (!this.vazioValido && !texto.trim()) {
      this.dispatchEvent(new Event("carregado"));
      return;
    };

    let indiceLista = 0;

    let frag = document.createDocumentFragment();
    const termosNormalizados = limparString(texto).split(" ").filter(Boolean);

    const respiro = new Respiro(this.#respiro);

    for (const [item, fraseNormalizada] of this.#catalogo) {
      const esperei = await respiro.espere();
      if (thread != this.#thread)
        return;

      if (esperei) {
        if (frag.childNodes.length) {
          this.#container.append(frag);
          frag = document.createDocumentFragment();
        }
      }

      if (!compareIncludes(termosNormalizados, fraseNormalizada)) continue;

      frag.append(
        this.callbackDestacar(item, termosNormalizados)
      );

      if (++indiceLista >= this.#limite)
        break;

    }

    this.#container.append(frag);

    this.dispatchEvent(new Event("carregado"));

  }

  /** @readonly */
  highlight(fragmento) {
    const span = document.createElement("span");
    span.className = this.className;
    span.append(fragmento);
    return span;
  }

  /**
   * @readonly
   * @param {string} frase
   * @param {string[]} termos
   */
  destacar(frase, termos) {
    const frag = document.createDocumentFragment();

    if (termos.length === 0) {
      frag.append(frase);
      return frag;
    }

    const chars = [...frase];
    let normalizado = "";
    const mapa = [];

    for (let i = 0; i < chars.length; i++) {
      for (const ch of limparString(chars[i])) {
        normalizado += ch;
        mapa.push(i);
      }
    }

    const marcado = new Array(chars.length).fill(false);

    for (const termo of termos) {
      let from = 0, idx;
      while ((idx = normalizado.indexOf(termo, from)) !== -1) {
        for (let p = idx; p < idx + termo.length; p++) marcado[mapa[p]] = true;
        from = idx + termo.length;
      }
    }

    let buffer = "";
    let destacado = false;
    const descarregar = () => {
      if (!buffer) return;
      frag.append(destacado ? this.highlight(buffer) : buffer);
      buffer = "";
    };

    for (let i = 0; i < chars.length; i++) {
      if (marcado[i] !== destacado) {
        descarregar();
        destacado = marcado[i];
      }
      buffer += chars[i];
    }
    descarregar();

    return frag;
  }

}

function limparString(string) {
  return String(string).normalize('NFD').replace(/\p{Mn}/gu, "").toLocaleLowerCase();
}

/**
 * @param {Array<string>} fragmentos 
 * @param {string} fraseNormalizada 
 */
function compareIncludes(fragmentos, fraseNormalizada) {
  return fragmentos.every(t => fraseNormalizada.includes(t));
}

class Agendador {

  /** @type {number} */ #timeout = null;

  /** @type {number} */ #gap;

  constructor(gap) {
    this.#gap = Number.parseInt(gap);
  }

  execute(funcao) {
    clearTimeout(this.#timeout);
    this.#timeout = setTimeout(
      funcao,
      this.#gap
    );
  }
}

class Respiro {
  #iteracoes = 0;
  #iteracao = 0;

  constructor(iteracao) {
    this.#iteracao = Number(iteracao);
  }

  async espere() {
    const espere = this.#iteracoes++ % this.#iteracao === 0;
    if (espere) {
      await new Promise(r => { setTimeout(r) });
    }
    return espere;
  }
}

function numeroInteiroPositivo(numero) {
  const num = Number.parseInt(numero);
  if (!(typeof num === "number") || Number.isNaN(num) || num < 1) {
    throw new Error("Precisa ser um número inteiro positivo");
  }
  return num;
}