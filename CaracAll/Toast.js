import Elemento from "./Elemento.js";

function containerToast() {
  return document.querySelector("div.toast-container.position-fixed.bottom-0.end-0.p-3") ??
    document.body.appendChild(Elemento.div({ className: "toast-container position-fixed bottom-0 end-0 p-3" }));
}

/**
 * @param {string|Node} msg
 * @param {"primary"|"secondary"|"success"|"info"|"warning"|"danger"|"light"|"dark"|"star"} tipo
 */
export default function ToastSimples(msg, tipo = "primary") {
  const divTorrada = containerToast().appendChild(
    Elemento.div({
      className: `toast align-items-center text-bg-${tipo} border-0 px-2 rounded-5`,
      dataset: { bsDelay: 1000 },
      style: { setProperty: ["--bs-toast-spacing", ".9rem"] },
    },
      Elemento.div({ className: "d-flex" },
        Elemento.div({ className: "toast-body" },
          msg
        ),
        Elemento.button({ type: "button", className: "btn-close btn-close-white me-2 m-auto", dataset: { bsDismiss: "toast" } })
      )
    )
  );

  const torrada = new bootstrap.Toast(divTorrada);

  torrada.show();
  return torrada;
}
