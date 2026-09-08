import Elemento, { execute } from "../dependencias/Elemento.js";

/**
 * @typedef {Object} OpcoesModal
 * @property {""|"modal-fullscreen"|"modal-fullscreen-sm-down"|"modal-fullscreen-md-down"|"modal-fullscreen-lg-down"|"modal-fullscreen-xl-down"|"modal-fullscreen-xxl-down"} screenSize
 * @property {""|"modal-sm"|"modal-lg"|"modal-xl"} modalSize
 * @property {boolean} keyboard
 * @property {boolean|"static"} backdrop
 * @property {boolean} fade
 * @property {boolean} centered
 * @property {boolean} autoDestroy
 */

/**
 * @param {OpcoesModal} opcoesModal
 * @param {Node|string} titulo
 * @param {Node|string} body
 * @param {Node|string} footer
 * @returns 
 */
export function Modal({ backdrop = "static", centered = false, fade = true, keyboard = true, modalSize = "", screenSize = "", autoDestroy = true }, titulo, body, footer) {
  const modalDiv = Elemento.div(
    {
      className: "modal",
      tabIndex: -1,
      "aria-hidden": "true"
    },
    execute(
      Elemento.div(
        { className: "modal-dialog modal-dialog-scrollable" },
        Elemento.div(
          { className: "modal-content" },
          Elemento.div(
            { className: "modal-header py-1" },
            Elemento.h1({ className: "modal-title fs-5" }, titulo),
            Elemento.button(
              {
                type: "button",
                className: "btn-close",
                dataset: { bsDismiss: "modal" },
                "aria-label": "Close"
              }
            )
          ),
          Elemento.div(
            { className: "modal-body" },
            body
          ),
          Elemento.div(
            { className: "modal-footer py-1" },
            !footer ?
              Elemento.button(
                {
                  type: "button",
                  className: "btn btn-secondary",
                  dataset: { bsDismiss: "modal" }
                },
                "Fechar"
              ) :
              footer
          )
        )
      ),
      (modalDialog) => {
        if (centered) {
          modalDialog.classList.add("modal-dialog-centered");
        }
        if (modalSize) {
          modalDialog.classList.add(modalSize);
        }
        if (screenSize) {
          modalDialog.classList.add(screenSize);
        }
      }
    )
  );

  if (fade) {
    modalDiv.classList.add("fade");
  }

  const triggerElement = document.activeElement;

  const modalBootstrap = bootstrap.Modal.getOrCreateInstance(modalDiv, { keyboard, backdrop, focus: true });

  modalBootstrap.show();

  modalDiv.addEventListener(
    "shown.bs.modal",
    () => {
      (
        modalDiv.querySelector(':where(input, select, textarea):not(:disabled):not([type="hidden"]):not([hidden])') ??
        modalDiv.querySelector('[contenteditable], [tabindex], details > summary') ??
        modalDiv.querySelector('a[href], button:not([data-bs-dismiss="modal"]):not(:disabled)') ??
        modalDiv.querySelector("button:not(:disabled)")
      )?.focus();
    }
  );

  modalDiv.addEventListener(
    "hidden.bs.modal",
    () => {
      if (autoDestroy) {
        modalBootstrap.dispose();
        modalDiv.remove();
      }
      triggerElement?.focus();
    }
  );
  return modalBootstrap;
}
