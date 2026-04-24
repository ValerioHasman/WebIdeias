import { InputBase } from "./componentes/Input.js";
import Elemento from "Elemento";

const matris = obterMatris();

document.body.append(
  Elemento.div(
    {
      className: "container py-2 fs-1",
      style: {
        width: "16ch"
      }
    },
    Elemento.div(
      { className: "row g-0 align-items-center justify-content-end" },
      ...matris.capsulas.map(
        (value) => (
          Elemento.div(
            {
              className: "col-auto",
            },
            Elemento.div(
              {
                style: {
                  width: "2ch",
                },
              },
              Elemento.textarea(
                {
                  style: {
                    width: "100%",
                  },
                  rows: 2,
                  className: "text-end form-control-plaintext p-0 fs-6",
                  inputMode: "numeric"
                }
              )
            )
          )
        )
      ),
    ),
    Elemento.div(
      { className: "row g-0 align-items-center justify-content-end" },
      ...matris.lista1.map(
        (value) => (
          InputBase(
            {
              value: value,
              readOnly: true
            }
          )
        )
      ),
    ),
    Elemento.div(
      { className: "row g-0 align-items-center justify-content-end" },
      ...matris.lista2.map(
        (value) => (
          InputBase(
            {
              value: value,
              readOnly: true
            }
          )
        )
      ),
    ),
    Elemento.hr({ className: "border-3 m-0" }),
    Elemento.div(
      { className: "row g-0 align-items-center justify-content-end" },
      ...matris.capsulas.map(
        (value) => (
          InputBase(
            {
              oninput: function (ev) {
                if (!/\d/.test(this.value)) {
                  this.value = '';
                } else {
                  const nxInput = nextInput(this);
                  if (nxInput) {
                    nxInput.focus();
                  }
                }
              },
            }
          )
        )
      ),
    ),
    Elemento.div(
      { className: "row justify-content-end" },
      Elemento.div(
        { className: "col-auto" },
        Elemento.button(
          { className: "btn btn-lg btn-primary rounded-4 text-uppercase" },
          "Verificar"
        )
      )
    )
  ),
);

function nextInput(input) {
  const lista = Array.from(document.body.querySelectorAll("*")).reverse();
  let encontrado = false;
  for (const item of lista) {
    if (!encontrado && item === input)
      encontrado = true;

    if (encontrado && item !== input) {
      if (item.tagName === 'INPUT') {
        return item;
      }
    }
  }
}

function obterMatris() {
  const lista1 = obterUmArray();
  const lista2 = obterUmArray();

  const max = Math.max(lista1.length, lista2.length);

  while (lista1.length > lista2.length) {
    lista2.unshift("");
  }

  while (lista1.length < lista2.length) {
    lista1.unshift("");
  }

  return {
    lista1,
    lista2,
    capsulas: new Array(max + 1).fill("")
  }
}

function obterUmArray() {
  return Array.from(parseInt(Math.random() * 10000).toString());
}