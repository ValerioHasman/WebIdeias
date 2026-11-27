import Elemento from "./Elemento.js";
import SearchHighlight from "./SearchHighlight/SearchHighlight.js";

class msPrint {
  #ms = Date.now();
  nextMs() {
    const msNow = Date.now()
    const gap = msNow - this.#ms;
    this.#ms = msNow;
    return gap;
  }
}

document.body.append(
  monitorDeTrava(),
  Elemento.div(
    { className: "m-2" },
    buscar()
  )
)

function buscar() {
  const listGroup = Elemento.div({ className: "list-group my-2 gap-1" });
  const input = Elemento.input({ type: "search", className: "form-control-plaintext p-0 border-0" });
  const buscador = new SearchHighlight(listGroup);

  buscador.className = "fw-bold text-body";

  buscador.callbackTexto = (item) => { return [item.primeiroNome, item.nome, item.data].join("\u0020") };

  const ms = new msPrint();

  buscador.callbackDestacar = (item, termos) => Elemento.button(
    { className: "list-group-item list-group-item-action border-0 rounded-3" },
    Elemento.div(
      { className: "d-flex w-100 justify-content-between" },
      Elemento.span({ className: "small fst-italic me-2" }, item.indice, ' º'),
      Elemento.h5({ className: "mb-1 me-auto" }, buscador.destacar(item.primeiroNome, termos)),
      Elemento.small({}, ms.nextMs() + " ms")
    ),
    Elemento.p({ className: "mb-1" }, buscador.destacar(item.nome, termos)),
    Elemento.span({ className: "text-body-secondary" }, buscador.destacar(item.data, termos))
  );

  dadosPseudoApi().then(v => { buscador.dados = v });

  input.addEventListener(
    "input",
    (ev) => {
      buscador.buscar(ev.target.value);
    }
  )

  buscador.addEventListener(
    "carregado",
    () => statusLoad.replaceChildren(biSearch)
  );
  buscador.addEventListener(
    "buscando",
    () => { ms.nextMs(); statusLoad.replaceChildren(spinner); }
  );

  const biSearch = Elemento.i({ className: "bi bi-search" });
  const statusLoad = Elemento.span({ className: "ms-2" }, biSearch);
  const spinner = Elemento.span({ className: "spinner-border spinner-border-sm border-1", role: "status" });

  return Elemento.search(
    { className: "my-3 mx-auto", style: { maxWidth: "512px" } },
    Elemento.div(
      { className: "p-2 sticky-top" },
      Elemento.label(
        { className: "form-control rounded-3 d-flex" },
        input,
        statusLoad
      )
    ),
    listGroup
  )
}

async function dadosPseudoApi() {
  return await fetch("./dadosFull.txt").then(r => r.text()).then(t => t.split("\n").map((item, indice) => {
    return {
      nome: item,
      primeiroNome: item.substring(0, item.indexOf(' ')),
      data: dataAleatoria(),
      indice
    }
  }));
}

/** @param {Date} inicio @param {Date} fim */
function dataAleatoria(inicio = new Date(2015, 0, 1), fim = new Date()) {
  const ms = inicio.getTime() + Math.random() * (fim.getTime() - inicio.getTime());
  return new Date(ms).toLocaleDateString("pt-BR");
}

function monitorDeTrava() {
  const trv = Elemento.div({ className: "teste-trava-frame ativo bg-primary text-bg-primary rounded-3 p-2 text-center lh-1" },
    "Monitor De Trava"
  );

  const tg = () => {
    trv.classList.toggle("ativo");
  }
  setTimeout(tg);
  setInterval(tg, 3000);

  return Elemento.div(
    { className: "m-3 d-flex justify-content-center" },
    trv
  );
}
