function defineTema() {
  const temaDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const htmlRoot = document.querySelector("html");

  if (temaDark) {

    htmlRoot.dataset.bsTheme = "dark";

  } else {

    htmlRoot.dataset.bsTheme = "light";

  }
}
defineTema();


function injetaInputs() {

  const types = [
    { name: "number", type: "number", className: "form-control", step: "any" },
    { name: "time", type: "time", className: "form-control", step: 0.3 },
    { name: "datetime-local", type: "datetime-local", className: "form-control", step: 0.3 },
    { name: "date", type: "date", className: "form-control" },
    { name: "week", type: "week", className: "form-control" },
    { name: "month", type: "month", className: "form-control" },
    { name: "file", type: "file", className: "form-control" },
    { name: "color", type: "color", className: "form-control form-control-color" },
    { name: "url", type: "url", className: "form-control" },
    { name: "tel", type: "tel", className: "form-control" },
    { name: "email", type: "email", className: "form-control" },
    { name: "text", type: "text", className: "form-control" },
  ];

  const hr = document.querySelector("hr");

  const lista = types.map(
    props => (
      label(
        { className: "row mb-3" },
        div(
          { className: "col-sm-2 col-form-label" },
          props.type
        ),
        div(
          { className: "col-sm-10" },
          input(props)
        )
      )
    )
  );

  for (const item of lista) {
    hr.insertAdjacentElement(
      "afterend",
      item
    )
  }

}
injetaInputs();


function fragment(...filhos) {
  const frag = document.createDocumentFragment();
  frag.append(...filhos);
  return frag;
}

function div(props = {}, ...filhos) {
  const div = document.createElement("div");

  Object.assign(
    div,
    props
  );

  div.append(...filhos);

  return div
}

function label(props = {}, ...filhos) {
  const div = document.createElement("label");

  Object.assign(
    div,
    props
  );

  div.append(...filhos);

  return div
}

function input(props = {}, ...filhos) {
  const div = document.createElement("input");

  Object.assign(
    div,
    props
  );

  div.append(...filhos);

  return div
}