import Elemento from "./Elemento.js";

export function formulario() {
  return (
    Elemento.div({ className: "container mt-5 user-select-none" },
      Elemento.textarea({
        className: "form-control fonte-custom",
        name: "texto",
        rows: 6,
        required: true,
        placeholder: "Escreva aqui\num texto bonito.",
        autocapitalize: "sentences"
      }),
      Elemento.label({ className: "form-check" },
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
      Elemento.label({ className: "form-check" },
        Elemento.input({
          type: "radio",
          className: "form-check-input",
          id: "normal",
          name: "estilo"
        }),
        Elemento.div({ classList: "form-check-label" },
          "Normal"),
      ),
      Elemento.label({ className: "form-check" },
        Elemento.input({
          type: "radio",
          className: "form-check-input",
          id: "cursivo",
          name: "estilo"
        }),
        Elemento.div({ classList: "form-check-label" },
          "Cursivo"),
      ),
      Elemento.label({ className: "form-check" },
        Elemento.input({
          type: "radio",
          className: "form-check-input",
          id: "grafia",
          name: "estilo"
        }),
        Elemento.div({ classList: "form-check-label" },
          "Calegrafia"),
      ),
    )
  );
}

export function alfabeto() {
  return (
    Elemento.div({ className: "d-flex flex-wrap fs-1 justify-content-around" },
      ...(function () {
        const lista = new Array();
        for (let l = 65; l <= 90; l++) {
          lista.push(
            Elemento.div({ className: "min-4 text-center" },
              Elemento.div({ className: "" }, String.fromCodePoint(l)),
              Elemento.div({ className: "" }, String.fromCodePoint(l + 7 + 25)),
              Elemento.div({ className: "playwrite-br" }, String.fromCodePoint(l)),
              Elemento.div({ className: "playwrite-br" }, String.fromCodePoint(l + 7 + 25)),
            )
          );
        }
        return lista;
      })()
    )
  );
}