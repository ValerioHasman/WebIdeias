import Elemento from "./Elemento.js";

export function formulario() {
  return (
    Elemento.div({ className: "container pt-5" },
      Elemento.textarea({
        className: "form-control fonte-custom fs-4",
        name: "texto",
        id: "texto",
        rows: 6,
        required: true,
        autofocus: true,
        placeholder: "Escreva aqui\num texto bonito.\nMude as opções para ver de outra forma",
        autocapitalize: "sentences"
      }),
      Elemento.div({ className: "d-flex flex-wrap justify-content-between" },
        Elemento.label({ className: "form-check col-auto" },
          Elemento.input({
            type: "radio",
            className: "form-check-input",
            id: "maiusculo",
            name: "estilo",
            checked: true
          }),
          Elemento.div({ classList: "form-check-label" },
            "Maiúsculo"),
        ),
        Elemento.label({ className: "form-check col-auto" },
          Elemento.input({
            type: "radio",
            className: "form-check-input",
            id: "normal",
            name: "estilo"
          }),
          Elemento.div({ classList: "form-check-label" },
            "Caligrafia computacional"),
        ),
        Elemento.label({ className: "form-check col-auto" },
          Elemento.input({
            type: "radio",
            className: "form-check-input",
            id: "cursivo",
            name: "estilo"
          }),
          Elemento.div({ classList: "form-check-label" },
            "Cursivo"),
        ),
        Elemento.label({ className: "form-check col-auto" },
          Elemento.input({
            type: "radio",
            className: "form-check-input",
            id: "grafia",
            name: "estilo"
          }),
          Elemento.div({ classList: "form-check-label" },
            "Calegrafia"),
        ),

      ),
    )
  );
}

export function alfabeto() {
  return (
    Elemento.div({ className: "d-flex flex-wrap fs-1 justify-content-around" },
      ...(function () {
        const lista = new Array();
        lista.push(
          Elemento.button({ className: "botao", onclick: () => { texto.value = texto.value + String.fromCodePoint(32); } }, "ESPAÇO"),
          Elemento.button({ className: "botao", onclick: apagar }, "APAGAR")
        );
        for (let l = 65; l <= 90; l++) {
          const letraMinuscula = String.fromCodePoint(l + 7 + 25);
          const letraMaiuscula = String.fromCodePoint(l);
          lista.push(
            Elemento.button({ className: "botao text-center", onclick: () => { texto.value = texto.value + letraMinuscula } },
              Elemento.div({ className: "" }, letraMaiuscula),
              Elemento.div({ className: "" }, letraMinuscula),
              Elemento.div({ className: "playwrite-br" }, letraMaiuscula),
              Elemento.div({ className: "playwrite-br" }, letraMinuscula),
            )
          );
        }
        return lista;
      })()
    )
  );
}

function apagar() {
  let novotexto = texto.value.trim();
  novotexto = novotexto.slice(0, novotexto.length - 1);
  texto.value = novotexto;
}