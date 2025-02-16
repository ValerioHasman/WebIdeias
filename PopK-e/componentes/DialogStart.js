import _ from "../../Reactive.js";

export default function DialogStart() {
  const div = _.div({ className: "telaIniciar" },
    _.div({ className: "imagemInicio", onclick: () => { div.classList.add("ok"); } })
  );
  return div;
}