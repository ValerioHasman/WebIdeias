import _ from "../../Reactive.js";

export default function DialogStart() {
  const d = _.dialog({ className: "telaIniciar" },
    _.img({ src: "iniciar.svg", onclick: ()=>{ d.close(); } })
  );
  window.addEventListener("load", () => { setTimeout(() => {
    d.showModal();
  }, 100); });
  return d;
}