import Elemento from "Elemento";

export function Dialog({ title, message }) {
  const dialog = Elemento.dialog({ className: "telaDePreferencia" },
    Elemento.h2({}, title),
    Elemento.p({}, message),
    Elemento.button({
      className: "vjButton border-0",
      onclick: () => {
        dialog.close();
      }
    }, "Fechar")
  );
  document.body.append(dialog);
  dialog.showModal();
  return dialog;
}
