import _ from "../../Reactive.js";

export default function DialogStart() {
  const div = _.div({ className: "telaIniciar" },
    _.img({ className: "imagemInicio", src: "iniciar.svg", onclick: () => { div.classList.add("ok"); } })
  );
  return div;
}