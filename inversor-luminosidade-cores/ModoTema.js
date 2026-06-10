import Elemento, { execute } from "./Elemento.js"

export default function ModoTema() {
  return (
    Elemento.label(
      { className: "form-check form-switch" },
      execute(
        Elemento.input(
          {
            className: "form-check-input modo-tema",
            type: "checkbox",
            role: "switch",
            onchange: (ev) => {
              definirTema(ev.target.checked);
            }
          }
        ),
        (input) => {
          input.checked = window.matchMedia('(prefers-color-scheme: dark)').matches;
          definirTema(
            input.checked
          );
          window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener(
              'change',
              e => {
                input.checked = e.matches;
                definirTema(
                  e.matches
                );
              }
            );
        }
      )
    )
  );
}

function definirTema(dark) {
  document.documentElement.setAttribute(
    'data-bs-theme',
    dark ? 'dark' : 'light'
  );
}