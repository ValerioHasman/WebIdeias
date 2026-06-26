import Dialog from "./componentes/Dialog.js";
import Elemento, { execute } from "./dependencias/Elemento.js";

document.body.append(
  Elemento.div(
    { className: "d-flex flex-wrap flex-w px-2 py-1 gap-1 sticky-top bg-body-tertiary" },
    Elemento.div(
      { className: "col-auto" },
      seletorDeColunas()
    ),
    Elemento.div(
      { className: "col-auto" },
      Elemento.input({
        className: "form-control",
        type: "number",
        placeholder: localStorage.getItem("numero"),
        onchange: (ev) => {
          localStorage.setItem("numero", ev.target.value);
          location.reload();
        }
      })
    ),
  ),
  execute(
    Elemento.div({ className: "meu-grid gap-1 p-1" }),
    async (div) => {
      await new Promise(r => setTimeout(r, 16));
      const fragment = document.createDocumentFragment();
      let valor = Number.parseInt(localStorage.getItem("numero")) || 250.000;
      if (valor > 250000) {
        valor = 250000;
      }
      for (let indice = 1; indice <= valor; indice++) {
        fragment.append(
          Elemento.button(
            {
              className: "btn btn-primary border-0 box rounded-3",
              onclick: () => {
                Dialog.estruturadoFull(
                  Elemento.div(
                    { className: "p-2" },
                    "topo"
                  ),
                  Elemento.div(
                    { className: "flex-grow-1 d-flex overflow-auto scroll-snap-x-mandatory" },
                    (() => {
                      const frag = document.createDocumentFragment();

                      for (let indice = 1; indice <= valor; indice++) {
                        frag.append(
                          Elemento.div(
                            { className: "scroll-snap-start-always col-12 overflow-auto" },
                            indice % 2 === 0 ?
                              imagem("./imagens/modelo.png") :
                              imagem("./imagens/modelo2.png")
                          )
                        )
                      }

                      return frag
                    })()
                  ),
                  Elemento.div({ className: "p-2" }, "baixo"),
                );
              }
            }
          )
        );
        // if (indice % 500 === 0)
        //   await new Promise(r => setTimeout(r));
      }
      div.append(fragment);
    }
  )
);

function seletorDeColunas() {
  const select = Elemento.select(
    { className: "form-select" },
    new Option("Uma Coluna", 1),
    new Option("Duas Colunas", 2),
    new Option("Três Colunas", 3, true, true),
    new Option("Quatro Colunas", 4),
    new Option("Cinco Colunas", 5)
  );

  select.addEventListener(
    "change",
    () => {
      document.documentElement.style.setProperty(
        '--colunas-preferida',
        select.value
      )
    }
  )

  return select;
}

function imagem(src) {
  return Elemento.img({
    className: "scale-transition object-fit-contain h-100 w-100",
    src,
    ondblclick: ev => ev.target.style.scale = 2,
  })
}