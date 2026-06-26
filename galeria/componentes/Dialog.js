import Elemento from "../dependencias/Elemento.js";

export default class Dialog {

  static simples(...filhos) {
    const dialog = Elemento.dialog(
      { className: "dialog-html p-3 bg-body bg-text border shadow rounded-3" },
      ...filhos
    );

    document.body.append(dialog);

    dialog.showModal();

    return dialog;
  }

  static simplesFull(...filhos) {
    const dialog = Elemento.dialog(
      { className: "dialog-html dialog-html-full p-3 bg-body bg-text shadow" },
      ...filhos
    );

    document.body.append(dialog);

    dialog.showModal();

    return dialog;
  }

  static estruturado(...filhos) {
    const dialog = Elemento.dialog(
      { className: "dialog-html estruturado p-0 bg-body bg-text border shadow rounded-3" },
      ...filhos
    );

    document.body.append(dialog);

    dialog.showModal();

    return dialog;
  }

  static estruturadoFull(...filhos) {
    const dialog = Elemento.dialog(
      { className: "dialog-html dialog-html-full estruturado p-0 bg-body bg-text" },
      ...filhos
    );

    document.body.append(dialog);

    dialog.showModal();

    return dialog;
  }
}
