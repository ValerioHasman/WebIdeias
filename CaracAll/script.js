import _ from "../Reactive.js";

document.body.append(
  _.div({},
    _.header({ classList: "pt-2 container-fluid bg-secondary-subtle" },
      _.div({ className: "row g-2" },
        _.div({ className: "col-auto" },
          _.img({ className: "logo img-fluid", src: "./favicon.png" }),
        ),
        _.div({ className: "col" },
          _.h1({ className: "m-0" }, "CaracAll")
        ),
        _.form({ className: "col-auto", onsubmit: recalcularPara },
          _.input({
            id: "inpcaracAll",
            name: "caracAll",
            className: "form-control",
            type: "text",
            inputMode: "search",
            placeholder: "…",
            value: String.fromCodePoint(128570),
            maxLength: 2,
            minLength: 1,
            required: true,
          })
        )
      )
    ),
    _.div({ classList: "py-2 sticky-top container-fluid bg-secondary-subtle" },
      _.form({ className: "was-validated", onsubmit: recalcular },
        _.fieldset({ className: "row g-2" },
          _.div({ className: "col-lg col-sm-6 col-12" },
            _.div({ className: "input-group" },
              _.input({
                id: "inpQuantidade",
                name: "inicio",
                inputMode: "numeric",
                className: "form-control",
                type: "number",
                value: "120000",
                placeholder: "Iníciar em…",
                max: 1114111,
                min: 0,
                required: true,
              }),
              _.button({ className: "btn btn-secondary", type: "button", onclick: () => { menos(); enviar.click(); } },
                _.i({ className: "bi bi-chevron-down" })
              ),
              _.button({ className: "btn btn-secondary", type: "button", onclick: () => { mais(); enviar.click() } },
                _.i({ className: "bi bi-chevron-up" })
              )
            )
          ),
          _.div({ className: "col-md col-6" },
            _.input({
              id: "inpIntervalo",
              name: "intervalo",
              inputMode: "numeric",
              className: "form-control",
              type: "number",
              value: "3000",
              placeholder: "Intervalo de…",
              max: 1114111,
              min: 0,
              required: true,
            })
          ),
          _.div({ className: "col d-grid" },
            _.button({
              className: "btn btn-secondary",
              type: "submit",
              id: "enviar"
            }, "Exibir")
          ),
          _.div({ className: "col d-grid" },
            _.button({
              className: "btn btn-secondary",
              onclick: remover,
              type: "button"
            }, "Limpar")
          ),
        )
      )
    ),
    _.section({ className: "container-fluid py-3 fs-6" },
      _.pre({ className: "fs-5", style: { tabSize: 12, whiteSpace: "pre-wrap" }, id: "container" })
    )
  )
);

function mais() {
  inpQuantidade.value = Number.parseInt(inpQuantidade.value) + Number.parseInt(inpIntervalo.value);
}

function menos() {
  inpQuantidade.value = Number.parseInt(inpQuantidade.value) - Number.parseInt(inpIntervalo.value);
}

/** @param {PointerEvent} event */
function recalcularPara(event){
  event.preventDefault();
  const formData = new FormData(event.target);
  exibir(formData.get("caracAll").codePointAt(), 0);
}

/** @param {PointerEvent} event */
function recalcular(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  event.target[0].disabled = true;
  setTimeout(() => {
    exibir(formData.get("inicio"), formData.get("intervalo"));
    event.target[0].disabled = false;
  }, 0);
}

function exibir(next = 0, intervalo = 0) {
  next = Number.parseInt(next);
  intervalo = Number.parseInt(intervalo);
  remover();
  for (let i = next; i <= (next + intervalo) && i < 1114112; i++) {
    container.append(
      _.span({ style: {display: "inline-block"} },`${i}: ${String.fromCodePoint(i)}\t`)
    )
  }
}

function remover() {
  for (const text of container.childNodes) {
    text.remove();
  }
  if (container.childNodes.length > 0) {
    remover();
  }
}

enviar.click();