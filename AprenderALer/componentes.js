import Elemento from "./Elemento.js";

export function formulario() {
  return (
    Elemento.div({ className: "flex-grow-0" },
      Elemento.textarea({
        className: "form-control fonte-custom",
        name: "texto",
        id: "texto",
        rows: 7,
        required: true,
        autofocus: true,
        placeholder: "Escreva aqui\num texto bonito.\nMude as opções para ver de outra forma",
        autocapitalize: "sentences"
      }),
      Elemento.div(
        { className: "d-flex flex-wrap gap-1 text-uppercase mt-1 justify-content-center" },
        ...opcoes(
          "estilo",
          [
            {
              text: "Maiúsculo",
              value: "maiusculo",
              selected: true
            },
            {
              text: "Bastão",
              value: "bastao"
            },
            {
              text: "Cursivo",
              value: "cursivo"
            },
            {
              text: "Caligrafia",
              value: "caligrafia"
            },
          ]
        )
      ),
    )
  );
}

export function alfabeto() {
  return (
    Elemento.div(
      { className: "flex-grow-1 overflow-y-auto estilo-botao" },
      Elemento.div(
        { className: "d-flex gap-1 flex-wrap justify-content-center teclado pt-1" },
        ...(function () {
          const lista = new Array();
          lista.push(
            Elemento.button(
              {
                className: "btn btn-outline-secondary border-0",
                onclick: () => { texto.value = texto.value + String.fromCodePoint(32); }
              },
              "ESPAÇO"
            )
          );
          for (let l = 65; l <= 90; l++) {
            const letraMinuscula = String.fromCodePoint(l + 7 + 25);
            const letraMaiuscula = String.fromCodePoint(l);
            lista.push(
              Elemento.button({
                className: "btn btn-outline-secondary border-0 d-flex flex-column flex-wrap",
                onclick: () => {
                  if (texto.value)
                    texto.value = texto.value + letraMinuscula;
                  else
                    texto.value = letraMaiuscula;
                }
              },
                Elemento.div(
                  { className: "col-auto" },
                  letraMaiuscula, " ", letraMinuscula
                ),
                Elemento.div(
                  { className: "col-auto playwrite-br" },
                  letraMaiuscula, " ", letraMinuscula
                )
              )
            );
          }
          lista.push(
            Elemento.button(
              {
                className: "btn btn-outline-secondary border-0",
                onclick: apagar
              },
              "APAGAR"
            )
          );
          return lista;
        })()
      )
    )
  );
}

function apagar() {
  let novotexto = texto.value.trim();
  novotexto = novotexto.slice(0, novotexto.length - 1);
  texto.value = novotexto;
}

/**
 * @typedef {Object} Opcoes
 * @property {string} value
 * @property {string|Node} text
 * @property {boolean} selected
 * */

/**
 * @param {string} name
 * @param {Opcoes[]} opts
 * */
function opcoes(name, opts) {
  return opts.map(
    opt => {
      const id = crypto.randomUUID();
      return Elemento.Fragment(
        Elemento.input(
          {
            id: id,
            type: "radio",
            className: "btn-check",
            autocomplete: "off",
            name: name,
            value: opt.value,
            checked: Boolean(opt.selected)
          }
        ),
        Elemento.label(
          {
            setAttribute: ["for", id],
            className: "btn btn-outline-secondary btn-sm"
          },
          opt.text
        )
      )
    }
  )

  // <input type="radio" class="btn-check" name="options-outlined" id="success-outlined" autocomplete="off" checked>
  // <label class="btn btn-outline-success" for="success-outlined">Checked success radio</label>
  // 
  // <input type="radio" class="btn-check" name="options-outlined" id="danger-outlined" autocomplete="off">
  // <label class="btn btn-outline-danger" for="danger-outlined">Danger radio</label>



}